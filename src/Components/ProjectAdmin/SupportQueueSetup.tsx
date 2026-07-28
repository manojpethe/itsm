import { useEffect, useState } from "react"
import Http from "../../common/httpUtils";
import { SERVER, QUEUES_ENDPOINT } from "../../common/serverUrl";
import type { Queue } from "../../common/typesStore";
// import { randomInt } from "../../common/sharedFunctions";
import { useToast } from "../../state/ToastContext";
import QueueMembers from "./QueueMembers";

const SupportQueueSetup = (data:any) => {
    const [projectId] = useState(data?.id);
    // const [projectId, setProjectId] = useState(data?.ID);
    const [queuesData, setQueuesData] = useState<Queue[]>([]);
    const [newQname, setNewQname] = useState("");
    const http = new Http;
    const { showToast } = useToast();


    useEffect(() => {
        getQueues();
    }, [projectId])

    const getQueues = async()=>{
        console.log("getQueues triggered...");
        const endPoint = SERVER + QUEUES_ENDPOINT+ "?projectid=" + projectId;
        const queuesData = await http.get(endPoint);
        console.log(queuesData.data);
        setQueuesData(queuesData.data);
    }

    const saveQueue = async (newQname:string) => {
        if(newQname !== null && newQname.trim().length < 8 ){
            showToast("Type the queue name... min length 8 chars", 'info', 3);
            console.error();
            return;
        }
        const endPoint = SERVER + QUEUES_ENDPOINT;
        const data:Queue = { name: newQname, projectid: parseInt(projectId), ID: 0 };
        // data.ID = randomInt().toString();
        const result = await http.post(endPoint, data);
        if(result?.status === 201){
            setNewQname("");
            getQueues();
        } else {
            console.log("something went wrong");
        }
    }
    

  return (
    <div className="border-solid border rounded-md border-emerald-500 p-4">
        <div className="border-b-emerald-500 border-b mb-2 cursor-pointer ">Support Queue Setup</div>
        <div className="flex mb-2 justify-center align-middle">
            <div className="text-s w-1/4 justify-center ">Add Que</div>
            <input onChange={(e)=> setNewQname(e.target.value)} value={newQname} className="w-1/2 m-1" type="text" placeholder="name of queue"/>
            <button onClick={()=>{saveQueue(newQname)}} className="btn btn-block text-xs btn-xs btn-accent w-1/4 h-7">OK</button>
        </div>
        <div>
            {/* {queuesData.map((item)=>(<div className="cursor-pointer" key={item.ID}>{item.name}</div>))} */}
            {queuesData.map((item)=>(<QueueMembers key={item.ID} queue={item} getQueues={getQueues} />))}
        </div>
    </div>  
  )
}

export default SupportQueueSetup