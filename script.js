/* =========================================================
   CLOUD HELLBOY — OFFICIAL WEBSITE
   SCRIPT.JS
   ========================================================= */

"use strict";


/* =========================================================
   01. ELEMENTOS PRINCIPAIS
   ========================================================= */

const header = document.getElementById("header");
const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");
const navLinks = document.querySelectorAll(".nav a");
const currentYear = document.getElementById("currentYear");


/* =========================================================
   02. ANO AUTOMÁTICO NO RODAPÉ
   ========================================================= */

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}


/* =========================================================
   03. HEADER AO ROLAR A PÁGINA
   ========================================================= */

function updateHeader() {

    if (!header) return;

    if (window.scrollY > 40) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

}

updateHeader();

window.addEventListener("scroll", updateHeader, {
    passive: true
});


/* =========================================================
   04. MENU MOBILE
   ========================================================= */

function openMenu() {

    if (!menuToggle || !nav) return;

    menuToggle.classList.add("active");
    nav.classList.add("active");

    document.body.classList.add("menu-open");

    menuToggle.setAttribute("aria-expanded", "true");

}


function closeMenu() {

    if (!menuToggle || !nav) return;

    menuToggle.classList.remove("active");
    nav.classList.remove("active");

    document.body.classList.remove("menu-open");

    menuToggle.setAttribute("aria-expanded", "false");

}


function toggleMenu() {

    if (!nav) return;

    if (nav.classList.contains("active")) {
        closeMenu();
    } else {
        openMenu();
    }

}


if (menuToggle) {
    menuToggle.addEventListener("click", toggleMenu);
}


/* Fecha o menu quando o usuário escolhe uma seção */

navLinks.forEach((link) => {

    link.addEventListener("click", () => {
        closeMenu();
    });

});


/* Fecha com ESC */

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {
        closeMenu();
    }

});


/* =========================================================
   05. ANIMAÇÕES AO ENTRAR NA TELA
   ========================================================= */

const animatedElements = document.querySelectorAll(
    ".section-content, .contact > *"
);


if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver(

        (entries, observer) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);

                }

            });

        },

        {
            threshold: 0.12,
            rootMargin: "0px 0px -50px 0px"
        }

    );


    animatedElements.forEach((element) => {
        revealObserver.observe(element);
    });

} else {

    /* Fallback para navegadores antigos */

    animatedElements.forEach((element) => {
        element.classList.add("visible");
    });

}


/* =========================================================
   06. DESTAQUE DA SEÇÃO ATUAL NO MENU
   ========================================================= */

const sections = document.querySelectorAll("main section[id]");


function updateActiveNavigation() {

    let currentSection = "";

    const position = window.scrollY + 180;


    sections.forEach((section) => {

        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;


        if (
            position >= sectionTop &&
            position < sectionTop + sectionHeight
        ) {

            currentSection = section.id;

        }

    });


    navLinks.forEach((link) => {

        link.classList.remove("active-link");

        const destination = link.getAttribute("href");


        if (destination === `#${currentSection}`) {
            link.classList.add("active-link");
        }

    });

}


window.addEventListener(
    "scroll",
    updateActiveNavigation,
    { passive: true }
);

updateActiveNavigation();


/* =========================================================
   07. MOVIMENTO SUTIL DO HERO
   ========================================================= */

const heroBackground = document.querySelector(".hero-background");


function updateHeroParallax() {

    if (!heroBackground) return;

    /*
       Evitamos o efeito em celulares para melhorar
       desempenho e estabilidade visual.
    */

    if (window.innerWidth <= 768) {
        heroBackground.style.transform = "scale(1.05)";
        return;
    }


    const scrollPosition = window.scrollY;

    /*
       Limita o movimento para não continuar calculando
       quando o hero já saiu da tela.
    */

    if (scrollPosition < window.innerHeight * 1.2) {

        const movement = scrollPosition * 0.08;

        heroBackground.style.transform =
            `scale(1.05) translateY(${movement}px)`;

    }

}


window.addEventListener(
    "scroll",
    updateHeroParallax,
    { passive: true }
);


/* =========================================================
   08. CARDS DE MÚSICA
   ========================================================= */

const musicCards = document.querySelectorAll(".music-card");


musicCards.forEach((card) => {

    card.addEventListener("mouseenter", () => {

        card.classList.add("is-hovered");

    });


    card.addEventListener("mouseleave", () => {

        card.classList.remove("is-hovered");

    });

});


/* =========================================================
   09. BOTÕES DE PLAY
   Atualmente funcionam como placeholders.
   Quando adicionarmos Spotify/áudio real, conectaremos aqui.
   ========================================================= */

const playButtons = document.querySelectorAll(".play-button");


playButtons.forEach((button) => {

    button.addEventListener("click", (event) => {

        event.preventDefault();
        event.stopPropagation();

        /*
           Placeholder intencional.
           Não reproduz áudio inexistente.

           Posteriormente podemos substituir por:
           - Spotify
           - SoundCloud
           - YouTube Music
           - arquivo de áudio próprio
        */

        button.classList.toggle("playing");


        if (button.classList.contains("playing")) {

            button.textContent = "Ⅱ";
            button.setAttribute(
                "aria-label",
                "Pausar música"
            );

        } else {

            button.textContent = "▶";
            button.setAttribute(
                "aria-label",
                "Reproduzir música"
            );

        }

    });

});


/* =========================================================
   10. BOTÃO DO VÍDEO
   Placeholder até adicionarmos o vídeo real.
   ========================================================= */

const videoPlayButton = document.querySelector(".video-play");


if (videoPlayButton) {

    videoPlayButton.addEventListener("click", () => {

        /*
           Por enquanto mostramos apenas uma resposta visual.

           Depois este botão poderá abrir:
           - player do YouTube
           - Vimeo
           - vídeo hospedado
           - modal cinematográfico
        */

        videoPlayButton.classList.toggle("playing");


        if (videoPlayButton.classList.contains("playing")) {

            videoPlayButton.textContent = "Ⅱ";
            videoPlayButton.setAttribute(
                "aria-label",
                "Pausar vídeo"
            );

        } else {

            videoPlayButton.textContent = "▶";
            videoPlayButton.setAttribute(
                "aria-label",
                "Reproduzir vídeo"
            );

        }

    });

}


/* =========================================================
   11. LINKS PLACEHOLDER
   Evita que links "#" joguem a página para o topo.
   ========================================================= */

const placeholderLinks = document.querySelectorAll('a[href="#"]');


placeholderLinks.forEach((link) => {

    link.addEventListener("click", (event) => {
        event.preventDefault();
    });

});


/* =========================================================
   12. FECHAR MENU AO AUMENTAR A TELA
   ========================================================= */

window.addEventListener("resize", () => {

    if (window.innerWidth > 1000) {
        closeMenu();
    }

});


/* =========================================================
   13. RESPEITAR REDUÇÃO DE MOVIMENTO
   ========================================================= */

const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
);


if (reducedMotion.matches) {

    animatedElements.forEach((element) => {
        element.classList.add("visible");
    });

}


/* =========================================================
   14. SITE PRONTO
   ========================================================= */

document.documentElement.classList.add("js-enabled");
