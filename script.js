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

// =========================
// SHOW / HIDE PASSWORD
// =========================

const togglePassword = document.getElementById("togglePassword");

if (togglePassword) {

    togglePassword.addEventListener("click", () => {

        const password = document.getElementById("password");
        const icon = togglePassword.querySelector("i");

        if (password.type === "password") {

            password.type = "text";
            icon.classList.remove("fa-eye");
            icon.classList.add("fa-eye-slash");

        } else {

            password.type = "password";
            icon.classList.remove("fa-eye-slash");
            icon.classList.add("fa-eye");

        }

    });

}



// =========================
// BUTTON LOADING EFFECT
// =========================

if (loginForm) {

    loginForm.addEventListener("submit", () => {

        const btn = document.querySelector(".btn-login");

        btn.innerHTML =
        '<i class="fa-solid fa-spinner fa-spin"></i> Signing In...';

        btn.disabled = true;

    });

}



// =========================
// ENTER KEY LOGIN
// =========================

document.addEventListener("keypress", function(e){

    if(e.key === "Enter"){

        const form = document.getElementById("loginForm");

        if(form){

            form.requestSubmit();

        }

    }

});



// =========================
// INPUT ANIMATION
// =========================

document.querySelectorAll(".form-control").forEach(input=>{

    input.addEventListener("focus",()=>{

        input.parentElement.style.transform="scale(1.02)";

    });

    input.addEventListener("blur",()=>{

        input.parentElement.style.transform="scale(1)";

    });

});



// =========================
// FADE IN LOGIN CARD
// =========================

window.addEventListener("load",()=>{

    const card=document.querySelector(".login-card");

    if(card){

        card.style.opacity="0";
        card.style.transform="translateY(40px)";

        setTimeout(()=>{

            card.style.transition=".8s";
            card.style.opacity="1";
            card.style.transform="translateY(0)";

        },200);

    }

});



// =========================
// REMEMBER EMAIL
// =========================

const remember=document.getElementById("remember");

if(remember){

    const email=document.getElementById("email");

    email.value=localStorage.getItem("savedEmail") || "";

    remember.checked=email.value!=="";

    remember.addEventListener("change",()=>{

        if(remember.checked){

            localStorage.setItem("savedEmail",email.value);

        }else{

            localStorage.removeItem("savedEmail");

        }

    });

    email.addEventListener("keyup",()=>{

        if(remember.checked){

            localStorage.setItem("savedEmail",email.value);

        }

    });

}