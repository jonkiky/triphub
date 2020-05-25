import React from 'react';
import GoogleMap from 'google-map-react';
import PLACE_PIN from './SimplePlacePin'

function SimpleMap(props){

return (
      // Important! Always set the container height explicitly
      <div style={{ height: '50vh', width: '100%' }}>
        <GoogleMap
          bootstrapURLKeys={'AIzaSyD4GazFJE0ziwpJEjVMT4bWYtl-YClo1Yk'}
          center={{
      lat: props.lat?props.lat:40.6971477,
      lng: props.lng?props.lng:-74.2605555
    }}
          zoom={11}
        >
               <PLACE_PIN
                lat={props.data.lat}
                lng={props.data.lng}
                text={props.data.place_name}
                key={props.data.lat+props.data.lng}
                show ={false}
              />
        </GoogleMap>
      </div>
    );
}

export default SimpleMap;