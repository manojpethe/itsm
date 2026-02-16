import type { Queue } from "../../common/typesStore";
import { useToast } from "../../state/ToastContext";
import Http from "../../common/httpUtils";
import { SERVER, QUEUES_ENDPOINT } from "../../common/serverUrl";

const QueueMembers = (data: any) => {
    const queue: Queue = data.queue;

    return (
        <div className="border-solid border rounded-md border-gray-700 p-4 m-2">
            <div>{queue.name}</div>
            <div className="flex mb-1 justify-center align-middle">
                <div className="text-xs w-1/4 justify-center mt-2">Add member</div>
                <input onChange={() => { }} className="text-xs w-1/2 m-1" type="text" placeholder="name of member" />
                <button onClick={() => { }} className="btn btn-block btn-xs border-orange-300 w-1/4 h-7">+ ADD</button>
            </div>
        </div>
    )
}

export default QueueMembers