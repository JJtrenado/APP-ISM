export interface IExternalUserService {
  getUserInfo(token: string): Promise<any>;
}
