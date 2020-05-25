import gql from 'graphql-tag';
export const QUERY = gql`
query getDetails($lat: Float!,$lng: Float!) {
   things_to_do(query:{lat:$lat,lng:$lng}){
    place_name
    state
    city
    address
    desc
    direction_link
    event_link
    facebook_link
    id
    instagram_link
    lat
    lng
    pinterest_link
    review
    score
    shortDesc
    twitter_link
    website_link
    youtube_ids
    youtube_link
  }
  }`;
