const Projects = () => {
    return (
        <div className="m-10">
            <div className="flex">
                <div className="m-auto">
                <button className="btn btn-ghost">Create New Project</button>

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
                                <tr>
                                    <th>1</th>
                                    <td>6the Sense</td>
                                    <td>Inactive</td>
                                    <td>Blue</td>
                                </tr>
                                {/* row 2 */}
                                <tr>
                                    <th>2</th>
                                    <td>SILTS</td>
                                    <td>Active</td>
                                    <td>Purple</td>
                                </tr>
                            </tbody>
                        </table>
                    </div></div>
            </div>
        </div>

    )
}

export default Projects