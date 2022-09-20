async function loadAllProfiles() {
    let data = await getStorageData("profiles");
    let profilesDiv = $("#profiles");
    console.log($("#profiles"));
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
        <button class="col-6 btn btn-primary applyButton" data-token="${profile.token}">Apply</button>
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