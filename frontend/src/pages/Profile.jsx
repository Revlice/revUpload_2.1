import React, { useState } from 'react';
import { Toaster } from "react-hot-toast";
import Sidebar from "../components/Sidebar.jsx";
import Navbar from "../components/Navbar.jsx";
import FakeVideos from "../components/FakeVideos.jsx";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import EditProfile from  '../components/EditProfile.jsx'; // Yeni bileşeni import edin
import rahmipng from '../assets/rahmiPNG.jpeg';

const Profile = () => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const user = useSelector(state => state.authSlice.user); // Kullanıcı verisini buradan çekin
    const [isEditing, setIsEditing] = useState(false); // Düzenleme durumu

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return (
        <div className="flex h-screen">
            <Toaster position="top-right" />
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Navbar />
                <hr className="mt-2" />
                <div className="flex-1 w-full">
                    <div className="flex flex-col items-center">
                        <div className="w-9/12 h-44 relative rounded-lg bg-bgImage bg-no-repeat bg-cover bg-center">
                            <h1 className="font-extrabold text-xl inset-x-80 text-sky-950 inset-y-2 absolute">
                                Welcome To My Channel
                            </h1>
                        </div>
                        <div className="w-9/12 relative flex mt-8 h-auto">
                            <img src={rahmipng} alt="resim"
                                 className="w-44 border border-black rounded-3xl bg-emerald-500" />
                            <div className="flex flex-col ml-4">
                                <h1 className="font-medium text-lg mt-1">
                                    {user.name} {/* Redux'tan gelen kullanıcı adı */}
                                </h1>
                                <div className="flex">
                                    <p className="mr-1">@{user.username}</p> {/* Redux'tan gelen kullanıcı adı */}
                                    <p className="mx-1">•
                                    </p>
                                    <p>40 Abone</p>
                                    <p className="mx-1">•
                                    </p>
                                    <p>32 Video</p>
                                </div>
                                <div className="absolute bottom-0">
                                    <button
                                        className="px-4 py-1.5 mr-1 bg-red-500 rounded-lg text-white hover:bg-red-400"
                                        onClick={() => setIsEditing(true)}
                                    >
                                        Profili Düzenle
                                    </button>
                                    <button
                                        className="px-4 py-1.5 mr-1 bg-red-500 rounded-lg text-white hover:bg-red-400">
                                        Videoları Yönet
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="w-9/12 mt-10">
                            <h2 className="font-extrabold text-2xl">Videolarım</h2>
                            <br />
                            <hr />
                            <br />
                            <FakeVideos />
                        </div>
                    </div>
                </div>
            </div>
            {isEditing && <EditProfile onClose={() => setIsEditing(false)} />}
        </div>
    )
};

export default Profile;
