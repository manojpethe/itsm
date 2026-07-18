import Http from '../common/httpUtils';
import { Formik, Form, ErrorMessage } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";
import { SERVER, AUTH_USERS_ENDPOINT } from '../common/serverUrl';
import { AuthContext } from '../state/AuthContext';
import { useContext } from 'react';
import loginImg  from '../assets/images/login.png';

type Credential = {
    username: string;
    password: string;
}

const LoginSchema = Yup.object().shape({
    username: Yup.string()
        .min(4, 'Too Short!')
        .max(100, 'Too Long!')
        .required('Required'),
    password: Yup.string()
        .min(7, 'Too Short!')
        .max(20, 'Too Long!')
        .required('Required'),
});

const Login = () => {
    const navigate = useNavigate();
    const [message, setMessage] = useState("");
    const authContext = useContext(AuthContext);


    const loginUrl = SERVER + AUTH_USERS_ENDPOINT;

    const login = async (credential: Credential):Promise<boolean> => {
        // const param = `?username=${credential.username}&password=${credential.password}`;
        const http = new Http;
        const result = await http.post(loginUrl,credential);
        console.log(result.status, result.statusText);
        const data = result.json();
        if (result.status === 200) {
            authContext.name = data?.name;
            authContext.username = data?.email;
            authContext.ID = data?.ID;
            return true
        } else {
            return false;
        }
    }

    return (
        <div className="flex h-screen ">
            <div className="m-auto">
                <div>
                <img src={loginImg} className='rounded-full' style={{ width: "300px" }} />
                </div>
                <Formik
                    initialValues={{
                        username: '',
                        password: '',
                    }}
                    validationSchema={LoginSchema}
                    onSubmit={async (values) => {
                        const result:boolean = await login({ username: values.username, password: values.password });
                        if (result === true) {
                            console.log('login scuucessful....');
                            navigate("/home/main");
                        } else {
                            setMessage("Incorrect username/password.");
                        }
                    }}
                >
                    {({ errors, touched, values, handleChange, handleBlur }) => (
                        <Form>
                            <fieldset className="fieldset">
                                <input
                                    type="text"
                                    placeholder="username"
                                    name="username"
                                    className="input"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.username}
                                />
                                <p className="label">{errors.username && touched.username ? (<>{errors.username}</>) : null}</p>
                            </fieldset>
                            <fieldset className="fieldset">
                                <input
                                    type="password"
                                    className="input"
                                    placeholder="password"
                                    name="password"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.password}
                                />
                                <p className="label">{errors.password && touched.password ? (<>{errors.password}</>) : null}</p>
                            </fieldset>
                            <fieldset>
                                <button type="submit" className="btn btn-primary w-full">Login</button>
                            </fieldset>
                        </Form>
                    )}
                </Formik>
                <div className="label bg-error-content m-1 b-1">{message}</div>
            </div>
        </div>
    )
}

export default Login