import React, { useState } from "react";
import '../Tabs/tabs.css';
import AddProduct from '../AddProduct';
import UsersProducts from '../UsersProducts/UsersProducts';
import UserBids from '../UserBids/UserBids'

import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from '../../toast';
import { toast } from "react-toastify";

function Tabs(props) {
    const [tab, setTab] = useState(1);
    const [showModal, setshowModal] = useState(false);
    function btnClick(tab)
    {
        setTab(tab);
    }
    function closeModal()
    {
        setshowModal(false);
    }

    return <div>
    <div className="container">
        <ToastContainer/>
        <div className="bloc-tabs">
            <button className= {tab===1?"tabs active-tabs":"tabs"} onClick={()=>btnClick(1)}>Products</button>
            <button className={tab===2?"tabs active-tabs":"tabs"} onClick={()=>btnClick(2)}>My Bids</button>
            <button className={tab===3?"tabs active-tabs":"tabs"} onClick={()=>btnClick(3)  }>User Info</button>
        </div>

        <div className="content-tabs">
            <div className = {tab===1?"content  active-content": "content"}>
                <h2>Products</h2>
                <hr />
                <button className="asdf" onClick={()=>setshowModal(true)}>Add Products</button>
                {showModal && <AddProduct user={props.user} closeModal={closeModal}/>}
                <UsersProducts/>
            </div>
            <div className={tab === 2 ? "content  active-content" : "content"}>
                <h2>My Bids</h2>
                        {/* <hr /> */}
                <UserBids user={props.user}/>
            </div>
            <div className={tab === 3 ? "content  active-content" : "content"}>
                <h2>User Info</h2>
                {/* <span>Name : </span> */}
                {/* {console.log(props)} */}
                {props.user && <h3>Name : {props.user.name}</h3>}
                {props.user && <h3>Email : {props.user.username}</h3>}
                {props.user && <h3>ID : {props.user.id}</h3>}
                
                {console.log(props.user)}
                <hr />
                
            </div>
        </div>
    </div>
</div>
}

export default Tabs; 