import ReactDOM from "react-dom";
import '../DeleteProduct/DeleteProduct.css';
import { useEffect } from "react";
const DeleteProduct = ({closeDltModal, itemDelete , index}) => {
    
    useEffect(()=>{
        document.body.style.overflowY = "hidden";
        return ()=>{
            document.body.style.overflowY = "scroll";
        }
    },[]);

    return ReactDOM.createPortal(<>
        <div className="modal-wrapperdlt" onClick={closeDltModal}>
        </div>
            <div className="modal-containerrdlt">
                <div class="containerdlt">
                    <h1>Delete Product</h1>
                    <p>Are you sure you want to delete your Product?</p>

                    <div class="clearfixdlt">
                        <button type="button" id="batan" onClick={closeDltModal} class="cancelbtndlt">Cancel</button>
                        <button type="button" id="batan" onClick={()=>itemDelete(index)} class="deletebtndlt">Delete</button>
                    </div>
                </div>
            </div>
    </>, document.getElementById("myModal"));
}

export default DeleteProduct;  