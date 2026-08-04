// =========================
// Back To Top Button
// =========================

const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", () => {

    if (window.scrollY > 300) {

        topBtn.style.display = "block";

    } else {

        topBtn.style.display = "none";

    }

});

topBtn.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


// =========================
// Live Search
// =========================

const searchInput = document.getElementById("searchInput");

if (searchInput) {

    searchInput.addEventListener("keyup", function () {

        const value = this.value.toLowerCase();

        const cards = document.querySelectorAll(".certificate-card");

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
// Category Filter
// =========================

const filterBtns = document.querySelectorAll(".filter-btn");

filterBtns.forEach(btn => {

    btn.addEventListener("click", () => {

        filterBtns.forEach(b => b.classList.remove("active"));

        btn.classList.add("active");

        const filter = btn.innerText.toLowerCase();

        const cards = document.querySelectorAll(".certificate-card");

        cards.forEach(card => {

            const text = card.innerText.toLowerCase();

            if (filter === "all") {

                card.parentElement.style.display = "block";

            } else if (text.includes(filter)) {

                card.parentElement.style.display = "block";

            } else {

                card.parentElement.style.display = "none";

            }

        });

    });

});


// =========================
// Card Animation
// =========================

const cards = document.querySelectorAll(".certificate-card");

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
// Counter Animation
// =========================

const counters = document.querySelectorAll(".counter-box h2");

counters.forEach(counter => {

    const target = parseInt(counter.innerText);

    if (isNaN(target)) return;

    let count = 0;

    const update = () => {

        if (count < target) {

            count++;

            counter.innerText = count + "+";

            requestAnimationFrame(update);

        } else {

            counter.innerText = target + "+";

        }

    };

    update();

});


// =========================
// Certificate Image Preview
// =========================

const images = document.querySelectorAll(".certificate-card img");

images.forEach(img => {

    img.style.cursor = "pointer";

    img.addEventListener("click", () => {

        window.open(img.src, "_blank");

    });

});


// =========================
// Hover Glow
// =========================

cards.forEach(card => {

    card.addEventListener("mouseenter", () => {

        card.style.boxShadow = "0 0 35px rgba(0,170,255,.45)";

    });

    card.addEventListener("mouseleave", () => {

        card.style.boxShadow = "";

    });

});


// =========================
// Navbar Shadow on Scroll
// =========================

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

        navbar.style.background = "rgba(5,15,40,.95)";

    } else {

        navbar.style.background = "rgba(10,20,50,.75)";

    }

});