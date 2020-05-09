import React, {useState,useEffect} from 'react';
import logo from '../../../logo.svg';
import '../../../styles/main_styles.css';	
import '../../../styles/responsive.css';
import '../../../styles/news.css';
import '../../../styles/news_responsive.css';
import '../../../styles/contact.css';
import '../../../styles/contact_responsive.css';
import '../../../styles/elements.css';
import '../../../styles/elements_responsive.css';
import '../../../styles/search.css';
import BounceLoader from "react-spinners/BarLoader";
import { css } from "@emotion/core";
import SearchBarView  from "../../../@framework/SearchBar/SearchBarView";
import Pagination from "react-js-pagination";
import className from "classnames";
import SimpleMap from "./component/GoogleMap";
import CustomModal from "./component/Modal";
import PlaceImage from "./component/PlaceImage";



function SearchView(props) {

const override = css`
  display: block;
  width:100%;
`;  



const [state,setState] = useState({
	default_distance:10,
	thingsTodos:null,
	thingsTodos_all:[],
	activePage:1,
	activePageContent:null,
	itemsCountPerPage:20,
	show:false,
	radio:{
	  		d_option:"5_miles",
	  		s_option:"review",
	  	}
  });

  useEffect(() => {

  	if(props.data && state["thingsTodos"]==null){
		let c_state = Object.assign({}, state);
		if(props.data!=null){
			let unq_places =Array.from(new Set(props.data.map(place => place.place_name)))
				 .map(name => {
				   return props.data.find(place => place.place_name === name)
				 });
			let places = unq_places.filter((d)=>d.distance<state['default_distance']).sort((a,b)=>a.review-b.review)
			c_state["thingsTodos"]= places;
			c_state["thingsTodos_all"]=unq_places;
	  		setState(c_state);
		}
	}

  })


  const handleClose = () => {
  	let c_state = Object.assign({}, state);
  	c_state["show"]=false;
  	setState(c_state);
  };
  const handleShow = (place_city,id) => {
  	let c_state = Object.assign({}, state);
  	c_state["show"]=true;
  	c_state["activePageContent"]=c_state['thingsTodos_all'].filter(place=> place.id ==id && place.city == place_city)
  	setState(c_state);
  };


function handleSearch(e,search){
	props.handleSearch(e,search);
}


function  handlePageChange(pageNumber) {
	let c_state = Object.assign({}, state);
	c_state["activePage"]=pageNumber;
    setState(c_state);
 }

 const updateRadioOption=(option,cate)=>{
 	let c_state = Object.assign({}, state);
 	c_state["radio"][cate] = option;
 	if(cate == "d_option"){
 		switch(option) {
			  case "5_miles":
			   c_state["thingsTodos"]=c_state["thingsTodos_all"].filter((d)=>d.distance<15)
			    break;
			  case "half_day":
			    c_state["thingsTodos"]=c_state["thingsTodos_all"].filter((d)=>d.distance>=15&&d.distance<40)
			    break;
			  case "one_day":
			    c_state["thingsTodos"]=c_state["thingsTodos_all"].filter((d)=>d.distance>45&&d.distance<120)
			    break;
			  case "two_day":
			    c_state["thingsTodos"]=c_state["thingsTodos_all"].filter((d)=>d.distance>120&&d.distance<220)
			    break;
			}
 	}

 	if(cate == "s_option"){
 		switch(option) {
			  case "review":
			   c_state["thingsTodos"]=c_state["thingsTodos"].sort((a,b)=>a.review-b.review)
			    break;
			  case "distanceN":
			    c_state["thingsTodos"]=c_state["thingsTodos"].sort((a,b)=>a.distance-b.distance)
			    break;
			  case "distanceF":
			    c_state["thingsTodos"]=c_state["thingsTodos"].sort((a,b)=>b.distance-a.distance)
			    break;
		
			}
 	}

 	setState(c_state)
 }


return (
   <div className="super_container">

   <CustomModal handleClose={handleClose} show={state.show} data={{...state["activePageContent"]}}/>

    <div className="sweet-loading">
        <BounceLoader
          css={override}
          height={8}
          size={60}
          color={"#333"}
          loading={!props.data}
        />
      </div>

	<header className="search_header">
		<div >
			<div className="row">
				<div className="col">
					<div className="header_content d-flex flex-row align-items-center justify-content-start">
						<div className="header_content_inner d-flex flex-row align-items-end justify-content-start search_header_inner">
							<div className="logo" ><a href="index.html" style={{color:'black'}}>Travello</a></div>
									<SearchBarView handleSearch={handleSearch}/>
									<div className="cart d-flex flex-row align-items-end justify-content-start">
											<div className="intro_icon"><a href="#"><img onClick={()=>handleShow()} src="images/suitcase.svg" alt=""/></a></div>
											<div className="intro_content">
												0
											</div>
										</div>
									</div>
								</div>
							</div>
							
					</div>
		</div>
	</header>
	
<div className="search_news">

			<div className="row">
				<div className="col-lg-6" id="list-items">
					<div className="row thing_to_do_section">
						<div className="col-lg-12 ">
							
							<div className="loader_title">
								<b>Things TO Do Near: </b>
							</div>
							<div className="loader_title">
								{ props.geolocation.addr}
							</div>
						</div>
					</div>
					<div className="row filter_section">
						<div className="col-lg-12">
								<div className="filter-container">
									<div className="row">
										<div className="col-lg-12">
												<div className="loader_title">Distance:</div>
												<div >
													<label className={className({
														'filter-button': true,
  														'active': state&&state.radio&&state.radio.d_option == "5_miles",
													})}>
													    <input type="radio" name="d_options" id="d-option1"   checked={state&&state.radio&&state.radio.d_option == "5_miles" }  value="5miles" onChange={()=>updateRadioOption("5_miles","d_option")}/> <span>Within 10 miles</span> 
													</label>
													<label className={className({
														'filter-button': true,
  														'active': state&&state.radio&&state.radio.d_option == "half_day",
													})}>
													    <input type="radio" name="d_options" id="d-option2" checked={state&&state.radio&&state.radio.d_option == "half_day" } onChange={()=>updateRadioOption("half_day","d_option")} /> 
													    Half-Day Tours
													</label>
													<label className={className({
														'filter-button': true,
  														'active': state&&state.radio&&state.radio.d_option == "one_day",
													})}>
													    <input type="radio" name="d_options" id="d-option3" checked={state&&state.radio&&state.radio.d_option == "one_day" }  onChange={()=>updateRadioOption("one_day","d_option")}/>  One-Day Tours
													</label>
													<label className={className({
														'filter-button': true,
  														'active': state&&state.radio&&state.radio.d_option == "two_day",
													})}  >
													    <input type="radio" name="d_options" id="d-option3" checked={state&&state.radio&&state.radio.d_option == "two_day" }  onChange={()=>updateRadioOption("two_day","d_option")}/>  Two-Day Tours
													</label>
												</div>
										</div>
									</div>
									
									<div className="row">
										<div className="col-lg-12">
											<div className="loader_title">Sort By: </div>
											<div  >
													<label className={className({
														'filter-button': true,
  														'active': state&&state.radio&&state.radio.s_option== "review",
													})}  >
													    <input type="radio" name="s_options" id="s-option1" checked={state&&state.radio&&state.radio.s_option == "review" } onChange={()=>updateRadioOption("review","s_option")}  /> Most Reviews
													</label>
													<label className={className({
														'filter-button': true,
  														'active': state&&state.radio&&state.radio.s_option == "distanceN",
													})} >
													    <input type="radio" name="s_options" id="s-option3" checked={state&&state.radio&&state.radio.s_option == "distanceN" } onChange={()=>updateRadioOption("distanceN","s_option")} />  Distance Near
													</label>
													<label className={className({
														'filter-button': true,
  														'active': state&&state.radio&&state.radio.s_option == "distanceF",
													})} >
													    <input type="radio" name="s_options" id="s-option3" checked={state&&state.radio&&state.radio.s_option == "distanceF" } onChange={()=>updateRadioOption("distanceF","s_option")} />  Distance Far
													</label>
												</div>
										</div>
									</div>
								</div>
						</div>
					</div>
					



					
					<div className="news_container ">
						<div className="latest">
							<div className="latest_container">
								<div className="row ">
								{
									//"https://gitlab.com/api/v4/projects/18574523/repository/files/"+place.state + "@" + place.place_name.replace("/", "").replace(" ", "_").replace("'","") + "@" + place.id + ".json?ref=master"
												
									state.thingsTodos!=null?state.thingsTodos.slice(state.activePage==1?0:(state.activePage-1)*state.itemsCountPerPage,state.activePage==1?state.itemsCountPerPage:state.activePage*state.itemsCountPerPage).map((place)=>{
										return(
												<div className="latest_post justify-content-start col-lg-6 col-sm-12 col-md-6">
													<div className="latest_post_image">
													<PlaceImage url={
														"https://gitlab.com/api/v4/projects/18574523/repository/files/test.json?ref=master"
													} /></div>
													<div className="latest_post_text post-action">
															<i className="far fa-heart"></i>
														</div>	
													<div className="latest_post_content">
														<div className="latest_post_title">
															<a href="#" data-toggle="modal" data-target="#detailModal" onClick={()=>handleShow(place.city,place.id)}>
																{place.place_name}
															</a>

														</div>
														<div className="latest_post_text"><p><b>Review:</b>{place.score}  {place.review} google reviews</p></div>
														<div className="latest_post_text"><p>{place.desc =="" ? place.shortDesc : place.desc}</p></div>
														<div className="latest_post_text"><p><b>Address:</b>{place.address}</p></div>
														<div className="latest_post_text"><p><b>Distance:</b>{place.distance}+ miles</p></div>
														
													</div>
												</div>

											)
									}): (<p> No place available </p>)



								}
								
								</div>
							</div>
						</div>

						<div className="row pagination-container">

							<div className="col-lg-12">
								<div className="pagination float-left">
									 <Pagination
							          activePage={state.activePage}
							          itemsCountPerPage={state.itemsCountPerPage}
							          totalItemsCount={state.thingsTodos!=null?state.thingsTodos.length:0}
							          pageRangeDisplayed={5}
							          onChange={handlePageChange.bind(this)}
							        />
								</div>
								<div className="pagination float-right stats-pagination"> {state.activePage} of {state.thingsTodos!=null?Math.ceil(state.thingsTodos.length/state.itemsCountPerPage):0}</div>
							</div>
						</div>



				</div>
			</div>
				<div className=" d-flex col-lg-6">
							<div className="contact_map">
								<div className="map">
									<div id="google_map" className="google_map">
										<div className="map_container">
											<div id="map">
											
											</div>
										</div>
									</div>
								</div>
							</div>
				</div>
			</div>
	</div>
</div>
  );
}

export default SearchView;
