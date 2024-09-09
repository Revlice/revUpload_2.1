import { motion } from 'framer-motion';
import logo from '../assets/the-flash.svg';
import dogukan from '../assets/thumbnails/dogukan.png';
import mertcan from '../assets/thumbnails/mertcan.png';
import tuna from '../assets/thumbnails/tuna.jpeg';
import ruhi from '../assets/thumbnails/ruhi.webp';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FakeVideos = () => {
    const [apiVideo, setApiVideo] = useState([]);
    const navigate = useNavigate();

    const videos = [
        { title: 'Video Title 1', thumbnail: dogukan },
        { title: 'Video Title 2', thumbnail: mertcan },
        { title: 'Video Title 3', thumbnail: tuna },
        { title: 'Video Title 4', thumbnail: ruhi },
    ];

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/videos');
                setApiVideo(response.data);
            } catch (error) {
                console.error("Videolar alınırken bir hata oluştu :", error);
            }
        };

        fetchVideos();
    }, []);

    const handleVideoClick = (video) => {
        navigate('/videoplayer', { state: { video } });
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full h-full overflow-auto p-4"
        >
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {videos.map((video, index) => (
                    <div
                        key={index}
                        onClick={() => handleVideoClick(video)}
                        className="flex flex-col cursor-pointer items-start p-4 bg-white shadow-lg hover:shadow-red-700/30 rounded-lg hover:shadow-xl transition-shadow duration-300"
                    >
                        <img src={video.thumbnail} className="w-full rounded-lg mb-4" alt="thumbnail" />
                        <div className="flex items-center mb-2">
                            <img className="w-10 h-10 rounded-full mr-4" src={logo} alt="logo" />
                            <div>
                                <h1 className="text-lg font-semibold">{video.title}</h1>
                                <p className="text-gray-500">Channel Name</p>
                            </div>
                        </div>
                        <div className="flex justify-between text-gray-600 text-sm">
                            <p>1.1M Görüntülenme</p>
                            <p>•</p>
                            <p>2 saat önce yüklendi</p>
                        </div>
                    </div>
                ))}

                {apiVideo.map((video, index) => (
                    <div
                        key={index}
                        onClick={() => handleVideoClick(video)}
                        className="flex flex-col cursor-pointer items-start p-4 bg-white shadow-lg hover:shadow-red-700/30 rounded-lg hover:shadow-xl transition-shadow duration-300"
                    >
                        <img src={video.thumbnail} className="w-full rounded-lg mb-4" alt="thumbnail" />
                        <div className="flex items-center mb-2">
                            <img className="w-10 h-10 rounded-full mr-4" src={logo} alt="logo" />
                            <div>
                                <h1 className="text-lg font-semibold">{video.title}</h1>
                                <p className="text-gray-500">Channel Name</p>
                            </div>
                        </div>
                        <div className="flex justify-between text-gray-600 text-sm">
                            <p>1.1M Görüntülenme</p>
                            <p>•</p>
                            <p>2 saat önce yüklendi</p>
                        </div>
                    </div>
                ))}
            </div>
        </motion.div>
    );
};

export default FakeVideos;
