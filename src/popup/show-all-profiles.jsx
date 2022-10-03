import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import jQuery from "jquery";
const ShowAllProfiles = () => {

    useEffect(()=>{
        console.log("CALLING FROM INSIDE USE EFFECT");
    }, []);
    return (
        <div>
            <div class="container">
                <div class="m-2" style={{ width: "20em" }}>
                    <h1>All Profiles <Link to="/add-new-profile" class="btn btn-success" title="Add new profile"><i class="bi bi-plus-circle"></i></Link></h1>
                    <div id="profiles"></div>
                </div>
            </div>

            <script src="../utils/id-generator.js"></script>
            <script src="../utils/storage.js"></script>
            <script src="../utils/token-changer.js"></script>
            <script src="./show-all-profiles.js"></script>
        </div>
    );
}


export default ShowAllProfiles;