import React,{useState} from 'react';
import '../../../styles/main_styles.css';
import '../../../styles/responsive.css';
import logo from '../../../logo.svg';
import { useHistory } from 'react-router-dom';
import BarLoader from "react-spinners/BarLoader";
import { css } from "@emotion/core";
import Skeleton from 'react-loading-skeleton';


function HomeView(props) {

 
const override = css`
  display: block;
  width:100%;
`;
	
	let history = useHistory();
 	const [searchTerm,setSearchTerm] = useState('');
 	const [popularCities,setPopularCities] = useState(null);


 	if(searchTerm == null && props.address.toString()!=""){
 		setSearchTerm(props.address.toString())
 	}

 	if(props.data && props.data.citys && popularCities==null){
 		setPopularCities(props.data.citys)
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

  console.log(popularCities)

  return (

   <div class="super_container">
	 <div className="sweet-loading">
        <BarLoader
          css={override}
          height={8}
          color={"#333"}
          loading={props.loading}
        />
      </div>
	<header class="header">
		<div class="container">
			<div class="row">
				<div class="col">
					<div class="header_content d-flex flex-row align-items-center justify-content-start">
						<div class="header_content_inner d-flex flex-row align-items-end justify-content-start">
							<div class="logo"><a href="index.html">Travello</a></div>
							<nav class="main_nav">
								<ul class="d-flex flex-row align-items-start justify-content-start">
									<li class="active"><a href="index.html">HOME</a></li>
									<li><a href="about.html">ABOUT  US</a></li>
									<li><a href="contact.html">CONTACT</a></li>
								</ul>
							</nav>
						

							<div class="hamburger ml-auto">
								<i class="fa fa-bars" aria-hidden="true"></i>
							</div>

						</div>
					</div>
				</div>
			</div>
		</div>
	</header>


	<div class="menu">
		<div class="menu_header d-flex flex-row align-items-center justify-content-start">
			<div class="menu_logo"><a href="index.html">Travello</a></div>
			<div class="menu_close_container ml-auto"><div class="menu_close"><div></div><div></div></div></div>
		</div>
		<div class="menu_content">
			<ul>
				<li><a href="index.html">HOME</a></li>
				<li><a href="about.html">ABOUT  US</a></li>
				<li><a href="contact.html">CONTACT</a></li>
			</ul>
		</div>
	</div>
	

	<div class="home">
		
		<div class="home_slider_container">
			<div class="owl-carousel owl-theme home_slider">
				
				<div class="owl-item">
					<div class="background_image" style={{backgroundImage: 'url(images/tokyo-luv-CsMNgdHXzFs-unsplash.jpg)'}}></div>
					<div class="home_slider_content_container">
						<div class="container">
							<div class="row">
								<div class="col">
									<div class="home_slider_content">
										<div class="home_title"><h2>Adventure is out there.</h2></div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div class="owl-item">
					<div class="background_image" style={{backgroundImage: 'url(images/tokyo-luv-CsMNgdHXzFs-unsplash.jpg)'}}></div>
					<div class="home_slider_content_container">
						<div class="container">
							<div class="row">
								<div class="col">
									<div class="home_slider_content">
										<div class="home_title"><h2>Dream. Explore. Discover.</h2></div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
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
							<form action="search" class="home_search_form" id="home_search_form">
								<div class="d-flex flex-lg-row flex-column align-items-start justify-content-lg-between justify-content-start">
									<span class="search_input_word">Near</span><input onChange={(event)=>updateSearch(event)} value= {searchTerm}type="text" class="search_input search_input_80" required="required"/>
									<button class="home_search_button"  disabled={searchTerm==null||searchTerm==""} onClick={()=>routeChange()}>search</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>




	<div class="destinations" id="destinations" style={{height:"1100px"}}>
		<div class="container">
			<div class="row">
				<div class="col text-center">
					<div class="section_subtitle">simply amazing places</div>
					<div class="section_title"><h2>Popular Destinations</h2></div>
				</div>
			</div>
			<div class="row destinations_row">
				<div class="col">
					<div class="destinations_container item_grid row">
					{
						popularCities!=null?popularCities.map((city)=>{
								return (<div key={city._id} class="destination item col-4">
									<div class="destination_image">
										<img src="images/destination_1.jpg" alt=""/>
									</div>
									<div class="destination_content">
										<div class="destination_title"><a href="#" onClick={(event)=>routeChangeWithParam(event,city.city+","+city.state_id)}>{city.city}</a></div>
										<div class="destination_subtitle"><p>Nulla pretium tincidunt felis, nec.</p></div>
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


	<footer class="footer">
		<div class="parallax-mirror" style={{"visibility": "visible","z-index": "-100","position": "fixed", "top": "0px", "left": "0px", "overflow": "hidden", "transform":" translate3d(0px, 476px, 0px)", "height": "400px", "width": "1295px"}}>
			<img class="parallax-slider" src="images/footer_1.jpg" style={{"transform": "translate3d(0px, -57.2px, 0px)","position": "absolute", "height": "505px", "width": "1295px", "max-width": "none"}}/>
		</div>
		<div class="container">
	
			<div class="row footer_contact_row">
				<div class="col-xl-10 offset-xl-1">
					<div class="row">

						<div class="col-xl-12 footer_contact_col">
							<div class="footer_contact_item d-flex flex-column align-items-center justify-content-start text-center">
								<div class="footer_contact_icon"><img src="images/around.svg" alt=""/></div>
								<div class="footer_contact_title">send us a message</div>
								<div class="footer_contact_list">
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
		<div class="col text-center">
		Copyright &copy;
		All rights reserved | This template is made with <i class="fa fa-heart-o" aria-hidden="true"></i> by <a href="https://colorlib.com" target="_blank">Colorlib</a>
		</div>
	</footer>
</div>
  );
}

export default HomeView;
