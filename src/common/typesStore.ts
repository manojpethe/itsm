export interface AuthUser {
  ID: number;
  username: string;
  name: string;
}

export interface Project {
    id: number;
    title: string;
    info: string;
};

export interface User {
  ID: string | number;
  username: string;
  name: string;
  email: string;
  superuser: boolean;
  active: boolean;
}

export interface Queue {
  id: string;
  name: string;
  projectid: string;
};

export interface QueueUserMap {
  id: string;
  userid: string;
  queueid: string;
}