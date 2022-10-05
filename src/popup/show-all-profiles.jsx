import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import jQuery from "jquery";
import { getAllProfiles } from "../services/SwaggerProfileService";
import Profile from "./profile.jsx"

const ShowAllProfiles = () => {
    const [profiles, setProfiles] = useState(null);
    useEffect(() => {
        getAllProfiles().then((profiles) => {
            console.log("Profiles", profiles);
            setProfiles(profiles);

            profiles?.map((profile, index) => {
                <h1>HI {index}</h1>
                console.log("Name", profile.name);

            });

        });

    }, []);
    return (
        <div>
            <div className="container">
                <div className="m-2" style={{ width: "20em" }}>
                    <h1>All Profiles <Link to="/add-new-profile" className="btn btn-success" title="Add new profile"><i className="bi bi-plus-circle"></i></Link></h1>
                    <div id="profiles">
                        {profiles == null && "No profiles are present, please add new profile."}
                        {
                            profiles?.map((profile, index) => {
                                return <Profile profile={profile} key={index}></Profile>
                            })
                        }
                    </div>
                </div>
            </div>

        </div>
    );
}


export default ShowAllProfiles;