import type { Queue, User, QueueUserMap } from "../../common/typesStore";
import { useToast } from "../../state/ToastContext";
import Http from "../../common/httpUtils";
import { SERVER, QUEUES_ENDPOINT, USERS_ENDPOINT, QUEUE_USER_MAP_ENDPOINT } from "../../common/serverUrl";
import { useState, useEffect } from "react";
import { getUsers, randomInt } from "../../common/sharedFunctions";
import Members from "./Members";

const QueueMembers = (data: any) => {
    const queue: Queue = data.queue;
    const http = new Http;

    const [users, setUsers] = useState<User[]>([]);
    // const [selectedUserId, setSelectedUserId] = useState<string>("");
    const [selectedUsername, setSelectedUsername] = useState<string>("");
    // const [queueUserMap, setQeueUserMap] = useState<QueueUserMap[]>([]);
    
    
    useEffect(()=>{
        initUsers();
    }, [])

    const initUsers =async ()=>{
        const result = await getUsers();
        setUsers(result.data);
    }

    const renderUserList =()=>{
        return users.map((user)=>(
        <option key={user.id} id={user.id}>
            {user.name}
        </option>))
    }

    const mapUser=async (username:string)=>{
        const userId = getUserId(username);
        if (userId === undefined){
            console.error("Select correct user");
            return;
        }
        let qum:QueueUserMap = {id: randomInt().toString(),queueid:queue.id, userid: userId };
        const URL = SERVER + QUEUE_USER_MAP_ENDPOINT;
        const response = await http.post(URL, qum);
        if(response.data.status === "201"){
            console.log("All good!")
        }
    }

    const getUserId = (username:string):string=>{
        const user:any  = users.find((user => user.name === username ));
        return user?.id;
    }

    return (
        <div className="border-solid border rounded-md border-gray-700 p-4 m-2">
            <div className="text-orange-300">{queue.name}</div>
            <div className="flex mb-1 justify-center align-middle">
                <div className="text-xs w-1/4 justify-center mt-2">Add member</div>
                {/* <input onChange={() => { }} className="text-xs w-1/2 m-1" type="text" placeholder="name of member" /> */}
                <input type="text" className="text-xs w-1/2 mt-1" placeholder="enter name" list="members" value={selectedUsername} onChange={(e)=>{setSelectedUsername(e.target.value)}} />
                <datalist id="members">
                {renderUserList()}
                </datalist>
                <button onClick={() => { mapUser(selectedUsername) }} className="btn btn-block btn-xs border-orange-300 w-1/4 h-7">+ ADD</button>
            </div>
            <div>
                <Members queue={queue} users={users} />
            </div>
        </div>
    )
}

export default QueueMembers