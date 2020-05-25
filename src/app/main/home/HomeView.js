import React,{useState} from 'react';
import logo from '../../../logo.svg';
import { useHistory } from 'react-router-dom';
import BarLoader from "react-spinners/BarLoader";
import { css } from "@emotion/core";
import Skeleton from 'react-loading-skeleton';
import '../../../styles/main_styles.css';
import '../../../styles/responsive.css';
import '../../../styles/home_styles.css';

function HomeView(props) {

 
const override = css`
  display: block;
  width:100%;
`;
	
	let history = useHistory();
 	const [searchTerm,setSearchTerm] = useState("");

 	if(searchTerm=="" && props.address!=""){
 		setSearchTerm(props.address);
 	}
 	
	const updateSearch = (event) => {
		setSearchTerm(event.target.value);
	};


	const routeChange=()=> {
    let path = `/search?term=` + searchTerm;
    history.push(path);
  }


  const routeChangeWithParam=(e,term)=> {
  	e.preventDefault()
    let path = `/search?term=` + term;
    history.push(path);
  }

  return (

   <div className="super_container">
	 <div className="sweet-loading">
        <BarLoader
          css={override}
          height={8}
          color={"#333"}
          loading={props.loading}
        />
      </div>

	

	<div className="home">
		
		<div className="home_slider_container">
					<div className="background_image" style={{backgroundImage: 'url(images/jakob-owens-unsplash.jpg)'}}></div>
					<div className="home_slider_content_container">
						<div className="container">
							<div className="row">
								<div className="col">
									<div className="home_slider_content">
										<div className="home_title"><h2>Dream. Explore. Discover.</h2></div>
									</div>
								</div>
							</div>

						</div>
						<div className="home-bg-author">Photo by Jakob Owens on Unsplash</div>
					</div>
		</div>
	</div>


	<div className="home_search">
		<div className="container">
			<div className="row">
				<div className="col">
					<div className="home_search_container">
						<div className="home_search_title">Find Things To Do </div>
						<div className="home_search_content">
							<form action="search" className="home_search_form" id="home_search_form">
								<div className="d-flex flex-lg-row flex-column align-items-start justify-content-lg-between justify-content-start">
									<span className="search_input_word">Near</span><input onChange={(event)=>updateSearch(event)} value= {searchTerm} placeholder={props.address} type="text" className="search_input search_input_80" required="required"/>
									<button className="home_search_button"  disabled={searchTerm==null||searchTerm==""} onClick={()=>routeChange()}>search</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>




	<div className="destinations" id="destinations" >
		<div className="container">
			<div className="row">
				<div className="col text-center">
					<div className="section_subtitle">simply amazing places</div>
					<div className="section_title"><h2>Popular Destinations</h2></div>
				</div>
			</div>
			<div className="row destinations_row">
				<div className="col">
					<div className="destinations_container item_grid row">
					{
						props.data?props.data.cities.map((city)=>{
								return (<div key={city._id} className="destination item col-4">
									<div className="destination_image">
										<img src={city.pictures&&city.pictures!=""?city.pictures.split("@")[0]:"/images/destination_1.jpg"} alt=""/>
									</div>
									<div className="destination_content">
										<div className="destination_title"><a href="#" onClick={(event)=>routeChangeWithParam(event,city.city+","+city.state_id)}>{city.city}</a></div>
										<div className="destination_subtitle"><p>{city.description}</p></div>
									</div>
								</div>
								)
							})
						:""
					}
						
					</div>
				</div>
			</div>
		</div>
	</div>


	<footer className="footer home-footer">
	
		<div className="container">
	
			<div className="row footer_contact_row">
				<div className="col-xl-10 offset-xl-1">
					<div className="row">

						<div className="col-xl-12 footer_contact_col">
							<div className="footer_contact_item d-flex flex-column align-items-center justify-content-start text-center">
								<div className="footer_contact_icon"><img src="images/around.svg" alt=""/></div>
								<div className="footer_contact_title">send us a message</div>
								<div className="footer_contact_list">
									<ul>
										<li>youremail@gmail.com</li>
										<li>Office@yourbusinessname.com</li>
									</ul>
								</div>
							</div>
						</div>

					</div>
				</div>
			</div>
		</div>
		<div className="col text-center ">
		Copyright &copy;
		All rights reserved | This template is made with <i className="fas fa-heart" aria-hidden="true"></i> by <a href="https://colorlib.com" target="_blank">Colorlib</a>
		</div>
	</footer>
</div>
  );
}

export default HomeView;
