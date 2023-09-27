export const GetUserByEmailQuery = `
  query GetUserByEmail($email: Email!) {
    user(by: { email: $email }) {
      id
      name
      email
      password
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
