import {Route,Routes} from 'react-router-dom';
import Home from './components/Home.jsx';
import Login from './components/form/Login.jsx';
import Signup from './components/form/Signup.jsx';
import {useDispatch, useSelector} from "react-redux";
import Modal from "./modals/Modal.jsx";
import {useEffect} from "react";
import {handleLogin} from "./stores/auth.js";
import Profile from "./pages/Profile.jsx";
import Settings from "./pages/Settings.jsx";
import VideoPlayer from './components/VideoPlayer.jsx';


function App() {

const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    const dispatch = useDispatch();

    /* useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            dispatch(handleLogin(user));
        }
    }, [dispatch]); */


    return (
        <>
            {isAuthenticated && <Modal/>}
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/home" element={<Home/>}/>
                <Route path="/login" exact={true} element={<Login/>}/>
                <Route path="/signup" exact={true} element={<Signup/>}/>
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/settings" element={<Settings/>}/>
                <Route path="/videoplayer" element={<VideoPlayer/>}/>
            </Routes>
        </>
    )
}

export default App;

