import { createContext } from "react";
import type { Project, User } from "../common/typesStore"

type customState = {
  projects: Project[],
  users: User[],
}

export const initialGlobalState:customState = {projects:[],users:[]};

export const StateContext = createContext<customState>({projects:[],users:[]});