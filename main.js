document.addEventListener("DOMContentLoaded", () => {

    /* ------------------------------
       1️⃣ Circular Floating Tech Icons
    ------------------------------ */
    const icons = document.querySelectorAll(".tech-icons .icon");
    const hero = document.querySelector(".hero");

    if (icons.length && hero) {
        const radius = 150; // circular radius
        const centerX = hero.offsetWidth / 2 - 30; // center x
        const centerY = hero.offsetHeight / 2 - 30; // center y

        icons.forEach((icon, index) => {
            let angle = (index / icons.length) * 2 * Math.PI; // distribute icons
            setInterval(() => {
                angle += 0.01; // rotation speed
                const x = centerX + radius * Math.cos(angle);
                const y = centerY + radius * Math.sin(angle);
                icon.style.left = `${x}px`;
                icon.style.top = `${y}px`;
            }, 20);
        });
    }

    /* ------------------------------
       2️⃣ Smooth Scroll for Anchor Links
    ------------------------------ */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                target.scrollIntoView({ behavior: "smooth" });
            }
        });
    });

    /* ------------------------------
       3️⃣ Fade-in Sections on Scroll
    ------------------------------ */

const faders = document.querySelectorAll(".about, .projects, .linkedin-card, .contact");

const appearOptions = {
    threshold: 0.2,
    rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("appear");
            observer.unobserve(entry.target);
        }
    });
}, appearOptions);

faders.forEach(fader => {
    fader.classList.add("fade");
    // Trigger appear immediately if already visible
    const top = fader.getBoundingClientRect().top;
    if (top < window.innerHeight) {
        fader.classList.add("appear");
    }
    appearOnScroll.observe(fader);
});

    /* ------------------------------
       4️⃣ Animate Skill Bars
    ------------------------------ */
    const skills = document.querySelectorAll(".progress-bar");
    const aboutSection = document.querySelector(".about");

    if (skills.length && aboutSection) {
        const triggerBottom = window.innerHeight / 5 * 4;
        window.addEventListener("scroll", () => {
            const aboutTop = aboutSection.getBoundingClientRect().top;
            if (aboutTop < triggerBottom) {
                skills.forEach(skill => {
                    if (skill.classList.contains("python")) skill.style.width = "90%";
                    if (skill.classList.contains("js")) skill.style.width = "85%";
                    if (skill.classList.contains("htmlcss")) skill.style.width = "95%";
                    if (skill.classList.contains("react")) skill.style.width = "80%";
                });
            }
        });
    }

});
/* ------------------------------
   Contact Form Success Message
------------------------------ */
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
        e.preventDefault(); // prevent default reload

        const formData = new FormData(contactForm);
        const action = contactForm.action;

        try {
            const response = await fetch(action, {
                method: "POST",
                body: formData,
                headers: { "Accept": "application/json" }
            });

            if (response.ok) {
                formMessage.textContent = "✅ Message sent successfully!";
                formMessage.style.color = "#00FF00";
                contactForm.reset();
            } else {
                formMessage.textContent = "❌ Oops! Something went wrong.";
                formMessage.style.color = "#FF3333";
            }
        } catch (error) {
            formMessage.textContent = "❌ Oops! Something went wrong.";
            formMessage.style.color = "#FF3333";
        }

        // Remove message after 5 seconds
        setTimeout(() => { formMessage.textContent = ""; }, 5000);
    });
}
