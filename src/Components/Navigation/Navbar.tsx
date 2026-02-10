import { Link } from 'react-router-dom';
import { AuthContext } from '../../state/AuthContext';
import { useContext } from 'react';
import { logoutSvg, homeSvg, projectsSvg, settingsSvg } from '../../common/IconStore';

const Navbar = () => {

    const logoutUser = ()=>{
        authContext.id = 0;
        authContext.username = "";
    }

    const authContext = useContext(AuthContext);
    return (
        <div className="navbar bg-emerald-700 shadow-lg">
            <div className="flex-1">
                <ul className="menu menu-vertical lg:menu-horizontal bg-emerald-800 rounded-box">
                    <li><Link to="/home">{homeSvg}Home</Link></li>
                    <li><Link to="/home/projects">{projectsSvg}Projects</Link></li>
                    <li><Link to="/home/settings">{settingsSvg}Settings</Link></li>
                </ul>
            </div>
            <div className="flex-none">
                {/* <button className="btn btn-square btn-ghost">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block h-5 w-5 stroke-current"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path> </svg>
                </button> */}
                {/* <div>{authContext.username}</div> */}
                <ul className="menu menu-vertical lg:menu-horizontal bg-emerald-800 rounded-box">
                <li><Link to="/" onClick={logoutUser} > {logoutSvg} Logout</Link></li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar