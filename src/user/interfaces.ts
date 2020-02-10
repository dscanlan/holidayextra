export interface newUserRequest {
  email: String;
  givenName: String;
  familyName: string;
}

export interface updateUserRequest {
  id: string;
  email: String;
  givenName: String;
  familyName: string;
}

export interface findUserRequest {
  id: string;
}

export interface userResponse {
  user?: object;
  success?: boolean;
  error?: string;
}
