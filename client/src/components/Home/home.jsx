import React, { useEffect, useState, getState } from "react";
import { useNavigate, Link} from "react-router-dom";
import axios from 'axios';
import Item from "../Item/Item";
import "../Home/home.css";
// import logout  from "../Functions/logout";

import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from '../toast';
import { toast } from "react-toastify";

function Home(){
    //Imports
    const navigate = useNavigate();
    
    //Use States
    const [items, setItems] = useState([]);
    const [username, setUsername] = useState();
    const [age_filter, setAge_filter] = useState([]);
    const [display_items, setDisplay_items] = useState([]);
    const [cat_Set, setCatSet] = useState(new Set());
    const [age_Set, setAgeSet] = useState(new Set());
    const [search_filter, setSearch_filter] = useState("");
    
    const [items_1, setItems1] = useState([]);

    // setSearch_filter("");
    //Use Effects
    useEffect(()=>{
        const token = localStorage.getItem('token');
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/`, { headers : {
            Authorization: token,
        }}).then(async (res) =>{
            setUsername(res.data.username);
            setItems(res.data.items);
            setItems1(res.data.items);
            setDisplay_items(res.data.items);
        })
        .catch((error) => 
        {
            navigate('/login');
        });
    },[]);
    
    //On Click Functions
    
    function logout(){
        localStorage.removeItem('token');
        navigate('/login');
    }
    
    async function category_checkbox(event) {
        if(event.target.checked)
        {
            const newSet = cat_Set;
            const y = await newSet.add(event.target.name);
            setCatSet(newSet);
            
            filter_display_items(search_filter);
        }
        else
        {
            const newSet = cat_Set;
            newSet.delete(event.target.name);
            setCatSet(newSet);
            
            filter_display_items(search_filter);
        }
    }
    
    async function age_checkbox(event) {
        if(event.target.checked)
        {
            const newSet = age_Set;
            const y = await newSet.add(event.target.name);
            setAgeSet(newSet);
            
            filter_display_items(search_filter);
        }
        else
        {
            const newSet = age_Set;
            const y = await newSet.delete(event.target.name);
            setAgeSet(newSet);
            filter_display_items(search_filter);
        }
    }
    
    function filter_display_items(srch_filter) {
        setDisplay_items(items.filter((item) => {
            if(item.name.toLowerCase().includes(srch_filter))
            {
                if(cat_Set.has(item.category) && age_Set.has(item.age) )
                    return true;
                    if((cat_Set.size === 0 || cat_Set.has("category_all"))&& age_Set.has(item.age))
                    return true;
                if(cat_Set.has(item.category) && (age_Set.size === 0 || age_Set.has("age_all")) )
                    return true;
                if((cat_Set.size === 0 || cat_Set.has("category_all")) && (age_Set.size === 0 || age_Set.has("age_all")))
                    return true;
                return false;
            }
            else
            {
                return false;
            }
        }));    
    }
    async function search_box_changed(event){
        const val = event.target.value.toLowerCase();
        setSearch_filter(val);
        filter_display_items(val);
    }
    return (<div>
        <div className="total">
            <ToastContainer/>
            <div className="nav">
                <Link style={{"textDecoration":"none"}} to={'/'} >
                <h1 className="appName">BUY NOW</h1>
                </Link>
                <div  className="routes">
                    {/* <i>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-bell" viewBox="0 0 16 16">
                        <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z"/>
                    </svg>
                    </i> */}
                    <Link to={'/profile'} >
                    <span className="username">
                        {username}
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
            <div className="down"><div className="divide">
                <div className="filters">
                    <div className="heading">
                        <span className="heading_name">Filters</span>
                    </div>
                    <div className="category">
                        <span className="category-text">Category</span>
                        <div className="category-items">
                            <input type="checkbox" name="category_all" onChange={category_checkbox} className="cat-items-input" />
                            <span>All</span>
                        </div>
                        <div className="category-items">
                            <input type="checkbox" name="Electronics" onChange={category_checkbox} className="cat-items-input" />
                            <span>Electronics</span>
                        </div>
                        <div className="category-items">
                            <input type="checkbox" name="Clothing" onChange={category_checkbox} className="cat-items-input" />
                            <span>Clothing</span>
                        </div>
                        <div className="category-items">
                            <input type="checkbox" name="Sports" onChange={category_checkbox} className="cat-items-input" />
                            <span>Sports</span>
                        </div>
                        <div className="category-items">
                            <input type="checkbox" name="Home" onChange={category_checkbox} className="cat-items-input" />
                            <span>Home</span>
                        </div>
                    </div>
                    <div className="category">
                        <span className="category-text">Age</span>
                        <div className="category-items">
                            <input type="checkbox"  name="age_all" onChange={age_checkbox} className="cat-items-input" />
                            <span>All</span>
                        </div>
                        <div className="category-items">
                            <input type="checkbox" name="0-2" onChange={age_checkbox} className="cat-items-input" />
                            <span>0-2 Years Old</span>
                        </div>
                        <div className="category-items">
                            <input type="checkbox" name="2-4" onChange={age_checkbox} className="cat-items-input" />
                            <span>2-4 Years Old</span>
                        </div>
                        <div className="category-items">
                            <input type="checkbox" name="4-6" onChange={age_checkbox} className="cat-items-input" />
                            <span>4-6 Years Old</span>
                        </div>
                        <div className="category-items">
                            <input type="checkbox" name="6+" onChange={age_checkbox} className="cat-items-input" />
                            <span>6+ Years</span>
                        </div>
                    </div>
                    {/* <div className="category">
                        <span className="category-text">Age</span>
                        <div className="category-items">
                            <input type="checkbox" className="cat-items-input" />
                            <span>All</span>
                        </div>
                        <div className="category-items">
                            <input type="checkbox" className="cat-items-input" />
                            <span>0-2 Years Old</span>
                        </div>
                        <div className="category-items">
                            <input type="checkbox" className="cat-items-input" />
                            <span>2-4 Years Old</span>
                        </div>
                        <div className="category-items">
                            <input type="checkbox" className="cat-items-input" />
                            <span>4-6 Years Old</span>
                        </div>
                        <div className="category-items">
                            <input type="checkbox" className="cat-items-input" />
                            <span>6+ Years</span>
                        </div>
                    </div> */}
                </div>
                <div className="Items">
                    <div className="search">
                        <input type="text" onChange={search_box_changed} placeholder="Search Products" className="search-input"/>
                    </div>
                    {
                        display_items.map((item, index) =>{
                            return (
                                <Item 
                                key = {index}
                                prod_link = {item.link[0]}
                                prod_name = {item.name}
                                prod_desc = {item.description}
                                prod_price = {item.cost}

                                prod_url = {item.id}
                                prod_category = {item.category}
                                prod_age = {item.age}
                                />
                            );
                        })
                    }
                    <div>

                    {/* <div className="item-box" >
                        <div className="item-box2" >
                            <div>
                            <img className="prodImg" src="http://res.cloudinary.com/sathya195/image/upload/v1677954991/f0bq0rkosegv1dwsiz4z.jpg" alt="product" />
                                <div className="prodInfo" >
                                <span className="prodName" >Macbook Pro</span>
                                <p className="prodDes" >An apple product</p>
                                <div className="line" ></div>
                                <span className="prodRate" >$20000</span>
                                </div>
                                </div>
                                </div>
                                </div>
                                <div className="item-box" >
                        <div className="item-box2" >
                        <div>
                        <img className="prodImg" src="http://res.cloudinary.com/sathya195/image/upload/v1677954991/f0bq0rkosegv1dwsiz4z.jpg" alt="product" />
                        <div className="prodInfo" >
                        <span className="prodName" >Macbook Pro</span>
                        <p className="prodDes" >An apple product</p>
                        <div className="line" ></div>
                        <span className="prodRate" >$20000</span>
                        </div>
                        </div>
                        </div>
                        </div>
                        <div className="item-box" >
                        <div className="item-box2" >
                        <div>
                        <img className="prodImg" src="http://res.cloudinary.com/sathya195/image/upload/v1677954991/f0bq0rkosegv1dwsiz4z.jpg" alt="product" />
                        <div className="prodInfo" >
                        <span className="prodName" >Macbook Pro</span>
                        <p className="prodDes" >An apple product</p>
                        <div className="line" ></div>
                        <span className="prodRate" >$20000</span>
                        </div>
                        </div>
                        </div>
                        </div>
                        <div className="item-box" >
                        <div className="item-box2" >
                        <div>
                        <img className="prodImg" src="http://res.cloudinary.com/sathya195/image/upload/v1677954991/f0bq0rkosegv1dwsiz4z.jpg" alt="product" />
                        <div className="prodInfo" >
                        <span className="prodName" >Macbook Pro</span>
                        <p className="prodDes" >An apple product</p>
                        <div className="line" ></div>
                        <span className="prodRate" >$20000</span>
                        </div>
                        </div>
                        </div>
                        </div>
                        <div className="item-box" >
                        <div className="item-box2" >
                        <div>
                        <img className="prodImg" src="http://res.cloudinary.com/sathya195/image/upload/v1677954991/f0bq0rkosegv1dwsiz4z.jpg" alt="product" />
                        <div className="prodInfo" >
                        <span className="prodName" >Macbook Pro</span>
                        <p className="prodDes" >An apple product</p>
                        <div className="line" ></div>
                        <span className="prodRate" >$20000</span>
                        </div>
                        </div>
                        </div>
                    </div> */}
                    </div>
                </div>
            </div></div>
        </div>
    </div>)
}

export default Home;