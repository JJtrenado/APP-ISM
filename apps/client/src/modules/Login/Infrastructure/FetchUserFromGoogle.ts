import { EndpointUser } from "../../common/Domain/User";

  /**
  * This code fetches user information from the Google API using an access token.
  *
  * @param {string} token The access token required for authentication.
  * @return {Promise<EndpointUser>} The user information obtained from Google.
  */
  export const fetchUserFromGoogle = async (token: string): Promise<EndpointUser> => {
    if (!token) return;
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
        );
        
      const endpointUser:EndpointUser = await response.json();
      return endpointUser;
    } catch (error) {
      console.error("Error fetching user info from Google:", error);
    }
  };
