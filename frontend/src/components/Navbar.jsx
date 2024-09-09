import { FaUser, FaSearch } from 'react-icons/fa';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleSearch } from '../stores/search.js';
import { handleOpen, handleClose } from "../stores/modalOpen.js";
import Dropdown from "./dropdown/Dropdown.jsx";
import { Menu } from '@headlessui/react';
import rahmiPng from '../assets/rahmiPNG.jpeg';


const Navbar = () => {
    const navigate = useNavigate();
    const searchValue = useSelector(state => state.search.value);
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    const handleSearchValue = (e) => {
        dispatch(handleSearch(e.target.value));
    };

    const openModal = () => {
        dispatch(handleOpen());
    };

    return (
        <div className="sticky flex justify-center p-2 items-center ">
            <div className="relative flex items-center">
                <input
                    onChange={handleSearchValue}
                    type="search"
                    value={searchValue}
                    className={isAuthenticated ? "pl-10 pr-4 py-2 rounded-l border border-red-700 focus:outline-none focus:ring-2 focus:ring-red-500" : "pl-10 pr-4 py-2 rounded border border-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"}
                    placeholder="Video ara..."
                />
                <button className="absolute cursor-pointer left-3 text-black">
                    <FaSearch />
                </button>
                {isAuthenticated && (
                    <button
                        type="button"
                        onClick={openModal}
                        className="absolute inset-y-0 right-0 px-4 py-2 bg-red-700 text-white font-bold rounded-r border border-red-700 hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                        Yükle
                    </button>
                )}
            </div>
            <div className="absolute mr-12 -right-10">
                {isAuthenticated ? (
                    <Menu as="div" className="relative">
                        <Menu.Button className="text-emerald-500 text-2xl cursor-pointer">
                            <img src={rahmiPng} alt="resim" className="w-24 h-24 rounded-full bg-emerald-500 scale-50"/>
                        </Menu.Button>
                        <Menu.Items className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <Dropdown />
                        </Menu.Items>
                    </Menu>
                ) : (
                    <FaUser onClick={() => navigate('/login')} className="cursor-pointer" />
                )}
            </div>
        </div>
    );
};

export default Navbar;