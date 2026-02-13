import { useEffect, useState } from "react"
import Http from "../../common/httpUtils";
import { SERVER, QUEUES_ENDPOINT } from "../../common/serverUrl";
import type { Queues } from "../../common/typesStore";
import { randomInt } from "../../common/sharedFunctions";
import { useToast } from "../../state/ToastContext";

const SupportQueueSetup = (data:any) => {
    const [projectId, setProjectId] = useState(data?.id);
    const [queuesData, setQueuesData] = useState<Queues[]>([]);
    const [newQname, setNewQname] = useState("");
    const http = new Http;
    const { showToast } = useToast();


    useEffect(() => {
        getQueues(projectId);
    }, [projectId])

    const getQueues = async(id:string)=>{
        const endPoint = SERVER + QUEUES_ENDPOINT+ "?projectid=" + projectId;
        const queuesData = await http.get(endPoint);
        setQueuesData(queuesData.data);
    }

    const saveQueue = async (newQname:string) => {
        if(newQname !== null && newQname.trim().length < 8 ){
            showToast("Type the queue name... min length 8 chars", 'info', 3);
            console.error();
            return;
        }
        const endPoint = SERVER + QUEUES_ENDPOINT;
        const data:Queues = { name: newQname, projectid: projectId, id: "" };
        data.id = randomInt().toString();
        const result = await http.post(endPoint, data);
        console.log(result?.data);
        if(result.data?.status === 201){
            setNewQname("");
            getQueues(projectId);
        }
    }
    

  return (
    <div className="border-solid border rounded-md border-emerald-500">
        <div className="bg-gray-800 border-solid rounded-md border-gray-600 cursor-pointer m-2">Support Queue Setup</div>
        <div className="flex m-2 justify-center align-middle">
            <div className="text-xs w-1/4">Add New Queue</div>
            <input onChange={(e)=> setNewQname(e.target.value)} value={newQname} className="w-1/2 m-1" type="text" placeholder="name of queue"/>
            <button onClick={()=>{saveQueue(newQname)}} className="btn btn-block text-xs btn-xs btn-accent w-1/4 h-7">OK</button>
        </div>
        <div>
            {queuesData.map((item)=>(<div className="cursor-pointer" key={item.id}>{item.name}</div>))}
        </div>
    </div>  
  )
}

export default SupportQueueSetup