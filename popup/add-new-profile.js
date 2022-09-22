document.querySelector("#saveToken").addEventListener('click', saveToken);

async function saveToken() {
    var profile = {
        name: $("#name").val(),
        token: $("#token").val(),
        displayOrder: $("#displayOrder").val()
    }
    await addNewProfile(profile);
}

// TODO: add validation for empty
// TODO: in successful save, show success message and the go back to previous screen.
// TODO: remove all online css and js, use only offline css and js (icons)