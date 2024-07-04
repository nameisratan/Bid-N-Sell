import React from "react";
import { Link } from "react-router-dom";
import "../Item/item.css";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from '../toast';
import { toast } from "react-toastify";
function Item(props) {
    const red = `/product/${props.prod_url}`;
    return <div className="item-box" >
        <ToastContainer/>
    <Link style={{"textDecoration":"none"}} to={red} >
    <div className="item-box2"  >
        <div>
            <img className="prodImg" src={props.prod_link} alt="product" />
            <div className="prodInfo" >
                <span className="prodName" >{props.prod_name}</span>
                <p className="prodDes" >{props.prod_desc}</p>
                <div className="line" ></div>
                <span className="prodRate" > Rs. {props.prod_price}/-</span>
            </div>
        </div>
    </div>
    </Link>
</div>
}

export default Item;

