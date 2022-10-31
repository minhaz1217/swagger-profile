import React, { useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { createProfile, deleteProfile, updateProfile } from "../../services/SwaggerProfileService";
import IF from "../../shared-components/IF";
import { Profile } from "../models/Profile";

const AddNewProfile = (): JSX.Element => {
  const [id, setId] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [token, setToken] = useState<string>("");
  const [displayOrder, setDisplayOrder] = useState<number>(0);

  const [nameValidated, setNameValidated] = useState<boolean>(false);
  const [tokenValidated, setTokenValidated] = useState<boolean>(false);
  const [displayOrderValidated, setDisplayOrderValidated] = useState<boolean>(true);

  const [updatedOnce, setUpdatedOnce] = useState<boolean>(false);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);

  const location = useLocation<LocationState>();
  const history = useHistory();

  interface LocationState {
    pathName: string,
    profile: Profile
  }

  useEffect(() => {
    if (location.state?.profile != null && !updatedOnce) {
      setName(location.state.profile.name);
      setDisplayOrder(location.state.profile.displayOrder);
      setToken(location.state.profile.token);
      setId(location.state.profile.id);
      setUpdatedOnce(true);
    }
    allFieldsValidated();
  });

  const saveToken = async () => {
    const profile = new Profile(name, token, Number(displayOrder));
    let profileSaved = false;
    if (id !== null && id !== "") {
      profile.id = id;
      profileSaved = await updateProfile(profile);
    } else {
      profileSaved = await createProfile(profile);
    }

    if (profileSaved) {
      goToShowAllPage();
    }
  };

  const goToShowAllPage = () => {
    history.push("/");
  };

  const validateNameField = (e) => {
    setName(e.target.value);
    nameFieldValidation(e.target.value);
  };

  const nameFieldValidation = (value) => {
    if (value === "" || value === null) {
      setNameValidated(false);
      return false;
    } else {
      setNameValidated(true);
      return true;
    }
  };

  const validateTokenField = (e) => {
    setToken(e.target.value);
    tokenFieldValidation(e.target.value);
  };

  const tokenFieldValidation = (value) => {
    if (value === "" || value === null) {
      setTokenValidated(false);
      return false;
    } else {
      setTokenValidated(true);
      return true;
    }
  };

  const validateDisplayOrderField = (e) => {
    setDisplayOrder(e.target.value);
    displayOrderFieldValidation(e.target.value);
  };

  const displayOrderFieldValidation = (value) => {
    if (value === "" || value === null) {
      setDisplayOrderValidated(false);
      return false;
    } else {
      setDisplayOrderValidated(true);
      return true;
    }
  };

  const allFieldsValidated = () => {
    const nameValidated = nameFieldValidation(name);
    const tokenFieldValidated = tokenFieldValidation(token);
    const displayOrderValidated = displayOrderFieldValidation(displayOrder);
    if (nameValidated && tokenFieldValidated && displayOrderValidated) {
      return true;
    }
    return false;
  };

  const onClickSaveButton = async () => {
    if (allFieldsValidated()) {
      await saveToken();
    }
  };

  const onClickDeleteButton = async () => {
    setShowConfirm(true);
  };

  const onConfirmAccept = async () => {
    if (id == null || id == "") {
      return;
    }
    const profilesDeleted = await deleteProfile(id);
    setShowConfirm(false);
    if (profilesDeleted === true) {
      goToShowAllPage();
    }
  };

  const onConfirmReject = () => {
    setShowConfirm(false);
  };


  return (
    <div className="container m-2" style={{ width: "20em" }}>

      <div className="row m-0">

        <Link to="/" className="btn btn-primary col-auto me-auto" title="Show All Profiles">
          <i className="bi bi-list-ul"></i>
        </Link>
        <div className="col-auto">
          <IF condition={!showConfirm && updatedOnce}>
            <button className="btn btn-danger col-auto" title="Delete" onClick={onClickDeleteButton}>
              <i className="bi bi-trash"></i>
            </button>
          </IF>

          <IF condition={showConfirm}>
            <div className="row">
              <div className="h2 col-6">Confirm?</div>
              <div className="col-6">
                <button className="btn btn-success me-1" title="Yes" onClick={onConfirmAccept} >
                  <i className="bi bi-check-lg"></i>
                </button>
                <button className="btn btn-danger" title="No" onClick={onConfirmReject}>
                  <i className="bi bi-x-lg"></i>
                </button>
              </div>
            </div>
          </IF>
        </div>

      </div>
      <IF condition={updatedOnce}>
        <h1>Edit profile </h1>
      </IF>
      <IF condition={!updatedOnce}>
        <h1>Add new profile </h1>
      </IF>
      <form>
        <div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Name"
              value={name}
              onChange={validateNameField}
              required
            />
            <IF condition={!nameValidated}>
              <div className="text-danger mt-1">Please enter a name.</div>
            </IF>
          </div>
          <div className="mb-3">
            <textarea
              className="form-control"
              id="token"
              placeholder="Token"
              value={token}
              onChange={validateTokenField}
              rows={7}
              required
            ></textarea>
            <IF condition={!tokenValidated}>
              <div className="text-danger mt-1">Please enter a token.</div>
            </IF>
          </div>
          <div className="mb-3">
            <input
              type="number"
              className="form-control"
              id="displayOrder"
              placeholder="Display Order"
              value={displayOrder}
              onChange={validateDisplayOrderField}
              required
            />
            <IF condition={!displayOrderValidated}>
              <div className="text-danger mt-1">
                Please enter a display order(number).
              </div>
            </IF>
          </div>
          <input
            type="button"
            className="btn btn-outline-primary form-control mb-3"
            value="Save"
            onClick={onClickSaveButton}
          />
        </div>
      </form>
    </div>
  );
};


export default AddNewProfile;
