import React,{ useState }from 'react';
function SearchBarView(props){

const [searchTerm,setSearchTerm] = useState('');
 
const handleSearch=(e)=> {
	e.preventDefault()
    props.handleSearch(e,searchTerm);
 }

const updateSearch = (e) => {
		setSearchTerm(e.target.value);
};

return (
				<form action="search" class="home_search_form" id="home_search_form">
								<div class="d-flex flex-lg-row flex-column align-items-start justify-content-lg-between justify-content-start">
									<span class="search_input_word">Near</span><input onChange={(event)=>updateSearch(event)} value= {searchTerm} placeholder={props.search} type="text" class="search_input search_input_80" required="required"/>
									<button class="home_search_button"  disabled={searchTerm==null||searchTerm==""} onClick={(event)=>handleSearch(event)}>search</button>
								</div>
				</form>

	);
	
}


export default  SearchBarView;