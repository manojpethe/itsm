import { createContext } from "react";
import type { AuthUser } from "../common/typesStore";


export const initialUserState:AuthUser = {username:"",id:0}

export const AuthContext = createContext<AuthUser>(initialUserState);