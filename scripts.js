// Run when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
    document.body.classList.add("page-enter");

    /* -------- Highlight active nav link -------- */
    const links = document.querySelectorAll("nav a");
    const path = window.location.pathname.split("/").pop() || "index.html";
    links.forEach(link => {
        if (link.getAttribute("href") === path) {
            link.classList.add("active-link");
        }
    });

    /* -------- Page transition on nav click -------- */
    links.forEach(link => {
        link.addEventListener("click", (e) => {
            const target = link.getAttribute("href");
            if (!target) return;

            e.preventDefault();
            document.body.classList.remove("page-enter");
            document.body.classList.add("page-exit");

            setTimeout(() => {
                window.location.href = target;
            }, 350);
        });
    });

    /* -------- Dark mode toggle -------- */
    const darkToggle = document.getElementById("darkToggle");
    const savedTheme = localStorage.getItem("museum-theme");
    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
        if (darkToggle) darkToggle.textContent = "Light Mode";
    }
    if (darkToggle) {
        darkToggle.addEventListener("click", () => {
            document.body.classList.toggle("dark-mode");
            const isDark = document.body.classList.contains("dark-mode");
            localStorage.setItem("museum-theme", isDark ? "dark" : "light");
            darkToggle.textContent = isDark ? "Light Mode" : "Dark Mode";
        });
    }

    /* -------- Timeline scroll controls -------- */
    const timeline = document.querySelector(".timeline");
    const scrollLeftBtn = document.querySelector("[data-timeline='left']");
    const scrollRightBtn = document.querySelector("[data-timeline='right']");

    if (timeline && scrollLeftBtn && scrollRightBtn) {
        scrollLeftBtn.addEventListener("click", () => {
            timeline.scrollBy({ left: -250, behavior: "smooth" });
        });
        scrollRightBtn.addEventListener("click", () => {
            timeline.scrollBy({ left: 250, behavior: "smooth" });
        });
    }

    /* -------- Artifact modals -------- */
    const modalBackdrop = document.querySelector(".modal-backdrop");
    const modalTitle = document.querySelector(".modal-title");
    const modalBody = document.querySelector(".modal-body");

    const artifactCards = document.querySelectorAll(".artifact-card");
    artifactCards.forEach(card => {
        card.addEventListener("click", () => {
            if (!modalBackdrop || !modalTitle || !modalBody) return;
            modalTitle.textContent = card.dataset.title || "Artifact";
            modalBody.textContent = card.dataset.description || "";
            modalBackdrop.classList.add("active");
        });
    });

    const modalCloseBtn = document.querySelector(".modal-close button");
    if (modalCloseBtn && modalBackdrop) {
        modalCloseBtn.addEventListener("click", () => {
            modalBackdrop.classList.remove("active");
        });
        modalBackdrop.addEventListener("click", (e) => {
            if (e.target === modalBackdrop) {
                modalBackdrop.classList.remove("active");
            }
        });
    }

    /* -------- Image zoom overlay -------- */
    const zoomOverlay = document.querySelector(".zoom-overlay");
    const zoomOverlayImg = zoomOverlay ? zoomOverlay.querySelector("img") : null;

    const zoomableImages = document.querySelectorAll(".gallery img");
    zoomableImages.forEach(img => {
        img.addEventListener("click", () => {
            if (!zoomOverlay || !zoomOverlayImg) return;
            zoomOverlayImg.src = img.src;
            zoomOverlay.classList.add("active");
        });
    });

    if (zoomOverlay) {
        zoomOverlay.addEventListener("click", () => {
            zoomOverlay.classList.remove("active");
        });
    }

    // ------------------ PAGE ARROW NAVIGATION ------------------

    const pages = [
        "index.html",
        "life.html",
        "career.html",
        "scandal.html",
        "effects.html",
        "citations.html"
    ];


    function getCurrentPageIndex() {
        const current = window.location.pathname.split("/").pop();
        return pages.indexOf(current);
    }

    document.querySelectorAll(".page-arrow").forEach(arrow => {
        arrow.addEventListener("click", () => {
            const currentIndex = getCurrentPageIndex();

            if (arrow.dataset.direction === "prev") {
                const prevPage = currentIndex > 0 ? pages[currentIndex - 1] : pages[pages.length - 1];
                window.location.href = prevPage;
            } else {
                const nextPage = currentIndex < pages.length - 1 ? pages[currentIndex + 1] : pages[0];
                window.location.href = nextPage;
            }
        });
    });
});

// ---------------- ARTIFACT MODALS ----------------

document.querySelectorAll(".artifact-card").forEach(card => {
    card.addEventListener("click", () => {
        const modalId = card.dataset.modal;
        document.getElementById(modalId).style.display = "flex";
    });
});

// Close buttons
document.querySelectorAll(".modal .close").forEach(btn => {
    btn.addEventListener("click", () => {
        btn.parentElement.parentElement.style.display = "none";
    });
});


