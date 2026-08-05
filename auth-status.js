import { auth } from "./firebase.js";

import {
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";


onAuthStateChanged(auth, (user)=>{

    const loginBtn = document.getElementById("loginBtn");
    const logoutBtn = document.getElementById("logoutBtn");
    const welcomeUser = document.getElementById("welcomeUser");


    if(user){

        // Login button hide
        if(loginBtn){
            loginBtn.style.display = "none";
        }


        // Logout show
        if(logoutBtn){
            logoutBtn.style.display = "inline-block";
        }


        // User name show
        if(welcomeUser){

            welcomeUser.innerHTML =
            "👤 " + (user.displayName || user.email);

        }


    }else{


        if(loginBtn){
            loginBtn.style.display = "inline-block";
        }


        if(logoutBtn){
            logoutBtn.style.display = "none";
        }


        if(welcomeUser){
            welcomeUser.innerHTML="";
        }

    }

});


// Logout

const logoutBtn = document.getElementById("logoutBtn");

if(logoutBtn){

logoutBtn.onclick = async ()=>{

    await signOut(auth);

    window.location.href="login.html";

}

}
// =========================
// PDF Download Protection
// =========================

document.querySelectorAll(".pdf-download").forEach(btn => {

    btn.addEventListener("click", (e) => {

        const user = auth.currentUser;

        if (!user) {

            e.preventDefault();

            alert("Please login first to download the PDF.");

            window.location.href = "login.html";

        }

    });

});