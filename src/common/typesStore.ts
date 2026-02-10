export interface AuthUser {
  id: number;
  username: string;
}

export interface Project {
    id: number;
    title: string;
    info: string;
};

export interface User {
  id: number;
  username: string;
  email: string;
  usertype: number;
  active: boolean;
}