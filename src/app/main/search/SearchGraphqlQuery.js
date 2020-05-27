import gql from 'graphql-tag';

export const SEARCH_QUERY = gql`
query getThingsTodos($id_in: [String]!) {
  things_to_dos(query: {id_in: $id_in}) {
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
    _id
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