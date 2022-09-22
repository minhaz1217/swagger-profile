async function loadAllProfiles() {
    let data = await getStorageData("profiles");
    let profilesDiv = $("#profiles");
    if (!(data == null || data?.profiles == null || !Array.isArray(data?.profiles))) {
        // we have some profiles
        let profilesHtml = "";

        data.profiles.sort((a, b) => { return a.displayOrder >= b.displayOrder });
        data.profiles.forEach((profile) => {
            profilesHtml += makeSingleProfile(profile);
        });
        
        profilesDiv.html(profilesHtml);
        afterProfilesLoads();
    } else {
        profilesDiv.html("No profiles are present, please add new profile.");
    }
}

function makeSingleProfile(profile) {
    return `
    <div class="mb-2 row">
    <div class="h2 col-6">${profile.name}</div>
    <div class="col-6">
        <button class="btn btn-success me-1 applyButton" data-token="${profile.token}" title="Apply profile"><i class="bi bi-check2-circle"></i></button>
        <button class="btn btn-warning me-1 applyButton" data-token="${profile.token}" title="Edit"><i class="bi bi-pencil-square"></i></button>
        <button class="btn btn-danger applyButton" data-token="${profile.token}" title="Delete"><i class="bi bi-trash"></i></button>
    </div>
    </div>
        `;
}

function afterProfilesLoads() {
    $(".applyButton").on("click", (e) => {
        applyToken(e.currentTarget.getAttribute("data-token"));
    });
}

function applyToken(token) {
    if(token == null || token == ""){
        return;
    }
    changeBearerToken(token);
}

loadAllProfiles();