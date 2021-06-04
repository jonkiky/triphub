import React from 'react';
import GoogleMap from 'google-map-react';
import PLACE_PIN from './PlacePin'

function SimpleMap(props){

return (
      // Important! Always set the container height explicitly
      <div style={{ height: '90vh', width: '33%' }}>
        <GoogleMap
          bootstrapURLKeys={'AIzaSyAb9WVlxc6wCT8OY-Jn-wrlzkYc9uYAd1E'}
          center={{
      lat: props.lat?props.lat:40.6971477,
      lng: props.lng?props.lng:-74.2605555
    }}
          zoom={11}
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