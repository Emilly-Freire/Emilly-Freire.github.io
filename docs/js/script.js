
const typed = new Typed(".multiple-text", {
    strings: [
        "estudante",
        "dev em aprendizado",
        "flautista",
        "desenhista"
    ],

    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true,
});

const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const themeIcon = document.querySelector('.theme-icon');

function toggleTheme() {
    body.classList.toggle('light-mode');
    const isLightMode = body.classList.contains('light-mode');

    if (isLightMode) {
        themeIcon.className = 'bx bx-moon theme-icon';
        localStorage.setItem('theme', 'light');
    } else {
        themeIcon.className = 'bx bx-sun theme-icon';
        localStorage.setItem('theme', 'dark');
    }
}

themeToggle.addEventListener('click', toggleTheme);

function loadSavedTheme() {
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme == 'light') {
        body.classList.add('light-mode');
        themeIcon.className = 'bx bx-moon theme-icon';
    } else {
        body.classList.remove('light-mode');
        themeIcon.className = 'bx bx-sun theme-icon';
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadSavedTheme);
} else {
    loadSavedTheme();
}


const botaoVoice = document.getElementById("voz");
let leituraAtiva = false;

// alternar estado
botaoVoice.addEventListener("click", () => {
  leituraAtiva = !leituraAtiva;

  botaoVoice.classList.toggle("active");
  botaoVoice.setAttribute("aria-pressed", leituraAtiva);

  botaoVoice.textContent = leituraAtiva
    ? "Leitura ativada"
    : "Ativar leitura";

  if (!leituraAtiva) speechSynthesis.cancel();
});

// leitura por clique nas seções
const secoes = document.querySelectorAll("section");

secoes.forEach(secao => {
  secao.addEventListener("click", (e) => {

    if (!leituraAtiva) return;
    if (e.target.closest("a, button")) return;

    const fala = new SpeechSynthesisUtterance(secao.innerText);
    fala.lang = "pt-BR";
    fala.rate = 1;

    speechSynthesis.cancel();
    speechSynthesis.speak(fala);
  });
});