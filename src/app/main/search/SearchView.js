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
import { Link} from "react-router-dom";
import { useHistory } from 'react-router-dom';
import StarRatings from 'react-star-ratings';

function SearchView(props) {

let history = useHistory();
console.log(props.lat)

const override = css`
  display: block;
  width:100%;
`;  


const with_grey_border ={
'boxShadow': '0 2px 18px rgba(0,0,0,.15)'
};  


const [state,setState] = useState({
	show:false,
	map_lat:null,   // interactive with map
	map_lng:null,	// interactive with map
  });

   const handleMap= (map_lat,map_lng) => {
   	let c_state = Object.assign({}, state);
  	c_state["map_lat"]=map_lat;
  	c_state["map_lng"]=map_lng;
  	setState(c_state);
   }


  const handleClose = () => {
  	let c_state = Object.assign({}, state);
  	c_state["show"]=false;
  	setState(c_state);
  };
  const handleShow = (lat,lng) => {
  	let path = `./place?term=`+props.geolocation+`&lat=` + lat +`&lng=`+lng;
    window.open(path, "_blank") //to open new page
  };


function handleSearch(e,search){
	props.handleSearch(e,search);
}


function  handlePageChange(pageNumber) {
	props.handlePageChange(pageNumber)
	window.scrollTo(0, 0)
 }

 const updateRadioOption=(option,cate)=>{
 	props.updateRadioOption(option,cate);
 }


 const onMouseEnterContent = (lat,lng) => {
    handleMap(lat,lng)
  }

 const onMouseLeaveContent = (/*e*/) => {
    handleMap(null,null)
  }

const updateSave=()=>{
	console.log(1)
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
							<div className="logo" ><Link to="/" style={{color:'black'}}>Travello</Link></div>
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
								<b>{props.totalNumberOfRecords}  Places To Go: </b>
								{ props.geolocation} {' '} 
							</div>
						</div>
					</div>
					<div className="row filter_section">
						<div className="col-lg-12">
								<div className="filter-container">
									<div className="row">
										<div className="col-lg-12">
												<div >
													<label className={className({
														'filter-button': true,
  														'active': props.state&&props.state.filter_distance&&props.state.filter_distance == "5_miles",
													})}>
													    <input type="radio" name="d_options" id="d-option1"   checked={props.state&&props.state.filter_distance&&props.state.filter_distance == "5_miles" }  value="5miles" onChange={()=>updateRadioOption("5_miles","d_option")}/> <span>Within 10 miles</span> 
													</label>
													<label className={className({
														'filter-button': true,
  														'active': props.state&&props.state.filter_distance&&props.state.filter_distance == "half_day",
													})}>
													    <input type="radio" name="d_options" id="d-option2" checked={props.state&&props.state.filter_distance&&props.state.filter_distance == "half_day" } onChange={()=>updateRadioOption("half_day","d_option")} /> 
													    Half-Day Tours
													</label>
													<label className={className({
														'filter-button': true,
  														'active': props.state&&props.state.filter_distance&&props.state.filter_distance == "one_day",
													})}>
													    <input type="radio" name="d_options" id="d-option3" checked={props.state&&props.state.filter_distance&&props.state.filter_distance == "one_day" }  onChange={()=>updateRadioOption("one_day","d_option")}/>  One-Day Tours
													</label>
													<label className={className({
														'filter-button': true,
  														'active': props.state&&props.state.filter_distance&&props.state.filter_distance == "two_day",
													})}  >
													    <input type="radio" name="d_options" id="d-option3" checked={props.state&&props.state.filter_distance&&props.state.filter_distance == "two_day" }  onChange={()=>updateRadioOption("two_day","d_option")}/>  Two-Day Tours
													</label>
												</div>
										</div>
									</div>
									
									<div className="row">
										<div className="col-lg-12">
											<div  >
													<label className={className({
														'filter-button': true,
  														'active': props.state&&props.state.sorting_review&&props.state.sorting_review== "desc",
													})}  >
													    <input type="radio" name="s_options" id="s-option1" checked={props.sorting_review == "desc" } onChange={()=>updateRadioOption("reviewN","s_option")}  /> Most Reviews
													</label>
													<label className={className({
														'filter-button': true,
  														'active': props.state&&props.state.sorting_distance&&props.state.sorting_distance == "desc",
													})} >
													    <input type="radio" name="s_options" id="s-option3" checked={props.state&&props.state.sorting_distance&&props.state.sorting_distance == "desc" } onChange={()=>updateRadioOption("distanceN","s_option")} />  Distance Near
													</label>
													<label className={className({
														'filter-button': true,
  														'active': props.state&&props.state.sorting_distance&&props.state.sorting_distance == "asc",
													})} >
													    <input type="radio" name="s_options" id="s-option3" checked={props.state&&props.state.sorting_distance&&props.state.sorting_distance == "asc" } onChange={()=>updateRadioOption("distanceF","s_option")} />  Distance Far
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
									props.totalNumberOfRecords&&props.data!=null?props.data.map((place)=>{
										return(
												<div 
												onMouseEnter={()=>onMouseEnterContent(place.lat,place.lng)}
         										onMouseLeave={onMouseLeaveContent}
          										style={place.lat==state.map_lat&&place.lng==state.map_lng? with_grey_border:null} 
          										className="latest_post justify-content-start col-lg-6 col-sm-12 col-md-6" >
													<div className="latest_post_image">
													<PlaceImage url={
														"https://gitlab.com/api/v4/projects/18927730/repository/files/"+place.state + "@" + place.place_name.replace(/\s+/g, "_").replace("/", "").replace("'","") + "json?ref=master"
													} />
													</div>
													<div className="latest_post_content">
														<div className="latest_post_title">
															<a href="#" data-toggle="modal" data-target="#detailModal" onClick={()=>handleShow(place.lat,place.lng)}>
																{place.place_name} 
															</a>
											

														</div>
														<div className="row">
													        <div className="col-lg-12 place-help-button">
													                 <a href={place.website_link!=""?place.website_link:"#"} className="btn filter-button help-icon" target="_blank">Website</a>
													                 <a href={`https://www.google.com/maps/place/${place.place_name}`}  className="btn filter-button help-icon" target="_blank">Directions</a>
											                         <a href="" className="help-icon btn filter-button "><i class="far fa-heart"></i></a>
													        </div>
													    </div>
														<div className="latest_post_text">
															 <StarRatings
															        rating={place.score}
															        starDimension="20px"
															        starSpacing="2px"
															        starRatedColor="#FAD02C"
															      />

															&nbsp; {place.review} google reviews</div>
														<div className="latest_post_text"><p>{place.desc =="" ? place.shortDesc : place.desc}</p></div>
														<div className="latest_post_text"><p><b>Address: </b>{place.address}</p></div>
														<div className="latest_post_text"><p><b>Distance: </b>{place.distance}+ miles</p></div>
														
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
							          activePage={props.activePage}
							          itemsCountPerPage={props.itemsCountPerPage}
							          totalItemsCount={props.totalNumberOfRecords}
							          pageRangeDisplayed={5}
							          onChange={handlePageChange.bind(this)}
							        />
								</div>
								<div className="pagination float-right stats-pagination"> {props.activePage} of {props.totalNumberOfRecords!=null?Math.ceil(props.totalNumberOfRecords/props.itemsCountPerPage):0}</div>
							</div>
						</div>
						<footer class="footer">
							<div class="col text-center">
								Feedback
							</div>
							<div class="col text-center">
							Copyright &copy;
							All rights reserved | This template is made with<i class="fas fa-heart"></i> by <a href="https://colorlib.com" target="_blank">Colorlib</a>
							</div>
						</footer>



				</div>
			</div>
				<div className=" d-flex col-lg-6">
							<div className="contact_map">
								<div className="map">
									<div id="google_map" className="google_map">
										<div className="map_container">
											<div id="map">
												<SimpleMap lat={props.lat} lng={props.lng} data={props.data} handleMapHover={handleMap} target_lat={state.map_lat} target_lng={state.map_lng}/>
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
