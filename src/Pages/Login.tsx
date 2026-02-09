import Http from '../common/httpUtils';
import { Formik, Form } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";
import { SERVER, USERS_ENDPOINT } from '../common/serverUrl';

type Credential = {
    username: string;
    password: string;
}

 const LoginSchema = Yup.object().shape({
   username: Yup.string()
     .min(4, 'Too Short!')
     .max(10, 'Too Long!')
     .required('Required'),
   password: Yup.string()
     .min(7, 'Too Short!')
     .max(20, 'Too Long!')
     .required('Required'),
 });

const Login = () => {
    const navigate = useNavigate();
    const [message, setMessage] = useState("");

    const loginUrl = SERVER + USERS_ENDPOINT;

    const login = async(credential: Credential)=>{
        const param = `?username=${credential.username}&password=${credential.password}`;
        const http = new Http;
        console.log(loginUrl+param);
        const result = await http.get(loginUrl+param);
        if(result.data[0]?.username !== undefined){
            return true
        } else {
            return false;
        }
    }

  return (
    <div className="flex h-screen ">
  <div className="m-auto">
        <Formik
                initialValues={{
                    username: '',
                    password: '',
                }}
                validationSchema={LoginSchema}
                onSubmit={async (values) => {
                    const result = await login({ username: values.username, password: values.password});
                    if(result === true){
                        console.log('redirecting....');
                        setMessage("");
                        navigate("/home/projects");
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