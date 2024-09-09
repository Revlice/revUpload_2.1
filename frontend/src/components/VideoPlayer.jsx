import React from 'react';
import ReactPlayer from 'react-player';
import { useLocation } from 'react-router-dom';
import {Toaster} from "react-hot-toast";
import Sidebar from "../components/Sidebar.jsx";
import Navbar from "../components/Navbar.jsx";

const VideoPlayer = () => {
    const location = useLocation();
    const { video } = location.state || {}; // Video bilgilerini location.state'den al

    return (
    
         <div className="flex h-screen">
         <Toaster position="top-right"/>
         <Sidebar/>
         <div className="flex-1 flex flex-col">
             <Navbar/>
             <hr className="mt-2"/>
             <div className="flex-1">
                <div className="justify-center items-center mt-24 w-full flex">
                    <div>
                    {video ? (
                <ReactPlayer  url={`http://localhost:3000${video.videoURL}`} controls />
            ) : (
                <div>No video selected</div>
            )}
                </div>
                    </div>
                
            
             </div>
         </div>
     </div>
    );
};


export default VideoPlayer;
