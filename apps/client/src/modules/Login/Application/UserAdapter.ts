import { EndpointUser, User } from '../../common/Domain/User';

export const UserAdapter = (endpointUser: EndpointUser): User =>{
    const user: User = {
      email: endpointUser.email,
      name: endpointUser.name,
      picture: endpointUser.picture,
      jwt: ''
    };
    return user;
  };