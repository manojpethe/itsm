export interface AuthUser {
  ID: number;
  username: string;
  name: string;
}

export interface Project {
    ID: string | number;
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
  ID: string | number;
  name: string;
  projectid: number;
};

export interface QueueUserMap {
  ID: number;
  userid: number;
  queueid: number;
}