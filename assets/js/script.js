// ===== MENU HAMBURGER =====
const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('nav');

// Garante estado inicial sempre fechado ao carregar qualquer página
if (nav) {
  nav.classList.remove('open');
}
if (hamburger) {
  hamburger.setAttribute('aria-expanded', 'false');
}

if (hamburger && nav) {
  hamburger.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });

  // Fecha menu ao clicar em um link (antes de navegar)
  document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  // Fecha menu ao clicar fora
  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !hamburger.contains(e.target)) {
      nav.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });

  // Fecha menu ao redimensionar para desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      nav.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });
}

// ===== MARCA LINK ATIVO =====
document.querySelectorAll('nav a').forEach(link => {
  const linkPathname = new URL(link.href, window.location.origin).pathname;
  const currentPathname = window.location.pathname;

  const normalizePath = (path) => {
    // Remove "index.html" do final, se existir
    if (path.endsWith('index.html')) {
      path = path.slice(0, -'index.html'.length);
    }
    // Remove barra final, exceto na raiz "/"
    if (path.length > 1 && path.endsWith('/')) {
      path = path.slice(0, -1);
    }
    return path;
  };

  if (normalizePath(linkPathname) === normalizePath(currentPathname)) {
    link.classList.add('active');
    link.setAttribute('aria-current', 'page');
  }
});

// ===== FORMULÁRIO DE CONTATO =====
const formulario = document.querySelector("#contact-form");

if (formulario) {
  formulario.addEventListener("submit", (ev) => {
    ev.preventDefault();

    const campoNome = document.querySelector("#name");
    const campoEmail = document.querySelector("#email");
    const campoMsg = document.querySelector("#message");
    const areaStatus = document.querySelector("#contact-status");

    let valido = true;

    [campoNome, campoEmail, campoMsg].forEach(campo => {
      // Remove erro anterior
      const erroAnterior = campo.parentElement.querySelector(".erro");
      if (erroAnterior) erroAnterior.remove();
      campo.style.borderColor = "";

      if (!campo.value.trim()) {
        valido = false;
        const alerta = document.createElement("div");
        alerta.textContent = "Preencha este campo";
        alerta.className = "erro";
        campo.insertAdjacentElement("afterend", alerta);
        campo.style.borderColor = "#b00020";
      }
    });

    // Validação de e-mail
    if (campoEmail.value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(campoEmail.value)) {
      valido = false;
      const erroEmail = campoEmail.parentElement.querySelector(".erro");
      if (!erroEmail) {
        const alerta = document.createElement("div");
        alerta.textContent = "Digite um e-mail válido";
        alerta.className = "erro";
        campoEmail.insertAdjacentElement("afterend", alerta);
        campoEmail.style.borderColor = "#b00020";
      }
    }

    if (valido) {
      const dados = {
        nome: campoNome.value,
        email: campoEmail.value,
        mensagem: campoMsg.value,
        data: new Date().toLocaleString()
      };

      const registros = JSON.parse(localStorage.getItem("mensagens")) || [];
      registros.push(dados);
      localStorage.setItem("mensagens", JSON.stringify(registros));

      areaStatus.className = "success";
      areaStatus.textContent = "✓ Mensagem enviada com sucesso!";
      formulario.reset();
    } else {
      areaStatus.textContent = "Corrija os campos destacados.";
      areaStatus.className = "erro";
    }
  });
}