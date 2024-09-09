import logo from '/src/assets/the-flash.svg';
import { useState } from "react";
import { Field, Input, Label } from '@headlessui/react';
import clsx from 'clsx';
import {Link} from 'react-router-dom';
import {register,checkIfEmailExists} from '/src/firebase.js';
import toast,{Toaster} from 'react-hot-toast';
import {useNavigate} from "react-router-dom";


const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== password2) {
            toast.error('Şifreler uyuşmuyor!');
            return;
        }

        if (password.length < 6) {
            toast.error('Şifreniz 6 karakterli olmalıdır.');
            return;
        }

        try {
            const emailExists = await checkIfEmailExists(email);
            if (emailExists) {
                toast.error('Bu e-posta adresi zaten kayıtlı.');
                return;
            }

            const user = await register(email, password);
            console.log(user);
            setEmail('');
            setPassword('');
            setPassword2('');
            navigate('/home', { state: { registered: true } });
        } catch (error) {
            toast.error('Kayıt işlemi sırasında bir hata oluştu.');
            console.error(error);
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-red-500 via-red-600 to-red-700">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <Toaster/>
                <div className="text-center mb-6">
                    <img src={logo} className="w-24 mx-auto" alt="logo" />
                    <h1 className="text-2xl font-bold text-gray-800">Kayıt Ol</h1>
                    <h2 className="text-lg font-medium text-gray-600">RevUpload</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <Field>
                            <Label className="block text-sm font-medium text-gray-700">E-posta:</Label>
                            <Input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={clsx(
                                    'mt-1 block w-full py-1 pl-1 rounded-md  shadow-sm',
                                    'outline-none focus:ring focus:ring-red-500 focus:ring-opacity-50'
                                )}
                            />
                        </Field>
                    </div>
                    <div className="mb-6">
                        <Field>
                            <Label className="block text-sm font-medium text-gray-700">Şifre:</Label>
                            <Input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={clsx(
                                    'mt-1 block w-full py-1 pl-1 rounded-md  shadow-sm',
                                    'outline-none focus:ring focus:ring-red-500 focus:ring-opacity-50'
                                )}
                            />
                        </Field>
                    </div>
                    <div className="mb-6">
                        <Field>
                            <Label className="block text-sm font-medium text-gray-700">Şifre Tekrarı:</Label>
                            <Input
                                type="password"
                                value={password2}
                                onChange={(e) => setPassword2(e.target.value)}
                                className={clsx(
                                    'mt-1 block w-full py-1 pl-1 rounded-md  shadow-sm',
                                    'outline-none focus:ring focus:ring-red-500 focus:ring-opacity-50'
                                )}
                            />
                        </Field>
                    </div>
                    <button
                        type="submit"
                        className={clsx(
                            'w-full py-2 px-4 rounded-md shadow-md text-white font-medium',
                            'bg-red-600 hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
                        )}
                    >
                        Kayıt Ol
                    </button>
                </form>
                <div className="mt-6 text-center">
                    <p className="text-gray-600">Üyeliğiniz var mı ?
                        <Link to="/login" className="text-red-600 hover:underline"> Giriş Yap</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;
