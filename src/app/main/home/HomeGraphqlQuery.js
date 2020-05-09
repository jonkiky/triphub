import gql from 'graphql-tag';
export const HOME_QUERY = gql`

query {
  citys(limit:6) {
    _id
		city
		city_ascii
		county_fips
		county_fips_all
		county_name
		county_name_all
		density
		id
		incorporated
		lat
		lng
		military
		population
		ranking
		source
		state_id
		state_name
		timezone
		zips
  }
}`;

export const HOME_QUERY_CITIES_IN_STATE = gql`
query getCities($stateId: String!) { 
citys(query:{state_id: $stateId},limit:6) {
    _id
		city
		city_ascii
		county_fips
		county_fips_all
		county_name
		county_name_all
		density
		id
		incorporated
		lat
		lng
		military
		population
		ranking
		source
		state_id
		state_name
		timezone
		zips
  }
}
	`;
