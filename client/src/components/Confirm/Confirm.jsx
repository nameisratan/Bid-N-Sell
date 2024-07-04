import React, { useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {ToastContainer} from '../toast';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Confirm() {
    const {id} = useParams();
    const navigate = useNavigate();
    useEffect(()=>{
        axios.post( `${process.env.REACT_APP_BACKEND_URL}/register/${id}`).then(async (res)=>{
            // console.log(res);
            if(res.data.status = "success")
            {
                toast.success('User, Registered Successfully you can login now!', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
                navigate('/login');
            }
        })
    },[]);
}

export default Confirm;

