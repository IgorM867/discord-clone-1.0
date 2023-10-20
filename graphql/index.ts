export const GetUserByEmailQuery = `
  query GetUserByEmail($email: Email!) {
    user(by: { email: $email }) {
      id
      name
      email
      password
      servers(first: 10) {
        edges {
          node {
            id
            name
          }
        }
      }
    }
  }
`;
export const GetUserByNameQuery = `
  query GetUserByName($name: String!) {
    user(by: { name: $name }) {
      id
      name
      email
      password
      servers(first: 10) {
        edges {
          node {
            id
            name
          }
        }
      }
    }
  }
`;
export const createUserMutation = `
	mutation CreateUser($input: UserCreateInput!) {
		userCreate(input: $input) {
            user {
                id
                name
                email
              }
		}
	}
`;
export const createServerMutation = `
  mutation ServerCreate($input: ServerCreateInput!) {
    serverCreate(input: $input) {
      server {
        id
        name
      }
    }
  }
`;
export const GetServerByIdQuery = `
query GetServerById($id: ID!) {
  server(by: { id: $id }) {
    id
    name
    users(first:100){
      edges {
        node {
          role
          user {
            id
          }
        }
      }
    }
  }
}
`;
export const DeleteServerMutation = `
  mutation serverDelete($id:ID!){
    serverDelete(by: {id: $id}){
      deletedId
    }
  }
`;
