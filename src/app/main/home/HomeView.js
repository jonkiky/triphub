import React,{useState,useEffect} from 'react';
import logo from '../../../logo.svg';
import { useHistory } from 'react-router-dom';
import BarLoader from "react-spinners/BarLoader";
import { css } from "@emotion/core";
import Skeleton from 'react-loading-skeleton';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import './HomeStyle.css';
// If you want to use the provided css
import 'react-google-places-autocomplete/dist/index.min.css';
 

function HomeView(props) {
 
	const override = css`
	  display: block;
	  width:100%;
	`;

	let history = useHistory();
 	const [searchTerm,setSearchTerm] = useState(props.address);

 	useEffect(() => {
 		setSearchTerm(props.address);
 	
 	},[props.address])
 	
	const updateSearch = (event) => {
		setSearchTerm(event.target.value);
	};


	const routeChange=(searchTerm)=> {
	let term ="";
	if(searchTerm){
		term = searchTerm;
	}else{
		term =document.getElementById("react-google-places-autocomplete-input").value;
	}
    let path = `/search?term=` + term;
    history.push(path);
  }


  const routeChangeWithParam=(e,term)=> {
  	e.preventDefault()
    let path = `/search?term=` + term;
    history.push(path);
  }

  return (

   <div className="super_container container">
	 <div className="sweet-loading">
        <BarLoader
          css={override}
          height={8}
          color={"#333"}
          loading={props.loading}
        />
      </div>


	<div class="home">
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


	<div class="home_search">
		<div class="container">
			<div class="row">
				<div class="col">
					<div class="home_search_container">
						<div class="home_search_title">Find Things To Do </div>
						<div class="home_search_content">
								<form action="search" className="home_search_form" id="home_search_form">
								<div className="d-flex flex-lg-row flex-column align-items-start justify-content-lg-between justify-content-start">
									<GooglePlacesAutocomplete
								      onSelect={(addr)=>routeChange(addr.description)}
								      initialValue={searchTerm} 
								      inputClassName={"search_input search_input_80"}
								      required
								      placeholder={"Find things to do near location"}
								    />
									<button className="home_search_button"  disabled={searchTerm==null||searchTerm==""} onClick={()=>routeChange()}>search</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>


	<div class="destinations" id="destinations">
		<div class="container">
			<div class="row">
				<div class="col text-center">
					<div class="section_subtitle">simply amazing places</div>
					<div class="section_title"><h2>Popular Destinations</h2></div>
				</div>
			</div>
			<div class="row ">
						{
							props.data?props.data.cities.map((city)=>{
									return (
										<div key={city._id} className="col-sm-12 col-md-6 col-lg-4">
										<div className="destination_image">
											<img src={city.pictures&&city.pictures!=""?city.pictures.split("@")[0]:"/images/destination_1.jpg"} alt=""/>
										</div>
										<div className="destination_content">
											<div className="destination_title"><a href="#" onClick={(event)=>routeChangeWithParam(event,city.city+","+city.state)}>{city.city}</a></div>
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
										<li>jonkiky@gmail.com</li>
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
