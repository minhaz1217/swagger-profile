import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllProfiles } from '../../services/SwaggerProfileService';
import IF from '../../shared-components/IF';
import Profile from './Profile';
const ShowAllProfiles = () => {
  const [profiles, setProfiles] = useState(null);

  const getProfiles = () => {
    getAllProfiles().then((profiles) => {
      setProfiles(profiles);
    });
  };

  useEffect(() => {
    getProfiles();
  }, []);
  return (
    <div>
      <div className="container">
        <div className="m-2" style={{ width: '20em' }}>
          <h1>
            All Profiles &nbsp;
            <Link
              to="/add-new-profile"
              className="btn btn-success"
              title="Add new profile"
            >
              <i className="bi bi-plus-circle"></i>
            </Link>
          </h1>
          <div id="profiles">
            <IF condition={profiles == null}>
              <div>No profiles are present, please add new profile.</div>
            </IF>
            {
              profiles?.map((profile, index) => {
                return <Profile
                  profile={profile}
                  onProfileChangeCallback={getProfiles}
                  key={index}
                />;
              })
            }
          </div>
        </div>
      </div>

    </div>
  );
};


export default ShowAllProfiles;
