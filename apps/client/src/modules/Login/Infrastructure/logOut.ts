import { reloadApp } from "../../common/Application/ReloadApp";
import { removeLocalUser } from "../../common/Infrastructure/LocalStorageUser";

export const logOut = () => {
  removeLocalUser();
  reloadApp();
}