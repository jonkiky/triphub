import React, {useState,useEffect} from 'react';
import logo from '../../../logo.svg';
import '../../../styles/detail.css'; 
import BounceLoader from "react-spinners/BarLoader";
import { css } from "@emotion/core";
import SearchBarView  from "../../../@framework/SearchBar/SearchBarView";
import className from "classnames";
import { Link} from "react-router-dom";
import { useHistory } from 'react-router-dom';
import PlaceImage from "./component/Images";
import {OverlayTrigger,Tooltip} from 'react-bootstrap';
import SimpleMap from './component/Map'
function DetailView(props) {

let history = useHistory();

const override = css`
  display: block;
  width:100%;
`;  



function handleSearch(e,search){
  props.handleSearch(e,search);
}


function  handleShow(pageNumber) {
  props.handlePageChange(pageNumber)
 }

 const updateRadioOption=(option,cate)=>{
  props.updateRadioOption(option,cate);
 }




return (
   <div className="super_container">

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
                  <SearchBarView handleSearch={handleSearch} search= {props.location}/>
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
  
  <div>
  {props.data&&props.data!=null&&props.data!=""? <div className="row" ><PlaceImage url={
                            "https://gitlab.com/api/v4/projects/18927730/repository/files/"+props.data.state + "@" + props.data.place_name.replace(/\s+/g, "_").replace("/", "").replace("'","") + "json?ref=master"
                          } /></div>:""}

  </div>
 <div className="container">
    <div className="row">
        <div className="title col-lg-12">
          {props.data.place_name} <span className="sub-title padding-left-20"> Near | in : {props.data?props.data.city:""} , {props.data?props.data.state:""} </span>
        </div>
    </div>
     <div className="row">
        <div className="col-lg-12">
            <p> 
                            <a href={props.data?props.data.website_link:"#"} target="_blank" className="btn filter-button ">Website</a>
                            <a href={`https://www.google.com/maps/place/${props.data?props.data.place_name:''}`}  className="btn filter-button " target="_blank">Directions</a>
                            <a href="" className="btn filter-button ">Save</a>
                          </p>
        </div>
      </div>
       <div className="row">
        <div className="col-lg-12">
             <span className="fa fa-star checked"></span>
                      <span className="fa fa-star checked"></span>
                      <span className="fa fa-star checked"></span>
                      <span className="fa fa-star"></span>
                      <span className="fa fa-star"></span>
                      <span className="key">{props.data?props.data.score:""}  {props.data?props.data.review:""} reviwes (from google)</span>
        </div>
      </div>
       <div className="row">
        <div className="col-lg-12">
            <span className="key">Address:</span> {props.data?props.data.address:""}
        </div>
      </div>

       <div className="row">
        <div className="col-lg-12">
            {props.data.desc==""?props.data.shortDesc:props.data.desc}
        </div>
      </div>


       <div className="row">
           <div className="sub-title col-lg-12">
                Links
            </div>
          <div className="col-lg-12">
                    <div className="news_post_text">
                      <div className="icons">
                       {props.data&&props.data.facebook_link!=""?(
                         <OverlayTrigger
                              key="facebook_tool_tip"
                              placement="top"
                              overlay={
                                <Tooltip id={`tooltip-top`}>
                                 Facebook
                                </Tooltip>
                              }
                            >
                             <a href={props.data.facebook_link} target="_blank"><i className="fab fa-facebook-square"></i></a>
                            </OverlayTrigger>):''}

                         {props.data&&props.data.instagram_link!=""?(
                         <OverlayTrigger
                              key="instagram_tool_tip"
                              placement="top"
                              overlay={
                                <Tooltip id={`tooltip-top`}>
                                 Instagram
                                </Tooltip>
                              }
                            >
                            <a href={props.data.instagram_link} target="_blank"><i className="fab fa-instagram-square"></i></a>
                            </OverlayTrigger>):''}


                          {props.data&&props.data.twitter_link!=""?(
                         <OverlayTrigger
                              key="twitter_tool_tip"
                              placement="top"
                              overlay={
                                <Tooltip id={`tooltip-top`}>
                                 Twitter
                                </Tooltip>
                              }
                            >
                          <a href={props.data.twitter_link} target="_blank"><i className="fab fa-twitter-square"></i></a>
                            </OverlayTrigger>):''}



                          {props.data&&props.data.pinterest_link!=""?(
                         <OverlayTrigger
                              key="pinterest_tool_tip"
                              placement="top"
                              overlay={
                                <Tooltip id={`tooltip-top`}>
                                 Pinterest
                                </Tooltip>
                              }
                            >
                        <a href={props.data.pinterest_link} target="_blank"><i className="fab fa-pinterest-square"></i></a>
                            </OverlayTrigger>):''}




                          {props.data&&props.data.youtube_link!=""?(
                         <OverlayTrigger
                              key="Youtube_tool_tip"
                              placement="top"
                              overlay={
                                <Tooltip id={`tooltip-top`}>
                                 Youtube
                                </Tooltip>
                              }
                            >
                     <a href={props.data.youtube_link} target="_blank"><i className="fab fa-youtube-square"></i></a>
                            </OverlayTrigger>):''}



                      
                         <OverlayTrigger
                              key="hotel_tool_tip"
                              placement="top"
                              overlay={
                                <Tooltip id={`tooltip-top`}>
                                 Hotel
                                </Tooltip>
                              }
                            >
                              <a href={`https://www.google.com/travel/hotels?destination=${props.data?props.data.place_name:''}`} target="_blank"><i className="fas fa-shower"></i></a>
                     
                            </OverlayTrigger>

                            <OverlayTrigger
                              key="yelp_tool_tip"
                              placement="top"
                              overlay={
                                <Tooltip id={`tooltip-top`}>
                                 Yelp
                                </Tooltip>
                              }
                            >
                                 <a  href={`https://www.yelp.com/search?find_desc=food&find_loc=${props.data?props.data.place_name:''}`} target="_blank"><i className="fab fa-yelp"></i></a>
                    
                            </OverlayTrigger>


                            <OverlayTrigger
                              key="parking_tool_tip"
                              placement="top"
                              overlay={
                                <Tooltip id={`tooltip-top`}>
                                 Parking
                                </Tooltip>
                              }
                            >
                             <a href={`https://www.parkme.com/map?q=${props.data?props.data.place_name:''} , ${props.data?props.data.state:''}`} target="_blank"><i className="fas fa-parking"></i></a>
                        
                            </OverlayTrigger>


                            <OverlayTrigger
                              key="google_tool_tip"
                              placement="top"
                              overlay={
                                <Tooltip id={`tooltip-top`}>
                                 Google Search
                                </Tooltip>
                              }
                            >
                               <a  href={`https://www.google.com/search?q=${props.data?props.data.place_name:''}`} target="_blank"><i className="fas fa-camera-retro"></i></a>
                        
                            </OverlayTrigger>


                            <OverlayTrigger
                              key="TripAdvisor_tool_tip"
                              placement="top"
                              overlay={
                                <Tooltip id={`tooltip-top`}>
                                 TripAdvisor
                                </Tooltip>
                              }
                            >
                                <a  title="Hooray!" href={`https://www.tripadvisor.com/Search?q=${props.data?props.data.place_name:''}`} target="_blank"><i className="fab fa-tripadvisor"></i></a>
                      
                            </OverlayTrigger>

                       </div>
                    </div>
                  </div>
      </div>



       <div className="row">
          <div className="sub-title col-lg-12">
             <a target="_blank" href={`https://www.youtube.com/results?search_query=${props.data.place_name}`}><i class="fab fa-youtube icon"></i></a> Youtube 
          </div>
      </div>
      <div className="row ">
               {props.data&&props.data.youtube_ids!=null?props.data.youtube_ids.split("@").slice(0,4).map((id)=>(
       <div  className="detail_youtube col-3">
        <iframe height="200px"  width="100%" src={`https://www.youtube.com/embed/${id}`} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="allowfullscreen"
          mozallowfullscreen="mozallowfullscreen" 
          msallowfullscreen="msallowfullscreen" 
          oallowfullscreen="oallowfullscreen" 
          webkitallowfullscreen="webkitallowfullscreen">
        </iframe>
        </div>)):""}   
      </div>  
        <div className="row">
             <div className="col-lg-12">
                <div className="map">
                  <div id="detail_google_map" className="detail_google_map">
                    <div className="map_container">
                      <div id="map">
                        <SimpleMap lat={props.data.lat} lng={props.data.lng} data={props.data}  target_lat={props.data.lat} target_lng={props.data.lng}/>
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

export default DetailView;
