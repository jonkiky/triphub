import React,{ useState, useEffect}from 'react';
import {  useLocation} from "react-router-dom";
import {customGeocode,GeoLocationRangeBasedOnDistanceBearingStartPoint,haversineDistance} from "../../utils"
import {SEARCH_QUERY} from './SearchGraphqlQuery'
import { useQuery } from "@apollo/react-hooks";
import View from './SearchView';
import axios from 'axios';
import { Base64 } from 'js-base64';


function SearchController() {

	let query = new URLSearchParams(useLocation().search);



	// use new york city as default
	const default_city="New york city"
	const [state,setState] = useState({
		sorting_review:"desc",          // sort by review [ desc | asc | null]
		sorting_distance:null,			// sort by distance  [ desc | asc | null]
		filter_distance:"5_miles",		// filter distance : 5_miles |half_day |one_day| two_day
		activePage:1,					// Current page index
		itemsCountPerPage:20,			//  number of items per page
		place_all_lat_lng_review:null,  //  places' information :  # of review |  lat | lng
		lat:0.0,						// search place's lat
		lng:0.0,						// search place's lng
		const_range_distance:200,		// default range distance for finding all the place with in range. 
		addr:"",						// current address
		totalNumberOfRecords:0
	});



 useEffect(() => {

 	// check search term  
	const search_term =  query.get("term")
	if(search_term==""||search_term==null){
		search_term = default_city;
	}

	// wait untill got places date
 	if(state.place_all_lat_lng_review === null){
 		// get search term's lat and lng
 		// then use call back to find the place with in a range
 		getSearchTermLatAndLng(search_term,getAllPlaceLatAndLng);
 	}

 }, [state.place_all_lat_lng_review])
 	

 function updateRadioOption(option,cate){
 	let c_state = Object.assign({}, state);
 	if(cate == "d_option"){
 		 c_state["filter_distance"]=option;
 	}
 	if(cate == "s_option"){
 			switch(option) {
			  case "reviewN":
			   c_state["sorting_review"]="desc";
			   c_state["sorting_distance"]=null;
			    break;
			   case "reviewA":
			   c_state["sorting_review"]="asc";
			   c_state["sorting_distance"]=null;
			    break;
			  case "distanceN":
			    c_state["sorting_distance"]="desc";
			    c_state["sorting_review"]=null;
			    break;
			  case "distanceF":
			    c_state["sorting_distance"]="asc";
			    c_state["sorting_review"]=null;
			    break;
			}
 	}
 	setState(c_state)
 }


 function getCurrentPageData(){

 	if(state.place_all_lat_lng_review === null){
 		return []
 	}else{
 		// filter  distance
		let distanced_data = [];

 		switch(state.filter_distance) {
			  case "5_miles":
			   distanced_data=state.place_all_lat_lng_review.filter((d)=>d.distance<15)
			    break;
			  case "half_day":
			     distanced_data=state.place_all_lat_lng_review.filter((d)=>d.distance>=15&&d.distance<40)
			    break;
			  case "one_day":
			     distanced_data=state.place_all_lat_lng_review.filter((d)=>d.distance>45&&d.distance<120)
			    break;
			  case "two_day":
			     distanced_data=state.place_all_lat_lng_review.filter((d)=>d.distance>120&&d.distance<220)
			    break;
			   default:
			   	distanced_data=state.place_all_lat_lng_review.filter((d)=>d.distance<15)

	}	

		// sorting
		if(state.sorting_review=="desc"){
				distanced_data.sort(function(a, b) {
						  return a.review - b.review;
						});
		}
		if(state.sorting_review=="asc"){
				distanced_data.sort(function(a, b) {
						  return b.review - a.review;
						});
		}

		if(state.sorting_distance=="asc"){
				distanced_data.sort(function(a, b) {
						  return b.distance - a.distance;
						});
		}
		if(state.sorting_distance=="desc"){
				distanced_data.sort(function(a, b) {
						  return a.distance - b.distance;
						});
		}
		
		// get current page's data's lat and lng 
		let start_index =(state.activePage-1)*state.itemsCountPerPage;
		let end_index =(state.activePage)*state.itemsCountPerPage;
		if(end_index>distanced_data.length){
			end_index=distanced_data.length;
		}
		const currentPageData =distanced_data.slice(start_index,end_index);

		return [currentPageData.map(d=>d.lat),currentPageData.map(d=>d.lng),distanced_data.length]
 	}
 }

 function getSearchTermLatAndLng(search_addr,f_getAllPlaceLatAndLng){

 		const Geocode =customGeocode();

 		Geocode.fromAddress(search_addr).then(
			  response => {
			    const { lat, lng } = response.results[0].geometry.location;
			    const addr =response.results[0].formatted_address;
			     // calculate destination point, final bearing
			     f_getAllPlaceLatAndLng(lat,lng,addr);
			  },
			);
 	}
 

 function getAllPlaceLatAndLng(lat,lng,addr){
 		try {
			        axios.get("https://gitlab.com/api/v4/projects/18679138/repository/files/thing_to_do%2Fplace_lat_lng.json?ref=master",{
			           headers: {
			          'Access-Control-Allow-Origin' : '*',
			          'Access-Control-Allow-Methods' : 'GET',
			          'Access-Control-Allow-Origin':'*',
			          'Content-Type': 'application/json',
			        },
			        }).then(res => {
				        const response = JSON.parse(Base64.decode(res.data.content));
				        // find lat and lng's range  
				 		// range lat 1,3  lon:2,4
				 		const [lat1,lat2,lat3,lat4,lng1,lng2,lng3,lng4]= GeoLocationRangeBasedOnDistanceBearingStartPoint(lng,lat,state.const_range_distance);
						

				        // filter out the place not in the range. 
				        const filtered_data = response.data.filter((d)=>
				        	d.lat < lat1 && d.lat >lat3 && d.lng < lng2&& d.lng >lng4
				        );


				        // add attribute distance
				        const distance_filtered_data = filtered_data.map((d)=>{
				        	return {
				        		lat: d.lat,
				        		lng: d.lng,
				        		distance:Math.round(haversineDistance([lng,lat],[d.lng,d.lat]))
				        	}
				        })

				   		let c_state = Object.assign({}, state);
				   		c_state["lat"] = lat;
				   		c_state["lng"]=lng;
						c_state["place_all_lat_lng_review"]=distance_filtered_data;
						c_state["addr"]=addr;

					    setState(c_state);
					});
			 } catch (error) {
		     	console.log("error")
			 }
 	}



 	function handleSearch(e,addr){
 		getSearchTermLatAndLng(addr,getAllPlaceLatAndLng);
 	}

 	function handlePageChange(pageNumber){
 		let c_state = Object.assign({}, state);
 		c_state["activePage"] = pageNumber;
 		setState(c_state);
 	}


 	let { loading, error, data } = useQuery(SEARCH_QUERY,{
	    variables: { 
	    	lat_in: getCurrentPageData()[0],
	    	lng_in: getCurrentPageData()[1]
	     },
	  });
 	
	
	return <View 
      loading={loading} 
      error={error} 
      data={ data ? data.things_to_dos.map(d=>{
 		d["distance"] = Math.round(haversineDistance([state.lng,state.lat],[d.lng,d.lat]));
 		return d;
 	}):data
  }		
  	  state={state}
  	  totalNumberOfRecords ={getCurrentPageData()[2]}
  	  activePage ={state.activePage}
  	  itemsCountPerPage={state.itemsCountPerPage}
  	  sorting_review={state.sorting_review}
      geolocation={state.addr}
      handleSearch={handleSearch}
      handlePageChange={handlePageChange}
      updateRadioOption={updateRadioOption}
      lat={state.lat}
      lng={state.lng}

      />
}


export default SearchController;