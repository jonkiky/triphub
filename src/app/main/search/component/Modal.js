import React, { Component } from 'react';
import Modal from "react-bootstrap/Modal";

function CustomModal(props) {


  const handleClose = () => {
  	props.handleClose()
  };

  const data =props.data[0];

  let desc = "";
  if (data&&data.desc!=''){
  	desc = data.desc;
  }else{
  	if (data&&data.shortDesc!='')
			desc =data.shortDesc;											
  };


 
												
return (
	<Modal show={props.show} onHide={handleClose}>
        <Modal.Body>
         <div className="modal-dialog modal-dialog-centered" role="document">
				    <div className="modal-content">
				      <div className="modal-body">
				        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleClose}>
				          <span aria-hidden="true">&times;</span>
				        </button>
				      	<div className="detail-pics">
				        	<div className="modal_post_image"><img src="https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/06/72/ff/da.jpg" alt=""/></div>
				        	<div className="modal_post_image"><img src="https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/06/72/ff/da.jpg" alt=""/></div>
				        	<div className="modal_post_image"><img src="https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/06/72/ff/da.jpg" alt=""/></div>
				        	<div className="modal_post_image"><img src="https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/06/72/ff/da.jpg" alt=""/></div>
				        </div>
				         <div className="detail-container">
				         	<div className="row">
				         		<div className="col-lg-8">
							        <div className="detail-desc detail-section">
							        	<div className="news_post_title"><a href="#">{data?data.place_name:""} <span className="sub-title">Near | in : {data?data.city:""} , {data?data.state:""} </span></a></div>

							        	<div className="news_post_text">
							        		<p>	
							        			<a href={data?data.website_link:"#"} target="_blank" className="btn filter-button ">Website</a>
							        			<a href={`https://www.google.com/maps/place/${data?data.place_name:''}`}  className="btn filter-button " target="_blank">Directions</a>
							        			<a href="" className="btn filter-button ">Save</a>
							        		</p>
											<p>{desc}</p>
										</div>
										<div className="news_post_text reviews">
											<span className="fa fa-star checked"></span>
											<span className="fa fa-star checked"></span>
											<span className="fa fa-star checked"></span>
											<span className="fa fa-star"></span>
											<span className="fa fa-star"></span>
											<span className="key">{data?data.score:""}  {data?data.review:""} reviwes (from google)</span>
										</div>
										<div className="news_post_text">
											<span className="key">Address:</span> {data?data.address:""}
										</div>
										<div className="news_post_text"><span className="key">Distance:</span> {data?data.distance:""} + miles</div>
										
									</div>
							        <div className="detail-score detail-section">
							        	<div className="news_post_title"><a href="#">Youtube</a></div>
							        	<div className="news_post_text">
											<div className="row">
											{data&&data.youtube_ids!=null?data.youtube_ids.split("@").map((id)=>(
  	 <div className="col-6">
  		<iframe height="300px"  width="100%" src={`https://www.youtube.com/embed/${id}`} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="allowfullscreen"
        mozallowfullscreen="mozallowfullscreen" 
        msallowfullscreen="msallowfullscreen" 
        oallowfullscreen="oallowfullscreen" 
        webkitallowfullscreen="webkitallowfullscreen">
  		</iframe>
  		</div>)):""}
											</div>
										</div>
								
							        </div>
							    </div>
							    <div className="col-lg-4">
							    	<div className="news_post_text">

							    		<div className="news_post_title"><a href="#">Social Media</a></div>
							    		<div className="icons">
							    			{data&&data.facebook_link!=""?(<a href={data.facebook_link} target="_blank"><i className="fab fa-facebook-square"></i></a>):''}
							    			{data&&data.instagram_link!=""?(<a href={data.instagram_link} target="_blank"><i className="fab fa-instagram-square"></i></a>):''}
							    			{data&&data.twitter_link!=""?(<a href={data.twitter_link} target="_blank"><i className="fab fa-twitter-square"></i></a>):''}
							    			{data&&data.pinterest_link!=""?(<a href={data.pinterest_link} target="_blank"><i className="fab fa-pinterest-square"></i></a>):''}
							    			{data&&data.youtube_link!=""?(<a href={data.youtube_link} target="_blank"><i className="fab fa-youtube-square"></i></a>):''}
							    		</div>

							    		<div className="news_post_title"><a href="#">Hotels</a></div>
							    		<div className="icons">
							    			<a href={`https://www.google.com/travel/hotels?destination=${data?data.place_name:''}`} target="_blank"><i className="fas fa-shower"></i></a>
							    		</div>
							    		<div className="news_post_title"><a href="#">Restaurant</a></div>
							    		<div className="icons">
							    			<a href={`https://www.yelp.com/search?find_desc=food&find_loc=${data?data.place_name:''}`} target="_blank"><i className="fab fa-yelp"></i></a>
							    		</div>
							    		<div className="news_post_title"><a href="#">Parking</a></div>
							    		<div className="icons">
							    			<a href={`https://www.parkme.com/map?q=${data?data.place_name:''} , ${data?data.state:''}`} target="_blank"><i className="fas fa-parking"></i></a>
							    		</div>
							    		<div className="news_post_title"><a href="#">More</a></div>
							    		<div className="icons">
							    			<a href={`https://www.tripadvisor.com/Search?q=${data?data.place_name:''}`} target="_blank"><i className="fab fa-tripadvisor"></i></a>
							    			<a href={`https://www.google.com/search?q=${data?data.place_name:''}`} target="_blank"><i className="fas fa-camera-retro"></i></a>
							    		</div>

							    	</div>
							    </div>
					    	</div>
				    	</div>
				      </div>
				    </div>
				  </div>

        </Modal.Body>
       
  </Modal>
	)

}


export default CustomModal;
   