import React from "react";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useNavigate} from "react-router-dom";
import axios from 'axios';

import "../ProductsBidsDisplay/ProductsBidsDisplay.css";

import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from '../../toast';
import { toast } from "react-toastify";

function ProductsBidsDisplay({closeBidsModal, prod}){
    const [bids, setBids] = useState([]);
    const sortByPrice = (bidss) => {
        const sorted = bidss.sort((a, b) => {
          return b.price - a.price;
        });
        setBids(sorted);
    };
    useEffect(()=>{
        const token = localStorage.getItem('token');
        axios.get( `${process.env.REACT_APP_BACKEND_URL}/product/${[prod._id]}`, { headers : {
            Authorization: token,
        }}).then(async (res) =>{
            sortByPrice(res.data.bids);
        }).catch(err=>
            console.log(err)
        )
    },[])
    return ReactDOM.createPortal(<>
        <div className="modal-wrapperbids" onClick={closeBidsModal}>
        </div>
            <ToastContainer/>
            <div className="modal-containerbids">
                <h2>Bids Placed for this product</h2>
            <table class="table-fill">
            <thead>
            <tr>
            <th class="text-left">Bidder Name</th>
            <th class="text-left">Bidder Mobile Number</th>
            <th class="text-left">Bidded On</th>
            <th class="text-left">Message</th>
            <th class="text-left">Price</th>
            </tr>
            </thead>
            <tbody class="table-hover">
                {bids.map(bid =>{
                    return <tr>
                    <td class="text-left">{bid.bidderName}</td>
                    <td class="text-left">{bid.bidderMobileNumber}</td>
                    <td class="text-left">{bid.biddedOn}</td>
                    <td class="text-left">{bid.message}</td>
                    <td class="text-left">{bid.price}</td>
                    </tr>
                })}
            </tbody>
            </table>
            </div>
    </>, document.getElementById("myModal"));
};

export default ProductsBidsDisplay;