import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import axios from 'axios';
import { redirect } from "react-router-dom";
import "./Placebid.css";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from '../toast';
import { toast } from "react-toastify";
// require('dotenv').config();
function PlaceBid({item, user, closeModal}){
    
    const [amount, setAmount] = useState(-1);
    const [message, setMessage] = useState();
    const [mobileNo, setMobileNo] = useState(-1);    
    const baseurl = process.env.REACT_APP_BACKEND_URL;
    console.log(baseurl);
    function validate() {
        if (amount < 0) {
            toast.warn('Enter the price!', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
            return;
        }
        else if(amount > 999999999999999)
        {
            toast.warn('Enter some valid price!', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
            return;
        }
        else if(mobileNo < 0 || mobileNo > 9999999999 || mobileNo < 1000000000){
            toast.warn('Mobile Number must be a 10 digit number!', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
            return;
        }
        else {
            handleSubmit();
        }
    }

    function handleSubmit() {
        let current_datetime = new Date();
        let formatted_date = (current_datetime.getHours()<13?current_datetime.getHours():current_datetime.getHours()%12)  + ":" + (current_datetime.getMinutes()<10?"0":"" ) + current_datetime.getMinutes() + (current_datetime.getHours()<12?"AM":"PM") + " " + current_datetime.getDate() + "-" + (current_datetime.getMonth() + 1) + "-" +current_datetime.getFullYear();
        const bid = {
            productID: item,
            bidderID: user._id,
            bidderName: user.name,
            price: amount,
            message: message,
            biddedOn: formatted_date,
            bidderMobileNumber: mobileNo
        }

        axios.post(`${baseurl}/bids/upload`, bid).then(async (res)=>{
            toast.success('Bid Placed Successfully', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
            redirect(`/product/${item}`);
            closeModal();
        }).catch(err => {
            console.log(process.env.BACKEND_URL);
            alert(err);
        })
    }

    return ReactDOM.createPortal( 
        <><ToastContainer/><div><div onClick={closeModal} className="modal-wrapper_pb"></div>
            <div className="modal-containerr_pb">
                <div className="wrap-login100k">
                    <div className="login100-form validate-form p-l-55 p-r-55k p-t-120">
                        <span className="login100-form-titlek">
                            Place Bid
                        </span>
                        <div className="wrap-input100 validate-input m-b-16">
                            <input className="input100l" type="number" placeholder="Enter Your bid/ Price" onChange={event => setAmount(event.target.value)} />
                            <span className="focus-input100"></span>
                        </div>

                        <div className="wrap-input100 validate-input">
                            <textarea className="input100k" type="text" placeholder="Message" onChange={event => setMessage(event.target.value)} value={message} />
                            <span className="focus-input100"></span>
                        </div>

                        <div className="wrap-input100 validate-input m-b-16">
                            <input className="input100l" type="number" placeholder="Enter Your Mobile Number" onChange={event => setMobileNo(event.target.value)} />
                            <span className="focus-input100"></span>
                        </div>
                        <div>
                        </div>

                        <div className="container-login100-form-btnk">
                            <button onClick={closeModal} className="login100-form-btnk">
                                Cancel
                            </button>
                            <button onClick={validate} className="login100-form-btnk">
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div></div></>
        , document.getElementById("myModal"));
}

export default PlaceBid; 