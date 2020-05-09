import React,{ useState, useEffect}from 'react';
import {  useLocation} from "react-router-dom";
import {customGeocode,GeoLocationRangeBasedOnDistanceBearingStartPoint,haversineDistance} from "../../utils"
import {SEARCH_QUERY} from './SearchGraphqlQuery'
import { useQuery } from "@apollo/react-hooks";
import View from './SearchView';

function SearchController() {

	let query = new URLSearchParams(useLocation().search);

	// use new york city as default
	const default_lat =40;
	const default_lng=74;
	const default_city="New york city"
	const [geolocation,setGeoLocation] = useState({
		lat:default_lat,
		lng:default_lng,
		addr:default_city,
		distance:200,
		range:[0,0,0,0],
		city:[],
	});

 useEffect(() => {

 	const Geocode =customGeocode();

	// find geo location, if not able to find that location, will shows default one and warning user.
	const search_addr =  query.get("term")
	if(search_addr==""||search_addr==null){
		// set default search criteria
	}else{
			findAddrLatAndLng(search_addr);
	}
 }, [])
 	

 	function findAddrLatAndLng(search_addr){

 		const Geocode =customGeocode();

 		Geocode.fromAddress(search_addr).then(
			  response => {
			    const { lat, lng } = response.results[0].geometry.location;
			     // calculate destination point, final bearing
			    const [lat1,lat2,lat3,lat4,lon1,lon2,lon3,lon4]= GeoLocationRangeBasedOnDistanceBearingStartPoint(lng,lat,geolocation.distance);
			    // range lat 1,3  lon:2,4
			    setGeoLocation({
						lat:lat,
						lng:lng,
						addr:response.results[0].formatted_address,
						distance:200,
						range:[lat1,lat3,lon2,lon4],
					})
			  },
			);
 	}

 	function handleSearch(e,addr){
 		findAddrLatAndLng(addr);
 	}

 	const { loading, error, data } = useQuery(SEARCH_QUERY,{
	    variables: { 
	    	lat_lt: geolocation.range[0],
	    	lat_gte: geolocation.range[1],
	    	lng_lt: geolocation.range[2],
	    	lng_gte: geolocation.range[3]
	     },
	  });

 	// calcuate the distance from the start point
 
	
	return  <View 
      loading={loading} 
      error={error} 
      data={ data ? data.things_to_dos.map(d=>{
 		d["distance"] = Math.round(haversineDistance([geolocation.lng,geolocation.lat],[d.lng,d.lat]));
 		return d;
 	}):data
  } 
      geolocation={geolocation}
      handleSearch={handleSearch}/>
}


export default SearchController;