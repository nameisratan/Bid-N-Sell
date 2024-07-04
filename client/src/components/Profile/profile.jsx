import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../Profile/Profile.css";
import NavBar from "../NavBar/NavBar";
import axios from 'axios';
import Tabs from './Tabs/Tabs';

import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from '../toast';
import { toast } from "react-toastify";

function Profile() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [user, setUser] = useState();
    useEffect(()=>{
        
        const token = localStorage.getItem('token');
            axios.get( `${process.env.REACT_APP_BACKEND_URL}/profile/`, { headers : {
                Authorization: token,
            }}).then(async (res) =>{
                setName(res.data.name);
                setUser(res.data);
            })
            .catch((error) => 
            {
                navigate('/login');
            });
    },[]);

    function logout(){
        localStorage.removeItem('token');
        navigate('/login');
    }

    return <div className="main">
        <ToastContainer/>
        <NavBar
            name={name}
            logout={logout}
        />
        <Tabs 
            user={user}
        />
    </div>
}

export default Profile;