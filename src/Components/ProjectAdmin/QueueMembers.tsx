import type { Queue, User, QueueUserMap } from "../../common/typesStore";
// import { useToast } from "../../state/ToastContext";
import Http from "../../common/httpUtils";
import { USERS_ENDPOINT, SERVER, QUEUE_USER_MAP_ENDPOINT } from "../../common/serverUrl";
import { useState, useEffect } from "react";
// import { getUsers } from "../../common/sharedFunctions";
import Members from "./Members";

const QueueMembers = (data: any) => {
    const queue: Queue = data.queue;
    const http = new Http;

    const [users, setUsers] = useState<User[]>([]);
    const [selectedUsername, setSelectedUsername] = useState<string>("");
    
    
    useEffect(()=>{
        initUsers();
    }, [])

    const initUsers =async ()=>{
        const result = await http.get(SERVER + USERS_ENDPOINT)
        setUsers(result.data);
    }

    const renderUserList =()=>{
        return users.map((user)=>(
        <option key={user.ID} id={user.ID}>
            {user.name}
        </option>))
    }

    const addUserToQueue=async (username:string)=>{
        const userId = getUserId(username);
        if (userId === undefined){
            console.error("Select correct user");
            return;
        }
        let qum:QueueUserMap = {ID: 0, queueid:data?.queue?.ID, userid: parseInt(userId) };
        const URL = SERVER + QUEUE_USER_MAP_ENDPOINT;
        const response = await http.post(URL, qum);
        if(response.status === "201"){
            console.log("All good!")
        } else {
            console.log(response.status);
        }
    }

    const getUserId = (username:string):string=>{
        const user:any  = users.find((user => user.name === username ));
        return user.ID;
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
                <button onClick={() => { addUserToQueue(selectedUsername) }} className="btn btn-block btn-xs border-orange-300 w-1/4 h-7">+ ADD</button>
            </div>
            <div>
                <Members queueid={data?.queue?.ID} />
            </div>
        </div>
    )
}

export default QueueMembers