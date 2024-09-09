import { Dialog } from '@headlessui/react';
import { useDispatch, useSelector } from "react-redux";
import { handleClose, setVideoName, setVideoDescription, setVideoURL } from "../stores/modalOpen.js";
import { useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase.js";
import axios from 'axios';


const Modal = () => {

    const dispatch = useDispatch();
    const openValue = useSelector(state => state.openModal.open);
    const video = useSelector(state => state.openModal.video);

    const [title,setTitle] = useState('');
    const [description,setDescription] = useState('');
    const [videoFile,setVideoFile] = useState(null);

    const [uploading, setUploading] = useState(false);

    const onClose = () => {
        dispatch(handleClose());
    };

    const handleVideoChange = (event) => {
        setVideoFile(event.target.files[0]);
        
    }

   const handleSubmit = async (e) => {
    e.preventDefault();

    // State'lerdeki title ve description'ı kontrol edin
    if (videoFile && title && description) {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('videoFile', videoFile);

        try {
            // Axios isteği gönderin
            const response = await axios.post('http://localhost:3000/api/videos/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Video yükleme başarıyla gerçekleştirildi:', response.data);
        } catch (error) {
            if (error.response) {
                // Backend'den dönen hatayı kontrol edin ve loglayın
                console.error('Hata:', error.response.data.message);
                if (error.response.data.errors) {
                    Object.values(error.response.data.errors).forEach(err => {
                        console.error('Validation Error:', err.message);
                    });
                }
            } else {
                console.error('Hata:', error.message);
            }
        }

        // Formu temizleyin
        setTitle('');
        setDescription('');
        setVideoFile(null);
    } else {
        alert('Lütfen tüm alanları doldurun.');
    }
};


    return (
        <Dialog className="absolute inset-y-0 w-full flex justify-center items-center h-screen backdrop-blur-sm" open={openValue} onClose={onClose}>
            <Dialog.Panel className="flex flex-col justify-center items-center bg-white p-4 rounded-lg">
                <Dialog.Title className="text-center text-2xl font-extrabold">Video Yükle</Dialog.Title>
                <Dialog.Description className="text-xl font-medium mt-2">
                    Buradan kendi sayfanıza videolar yükleyebilirsiniz!
                </Dialog.Description>
                <input
                    type="file"
                    accept="video/*"
                    onChange={handleVideoChange}
                    className="mt-4"
                />
 <input
    type="text"
    placeholder="Video İsmi"
    value={title} // video.name yerine title kullanıyoruz
    onChange={(e) => setTitle(e.target.value)}
    className="mt-4 p-2 border rounded"
/>
<textarea
    placeholder="Video Açıklaması"
    value={description} // video.description yerine description kullanıyoruz
    onChange={(e) => setDescription(e.target.value)}
    className="mt-4 p-2 border rounded"
/>
                <div className="flex space-x-4 mt-4">
                    <button
                        className="px-2 py-1 rounded-lg bg-red-800 text-white hover:bg-red-600 transition-colors"
                        onClick={onClose}
                    >
                        İptal Et
                    </button>
                    <button
                        className="px-2 py-1 rounded-lg bg-green-800 text-white hover:bg-green-600 transition-colors"
                        onClick={handleSubmit}
                        disabled={uploading}
                    >
                        {uploading ? 'Yükleniyor...' : 'Yükle'}
                    </button>
                </div>
            </Dialog.Panel>
        </Dialog>
    );
};

export default Modal;
