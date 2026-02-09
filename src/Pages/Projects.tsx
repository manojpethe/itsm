import { useState, useEffect } from "react";
import Http from '../common/httpUtils';
import captain from "../assets/images/Captain_America_Salute.jpg";

type Project = {
    id: number;
    title: string;
    info: string;
};

const Projects = () => {
    const [projectData, setProjectData] = useState<Project[]>([]);
    const [newProjectName, setNewProjectName] = useState("");
    const [newProjectInfo, setNewProjectInfo] = useState("");

    useEffect(() => {
        getProjects();
    }, [])

    const getProjects = async () => {
        const URL = 'http://localhost:3000/projects';
        const http = new Http;
        let projectsData:{data: any; errorMessage: any } = await http.get(URL);
        setProjectData(projectsData.data);
    }

    const createNewProject = async () => {
        const URL = 'http://localhost:3000/projects';
        const http = new Http;
        const result = await http.post(URL, { id: (projectData.length + 1) ,  title:newProjectName, info: newProjectInfo });
        console.log("create proejct response--->",result.data.status);
        setNewProjectName("");
        setNewProjectInfo("");
        const modal = document.getElementById('newProjectModal');
        if (modal !== null) {
            // eslint-disable-next-line
            modal.close();
        }
        setTimeout(getProjects,500);
    }

    const openModal = () => {
        const modal = document.getElementById('newProjectModal');
        if (modal !== null) {
            // eslint-disable-next-line
            modal.showModal();
        }
    }

    const renderProjectRows = () => {
        const rows = projectData.map(row => (
            (<tr key={row.id}>
                <th>{row.id}</th>
                <td>{row.title}</td>
                <td>{row.info}</td>
            </tr>)
        ))
        return rows;
    }

    return (
        <>
            <div className="m-10">
                <div className="flex">
                    <div className="m-auto">
                        <button className="btn btn-ghost" onClick={openModal}>Create New Project</button>

                        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
                            <table className="table w-2xl">
                                {/* head */}
                                <thead>
                                    <tr className="bg-base-100">
                                        <th></th>
                                        <th>Name</th>
                                        <th>Info</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {renderProjectRows()}
                                </tbody>
                            </table>
                        </div></div>
                </div>
            </div>

            <dialog id="newProjectModal" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Create New Project</h3>
                    <input type="text" placeholder="name of your project" className="input" onChange={e => setNewProjectName(e.target.value)} value={newProjectName} />
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Information</legend>
                        <textarea className="textarea h-24" placeholder="Info" onChange={e => setNewProjectInfo(e.target.value)} value={newProjectInfo} />
                        <img src={captain} style={{ width: "50%" }} />
                    </fieldset>
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn" onClick={createNewProject}>Let's Go!</button>
                        </form>
                    </div>
                </div>
            </dialog>

        </>

    )
}

export default Projects


