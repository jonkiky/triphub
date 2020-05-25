import React,{ useState, useEffect}from 'react';
import { useQuery } from "@apollo/react-hooks";
import { QUERY } from './CartGraphqlQuery'
import View from './CartViewModal';
import { useSelector } from 'react-redux';
import ObjectID from 'bson-objectid';

function CartController(props) {


const cart = useSelector((state) => state.cart.places);

  let { loading, error, data } = useQuery(QUERY,{
      variables: { 
        ids: cart.map(id=>ObjectID(id)),
       },
    });
	
	return <View 
      loading={loading} 
      error={error} 
      data={data}
      show={props.show}
      handleClose={props.handleClose}
      searchImgOnGoogle={props.searchImgOnGoogle}
      handleCartChange={props.handleCartChange}
      />
}


export default CartController;