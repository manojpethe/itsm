import { useState, useEffect } from "react";
import Http from '../common/httpUtils';
import captain from "../assets/images/Captain_America_Salute.jpg";

type Project = {
    id: string;
    title: string;
    color: string;
};

const Projects = () => {
    const [projectData, setProjectData] = useState<Project[]>([]);

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
        const result = await http.post(URL, {title:"name of the project", color:"green" });
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
                <td>active</td>
                <td>{row.color}</td>
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
                                        <th>Status</th>
                                        <th>Color</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* row 1 */}

                                    {/* <tr>
                                        <th>1</th>
                                        <td>6the Sense</td>
                                        <td>Inactive</td>
                                        <td>Blue</td>
                                    </tr> */}
                                    {/* row 2 */}
                                    {renderProjectRows()}
                                </tbody>
                            </table>
                        </div></div>
                </div>
            </div>

            <dialog id="newProjectModal" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Create New Project</h3>
                    <input type="text" placeholder="name of your project" className="input" />
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Information</legend>
                        <textarea className="textarea h-24" placeholder="Info"></textarea>
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


