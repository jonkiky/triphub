import React,{useState} from "react";
import { useQuery } from "@apollo/react-hooks";
import { HOME_QUERY ,HOME_QUERY_CITIES_IN_STATE} from "./HomeGraphqlQuery";
import { geolocated } from "react-geolocated";
import { DestinationPointBasedOnDistanceBearingStartPoint,customGeocode,StateAbbreviationToFullName} from "../../utils";
import View from "./HomeView"


function HomeController(props) {

  // by default it will ask user to allow use the location.

  const [address, setAddress] = useState(null);
  const Geocode = customGeocode();

  let graphql_query =HOME_QUERY_CITIES_IN_STATE;
  
  // Get address from latitude & longitude.
  if(props.isGeolocationAvailable 
      && props.isGeolocationEnabled 
        &&props.coords
          &&props.coords.latitude
            &&props.coords.longitude
              &&address==null){
       Geocode.fromLatLng(props.coords.latitude, props.coords.longitude).then(
          response => {
            const address = response.results[0].formatted_address.split(",");
            let stateInfo =address[Math.max(address.length - 2)].trim().split(' ')[0];
            // get state info 
            setAddress({
              address:address,
              state:stateInfo
            });
          }
    );
  }

  // if user denial to provide location information. given default popular cities
  // otherwise, given the popular cities within the same state.

  if(address!=null){
    graphql_query =HOME_QUERY_CITIES_IN_STATE;
  }


  // query the backend 
   const { loading, error, data } = useQuery(graphql_query,{
    variables: { stateId: (address!==null && address.state) ?StateAbbreviationToFullName(address.state):"New_York" },
  });

  
  return  <View 
      loading={loading} 
      error={error} 
      data={data} 
      address={address!==null ? address.address : ""}/>
}


export default geolocated({
    positionOptions: {
        enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
})(HomeController);