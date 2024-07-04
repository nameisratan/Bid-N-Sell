import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout(){
    localStorage.removeItem('token');
    const navigate = useNavigate();
    navigate('/login');
}

export default Logout;