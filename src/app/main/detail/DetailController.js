import React,{ useState, useEffect}from 'react';
import View from "./DetailView";
import { useQuery } from "@apollo/react-hooks";
import {QUERY} from "./DetailGraphqlQuery";
import {  useLocation} from "react-router-dom";

function DetailController(props) {

  let query = new URLSearchParams(useLocation().search);

  const { loading, error, data } = useQuery(QUERY,{
      variables: { 
        lat:query.get("lat"),
        lng:query.get("lng")
       },
    });
  return <View
      loading={loading} 
      error={error} 
      data={ data?data.things_to_do:"" }
      location={query.get("term")}
   />
}


export default DetailController;