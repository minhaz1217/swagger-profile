import React from "react";
import {render} from "react-dom"

function Popup(){
    return (
        <div>
            <div class="container">

                <div class="m-2" style={{width: "20em"}}>
                    <h1>All Profiles <a href="./add-new-profile.html" class="btn btn-success" title="Add new profile"><i class="bi bi-plus-circle"></i></a></h1>
                    <div id="profiles"></div>
                </div>
            </div>

            <script src="../public/jquery-3.6.1.min.js"></script>
            <script src="../public/bootstrap.bundle.min.js" integrity="sha384-u1OknCvxWvY5kfmNBILK2hRnQC3Pr17a+RTT6rIHI7NnikvbZlHgTPOOmMi466C8" crossorigin="anonymous"></script>
            <script src="../utils/id-generator.js"></script>
            <script src="../utils/storage.js"></script>
            <script src="../utils/token-changer.js"></script>
            <script src="./show-all-profiles.js"></script>
        </div>
    );
}


render(<Popup />, document.getElementById("react-app"));