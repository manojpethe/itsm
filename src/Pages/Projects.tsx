import { useState, useEffect } from "react";
import Http from '../common/httpUtils';
import captain from "../assets/images/Captain_America_Salute.jpg";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

type Project = {
    id: number;
    title: string;
    info: string;
};

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

    const createNewProject = async (newProject:Project) => {
        const URL = 'http://localhost:3000/projects';
        const http = new Http;
        newProject.id = projectData.length + 1;
        const result = await http.post(URL, newProject);
        console.log("create proejct response--->",result.data.status);
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
                    <Formik
                        initialValues={{
                            title: '',
                            info: '',
                        }}
                        validationSchema={NewProjectSchema}
                        onSubmit={values => {
                            console.log(values);
                            createNewProject({title: values.title, info: values.info});
                        }}
                    >
                    {({ errors, touched, values, handleChange, handleBlur }) => (
                    <Form>
                    <Field 
                        name="title" 
                        className="input" 
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.title}
                    />
                    {errors.title && touched.title ? (
                        <div>{errors.title}</div>
                    ) : null}
                    <Field 
                        name="info"
                        className="input"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.info}
                    />
                    {errors.info && touched.info ? (
                        <div>{errors.info}</div>
                    ) : null}
                    <br/>
                    <button type="submit" className="btn">Let's Go!</button>
                    </Form>
                    )}

                    {/* <input type="text" placeholder="name of your project" className="input" onChange={e => setNewProjectName(e.target.value)} value={newProjectName} />
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Information</legend>
                        <textarea className="textarea h-24" placeholder="Info" onChange={e => setNewProjectInfo(e.target.value)} value={newProjectInfo} />
                        <img src={captain} style={{ width: "50%" }} />
                    </fieldset> */}
                    </Formik>
                    {/* <div className="modal-action">
                        <form method="dialog">
                            <button className="btn" onClick={createNewProject}>Let's Go!</button>
                        </form>
                    </div> */}
                </div>
            </dialog>

        </>

    )
}

export default Projects


