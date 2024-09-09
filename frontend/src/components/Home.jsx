import Sidebar from './Sidebar.jsx';
import Navbar from './Navbar.jsx';
import FakeVideos from './FakeVideos.jsx';
import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import toast,{Toaster} from 'react-hot-toast';
import logo from "../assets/the-flash.svg";



const Home = ()=>{
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1500 );
    }, []);

    const location = useLocation();

    useEffect(() => {
        if (location.state?.registered) {
            toast.success('Başarılı bir şekilde kayıt oldunuz!');
        }
        if(location.state?.logined){
            toast.success("Başarılı bir şekilde giriş yaptınız!");
        }
    }, [location.state]);

    if(loading){
        return(
            <div className="flex animate-pulse flex-col  justify-center items-center w-full h-screen text-white bg-red-700"  >
                <img className="w-24" src={logo} alt=""/>
                <h1>
                    Yükleniyor...
                </h1>
            </div>
        )
    }

    return (
        <div className="flex h-screen">
            <Toaster position="top-right"/>
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Navbar />
                <hr className="mt-2"/>
                <div className="flex-1">
                    <FakeVideos />
                </div>
            </div>
        </div>
    );
};

export default Home;
