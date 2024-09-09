import logo from '/src/assets/the-flash.svg';
import { useState } from "react";
import { Field, Input, Label } from '@headlessui/react';
import clsx from 'clsx';
import {json, Link, useNavigate} from 'react-router-dom';
import {login,google,github,facebook} from "../../firebase.js";
import toast,{Toaster} from "react-hot-toast";
import {useDispatch} from "react-redux";
import {handleLogin} from "../../stores/auth.js";
import { FaGoogle,FaGithub,FaFacebook } from "react-icons/fa";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleGoogleLogin = async () => {
        try {
            const user = await google();
            if (user) {
                dispatch(handleLogin(user));
                localStorage.setItem('user',JSON.stringify(user));
                navigate('/home', { state: { logined: true } });
            } else {
                toast.error("Google ile giriş başarısız. Lütfen tekrar deneyin.");
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const handleGithubLogin = async () => {
        try {
            const user = await github();
            if (user) {
                dispatch(handleLogin(user));
                localStorage.setItem('user',JSON.stringify(user));
                navigate('/home', { state: { logined: true } });
            } else {
                toast.error("Github ile giriş başarısız. Lütfen tekrar deneyin.");
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const handleFacebookLogin = async () => {
        try {
            const user = await facebook();
            if (user) {
                dispatch(handleLogin(user));
                localStorage.setItem('user',JSON.stringify(user));
                navigate('/home', { state: { logined: true } });
            } else {
                toast.error("Facebook ile giriş başarısız. Lütfen tekrar deneyin.");
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const handleSubmit =async (e)=>{
        e.preventDefault();


        try{
            const user = await login(email,password);
            dispatch(handleLogin(user));
            localStorage.setItem('user', JSON.stringify(user));



            if (!user) {
                toast.error("Giriş başarısız. Lütfen bilgilerinizi kontrol edin.");
            } else {
                navigate('/home', { state: { logined: true } });
                setEmail('');
                setPassword('');
            }
        }catch(error){
            toast.error(error.message);
        }


    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-red-500 via-red-600 to-red-700">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <div className="text-center mb-6">
                    <Toaster position="top-right"/>
                    <img src={logo} className="w-24 mx-auto" alt="logo" />
                    <h1 className="text-2xl font-bold text-gray-800">GİRİŞ YAP</h1>
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
                                    'border border-gray-300 outline-none focus:border-none  focus:ring focus:ring-red-500 focus:ring-opacity-50'
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
                                    'border border-gray-300 outline-none focus:border-none focus:ring focus:ring-red-500 focus:ring-opacity-50'
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
                        Giriş Yap
                    </button>
                    <div className="flex justify-evenly items-center w-full mt-2.5">
                        <button
                            type="button"
                            onClick={handleGoogleLogin}
                            className={clsx(
                                'py-2 px-4 rounded-md shadow-md text-white font-medium',
                                'bg-yellow-600 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                            )}
                        >
                            <FaGoogle/>

                        </button>
                        <button
                            type="button"
                            onClick={handleGithubLogin}
                            className={clsx(
                                'py-2 px-4 rounded-md shadow-md text-white font-medium',
                                'bg-violet-700 hover:bg-violet-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                            )}
                        >
                            <FaGithub/>

                        </button>
                        <button
                            type="button"
                            onClick={handleFacebookLogin}
                            className={clsx(
                                'py-2 px-4 rounded-md shadow-md text-white font-medium',
                                'bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                            )}
                        >
                            <FaFacebook/>

                        </button>
                    </div>
                </form>
                <div className="mt-6 text-center">
                    <p className="text-gray-600">Hesabınız yok mu?
                        <Link to="/signup" className="text-red-600 hover:underline"> Kayıt Ol</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
