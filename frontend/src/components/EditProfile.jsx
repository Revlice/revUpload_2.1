import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfile } from '../stores/reducer.js';
import toast from 'react-hot-toast';

const EditProfile = ({ onClose }) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);


    const [name, setName] = useState(user.name);
    const [username, setUsername] = useState(user.username);


    // Form gönderildiğinde çalışır
    const handleSubmit = (e) => {
        e.preventDefault();

        // Form doğrulama
        if (!name.trim() || !username.trim()) {
            toast.error('Ad ve kullanıcı adı boş olamaz.');
            return;
        }

        // Redux state güncellemesi ve LocalStorage kaydı
        dispatch(updateUserProfile({ name, username }));

        onClose(); // Formu kapatmak için onClose çağırın
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl mb-4">Profili Düzenle</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Ad</label>
                        <input
                            type="text"
                            className="w-full p-2 border rounded"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Kullanıcı Adı</label>
                        <input
                            type="text"
                            className="w-full p-2 border rounded"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Kaydet</button>
                    <button type="button" className="px-4 py-2 bg-red-500 text-white rounded ml-2" onClick={onClose}>İptal</button>
                </form>
            </div>
        </div>
    );
};

export default EditProfile;
