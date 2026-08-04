// =========================
// SEARCH PROJECT
// =========================

const searchInput = document.getElementById("searchInput");

if (searchInput) {

    searchInput.addEventListener("keyup", function () {

        const value = this.value.toLowerCase();

        const cards = document.querySelectorAll(".project-card");

        cards.forEach(card => {

            const text = card.innerText.toLowerCase();

            if (text.includes(value)) {

                card.parentElement.style.display = "block";

            } else {

                card.parentElement.style.display = "none";

            }

        });

    });

}

// =========================
// FILTER BUTTONS
// =========================

const filterBtns = document.querySelectorAll(".filter-btn");

filterBtns.forEach(btn => {

    btn.addEventListener("click", () => {

        filterBtns.forEach(b => b.classList.remove("active"));

        btn.classList.add("active");

        const filter = btn.innerText.toLowerCase();

        const cards = document.querySelectorAll(".project-card");

        cards.forEach(card => {

            if (filter === "all") {

                card.parentElement.style.display = "block";

            } else {

                if (card.innerText.toLowerCase().includes(filter)) {

                    card.parentElement.style.display = "block";

                } else {

                    card.parentElement.style.display = "none";

                }

            }

        });

    });

});

// =========================
// BACK TO TOP
// =========================

const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", () => {

    if (window.scrollY > 400) {

        topBtn.style.display = "block";

    } else {

        topBtn.style.display = "none";

    }

});

topBtn.onclick = () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

};

// =========================
// VIDEO PLAY / PAUSE
// =========================

const videos = document.querySelectorAll(".project-card video");

videos.forEach(video => {

    video.addEventListener("mouseenter", () => {

        video.play();

    });

    video.addEventListener("mouseleave", () => {

        video.pause();

    });

});

// =========================
// SCROLL ANIMATION
// =========================

const cards = document.querySelectorAll(".project-card");

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.style.opacity = "1";

            entry.target.style.transform = "translateY(0)";

        }

    });

}, {
    threshold: 0.2
});

cards.forEach(card => {

    card.style.opacity = "0";

    card.style.transform = "translateY(40px)";

    card.style.transition = ".7s";

    observer.observe(card);

});

// =========================
// HERO BUTTON SMOOTH SCROLL
// =========================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {

            target.scrollIntoView({

                behavior: "smooth"

            });

        }

    });

});

// =========================
// AUTO YEAR
// =========================

const year = document.getElementById("year");

if (year) {

    year.innerHTML = new Date().getFullYear();

}

// =========================
// PAGE LOADER
// =========================

window.addEventListener("load", () => {

    document.body.style.opacity = "1";

});

// =========================
// CARD HOVER EFFECT
// =========================

cards.forEach(card => {

    card.addEventListener("mousemove", () => {

        card.style.transform = "translateY(-10px) scale(1.03)";

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform = "";

    });

});

console.log("Aryan AI Projects Loaded Successfully 🚀");