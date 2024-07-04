import React, { useEffect, useState } from "react";
import "../UserBids/UserBids.css";
import axios from 'axios';
import EditProduct from "../EditProduct/EditProduct";
import DeleteProduct from "../DeleteProduct/DeleteProduct";
import { Link } from "react-router-dom";

import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from '../../toast';
import { toast } from "react-toastify";

function UsersBids(props) {

    function sortBids(bidss){
      const sorted = bidss.sort((a, b) => {
        var nameA = a.status.toLowerCase(), nameB = b.status.toLowerCase();
        if (nameA < nameB) 
         return 1;
        if (nameA > nameB)
         return -1;
        return 0;
      });
      // setBids(sorted);
    };
    const [bidslist, setBidsList] = useState([]);
    useEffect(()=>{
        const token = localStorage.getItem('token');
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/bids/user`, { headers : {
            Authorization: token,
        }}).then(res => {
            sortBids(res.data);
            setBidsList(res.data);
        }).catch(err=>{
        })
    },[])
    return <div className="vucontainer">
    <ul className="vuresponsive-table">
      <li className="vutable-header">
        <div className="vucol vucol-1">Product</div>
        <div className="vucol vucol-2">Name</div>
        <div className="vucol vucol-3">Seller Details</div>
        <div className="vucol vucol-4">Offered Price</div>
        <div className="vucol vucol-5">Your Bid</div>
        <div className="vucol vucol-6">Placed On</div>
        <div className="vucol vucol-7">Message</div>
        <div className="vucol vucol-8">Item Status</div>
      </li>
      {bidslist.map((bid) => {
        return <li className="vutable-row">
          <ToastContainer/>
        <div className="vucol vucol-1">
          <Link to={`/product/${bid.itemID}`}>
            <img className="vucol-1img" src={bid.photoURL} alt="" />
          </Link>
        </div>
        <div className="vucol vucol-2">{bid.productName}</div>
        <div className="vucol vucol-3">
            <div>{bid.sellerDetails.sellername}</div>
            <div>{bid.sellerDetails.sellerEmail}</div>
        </div>
        <div className="vucol vucol-4">{bid.offeredPrice}</div>
        <div className="vucol vucol-5">{bid.bidPrice}</div>
        <div className="vucol vucol-6">{bid.placedOn}</div>
        <div className="vucol vucol-7">{bid.message}</div>
        <div className="vucol vucol-8">{bid.status}</div>
  </li>
      })}
    </ul>
  </div>;
}

export default UsersBids;