import logo from '../assets/the-flash.svg';
import { FaHome } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { IoPerson } from "react-icons/io5";
import {useNavigate} from 'react-router-dom';

const Sidebar = ()=>{
    const navigate = useNavigate();

    const elemanlar =[
        {'li':'Anasayfa',icon:FaHome,to:'/home'},
        {'li':'Profil',icon:IoPerson,to:'/profile'},
        {'li':'Ayarlar',icon:IoMdSettings,to:'/settings'},
    ];

    return(
        <div className="h-screen w-64 bg-red-700 ">
            <div className="w-full  flex justify-evenly rounded border-2 border-white items-center ">
                <img onClick={()=> navigate("/")} src={logo} className="w-20 rounded cursor-pointer" alt="revupload_logo"/>
                <h1 className="font-bold  text-xl text-white">RevUpload</h1>
            </div>
            <div className="p-8">
                <ul>
                    {elemanlar.map((eleman,index)=> (

                         <li onClick={()=> navigate(eleman.to)} className="flex text-white transition-all hover:cursor-pointer hover:bg-red-600 rounded-xl text-xl items-center py-2" key={index}><eleman.icon className="text-2xl  mr-2" /> {eleman.li}</li>

                    ))}
                </ul>
            </div>
        </div>
    )
};

export default Sidebar;
