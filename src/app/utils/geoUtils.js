import Geocode from "react-geocode";
import LatLon,{Dms}from './latlon-spherical';


export function customGeocode(){


// set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
Geocode.setApiKey("AIzaSyBmZ-aKYzqs0lfZMF71c6qRK7hNTw1q8-g");

// set response language. Defaults to english.
Geocode.setLanguage("en");

// set response region. Its optional.
// A Geocoding request with region=es (Spain) will return the Spanish city.
Geocode.setRegion("es");

// Enable or disable logs. Its optional.
Geocode.enableDebug();

return Geocode;
};
   

export  function haversineDistance(coords1, coords2) {
  function toRad(x) {
    return x * Math.PI / 180;
  }

  var lon1 = Dms.parse(coords1[0]);
  var lat1 = Dms.parse(coords1[1]);

  var lon2 = Dms.parse(coords2[0]);
  var lat2 = Dms.parse(coords2[1]);

  const p1 = new LatLon(lat1, lon1);
  const p2 = new LatLon(lat2, lon2);
  const dist = p1.distanceTo(p2);
  return dist/1000/1.60934*1.1;
}


export function GeoLocationRangeBasedOnDistanceBearingStartPoint(lon,lat,d){
  // North is 000°
  // East is 090°
  // South is 180°
  // West is 270°
  const [lat1,lon1] = DestinationPointBasedOnDistanceBearingStartPoint(lon,lat,0,d);
  const [lat2,lon2] = DestinationPointBasedOnDistanceBearingStartPoint(lon,lat,90,d);
  const [lat3,lon3] = DestinationPointBasedOnDistanceBearingStartPoint(lon,lat,180,d);
  const [lat4,lon4] = DestinationPointBasedOnDistanceBearingStartPoint(lon,lat,270,d);

 return [lat1,lat2,lat3,lat4,lon1,lon2,lon3,lon4];
}

export function DestinationPointBasedOnDistanceBearingStartPoint(lon,lat,brng,d) {
 
        const lat1 = Dms.parse(lat);
        const lon1 = Dms.parse(lon);
        const dist = d * 1000 * 1.60934; // convert km to metres and miles
        const brng1 = Dms.parse(brng);


 const p1 = new LatLon(lat1, lon1);
 const p2 = p1.rhumbDestinationPoint(dist, brng1);
  return [p2.lat, p2.lon];
}

