export namespace Authenticate {
  export type IAuthToken = {
    id: string;
    username: string;
  };
  export type IAuthenticatedUser = {
    user: IAuthToken;
  };
}
