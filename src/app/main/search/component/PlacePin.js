import React, {useState,useEffect} from 'react';
import GoogleMap from 'google-map-react';

const PLACE_PIN = (props) => {
  const [state,setState]=useState({
    show_text:false
  })


const pin_style_hover = {
  color: 'black',
  fontSize:'30px',
};


const pin_style = {
  color: 'black',
  fontSize:'18px',
};

const text_style={
    width:"max-content",
    color:"#181818",
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

   useEffect(() => {
    setState({
      show_text:props.show
    })
 },[props.show])

  const _onMouseEnterContent = (/*e*/) => {
    props.$onMouseAllow(false); 
    props.handleMapHover(props.lat,props.lng)
    setState({
      show_text:true
    })
  }

  const _onMouseLeaveContent = (/*e*/) => {
    props.$onMouseAllow(true); 
    props.handleMapHover(null,null)
    setState({
      show_text:false
    })
  }

  return(
    <div>
     {state.show_text? 
        <><div style={pin_style_hover} onMouseEnter={_onMouseEnterContent}
          onMouseLeave={_onMouseLeaveContent}>
        <i class="fas fa-map-marker-alt"></i></div>
        <div style={text_style}>{props.text}</div></>
        : <div style={pin_style} onMouseEnter={_onMouseEnterContent}
          onMouseLeave={_onMouseLeaveContent}>
        <i class="fas fa-map-marker-alt"></i></div>
      }
    </div>
    )

 };
export default PLACE_PIN;