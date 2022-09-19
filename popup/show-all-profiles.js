async function loadAllProfiles(){
    let data = await getStorageData("profiles");
    let profilesDiv = $("#profiles");
    if ( !(data == null || data?.profiles == null || !Array.isArray(data?.profiles)) ) {
        // we have some profiles
        let profilesHtml = "";
        
        data.profiles.sort((a, b)=> {return a.displayOrder >= b.displayOrder});
        data.profiles.forEach( (profile)=>{
            profilesHtml += makeSingleProfile(profile);
        } );
        profilesDiv.html(profilesHtml);
    }else{
        profilesDiv.html("No profiles are present, please insert a profiles");
    }
}

function makeSingleProfile(profile){
    return `
    <div class="mb-2 row">
        <div class="h2 col-6">${profile.name}</div>
        <button class="col-6 btn btn-primary">Apply</button>
    </div>
        `;
}

loadAllProfiles();