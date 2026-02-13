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
  id: string;
  username: string;
  name: string;
  email: string;
  superuser: boolean;
  active: boolean;
}

export interface Queues {
  id: string;
  name: string;
  projectid: string;
};