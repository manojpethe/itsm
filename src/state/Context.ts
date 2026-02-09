import { createContext } from "react";

type User = {
  id: number;
  username: string;
}

export const Context = createContext<User>({username:"",id:0});