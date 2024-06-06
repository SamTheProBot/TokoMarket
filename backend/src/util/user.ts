export interface IloginUser {
  email: string;
  password: string;
}

export interface IsignupUser extends IloginUser {
  name: string;
}
