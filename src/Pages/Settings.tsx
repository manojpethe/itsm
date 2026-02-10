import { StateContext } from "../state/StateContext"
import { useContext } from "react";

const Settings = () => {
  const projects = useContext(StateContext).projects;
  projects.push({id:1,title:"title",info:"Info"})
    
  
  return (
    <div>
    <div>Settings page</div>
    <pre>{JSON.stringify(projects,null, 2)}</pre>
    </div>
  )
}

export default Settings