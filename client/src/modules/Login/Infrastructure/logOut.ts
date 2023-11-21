import { removeLocalUser } from "../../common/Infrastructure/LocalStorageUser";


export const logOut = () => {
  removeLocalUser();
}