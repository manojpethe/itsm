import Incident from "../Components/Ticket/Incident";
import Change from "../Components/Ticket/Change";
import Problem from "../Components/Ticket/Problem";
import Bug from "../Components/Ticket/Bug";

const Main = () => {
    return (
        <>
            {/* <div className="m-10">
                <div className="flex">
                    <div className="max-w-[50%] m-auto">
                        <div className="h-10">
                            <div className="float-start font-bold border-b-emerald-500 border-b-1">Your Tickets</div>
                        </div>
                        <div>
                        </div>
                        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
                            <table className="table w-2xl">
                                <thead>
                                    <tr className="bg-base-100">
                                        <th>#</th>
                                        <th>Description</th>
                                        <th>Queue Name</th>
                                        <th>Assigned To</th>
                                        <th>Status</th>
                                        <th>Created Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                        </div>

                    </div>

                </div>

            </div> */}
            <div className="flex mt-10">
                
                <div className="m-auto max-w-[40%]">
                    <div className="h-10 mt-5">
                        <div className="float-start font-bold border-b-emerald-500 border-b">Create New Ticket</div>
                    </div>
                    <div className="tabs-lift tabs max-w-full max-h-full">
                        <input type="radio" name="new_ticket_tab" className="tab z-1 w-32 font-bold border-b-gray-500" aria-label="Incidnet" defaultChecked />
                        <div className="sticky start-0 tab-content border-base-300 border bg-base-100 p-6"><Incident /></div>
                        <input type="radio" name="new_ticket_tab" className="tab z-1 w-32 font-bold border-b-gray-500" aria-label="Change" />
                        <div className="sticky start-0 tab-content border-base-300 bg-base-100 p-6"><Change /></div>
                        <input type="radio" name="new_ticket_tab" className="tab z-1 w-32 font-bold border-b-gray-500" aria-label="Problem" />
                        <div className="sticky start-0 tab-content border-base-300 bg-base-100 p-6"><Problem /></div>
                        <input type="radio" name="new_ticket_tab" className="tab z-1 w-32 font-bold border-b-gray-500" aria-label="Bug" />
                        <div className="sticky start-0 tab-content border-base-300 bg-base-100 p-6"><Bug /></div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Main