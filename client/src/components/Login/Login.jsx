import "../Login/main.css";
import "../Login/util.css";

import React, { useState, useEffect } from "react";
import { useNavigate} from "react-router-dom";
import axios from 'axios';

import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from '../toast';
import { toast } from "react-toastify";

function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");    
    // useEffect
    useEffect(()=>{
        const token = localStorage.getItem('token');
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/`, { headers : {
            Authorization: token,
        }}).then(res => {
            navigate('/');
        }).catch( err => {
        })
    }, [])
    const LogInClick = () => {

        axios.post(`${process.env.REACT_APP_BACKEND_URL}/login`, {username, password}).then(async res => {
            if(!res.data.success){
                toast.error(`${res.data.message}`, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
                navigate('/login');
            }
            else
            {
                localStorage.setItem('token', res.data.token)
                navigate('/');
            }
        }).catch(async err => {
            toast.error(`${err}`, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        })
    }

    function RegisterClick() {
        navigate('/register');
    }
    return <div className="limiter">
        <ToastContainer/>
    <div className="container-login100">
        <div className="wrap-login100">
            <div className="login100-form validate-form p-l-55 p-r-55 p-t-178">
                <span className="login100-form-title">
                    Login
                </span>

                <div className="wrap-input100 validate-input m-b-16" data-validate="Please enter username">
                    <input className="input100" type="text" name="username" placeholder="Username" onChange={event => setUsername(event.target.value)} value={username} />
                    <span className="focus-input100"></span>
                </div>

                <div className="wrap-input100 validate-input" data-validate = "Please enter password">
                    <input className="input100" type="password" name="password" placeholder="Password" onChange={event => setPassword(event.target.value)} value={password}/>
                    <span className="focus-input100"></span>
                </div>
                <div>
                {/* <div className="text-right p-t-13 p-b-23">
                    <span className="txt1">
                    Forgot
                    </span>
                    
                    <a href="#" className="txt2">
                    Username / Password?
                    </a>
                </div> */}
                </div>

                <div className="container-login100-form-btn" onClick={LogInClick}>
                    <button className="login100-form-btn">
                        Login
                    </button>
                </div>

                <div className="flex-col-c p-t-100 p-b-40">
                    <span className="txt1 p-b-9">
                        Don’t have an account?
                    </span>
                    <a onClick={RegisterClick} href='/register'className="txt3" >
                        Register
                    </a>
                </div>
            </div>
        </div>
    </div>
</div>
//     <div className="limiter">
//     <input type="text" placeholder="Enter Username" value={username} onChange={event => setUsername(event.target.value)}/>
//     <input type="password" placeholder="Enter Password" value={password} onChange={event => setPassword(event.target.value)}/>
//     <button onClick={LogInClick}>Submit</button>
// </div> 
}

export default Login;