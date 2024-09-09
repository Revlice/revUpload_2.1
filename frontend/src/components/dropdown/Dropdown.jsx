import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import {
    ArchiveBoxXMarkIcon,
    ChevronDownIcon,
    PencilIcon,
    Square2StackIcon,
    TrashIcon,
} from '@heroicons/react/16/solid'
import {handleLogout} from "../../stores/auth.js";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";


export default function Dropdown() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onLogout = () => {
        dispatch(handleLogout());
    };

    return (
        <div className="w-52 text-right">
            <Menu>
                <Menu.Button className="inline-flex items-center gap-2 rounded-lg bg-gray-800 py-1.5 px-3 text-sm font-semibold text-white shadow-inner shadow-white/10 focus:outline-none hover:bg-gray-700">
                    <ChevronDownIcon className="size-5 fill-red-500" />
                </Menu.Button>
                <Menu.Items
                    className="w-52 bg-red-600 origin-top-right rounded-lg p-1 text-sm text-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                >
                    <MenuItem>
                        {({ active }) => (
                            <button onClick={()=> navigate('/profile')}
                                className={`${
                                    active ? 'bg-white/10' : ''
                                } group flex w-full items-center mt-0.5 gap-2 rounded-lg py-1.5 px-3`}
                            >
                                <PencilIcon className="size-4 fill-white/30" />
                                Profil
                            </button>
                        )}
                    </MenuItem>
                    <MenuItem>
                        {({ active }) => (
                            <button
                                onClick={onLogout}
                                className={`${
                                    active ? 'bg-white/10' : ''
                                } group flex w-full items-center mt-4 gap-2 rounded-lg py-1.5 px-3`}
                            >
                                <Square2StackIcon className="size-4 fill-white/30" />
                                Çıkış Yap
                            </button>
                        )}
                    </MenuItem>
                </Menu.Items>
            </Menu>
        </div>
    );
}