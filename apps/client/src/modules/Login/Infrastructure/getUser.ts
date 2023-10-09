import { AuthSessionResult } from "expo-auth-session";
import { EndpointUser, User } from "../../common/Domain/User";
import { fetchUserFromGoogle } from "./FetchUserFromGoogle";
import { getLocalUser, saveLocalUser } from "../../common/Infrastructure/LocalStorageUser";
import { UserAdapter } from "../Application/UserAdapter";
import { getJwtFromBackend } from "./getJwt";

async function addJwt(user: User, token: string) :Promise<User> {
  const jwt: string = await getJwtFromBackend(token);
  if(!jwt) throw new Error("Error validating user from backend");
  user.jwt = jwt;
  return user;
}

export async function getUserFromGoogle(response: AuthSessionResult) :Promise<User> {
  if(response?.type === "success") {
    const endpointUser: EndpointUser = await fetchUserFromGoogle(response.authentication.accessToken);
    let user = UserAdapter(endpointUser);

    user = await addJwt(user, response.authentication.accessToken);
    return user;
  }
  throw new Error("User not logged in");
}
