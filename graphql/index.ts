export const GetUserByEmailQuery = `
  query GetUserByEmail($email: Email!) {
    user(by: { email: $email }) {
      id
      name
      email
      password
      servers(first: 100) {
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
  query GetUserByEmail($name: String!) {
    user(by: { name: $name }) {
      id
      name
      email
      password
      servers(first: 100) {
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
                name
                email
                password
                id
              }
		}
	}
`;
export const createServerMutation = `
	mutation CreateServer($input: ServerCreateInput!) {
		serverCreate(input: $input) {
      server {
        id
        name
        users(first: 10) {
          edges {
            node {
              id
              name
              email
            }
          }
        }
        createdBy {
          id
          name
          email
        }
      }
		}
	}
`;
export const GetServerByIdQuery = `
  query GetServerByNameQuery($id: ID!) {
    server(by: {id: $id }) {
      name
      id
      createdBy {
        name
        email
        id
      }
      users(first: 100) {
        edges {
          node {
            name
            email
            id
          }
        }
      }
    }
  }
`;
