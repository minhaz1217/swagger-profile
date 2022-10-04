import React, { useState } from "react";
import { Link, Redirect, useHistory, useNavigate, Navigate } from "react-router-dom"
import { saveProfile } from "../services/SwaggerProfileService";

function AddNewProfile() {
    const [name, setName] = useState("0");
    const [nameValidated, setNameValidated] = useState(false);
    const [displayOrder, setDisplayOrder] = useState(0);
    const [displayOrderValidated, setDisplayOrderValidated] = useState(true);
    const [token, setToken] = useState("0");
    const [tokenValidated, setTokenValidated] = useState(false);
    const [redirectToShowAllProfile, setRedirectToShowAllProfile] = useState(false);
    const saveToken = async () => {
        var profile = {
            name: name,
            token: token,
            displayOrder: Number(displayOrder)
        }
        let profileSaved = await saveProfile(profile);
        if (profileSaved) {
            setRedirectToShowAllProfile(true);
        }
    }

    const validateNameField = (e) => {
        setName(e.target.value);
        nameFieldValidation(e.target.value);
    }

    const nameFieldValidation = (value) => {
        if (value === "" || value === null) {
            setNameValidated(false);
            return false;
        } else {
            setNameValidated(true);
            return true;
        }
    }

    const validateTokenField = (e) => {
        setToken(e.target.value);
        tokenFieldValidation(e.target.value);
    }

    const tokenFieldValidation = (value) => {
        if (value === "" || value === null) {
            setTokenValidated(false);
            return false;
        } else {
            setTokenValidated(true);
            return true;
        }
    }

    const validateDisplayOrderField = (e) => {
        setDisplayOrder(e.target.value);
        displayOrderFieldValidation(e.target.value);

    }

    const displayOrderFieldValidation = (value) => {
        if (value === "" || value === null) {
            setDisplayOrderValidated(false);
            return false;
        } else {
            setDisplayOrderValidated(true);
            return true;
        }
    }

    const clickedSaveButton = async () => {
        if (nameFieldValidation(name) && tokenFieldValidation(token) && displayOrderFieldValidation(displayOrder)) {
            await saveToken();
        }
    }



    return (
        <div className="container m-2" style={{ width: '20em' }}>
            {redirectToShowAllProfile && <Navigate to="/" />}
            <Link to="/" className="btn btn-primary" title="Show All Profiles"><i className="bi bi-list-ul"></i></Link>
            <h1>Add new profile </h1>
            <form>
                <div>
                    <div className="mb-3">
                        <input type="text" className="form-control" id="name" placeholder="Name" value={name} onChange={validateNameField} required />
                        {!nameValidated && <div className="text-danger mt-1">Please enter a name.</div>}

                    </div>
                    <div className="mb-3">
                        <textarea className="form-control" id="token" rows="3" placeholder="Token" value={token} onChange={validateTokenField} required></textarea>
                        {!tokenValidated && <div className="text-danger mt-1">Please enter a token.</div>}
                    </div>
                    <div className="mb-3">
                        <input type="number" className="form-control" id="displayOrder" placeholder="Display Order" value={displayOrder} onChange={validateDisplayOrderField} required />
                        {!displayOrderValidated && <div className="text-danger mt-1">Please enter a display order(number).</div>}
                    </div>
                    <input type="button" className="btn btn-outline-primary form-control mb-3" value="Save" onClick={clickedSaveButton} />
                </div>
            </form>
        </div>
    );
}


export default AddNewProfile;