import React, { useEffect, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom"
import { createProfile, updateProfile } from "../services/SwaggerProfileService";

const AddNewProfile = (props) => {
    const [name, setName] = useState("0");
    const [id, setId] = useState("");
    const [nameValidated, setNameValidated] = useState(false);
    const [displayOrder, setDisplayOrder] = useState(0);
    const [displayOrderValidated, setDisplayOrderValidated] = useState(true);
    const [token, setToken] = useState("0");
    const [tokenValidated, setTokenValidated] = useState(false);
    const [redirectToShowAllProfile, setRedirectToShowAllProfile] = useState(false);
    const location = useLocation();
    const [updatedOnce, setUpdatedOnce] = useState(false);

    const navigate = useNavigate();


    useEffect(() => {
        console.log(location.state);
        if (location.state?.profile != null && !updatedOnce) {
            setName(location.state.profile.name);
            setDisplayOrder(location.state.profile.displayOrder);
            setToken(location.state.profile.token);
            setId(location.state.profile.id);
            setUpdatedOnce(true);
        }
    });

    const saveToken = async () => {
        var profile = {
            name: name,
            token: token,
            displayOrder: Number(displayOrder)
        }
        let profileSaved = false;
        if (id !== null && id !== "") {
            profile.id = id;
            profileSaved = await updateProfile(profile);
        } else {
            profileSaved = await createProfile(profile);
        }

        if (profileSaved) {
            navigate("/");
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

    const onClickSaveButton = async () => {
        if (nameFieldValidation(name) && tokenFieldValidation(token) && displayOrderFieldValidation(displayOrder)) {
            await saveToken();
        }
    }



    return (
        <div className="container m-2" style={{ width: '20em' }}>
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
                    <input type="button" className="btn btn-outline-primary form-control mb-3" value="Save" onClick={onClickSaveButton} />
                </div>
            </form>
        </div>
    );
}


export default AddNewProfile;