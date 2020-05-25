import gql from 'graphql-tag';

export const QUERY = gql`
query getThingsTodos($ids: [ObjectId]!) {
  things_to_dos(query: {_id_in: $ids}) {
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
