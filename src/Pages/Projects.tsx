import { useState, useEffect } from "react";
import Http from '../common/httpUtils';
import captain from "../assets/images/Captain_America_Salute.jpg";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { SERVER, PROJECTS_ENDPOINT } from "../common/serverUrl";
import type { Project } from "../common/typesStore";
import { useProject } from '../state/ProjectContext';
import { useNavigate } from "react-router-dom";


const NewProjectSchema = Yup.object().shape({
    title: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    info: Yup.string()
        .min(10, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
});

const Projects = () => {
    const { projectId, setProjectId} = useProject();
    const [projectData, setProjectData] = useState<Project[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        getProjects();
    }, [])

    const getProjects = async () => {
        const URL = SERVER + PROJECTS_ENDPOINT;
        const http = new Http;
        let projectsData: { data: any; errorMessage: any } = await http.get(URL);
        setProjectData(projectsData.data);
    }

    const createNewProject = async (newProject: Project): Promise<boolean> => {
        const URL = SERVER + PROJECTS_ENDPOINT;
        const http = new Http;
        newProject.id = projectData.length + 1;
        const result = await http.post(URL, newProject);
        if (result?.data?.status === 201) {
            const modal = document.getElementById('newProjectModal');
            if (modal !== null) {
                // eslint-disable-next-line
                modal.close();
            }
            setTimeout(getProjects, 500);
            return true;
        } else {
            return false;
        }
    }

    const openModal = () => {
        const modal = document.getElementById('newProjectModal');
        if (modal !== null) {
            // eslint-disable-next-line
            modal.showModal();
        }
    }

    const selectProject =(id:string)=>{
        console.log(id);
        setProjectId(id.toString());
    }

    const renderProjectRows = () => {
        const rows = projectData.map(row => (
            (<tr key={row.id}>
                <th>{row.id}</th>
                <td><div 
                    className='btn-link cursor-pointer' 
                    onClick={() => { 
                        selectProject(row.id.toString()); 
                        navigate("/home/projects/"+row.id); 
                    }}>{row.title}</div></td>
                <td>{row.info}</td>
            </tr>)
        ))
        return rows;
    }

    return (
        <>
        <div>selected project id {projectId}</div>
            <div className="m-10">
                <div className="flex">

                    <div className="m-auto">
                        <div className="h-10">
                            <div className="float-start font-bold border-b-emerald-500 border-b-1">Projects</div>
                            <div className="float-end"> <button className="btn btn-ghost btn-circle bg-blue-400" onClick={openModal}>New</button></div>
                        </div>
                        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
                            <table className="table w-2xl">
                                {/* head */}
                                <thead>
                                    <tr className="bg-base-100">
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Info</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {renderProjectRows()}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <dialog id="newProjectModal" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Create New Project</h3>
                    <Formik
                        initialValues={{
                            title: '',
                            info: '',
                        }}
                        validationSchema={NewProjectSchema}
                        onSubmit={async (values) => {
                            const result = await createNewProject({ id: 0, title: values.title, info: values.info });
                            if (result === true) {
                                values.info = "";
                                values.title = "";
                            } else {
                                console.error("Service Unavailable");
                            }
                        }}
                    >
                        {({ errors, touched, values, handleChange, handleBlur }) => (
                            <Form>
                                <fieldset className="fieldset">
                                    <input
                                        type="text"
                                        placeholder="name of your project"
                                        name="title"
                                        className="input"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.title}
                                    />
                                    <p className="label">{errors.title && touched.title ? (<>{errors.title}</>) : null}</p>
                                </fieldset>
                                <fieldset className="fieldset">
                                    <textarea
                                        className="textarea h-24"
                                        placeholder="Info"
                                        name="info"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.info}
                                    />
                                    <p className="label">{errors.info && touched.info ? (<>{errors.info}</>) : null}</p>
                                </fieldset>
                                <br />
                                <img src={captain} style={{ width: "300px" }} />
                                <br />
                                <div className="modal-action">
                                    <button type="submit" className="btn  border-green-500">Let's Go!</button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </dialog>
        </>
    )
}

export default Projects


