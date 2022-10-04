import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import jQuery from "jquery";
import { getStorageData } from "../utils/storage";
const ShowAllProfiles = () => {
    const [profiles, setProfiles] = useState({});
    useEffect(() => {
        // let profiles = await getStorageData("profiles");
        // console.log("Profiles", profiles);
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