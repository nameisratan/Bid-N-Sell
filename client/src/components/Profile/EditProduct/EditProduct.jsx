import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useNavigate} from "react-router-dom";
import axios from 'axios';
import './EditProduct.css';
import '../Tabs/tabs.css';

import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from '../../toast';
import { toast } from "react-toastify";


const EditProduct = ({closeModal, item}) => {

    console.log(item);
    const navigate = useNavigate();
    const [tab, setTab] = useState(1);
    useEffect(()=>{
        console.log(item);
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
    const [tempData, setTempData] = useState();
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
        axios.put(`${process.env.REACT_APP_BACKEND_URL}/upload`,data) // gen.image_files
        .then(res => {
            toast.success('Item edited successfully!', {
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
            }, 5000);
            navigate('/profile');
        });
        // alert("Item edited successfully");
    }

    const [product_name, setProductName] = useState(item.name);
    const [cost, setCost] = useState(item.cost);
    const [yearofBuying, setYearOfBuying] = useState(item.buyYear);
    const [category, setCategory] = useState(item.category);
    const [warranty, setWarranty] = useState(item.warranty);
    const [showBids, setShowBids] = useState(item.showBids);
    const [description, setDescription] = useState(item.description);

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
            // alert('Product Name can not be empty');
            return ;
        }
        else if (!cost || cost < 0) {
            toast.warn('Please enter some valid cost!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
            // alert('Please enter some valid cost');
            return ;
        }
        else if(yearofBuying > new Date().getFullYear || yearofBuying < 0)
        {
            toast.warn('Please enter a valid year!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
            // alert('Please enter a valid year');
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
            // alert('Please select a category');
            return;
        }
        else if(!description)
        {
            toast.warn('Please describe abour your product', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
            // alert("Please describe about your product");
            return;
        }
        else{
            let current_datetime = new Date();
            let formatted_date = current_datetime.getHours() + ":" + (current_datetime.getMinutes()<10?"0":"" ) + current_datetime.getMinutes() + " "+ (current_datetime.getHours()<12?"AM ":"PM ") + current_datetime.getDate() + "-" + (current_datetime.getMonth() + 1) + "-" +current_datetime.getFullYear();
            const general_info = {
                id: item._id,
                name : product_name,
                description: description,
                category: category,
                cost: cost,
                buyYear: yearofBuying,
                warranty: warranty,
                showBids :showBids,
                // ownerID: user.id,
                // ownerName: user.name,
                // ownerEmail: user.username,
                // placedOn: formatted_date
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
        <div className="modal-wrapperk" onClick={closeModal}>
        </div>
            <div className="modal-containerrk">
                <ToastContainer/>
                <h1 className="abcdd">Edit Product</h1>
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
                        <input onChange={e=>{setProductName(e.target.value)}} type="text" id="prodName" name="Product Name" className="abcd" placeholder="Product Name" value={product_name}/>
                        
                        <label >Cost</label>
                        <input onChange={e=>{setCost(e.target.value)}} value={cost} type="number" id="cost" className="abcd" name="cost" placeholder="Cost"/>

                        <label>Year of Buying</label>
                        <input onChange={e=>{setYearOfBuying(e.target.value)}} value={yearofBuying} type="number" id="year" name="year" className="abcd" placeholder="Year of Buying"/>

                        <label >Category</label>
                        <select onChange={e=>{setCategory(e.target.value)}} value={category} className="abcd" name="category">
                            <option className="opts" defaultValue="none"> </option>
                            <option className="opts" defaultValue="Electronics">Electronics</option>
                            <option className="opts" defaultValue="Clothing">Cloting</option>
                            <option className="opts" defaultValue="Sports">Sports</option>
                            <option className="opts" defaultValue="Home">Home</option>
                            <option className="opts" defaultValue="Other">Other</option>
                        </select>
                        <div className="cstm" >
                            <div>
                                <span>Warranty available</span> 
                            {
                                warranty?<input checked id="warr" onChange={e=>{setWarranty(e.target.checked)}} className="Ask" name="warranty" type="checkbox" />:<input id="warr" onChange={e=>{setWarranty(e.target.checked)}} className="Ask" name="warranty" type="checkbox" />
                            }
                            {/* <input id="warr" onChange={e=>{setWarranty(e.target.checked)}} className="Ask" name="warranty" type="checkbox" /> */}
                            </div>
                            {/* <div>
                            <span>Show Bids on Page</span> 
                            {
                                showBids?<input checked id="bidd" onChange={e=>{setShowBids(e.target.checked)}} className="Ask" name="bids_show" type="checkbox" />:<input id="bidd" onChange={e=>{setShowBids(e.target.checked)}} className="Ask" name="bids_show" type="checkbox" />
                            }
                            {/* <input id="bidd" onChange={e=>{setShowBids(e.target.checked)}} className="Ask" name="bids_show" type="checkbox" /> */}
                            {/*</div> */}
                        </div>
                        <label>Description</label>
                        <textarea onChange={e=>{setDescription(e.target.value)}} value={description} name="description" className="abcd" placeholder="Description about your product.." > </textarea>
                        {/* ValidateandSubmit */}
                        <input onClick={ValidateandSubmit} type="submit" className="abcd" defaultValue="Submit"/>
                    </div>
                </div>
            </div>
            <div className={tab === 2 ? "content  active-content" : "content"}>
                <h2>Add Images</h2>
                <hr />
                <div>
                    <input type="file" multiple onChange={event => {setdayta(event.target.files)}} />
                    {/* <button onClick={handleFileInputChange}>Upload</button> */}
                </div>
            </div>
            </div>
</div>
    </>, document.getElementById("myModal"));
}

export default EditProduct;  