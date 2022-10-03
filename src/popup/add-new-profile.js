document.querySelector("#saveToken").addEventListener('click', saveToken);

async function saveToken() {
    if (!validateInputFields()) {
        return;
    }
    var profile = {
        name: $("#name").val(),
        token: $("#token").val(),
        displayOrder: Number($("#displayOrder").val())
    }
    await addNewProfile(profile);
}

function validateNameField() {
    let nameField = $("#name");
    let nameError = $("#error-name");
    let error = false;

    if (nameField.val() == null || nameField.val() == "") {
        let errorMessage = "Please enter a name for the profile";
        nameError.html(errorMessage);
        nameError.removeClass("visually-hidden");
        nameField.addClass("is-invalid");
        error = true;
    } else {
        nameError.addClass("visually-hidden");
        nameField.removeClass("is-invalid");
    }
    return !error; // error == true means validation failed so we return false from the validation;
}

function validateTokenField() {
    let tokenField = $("#token");
    let tokenError = $("#error-token");
    let error = false;

    if (tokenField.val() == null || tokenField.val() == "") {
        let errorMessage = "Please enter a token for the profile";
        tokenError.html(errorMessage);
        tokenError.removeClass("visually-hidden");
        tokenField.addClass("is-invalid");
        error = true;
    } else {
        tokenError.addClass("visually-hidden");
        tokenField.removeClass("is-invalid");
    }
    return !error; // error == true means validation failed so we return false from the validation;
}

function validateDisplayOrder() {
    let displayOrderField = $("#displayOrder");
    let displayOrderError = $("#error-displayOrder");
    let error = false;

    if (displayOrderField.val() == null || displayOrderField.val() == "") {
        let errorMessage = "Please enter a display order(number) for the profile";
        displayOrderError.html(errorMessage);
        displayOrderError.removeClass("visually-hidden");
        displayOrderField.addClass("is-invalid");
        error = true;
    } else {
        displayOrderError.addClass("visually-hidden");
        displayOrderField.removeClass("is-invalid");
    }
    return !error; // error == true means validation failed so we return false from the validation;
}

function validateInputFields() {
    let nameFieldValidated = validateNameField();
    let tokenFieldValidated = validateTokenField();
    let displayOrderFieldValidated = validateDisplayOrder();
    if (!nameFieldValidated || !tokenFieldValidated || !displayOrderFieldValidated) {
        return false;
    }
    return true;
}

$(document).ready(function () {
    $("#name").on("keyup", validateNameField);
    $("#token").on("keyup", validateTokenField);
    $("#displayOrder").on("keyup", validateDisplayOrder);
});

validateInputFields();

// TODO: in successful save, show success message and the go back to previous screen.