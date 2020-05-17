import React, {useState,useEffect} from 'react';
import GoogleMap from 'google-map-react';
import cx from 'classnames';


const K_HOVER_DISTANCE = 30;



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

   useEffect(() => {
    setState({
      show_text:props.show
    })
 },[props.show])

  const _onMouseEnterContent = (/*e*/) => {
    props.$onMouseAllow(false); 
    console.log(0);
    console.log(props)
    props.handleMapHover(props.lat,props.lng)
    setState({
      show_text:true
    })
  }

  const _onMouseLeaveContent = (/*e*/) => {
    props.$onMouseAllow(true); 
    console.log(1);
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



function customDistanceToMouse(pt, mousePos, markerProps) {
  const K_SCALE_NORMAL = 0.65;

  const K_MARKER_HEIGHT = 60;
  // marker is more tall at top, so calc distance to some point at marker top
  const K_MARKER_WEIGHT_PT = K_MARKER_HEIGHT * 0.7;
  // distance to markers depends on scale so hover on big markers is more probable
  const scale = markerProps.scale;
  const x = pt.x;
  const y = pt.y - K_MARKER_WEIGHT_PT * scale;

  const scaleNormalized = Math.min(scale / K_SCALE_NORMAL, 1);
  const K_MIN_DIST_MIN_KOEF = 0.6;

  const distKoef = 1 + scaleNormalized * (K_MIN_DIST_MIN_KOEF - 1);
  return distKoef * Math.sqrt((x - mousePos.x) * (x - mousePos.x) + (y - mousePos.y) * (y - mousePos.y));
}

function onChildMouseEnter(num, childProps){
  console.log(childProps);
       console.log(0)

}


function onChildMouseLeave(num, childProps){

  console.log(childProps);
       console.log(1)
}



function SimpleMap(props){

console.log(props)

return (
      // Important! Always set the container height explicitly
      <div style={{ height: '90vh', width: '50%' }}>
        <GoogleMap
          bootstrapURLKeys={'AIzaSyD4GazFJE0ziwpJEjVMT4bWYtl-YClo1Yk'}
          center={{
      lat: props.lat?props.lat:40.6971477,
      lng: props.lng?props.lng:-74.2605555
    }}
          zoom={11}
          onChildMouseEnter={onChildMouseEnter}
          onChildMouseLeave={onChildMouseLeave} 
          hoverDistance={K_HOVER_DISTANCE}
          distanceToMouse={customDistanceToMouse}
        >
        {
          props.data&&props.data.map((d)=>{
            return (
               <PLACE_PIN
                lat={d.lat}
                lng={d.lng}
                text={d.place_name}
                key={d.lat+d.lng}
                handleMapHover={props.handleMapHover}
                show = {d.lat==props.target_lat && d.lng==props.target_lng}
              />
                  )
          })

        }
         
        </GoogleMap>
      </div>
    );
}

export default SimpleMap;