import { createContext } from "react";
import type { AuthUser } from "../common/typesStore";


export const initialUserState:AuthUser = {username:"",ID:0,name:""}

export const AuthContext = createContext<AuthUser>(initialUserState);