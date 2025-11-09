document.addEventListener("DOMContentLoaded", function() {
  const btn = document.querySelector(".hamburger");
  const nav = document.querySelector('nav[role="navegação"]');
  if (btn && nav) {
    btn.addEventListener("click", function() {
      if (nav.style.display === "flex") {
        nav.style.display = "none";
      } else {
        nav.style.display = "flex";
        nav.style.flexDirection = "column";
        nav.style.alignItems = "center";
        nav.style.gap = "10px";
      }
    });
  }
});

let form = document.getElementById("contact-form");
if (form) {
  form.addEventListener("submit", function(e) {
    e.preventDefault();
    let name = document.getElementById("name");
    let email = document.getElementById("email");
    let msg = document.getElementById("message");
    let ok = true;

    [name, email, msg].forEach(function(f) {
      let nextErr = f.nextElementSibling;
      if (nextErr && nextErr.classList.contains("error")) nextErr.remove();
      if (!f.value.trim()) {
        ok = false;
        let err = document.createElement("div");
        err.textContent = "Preencha este campo";
        err.className = "error";
        f.insertAdjacentElement("afterend", err);
      }
    });

    if (ok) {
      let info = {
        nome: name.value,
        email: email.value,
        msg: msg.value,
        data: new Date().toLocaleString()
      };
      let dados = JSON.parse(localStorage.getItem("msgs")) || [];
      dados.push(info);
      localStorage.setItem("msgs", JSON.stringify(dados));

      form.innerHTML = "<p style='color:green;font-weight:bold;'>Mensagem enviada com sucesso!</p>";
      setTimeout(() => form.reset(), 2000);
    }
  });
}