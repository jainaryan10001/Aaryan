import {
    auth,
    provider,
    signInWithPopup,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
} from "./firebase.js";


import {
    onAuthStateChanged,
    updateProfile
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";



// =========================
// REGISTER
// =========================

const registerForm = document.getElementById("registerForm");


if(registerForm){

    registerForm.addEventListener("submit", async(e)=>{

        e.preventDefault();


        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;



        if(password !== confirmPassword){

            alert("Passwords do not match!");
            return;

        }



        try{


            const userCredential =
            await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );


            await updateProfile(
                userCredential.user,
                {
                    displayName:name
                }
            );


            alert("Registration Successful!");

            window.location.href="index.html";



        }
        catch(error){

            alert(error.message);

        }


    });

}





// =========================
// LOGIN
// =========================


const loginForm = document.getElementById("loginForm");


if(loginForm){


    loginForm.addEventListener("submit",async(e)=>{


        e.preventDefault();


        const email =
        document.getElementById("email").value.trim();


        const password =
        document.getElementById("password").value;



        try{


            await signInWithEmailAndPassword(
                auth,
                email,
                password
            );


            alert("Login Successful!");

            window.location.href="index.html";



        }
        catch(error){

            alert(error.message);

        }


    });


}





// =========================
// GOOGLE LOGIN
// =========================


const googleBtn = document.getElementById("googleLogin");


if(googleBtn){


    googleBtn.addEventListener("click",async()=>{


        try{


            await signInWithPopup(
                auth,
                provider
            );


            alert("Google Login Successful!");


            window.location.href="index.html";



        }
        catch(error){

            alert(error.message);

        }


    });


}





// =========================
// LOGOUT
// =========================


document.addEventListener("click",async(e)=>{


    if(e.target.id==="logoutBtn"){


        await signOut(auth);


        alert("Logged Out Successfully");


        window.location.href="login.html";


    }


});






// =========================
// USER STATUS
// =========================


onAuthStateChanged(auth,(user)=>{


    const loginBtn =
    document.getElementById("loginBtn");


    const logoutBtn =
    document.getElementById("logoutBtn");


    const welcomeUser =
    document.getElementById("welcomeUser");




    if(user){


        // Hide Login button

        if(loginBtn){

            loginBtn.style.display="none";

        }



        // Show Logout button

        if(logoutBtn){

            logoutBtn.style.display="inline-block";

        }



        // Show User Name

        if(welcomeUser){

            welcomeUser.innerHTML =
            "👤 " + 
            (user.displayName || user.email);

        }



    }
    else{


        if(loginBtn){

            loginBtn.style.display="inline-block";

        }



        if(logoutBtn){

            logoutBtn.style.display="none";

        }



        if(welcomeUser){

            welcomeUser.innerHTML="";

        }


    }



});







// =========================
// LOGIN REQUIRED DOWNLOAD
// =========================


function checkLogin(file){



    onAuthStateChanged(auth,(user)=>{


        if(user){


            // Download file

            window.location.href=file;


        }
        else{


            alert("Please Login First");


            window.location.href="login.html";


        }



    });



}



// Make function available for HTML button

window.checkLogin = checkLogin;