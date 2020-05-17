import gql from 'graphql-tag';
export const HOME_QUERY = gql`

query {
  cities(limit:6) {
    _id
		city

  }
}`;

export const HOME_QUERY_CITIES_IN_STATE = gql`
query getCities($stateId: String!) { 
cities(query:{state_id: $stateId},limit:6) {
    _id
		city

  }
}
	`;
