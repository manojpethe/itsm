const Incident = () => {
    return (
        <div className="w-full">
            <div className="bg-base-100 flex">
                <div className="w-1/2">

                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Application / Component</legend>
                        <select defaultValue="Pick a browser" className="select">
                            <option disabled={true}>choose Application</option>
                            <option>Application A</option>
                            <option>Application B</option>
                            <option>Application C</option>
                        </select>
                        <span className="label">Mandatory</span>
                    </fieldset>

                </div>
                <div className="w-1/2">
                    Chose the Application or component which has degraded service or unavailable or even inaccessible
                </div>
            </div>
            <div className="bg-base-100 flex">
                <div className="w-1/2">
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Nature of incident</legend>
                        <select defaultValue="Pick a browser" className="select">
                            <option disabled={true}>choose nature of incident</option>
                            <option>Inaccessible</option>
                            <option>Intermittent</option>
                            <option>Lost Access/Password</option>
                            <option>Inquiry</option>
                        </select>
                        <span className="label">Mandatory</span>
                    </fieldset>
                </div>
                <div className="w-1/2">
                    Chose nature of the incident based on best of your knowledge
                </div>
            </div>
            <div className="bg-base-100 flex">
                <div className="w-1/2">
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Short Description</legend>
                        <input type="text" placeholder="shortly describe the problem max 100 chars" className="input" />
                        <span className="label">Mandatory</span>
                    </fieldset>
                </div>
                <div className="w-1/2">
                    Describe incident in few words
                </div>
            </div>
            <div className="bg-base-100 flex">
                <div className="w-1/2">
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Full description</legend>
                        <textarea className="textarea" placeholder="describe the incident"></textarea>
                        <span className="label">Optional</span>
                    </fieldset>
                </div>
                <div className="w-1/2">
                    Describe incident with steps to reproduce the incident or attache screenshots also with details relevant as you may think
                </div>
            </div>
            <div className="flex justify-around">
                <button className="btn w-[30%] m-5 btn-outline">Okay</button><button className="btn w-[30%] m-5 btn-outline">Cancel</button>
            </div>
        </div>
    )
}

export default Incident