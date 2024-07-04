import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link} from "react-router-dom";
import "../Home/home.css";
import "../Product/product.css";
import axios from 'axios';
import PlaceBid from "../Bids/PlaceBid";

import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from '../toast';
import { toast } from "react-toastify";

function Product() {
    const {id} = useParams();
    const navigate = useNavigate();
    const [urls, setUrls] = useState([]);
    const [state, setState] = useState(0);
    const [data, setData] = useState({
        item: {
            name: "",
            category: "",
            cost: 0,
            ownerID: "",
            age: "",
            imageURL: [
                ""
            ],
            description: "",
            bids: []
        },
        user: {
            name: "",
        }
    });
    const [name, setName] = useState();    
    const [ownerDetails, setOwnerDetails] = useState({
        name: "",
        emailID: ""
    });
    const [user, setUser] = useState();
    function logout(){
        localStorage.removeItem('token');
        navigate('/login');
    }
    const [bids, setBids] = useState([]);
    
    const [placeBidModal, setPlaceBidModal] = useState(false);
    const [curURL, setCurUrl] = useState();
    const [showBids, setShowBids] = useState();

    useEffect(()=>{
        console.log(id);
        console.log(bids);
        const token = localStorage.getItem('token');
        axios.get( `${process.env.REACT_APP_BACKEND_URL}/product/${id}`, { headers : {
            Authorization: token,
        }}).then(async (res) =>{
                console.log(res.data);  
                setUser(res.data.user);
                setName(res.data.user.name);
                setData(res.data);
                setShowBids(res.data.showBids);
                // setBids(res.data.bids);
                sortByPrice(res.data.bids);
                setUrls(res.data.item.imageURL);
                setCurUrl(res.data.item.imageURL[0]);
            })
            .catch((error) => 
            {
                // console.log(error);
                navigate('/login');
            });
    },[placeBidModal]);

    function imageClick(index) {
        setState(index);
        setCurUrl(urls[index])
    }

    const sortByPrice = (bidss) => {
        const sorted = bidss.sort((a, b) => {
          return b.price - a.price;
        });
        setBids(sorted);
    };


    function closeModal()
    {
        setPlaceBidModal(false);
    }
    return <div>
        <ToastContainer/>
        <div className="nav">
            <Link style={{"textDecoration":"none"}} to={'/'}>

            <h1 className="appName">BUY NOW</h1>
            </Link>
            <div className="routes">
                {/* <i>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-bell" viewBox="0 0 16 16">
                        <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z" />
                    </svg>
                </i> */}
                <Link to={'/profile'} >
                <span className="username">
                    {name}
                </span>
                </Link>
                <div className="logout">
                    <i color="black">

                    <svg onClick={logout} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-box-arrow-right" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
  <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
</svg>
                    </i>
                </div>
            </div>
        </div>
     <div className="a" >
        <div>
            <div className="b">
                <div className="c">
                    {urls.length === 0 || <><div className="zz">
                            <img className="d" src={curURL} alt="product" />
                        </div><div className="e">
                                {urls.map((url, index) => {
                                    return <img onClick={() => { setState(index); setCurUrl(url); console.log(url); } } className={state === index ? "f" : "g"} src={url} alt="product" />;
                                })}
                            </div></>}
                    {urls.length === 0 && <span>Sorry, No images Available</span>}
                </div>
                <div className="ed" >
                    <div className="forFlex">
                        <div>
                            <h1 className="i" >{data.item.name}</h1>
                        </div>
                        <div>
                            <h1 className="paise">Rs.{data.item.cost}</h1>
                        </div>
                    </div>
                    <p>{data.item.description}</p>
                    <div className="j" ></div>
                    <h1 className="k" >Product Details</h1>
                    <div className="l" >
                        <span className="m" >Category</span>
                        <span>{data.item.category}</span>
                    </div>
                    <div className="l" >
                        <span className="m" >Purchased YEAR</span>
                        <span>{data.item.buyYear}</span>
                    </div>
                    <div className="l" >
                        <span className="m" >Warranty Available</span>
                        {data.item.warranty===true?<span>Yes</span>:<span>No</span>}
                    </div>
                    {/* <div className="l" >
                        <span className="m" >Bill Available</span>
                        <span>Yes</span>
                    </div>
                    <div className="l"> 
                        <span className="m" >Box Available</span>
                        <span>No</span>
                    </div>
                    <div className="l" >
                        <span className="m" >Accesssories Available</span>
                        <span>No</span>
                    </div>
                    <div className="l" >
                        <span className="m" >Warranty Available</span>
                        <span>Yes</span>
                    </div> */}
                    <div className="j" ></div>
                    <h1 className="n" >Owner Details</h1>
                    <div className="o">
                        <span class="text-md ">Owner Name</span>
                        <span>{data.item.ownerName}</span>
                    </div>
                    <div className="o" >
                        <span class="text-md ">Email</span>
                        <span>{data.item.ownerEmail}</span>
                    </div>
                    <div className="j" ></div>
                    {placeBidModal && <PlaceBid item={data.item._id} user={user} closeModal={closeModal}/>}
                    <div className="p" >
                        <h1 className="n" >Bids</h1>
                        <button disabled={data.item.ownerID === data.user._id} className="qwerty" onClick={()=>{setPlaceBidModal(true)}} type="button" >
                            <span>Place Bid</span>
                        </button >
                    </div>
                    <div className="q" >
                            {bids.map(bid => {
                            return <div className="r">
                                    <div className="s" >
                                        <span class="text-md">{bid.bidderName}</span>
                                        <span>Rs. {bid.price}/-</span>
                                    </div>
                                    <div className="s" >
                                        <span className="t" >Placed On</span>
                                        {/* {console.log(bid.biddedOn)} */}
                                        <span className="u" >{bid.biddedOn}</span>
                                    </div>
                            </div>
                        })}
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
}

export default Product;