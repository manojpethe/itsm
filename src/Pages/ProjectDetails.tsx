import { useEffect } from "react"
import { useParams } from "react-router-dom";

const ProjectDetails = () => {
    const {id: id}  = useParams();

    useEffect(()=>{
        console.info(id);
    })

  return (
    <div>ProjectDetails {id}</div>
  )
}

export default ProjectDetails