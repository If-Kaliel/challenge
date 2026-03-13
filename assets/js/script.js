document.addEventListener("DOMContentLoaded", () => {
  const botaoMenu = document.querySelector(".hamburger");
  const menuPrincipal = document.querySelector('nav[role="navegação"]');

  if (botaoMenu && menuPrincipal) {
    botaoMenu.addEventListener("click", () => {
      if (menuPrincipal.style.display === "flex") {
        menuPrincipal.style.display = "none";
      } else {
        menuPrincipal.style.display = "flex";
        menuPrincipal.style.flexDirection = "column";
        menuPrincipal.style.alignItems = "center";
        menuPrincipal.style.gap = "10px";
      }
    });
  }
});


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
      let msgErro = campo.nextElementSibling;
      if (msgErro && msgErro.classList.contains("erro")) msgErro.remove();
      if (!campo.value.trim()) {
        valido = false;
        const alerta = document.createElement("div");
        alerta.textContent = "Preencha este campo";
        alerta.className = "erro";
        campo.insertAdjacentElement("afterend", alerta);
      }
    });

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

      areaStatus.textContent = "Mensagem enviada com sucesso!";
      areaStatus.style.color = "green";
      areaStatus.style.fontWeight = "bold";

      formulario.reset();
    } else {
      areaStatus.textContent = "Corrija os campos destacados.";
      areaStatus.style.color = "#b00020";
      areaStatus.style.fontWeight = "bold";
    }
  });
}