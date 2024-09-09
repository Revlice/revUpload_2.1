import {Toaster} from "react-hot-toast";
import Sidebar from "../components/Sidebar.jsx";
import Navbar from "../components/Navbar.jsx";


const Settings = ()=>{

    return (
        <div className="flex h-screen">
            <Toaster position="top-right"/>
            <Sidebar/>
            <div className="flex-1 flex flex-col">
                <Navbar/>
                <hr className="mt-2"/>
                <div className="flex-1">
                    Settings Sayfası
                </div>
            </div>
        </div>
    )
};

export default Settings;