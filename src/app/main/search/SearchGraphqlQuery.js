import gql from 'graphql-tag';

export const SEARCH_QUERY = gql`
query getThingsTodos($lat_lt: Float!,$lat_gte: Float!,$lng_lt: Float!,$lng_gte: Float!) { 
things_to_dos(query:{lat_lt: $lat_lt,lat_gte: $lat_gte,lng_lt: $lng_lt,lng_gte: $lng_gte},limit: 5000,sortBy: PLACE_NAME_ASC) {
	place_name
    state
    city
    address
    city_desc
    city_list_thing_to_do
    city_pics
    city_web_url
    city_when_to_visit
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

