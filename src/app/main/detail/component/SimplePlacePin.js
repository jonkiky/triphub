import React, {useState,useEffect} from 'react';
import GoogleMap from 'google-map-react';

const PLACE_PIN = (props) => {


const pin_style_hover = {
  color: 'black',
  fontSize:'30px',
};


const pin_style = {
  color: 'black',
  fontSize:'18px',
};

const text_style={
    color:"#000",
    width:" max-content",
    paddingLeft:"8px",
    paddingRight:"8px",
    background:" #fff",
    height:" auto",
    lineHeight:" 25px",
    borderRadius:" 25px",
    display:" inline-block",
    border:" 2px solid #212529",
    transform: "translateX(-40%)",
    zIndex: "99",

}



  return(
    <div>
      <div style={pin_style_hover}>
        <i class="fas fa-map-marker-alt"></i></div>
        <div style={text_style}>{props.text}</div>
    </div>
    )

 };
export default PLACE_PIN;