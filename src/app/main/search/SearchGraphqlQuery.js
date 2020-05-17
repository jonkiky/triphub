import gql from 'graphql-tag';

export const SEARCH_QUERY = gql`
query getThingsTodos($lat_in: [Float!], $lng_in: [Float!]) {
  things_to_dos(query: {lat_in: $lat_in, lng_in: $lng_in}) {
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
  }
	`;

// export const SEARCH_QUERY = gql`
// query {
//   cities(limit: 6){
//     city
//   }
//   }
//     `;