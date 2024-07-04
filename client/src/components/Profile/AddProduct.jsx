import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useNavigate} from "react-router-dom";
import axios from 'axios';
import './AddProduct.css';
import './Tabs/tabs.css';
// cloud name : dhjrxapj5
// gshbs0um

import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from '../toast';
import { toast } from "react-toastify";

const AddProduct = ({closeModal, user}) => {
    const navigate = useNavigate();
    const [tab, setTab] = useState(1);
    useEffect(()=>{
        document.body.style.overflowY = "hidden";
        return ()=>{
            document.body.style.overflowY = "scroll";
        }
    },[]);
    
    function btnClick(tab)
    {
        setTab(tab);
    }
    const [dayta, setdayta] = useState([]);
    const data = new FormData();
    function handleFileInputChange(general_info) {    
        for (let index = 0; index < dayta.length; index++) {
            const element = dayta[index];
            data.append('file', element);
        }
        data.append("upload_present", "gshbs0um");
        data.append("no_of_files", dayta.length);
        data.append("general_info", JSON.stringify(general_info));
        post(data);
    }
    function post(data) {
        const token = localStorage.getItem('token');

        closeModal();
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/upload`,data)
        .then(res => {
            toast.success('Item Added Successfully!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            setTimeout(() => {
                window.location.reload();
            }, 2000);
            navigate('/profile');
        });
    }

    const [product_name, setProductName] = useState();
    const [cost, setCost] = useState();
    const [yearofBuying, setYearOfBuying] = useState();
    const [category, setCategory] = useState();
    const [warranty, setWarranty] = useState(false);
    const [showBids, setShowBids] = useState(false);
    const [description, setDescription] = useState();

    function ValidateandSubmit() {
        if (!product_name || product_name.length === 0) {
            toast.warn('Product Name can not be empty', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
            return ;
        }
        else if (!cost || cost < 0) {
            toast.warn('Please enter some valid cost', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return ;
        }
        else if(yearofBuying > new Date().getFullYear || yearofBuying < 0)
        {
            toast.warn('Please enter a valid year', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return;
        }
        else if(category  === "none")
        {
            toast.warn('Please select a category', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return;
        }
        else if(!description)
        {
            toast.warn('Please describe about your product', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return;
        }
        else{
            let current_datetime = new Date();
            let formatted_date = current_datetime.getHours() + ":" + (current_datetime.getMinutes()<10?"0":"" ) + current_datetime.getMinutes() + " "+ (current_datetime.getHours()<12?"AM ":"PM ") + current_datetime.getDate() + "-" + (current_datetime.getMonth() + 1) + "-" +current_datetime.getFullYear();
            const general_info = {
                name : product_name,
                description: description,
                category: category,
                cost: cost,
                buyYear: yearofBuying,
                warranty: warranty,
                showBids :showBids,
                ownerID: user.id,
                ownerName: user.name,
                ownerEmail: user.username,
                placedOn: formatted_date,
                sold: false
            }
            
            const lsp = Number(new Date().getFullYear())-Number(yearofBuying);
            if(lsp <= 2)
            {
                general_info["age"] = "0-2";
            }
            else if(lsp <= 4)
            {
                general_info["age"] = "2-4";
            }
            else if(lsp <= 6)
            {
                general_info["age"] = "4-6";
            }
            else
            {
                general_info["age"] = "6+";
            }
            handleFileInputChange(general_info);
        }
    }

    return ReactDOM.createPortal(<>
        <div className="modal-wrapper" onClick={closeModal}>
        <ToastContainer/>
        </div>
            <div className="modal-containerr">
                <h1 className="abcdd">Add Product</h1>
                <div className="bloc-tabs">
                    <button className= {tab===1?"tabs active-tabs":"tabs"} onClick={()=>btnClick(1)}>General Info</button>
                    <button className={tab===2?"tabs active-tabs":"tabs"} onClick={()=>btnClick(2)}>Images</button>
                </div>
            <div className="content-tabs">
            <div className = {tab===1?"content  active-content": "content"}>
                <h2>General Info</h2>
                <hr />
                <div className="cont">
                    <div>
                        <label >Product Name</label>
                        <input onChange={e=>{setProductName(e.target.value)}} type="text" id="prodName" name="Product Name" className="abcd" placeholder="Product Name"/>
                        
                        <label >Cost</label>
                        <input onChange={e=>{setCost(e.target.value)}} type="number" id="cost" className="abcd" name="cost" placeholder="Cost"/>

                        <label>Year of Buying</label>
                        <input onChange={e=>{setYearOfBuying(e.target.value)}} type="number" id="year" name="year" className="abcd" placeholder="Year of Buying"/>

                        <label >Category</label>
                        <select onChange={e=>{setCategory(e.target.value)}} className="abcd" name="category">
                            <option className="opts" defaultValue="none"> </option>
                            <option className="opts" defaultValue="Electronics">Electronics</option>
                            <option className="opts" defaultValue="Clothing">Cloting</option>
                            <option className="opts" defaultValue="Sports">Sports</option>
                            <option className="opts" defaultValue="Home">Home</option>
                            <option className="opts" defaultValue="Other">Other</option>
                        </select>
                        <div className="cstm" >
                            <div>
                            <span>Warranty available</span> <input onChange={e=>{setWarranty(e.target.checked)}} className="Ask" name="warranty" type="checkbox" />
                            </div>
                            {/* <div>
                            <span>Show Bids on Page</span> <input onChange={e=>{setShowBids(e.target.checked)}} className="Ask" name="bids_show" type="checkbox" />
                            </div> */}
                        </div>
                        <label>Description</label>
                        <textarea onChange={e=>{setDescription(e.target.value)}} name="description" className="abcd" placeholder="Description about your product.." > </textarea>
                        <input onClick={ValidateandSubmit} type="submit" className="abcd" defaultValue="Submit"/>
                    </div>
                </div>
            </div>
            <div className={tab === 2 ? "content  active-content" : "content"}>
                <h2>Images Upload</h2>
                <hr />
                <div>
                    <input type="file" multiple onChange={event => {setdayta(event.target.files)}} />
                </div>
            </div>
            </div>
</div>
    </>, document.getElementById("myModal"));
}

export default AddProduct;  