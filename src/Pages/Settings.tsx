import Http from '../common/httpUtils';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { SERVER, USERS_ENDPOINT } from "../common/serverUrl";
import type { User } from "../common/typesStore";
import { useEffect, useState } from 'react';

const NewUserSchema = Yup.object().shape({
  id: Yup.number(),
  username: Yup.string()
    .min(4, 'Too Short!')
    .max(12, 'Too Long!')
    .required('Required'),
  name: Yup.string()
    .min(4, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string()
    .email(),
  active: Yup.boolean(),
  superuser: Yup.boolean(),
});

const newUserModel: User = {
  id: "0",
  username: "",
  name: "",
  email: "",
  active: true,
  superuser: false
}

const Settings = () => {
  const [userData, setUserData] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User>();
  const [displayEditUser, setDisplayEditUser] = useState<boolean>();

  useEffect(() => {
    getUsers();
  }, [])


  const getUsers = async () => {
    const URL = SERVER + USERS_ENDPOINT;
    const http = new Http;
    let userData: { data: any; errorMessage: any } = await http.get(URL);
    setUserData(userData.data);
  }

  const editUser = (id: string) => {
    const userToEdit = userData.find(row => id === row.id);
    setSelectedUser(userToEdit);
  }

  const saveUser = async (selectedUser: User): Promise<boolean> => {
    const http = new Http;
    let URL = "";
    let result:any;
    if (selectedUser.id === "0"){
      selectedUser.id = (userData.length + 1).toString();
      URL = SERVER + USERS_ENDPOINT;
      selectedUser.password = "password";
      result = await http.post(URL, selectedUser);
    } else {
      URL = SERVER + USERS_ENDPOINT + "/" + selectedUser.id.toString();
      result = await http.patch(URL, selectedUser);
    }
    if (result?.data?.status === 201 || result?.data?.status === 200) {
      setTimeout(getUsers, 500);
      return true;
    } else {
      return false;
    }
  }

  const renderUserRows = () => {
    const rows = userData.map(row => (
      (<tr key={row.id}>
        <th>{row.id}</th>
        <td><div className='btn-link cursor-pointer' onClick={() => { editUser(row.id); setDisplayEditUser(true) }}>{row.username}</div></td>
        <td>{row.name}</td>
        <td>{row.email}</td>
        <td>{row.active ? "Yes" : "No"}</td>
        <td>{row.superuser ? "Yes" : "No"}</td>
      </tr>)
    ))
    return rows;
  }

  const editUserComponent = (
    <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
      <Formik
        initialValues={{
          id: selectedUser?.id,
          username: selectedUser?.username,
          name: selectedUser?.name,
          email: selectedUser?.email,
          superuser: selectedUser?.superuser,
          active: selectedUser?.active,
        }}
        validationSchema={NewUserSchema}
        onSubmit={async (values) => {
          console.log(values);

          const result = await saveUser(values);
          if (result === true) {
              setDisplayEditUser(false);
              setSelectedUser(newUserModel);
          } else {
              console.error("Service Unavailable");
          }
        }}
      >
        {({ errors, touched, values, handleChange, handleBlur }) => (
          <Form>
            <table className="table w-2xl">
              <tbody>
                <tr className="bg-base-100">
                  <td className='w-10'>#</td>
                  <td className='w-30'>
                    <input
                      type="text"
                      placeholder="username"
                      name="username"
                      className="input"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.username}
                    />
                  </td>
                  <td className='w-30'>
                    <input
                      type="text"
                      placeholder="Name"
                      name="name"
                      className="input"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.name}
                    />
                  </td>
                  <td className='w-30'>
                    <input
                      type="text"
                      placeholder="Email"
                      name="email"
                      className="input"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                    />
                  </td>
                  <td className='w-10'>Active</td>
                  <td className='w-10'>Superuser</td>
                </tr>
              </tbody>
            </table>
            <div className="w-150 mx-auto p-2 shadow-md rounded-lg">
              <div className="flex justify-end space-x-4">
                <button type="submit" className="btn bg-emerald-500 hover:bg-emerald-900">Submit</button>
                <button onClick={() => { setDisplayEditUser(false) }} className="btn bg-gray-200 text-black hover:bg-gray-500">Cancel</button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );

  return (
    <>
      <div className="m-10">
        <div className="flex">
          <div className="m-auto">
            <div className="h-10">
              <div className="float-start font-bold border-b-emerald-500 border-b-1">User Management</div>
              <div className="float-end"> <button className="btn btn-ghost btn-circle bg-blue-400" onClick={() => { setDisplayEditUser(true); setSelectedUser(newUserModel) }}>New</button></div>
            </div>
            <div>
              {displayEditUser ? editUserComponent : ""}
            </div>
            <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
              <table className="table w-2xl">
                {/* head */}
                <thead>
                  <tr className="bg-base-100">
                    <th>#</th>
                    <th>Username</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Active</th>
                    <th>Superuser</th>
                  </tr>
                </thead>
                <tbody>
                  {renderUserRows()}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Settings