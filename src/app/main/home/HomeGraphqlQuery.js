import gql from 'graphql-tag';
export const HOME_QUERY_CITIES_IN_STATE = gql`
query getCities($stateId: String!) { 
cities(query:{state: $stateId},limit:6) {
		city
		pictures
		description
		state
  }
}
	`;
