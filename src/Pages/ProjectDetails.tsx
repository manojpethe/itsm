import { useEffect } from "react"
import { useParams } from "react-router-dom";
import SupportQueueSetup from '../Components/ProjectAdmin/SupportQueueSetup'

const ProjectDetails = () => {
    const {id}  = useParams<string>();

    useEffect(()=>{
        // console.info(id);
    })

  return (
    <div>
        <header className="ml-8 mr-8 mb-8 mt-8">
        <div className="border-b-emerald-500 border-b">Project Setup {id}</div>
    </header>
    <div className="grid sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-4  gap-10 m-8">
        <div className="border-solid border rounded-md border-emerald-500 p-4">Project Statistics</div>
        <SupportQueueSetup id={id} />
        <div className="border-solid border rounded-md border-emerald-500 p-4">Enabled Modules</div>
    </div>
    </div>
  )
}

export default ProjectDetails