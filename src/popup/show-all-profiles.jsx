import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import jQuery from "jquery";
const ShowAllProfiles = () => {
    const [profiles, setProfiles] = useState({});
    useEffect(() => {
    }, []);
    return (
        <div>
            <div className="container">
                <div className="m-2" style={{ width: "20em" }}>
                    <h1>All Profiles <Link to="/add-new-profile" className="btn btn-success" title="Add new profile"><i className="bi bi-plus-circle"></i></Link></h1>
                    <div id="profiles"></div>
                </div>
            </div>

        </div>
    );
}


export default ShowAllProfiles;