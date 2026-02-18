const Change = () => {
    return (
        <div className="w-full h-1/2">
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
                        <legend className="fieldset-legend">Change Window - Start (DateTime)</legend>
                        <input type="datetime-local" className="input" />
                        <span className="label">Mandatory</span>
                    </fieldset>
                </div>
                <div className="w-1/2">
                    Change Window Start (local time)
                </div>
            </div>
            <div className="bg-base-100 flex">
                <div className="w-1/2">
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Change Window - End (DateTime)</legend>
                        <input type="datetime-local" className="input" />
                        <span className="label">Mandatory</span>
                    </fieldset>
                </div>
                <div className="w-1/2">
                    Change Window End (local time)
                </div>
            </div>
            <div className="bg-base-100 flex">
                <div className="w-1/2">
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Nature of Change</legend>
                        <select defaultValue="Pick a browser" className="select">
                            <option disabled={true}>choose nature of change</option>
                            <option>Infrastructure upgrade</option>
                            <option selected={true}>New Release</option>
                            <option>Emergency Fix</option>
                            <option>Migration</option>
                        </select>
                        <span className="label">Mandatory</span>
                    </fieldset>
                </div>
                <div className="w-1/2">
                    Chose nature of change, best suited
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
                    Describe the change in few words
                </div>
            </div>
            <div className="bg-base-100 flex">
                <div className="w-1/2">
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Full description</legend>
                        <textarea className="textarea" placeholder="describe the change"></textarea>
                        <span className="label">Mandatory</span>
                    </fieldset>
                </div>
                <div className="w-1/2">
                    Describe the change, mention steps to be taken during window
                </div>
            </div>
            <div className="bg-base-100 flex">
                <div className="w-1/2">
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Rollback procedure</legend>
                        <textarea className="textarea" placeholder="describe the rollback plan/procedure"></textarea>
                        <span className="label">Mandatory</span>
                    </fieldset>
                </div>
                <div className="w-1/2">
                    Explain the rollback plan if change fails to address the primary purpose. Mention the time required to rollack.
                </div>
            </div>
            <div className="flex justify-around">
                <button className="btn w-[30%] m-5 btn-outline hover:bg-green-700">Okay, create  Ticket</button>
                <button className="btn w-[30%] m-5 btn-outline hover:bg-pink-700">Clear form</button>
            </div>
        </div>
    )
}

export default Change