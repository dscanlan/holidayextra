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

interface user {
  id: string;
  givenName: string;
  familyName: string;
  email: string;
  created: Date;
}

export interface userResponse {
  user?: user;
  users?: user[];
  success?: boolean;
  error?: string;
}
