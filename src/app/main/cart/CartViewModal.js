import React, { Component } from 'react';
import Modal from "react-bootstrap/Modal";
import { useSelector, useDispatch } from 'react-redux';
import PlaceImage from '../search/component/PlaceImage';
import {OverlayTrigger,Tooltip} from 'react-bootstrap';
import StarRatings from 'react-star-ratings';


function CartModal(props) {


  const handleClose = () => {
  	props.handleClose();
  };

const handleCartChange=(event,id)=>{
	props.handleCartChange(event,id);
}

 const searchImgOnGoogle=(event,place)=>{
 	props.searchImgOnGoogle(event,place);
 }
 

 const places = props.data&&props.data.things_to_dos?props.data.things_to_dos:[];
  

												
return (
	<Modal show={props.show} onHide={handleClose}>
        <Modal.Body>
         <div className="modal-dialog modal-dialog-centered" role="document">
         	<div className="detail-container">
	         	<div className="row ">
	         			<div className="title col ">
				         	Saved Places
						</div>

	         			<div className="col ">
				         	<button type="button" className="close-btn close" data-dismiss="modal" aria-label="Close" onClick={handleClose}>
								          <span aria-hidden="true">&times;</span>
							</button>
						</div>
				</div>
											<div className="row ">

							 {
										places.length>0?places.map((place)=>{
													return(
															<div 
			          										className="latest_post justify-content-start col-lg-3 col-sm-12 col-md-3" >
																<div className="latest_post_image"> 
														                         <OverlayTrigger
													                              key="Like_tool_tip"
													                              placement="bottom"
													                              overlay={
													                                <Tooltip id={`tooltip-bottom`}>
													                                 Click the picture to find more images on google
													                                </Tooltip>
													                              }
													                            >
													                            
													                            <a href="#" onClick={(event)=>searchImgOnGoogle(event,place.place_name)}  >
																					<PlaceImage url={
																						"https://gitlab.com/api/v4/projects/18927730/repository/files/"+place.state + "@" + place.place_name.replace(/\s+/g, "_").replace("/", "").replace("'","") + "json?ref=master"
																					} />										                         
																				</a>
													                            </OverlayTrigger>
																

																</div>
																<div className="latest_post_content">
																	<div className="latest_post_title">
																		<a href="#">
																			{place.place_name} 
																		</a>
														

																	</div>
																	<div className="row">
																        <div className="col-lg-12 place-help-button">
																                 <a href={place.website_link!=""?place.website_link:"#"} className="btn filter-button help-icon" target="_blank">Website</a>
																                 <a href={`https://www.google.com/maps/place/${place.place_name}`}  className="btn filter-button help-icon" target="_blank">Directions</a>
													                            <a href="#" onClick={(event)=>handleCartChange(event,place._id)}  className="heart btn filter-button">
														                         	<i class="fas fa-heart"></i> 
														                        </a>
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
																</div>
																 <div className="row">
														          <div className="col-lg-12">
														                    <div className="news_post_text">
														                      <div className="icons">
														                       {place.facebook_link!=""?(
														                         <OverlayTrigger
														                              key="facebook_tool_tip"
														                              placement="top"
														                              overlay={
														                                <Tooltip id={`tooltip-top`}>
														                                 Facebook
														                                </Tooltip>
														                              }
														                            >
														                             <a href={place.facebook_link} target="_blank"><i className="fab fa-facebook-square"></i></a>
														                            </OverlayTrigger>):''}

														                         {place.instagram_link!=""?(
														                         <OverlayTrigger
														                              key="instagram_tool_tip"
														                              placement="top"
														                              overlay={
														                                <Tooltip id={`tooltip-top`}>
														                                 Instagram
														                                </Tooltip>
														                              }
														                            >
														                            <a href={place.instagram_link} target="_blank"><i className="fab fa-instagram-square"></i></a>
														                            </OverlayTrigger>):''}


														                          {place.twitter_link!=""?(
														                         <OverlayTrigger
														                              key="twitter_tool_tip"
														                              placement="top"
														                              overlay={
														                                <Tooltip id={`tooltip-top`}>
														                                 Twitter
														                                </Tooltip>
														                              }
														                            >
														                          <a href={place.twitter_link} target="_blank"><i className="fab fa-twitter-square"></i></a>
														                            </OverlayTrigger>):''}



														                          {place.pinterest_link!=""?(
														                         <OverlayTrigger
														                              key="pinterest_tool_tip"
														                              placement="top"
														                              overlay={
														                                <Tooltip id={`tooltip-top`}>
														                                 Pinterest
														                                </Tooltip>
														                              }
														                            >
														                        <a href={place.pinterest_link} target="_blank"><i className="fab fa-pinterest-square"></i></a>
														                            </OverlayTrigger>):''}




														                          {place.youtube_link!=""?(
														                         <OverlayTrigger
														                              key="Youtube_tool_tip"
														                              placement="top"
														                              overlay={
														                                <Tooltip id={`tooltip-top`}>
														                                 Youtube
														                                </Tooltip>
														                              }
														                            >
														                     <a href={place.youtube_link} target="_blank"><i className="fab fa-youtube-square"></i></a>
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
														                              <a href={`https://www.google.com/travel/hotels?destination=${place.place_name}`} target="_blank"><i className="fas fa-shower"></i></a>
														                     
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
														                                 <a  href={`https://www.yelp.com/search?find_desc=food&find_loc=${place.place_name}`} target="_blank"><i className="fab fa-yelp"></i></a>
														                    
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
														                             <a href={`https://www.parkme.com/map?q=${place.place_name} , ${place.state}`} target="_blank"><i className="fas fa-parking"></i></a>
														                        
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
														                               <a  href={`https://www.google.com/search?q=${place.place_name}`} target="_blank"><i className="fas fa-camera-retro"></i></a>
														                        
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
														                                <a  title="Hooray!" href={`https://www.tripadvisor.com/Search?q=${place.place_name}`} target="_blank"><i className="fab fa-tripadvisor"></i></a>
														                      
														                            </OverlayTrigger>

														                       </div>
														                    </div>
														                  </div>
														      </div>
															</div>

														)
												}): <div className=" col ">
														<hr/>
											         	<p> No place Saved </p>
													</div>


											}
											</div>
							</div>
						</div>
        </Modal.Body>
       
  </Modal>
	)

}


export default CartModal;
   