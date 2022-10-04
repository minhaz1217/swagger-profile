import React from "react";
import { Link } from "react-router-dom"


const saveToken = ()=>{
    console.log("SAVE TOKEN");
}

function AddNewProfile() {
    return (
        <div class="container m-2" style={{ width: '20em' }}>
            <Link to="/" class="btn btn-primary" title="Show All Profiles"><i class="bi bi-list-ul"></i></Link>
            <h1>Add new profile </h1>
            <form>
                <div>
                    <div class="mb-3">
                        <input type="text" class="form-control" id="name" placeholder="Name" required />
                        <div class="invalid-feedback visually-hidden" id="error-name"></div>
                    </div>
                    <div class="mb-3">
                        <textarea class="form-control" id="token" rows="3" placeholder="Token" required></textarea>
                        <div class="invalid-feedback visually-hidden" id="error-token"></div>
                    </div>
                    <div class="mb-3">
                        <input type="number" class="form-control" id="displayOrder" placeholder="Display Order" required />
                        <div class="invalid-feedback visually-hidden" id="error-displayOrder"></div>
                    </div>
                    <input type="button" class="btn btn-outline-primary form-control mb-3" value="Save" id="saveToken" onClick={saveToken}/>
                </div>
            </form>
        </div>
    );
}


export default AddNewProfile;