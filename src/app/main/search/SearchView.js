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


console.log(props.lat)

const override = css`
  display: block;
  width:100%;
`;  



const [state,setState] = useState({
	show:false,
  });



  const handleClose = () => {
  	let c_state = Object.assign({}, state);
  	c_state["show"]=false;
  	setState(c_state);
  };
  const handleShow = (addr) => {
  	let c_state = Object.assign({}, state);
  	c_state["show"]=true;
  	c_state["activePageContent"]=props.data.filter(place=> place.address ==addr)
  	setState(c_state);
  };


function handleSearch(e,search){
	props.handleSearch(e,search);
}


function  handlePageChange(pageNumber) {
	props.handlePageChange(pageNumber)
 }

 const updateRadioOption=(option,cate)=>{
 	props.updateRadioOption(option,cate);
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
								{ props.geolocation} {' '} {props.totalNumberOfRecords}
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
											<div className="loader_title">Sort By: </div>
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
									//"https://gitlab.com/api/v4/projects/18574523/repository/files/"+place.state + "@" + place.place_name.replace("/", "").replace(" ", "_").replace("'","") + "@" + place.id + ".json?ref=master"
												
									props.data!=null?props.data.map((place)=>{
										return(
												<div className="latest_post justify-content-start col-lg-6 col-sm-12 col-md-6">
													<div className="latest_post_image">
													<PlaceImage url={
														"https://gitlab.com/api/v4/projects/18679138/repository/files/"+place.state + "@" + place.place_name.replace(/\s+/g, "_").replace("/", "").replace("'","") + "@" + place.id + ".json?ref=master"
													} /></div>
													<div className="latest_post_text post-action">
															<i className="far fa-heart"></i>
														</div>	
													<div className="latest_post_content">
														<div className="latest_post_title">
															<a href="#" data-toggle="modal" data-target="#detailModal" onClick={()=>handleShow(place.address)}>
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



				</div>
			</div>
				<div className=" d-flex col-lg-6">
							<div className="contact_map">
								<div className="map">
									<div id="google_map" className="google_map">
										<div className="map_container">
											<div id="map">
												<SimpleMap lat={props.lat} lng={props.lng} data={props.data}/>
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
