import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import jQuery from "jquery";
import { getAllProfiles } from "../services/SwaggerProfileService";
import Profile from "./Profile.jsx"
import { deleteProfile } from "../services/SwaggerProfileService.js";

const ShowAllProfiles = () => {
    const [profiles, setProfiles] = useState(null);

    // TODO: what is the best place to use this listener?.
    const listenForMessageFromBrowserHTML = () => {
        browser.runtime.onMessage.addListener(messageFromBrowserHTML);
    }
    const messageFromBrowserHTML = async (message) => {
        if (message?.type === "delete") {
            await deleteProfileConfirmationReceived(message?.data);
        }
    }

    const deleteProfileConfirmationReceived = async (profileId) => {
        if (profileId == null || profileId == "") {
            return;
        }
        await deleteProfile(profileId);
    }

    useEffect(() => {
        getAllProfiles().then((profiles) => {
            setProfiles(profiles);
            if (profiles != null || profiles?.length > 0) {
                listenForMessageFromBrowserHTML();
            }
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