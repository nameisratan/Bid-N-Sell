import React, { useEffect, useState } from "react";
import "../UsersProducts/UsersProducts.css";
import axios from 'axios';
import EditProduct from "../EditProduct/EditProduct";
import DeleteProduct from "../DeleteProduct/DeleteProduct";
import ProductsBidsDisplay from "../ProductsBidsDisplay/ProductsBidsDisplay";

import { Link } from "react-router-dom";

import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from '../../toast';
import { toast } from "react-toastify";

function UsersProducts(props) {
    const [editModal, seteditModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    function closeDltModal(){
      setDeleteModal(false);
    }
    const [products, setProducts] = useState([]);

    const [activeProducts, setActiveProducts] = useState([]);
    const [deletedProducts, setDeletedProducts] = useState([]);
    useEffect(()=>{
        const token = localStorage.getItem('token');    
        axios.get( `${process.env.REACT_APP_BACKEND_URL}/owner/products`, { headers : {
            Authorization: token,
        }}).then(async (res) =>{
            setProducts(res.data);
            setCorresProducts(res.data);
        })
    }, []);

    function setCorresProducts(prods) {
      prods.forEach(prod => {
        if (prod.sold) {
          setDeletedProducts(prev => {
            return [...prev, prod];
          })
        }
        else{
          setActiveProducts(prev => {
            return [...prev, prod];
          })
        }
      });
    }

    function itemDelete(index) {
      setDeleteModal(false);
      axios.delete(`${process.env.REACT_APP_BACKEND_URL}/product/${activeProducts[index]._id}`).then(res => {
        if (res.data.status === "Success") {
          toast.success(`${res.data.message}`, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
          setActiveProducts((products) =>
            activeProducts.filter((product,idx) => idx !== index)
          );
          setDeletedProducts(products => {
            return [...products, activeProducts[index]]
          })
        }
        else if (res.data.status === "failed") {
          toast.error(`${res.data.message}`, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      }).catch(err => {
        console.log(err);
      });

    }
    const [editItem, setEditItem] = useState();
    function itemEdit(index) {
      setEditItem(products[index]);
      seteditModal(true);
    }
    function closeModal(){
      seteditModal(false);
    }

    const [tab, setTab] = useState(1);

    function btnClick(tab)
    {
        setTab(tab);
    }
    const [bidsModal, setBidsModal] = useState(false);
    const [idxx, setIdxx] = useState();
    function closeBidsModal() {
      setBidsModal(false);
    }
    return <div className="prodtabcontainer">
      <ToastContainer/>
    <div className="prodtabbloc-tabs">
        <button className= {tab===1?"prodtabtabs prodtabactive-tabs":"prodtabtabs"} onClick={()=>btnClick(1)}>Active products</button>
        <button className={tab===2?"prodtabtabs prodtabactive-tabs":"prodtabtabs"} onClick={()=>btnClick(2)}>Deleted/ Sold Products</button>
    </div>
    <div className="prodtabcontent-tabs">
        <div className = {tab===1?"prodtabcontent  prodtabactive-content": "prodtabcontent"}>
          <div className="ucontainer">
          <ul className="uresponsive-table">
            <li className="utable-header">
              <div className="ucol ucol-1">Product</div>
              <div className="ucol ucol-2">Name</div>
              <div className="ucol ucol-3">Price</div>
              <div className="ucol ucol-4">Category</div>
              <div className="ucol ucol-5">Age</div>
              <div className="ucol ucol-6">Placed On</div>
              <div className="ucol ucol-7">Actions</div>
            </li>
            {deleteModal && <DeleteProduct closeDltModal={closeDltModal} itemDelete={itemDelete}  index={idxx}/>}
            {editModal && <EditProduct closeModal={closeModal} item={activeProducts[idxx]}/>}
            {activeProducts.map((product, index) => {
              // setIdxx(index);
              console.log(product);
              return <li className="utable-row">
                  <div className="ucol ucol-1">
                      <Link to={`/product/${product._id}`}>
                      <img className="uns" src={product.imageURL[0]} alt="Img" />
                      </Link>
                  </div>
                {bidsModal && <ProductsBidsDisplay closeBidsModal={closeBidsModal} prod={activeProducts[index]}/>}
                  <div className="ucol ucol-2">{product.name}</div>
                  <div className="ucol ucol-3">{product.cost}</div>
                  <div className="ucol ucol-4">{product.category}</div>
                  <div className="ucol ucol-5">{2024-product.buyYear}</div>
                  <div className="ucol ucol-6">{product.placedOn}</div>
                  <div className="ucol ucol-7">
                    <button className="Hi"  onClick={()=>{setIdxx(index); setDeleteModal(true); }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
                      </svg>
                    </button>
                    <button className="Hi" onClick={()=>{setIdxx(index); seteditModal(true);}}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16">
                        <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"/>
                      </svg>
                    </button>
                    <div>
                      <button onClick={()=>setBidsModal(true)}>
                        Show bids
                      </button>
                    </div>
                  </div>
            </li>
            })}
          </ul>
          </div>
        </div>
        <div className={tab === 2 ? "prodtabcontent  prodtabactive-content" : "prodtabcontent"}>
        <div className="ucontainer">
          <ul className="uresponsive-table">
            <li className="utable-header">
              <div className="ucol ucol-1">Product</div>
              <div className="ucol ucol-2">Name</div>
              <div className="ucol ucol-3">Price</div>
              <div className="ucol ucol-4">Category</div>
              <div className="ucol ucol-5">Age</div>
              <div className="ucol ucol-6">Placed On</div>
            </li>
            {deleteModal && <DeleteProduct closeDltModal={closeDltModal} itemDelete={itemDelete}  index={idxx}/>}
            {deletedProducts.map((product, index) => {
              return <li className="utable-row">
                  <div className="ucol ucol-1">
                      <Link to={`/product/${product._id}`}>
                      <img className="uns" src={product.imageURL[0]} alt="Img" />
                      </Link>
                  </div>
                  <div className="ucol ucol-2">{product.name}</div>
                  <div className="ucol ucol-3">{product.cost}</div>
                  <div className="ucol ucol-4">{product.category}</div>
                  <div className="ucol ucol-5">{2024-product.buyYear}</div>
                  <div className="ucol ucol-6">{product.placedOn}</div>
                  {/* {editModal && <EditProduct closeModal={closeModal} item={editItem}/>} */}
            </li>
            })}
          </ul>
          </div>
        </div>
    </div>
</div>
    
    
    
}

export default UsersProducts;