
import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {deleteProfile} from '../services/SwaggerProfileService.js';
import {changeBearerToken} from '../services/TokenService.js';
const Profile = ({profile, onProfileChangeCallback}) => {
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);


  const onClickApplyButton = () => {
    if (profile?.token == null || profile?.token == '') {
      return;
    }
    changeBearerToken(profile.token);
  };
  const onClickEditButton = () => {
    navigate('/add-new-profile', {
      state: {
        profile: profile,
      },
    });
  };
  const onClickDeleteButton = async () => {
    setShowConfirm(true);
  };


  const onConfirmAccept = async () => {
    if (profile?.token == null || profile?.token == '') {
      return;
    }
    const profilesDeleted = await deleteProfile(profile?.id);
    setShowConfirm(false);
    if (profilesDeleted === true) {
      onProfileChangeCallback();
    }
  };
  const onConfirmReject = () => {
    setShowConfirm(false);
  };
  return (
    <div>

      {!showConfirm &&
                <div className="mb-2 row">
                  <div className="h2 col-6">{profile.name}</div>
                  <div className="col-6">
                    <button className="btn btn-success me-1 applyButton" data-token={profile.token} title="Apply profile" onClick={onClickApplyButton} >
                      <i className="bi bi-check2-circle"></i>
                    </button>
                    <button className="btn btn-warning me-1 editButton" data-id={profile.id} title="Edit" onClick={onClickEditButton}>
                      <i className="bi bi-pencil-square"></i>
                    </button>
                    <button className="btn btn-danger deleteButton" data-id={profile.id} title="Delete" onClick={onClickDeleteButton}>
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                </div>
      }
      {showConfirm &&
                <div className="mb-2 row">
                  <div className="h2 col-6">Confirm?</div>
                  <div className="col-6">
                    <button className="btn btn-success me-1" data-token={profile.token} title="Yes" onClick={onConfirmAccept} >
                      <i className="bi bi-check-lg"></i>
                    </button>
                    <button className="btn btn-danger" title="No" onClick={onConfirmReject}>
                      <i className="bi bi-x-lg"></i>
                    </button>
                  </div>
                </div>
      }
    </div>
  );
};

export default Profile;
