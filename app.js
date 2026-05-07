
const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");

menuToggle.addEventListener("click", () => {
    mobileMenu.classList.toggle("active");
});

const form = document.getElementById("contactForm");
const toast = document.getElementById("toast");
const telefoneInput = document.getElementById("telefone");
const submitBtn = document.querySelector(".btn-submit");

telefoneInput.addEventListener("input", (e) => {
    let value = e.target.value.replace(/\D/g, "");
    value = value.replace(/^(\d{2})(\d)/g, "($1) $2");
    value = value.replace(/(\d{5})(\d)/, "$1-$2");
    e.target.value = value;

});

function validarEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showToast(message, success = true) {

    toast.innerHTML = `
        <i class="fas ${success ? "fa-circle-check" : "fa-circle-xmark"}"></i>
        <span>${message}</span>
    `;

    toast.style.background = success
        ? "#16a34a"
        : "#dc2626";

    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 4000);

}

function limparEspacos(texto) {

    return texto
        .trim()
        .replace(/\s+/g, " ");

}

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const nome = limparEspacos(
        document.getElementById("nome").value
    );

    const email = limparEspacos(
        document.getElementById("email").value
    );

    const telefone = limparEspacos(
        document.getElementById("telefone").value
    );

    const profissao = document.getElementById("profissao").value;




    if (nome.length < 3) {

        return showToast(
            "Digite um nome válido",
            false
        );

    }

    if (!validarEmail(email)) {

        return showToast(
            "Digite um e-mail válido",
            false
        );

    }

    if (telefone.length < 15) {

        return showToast(
            "Digite um telefone válido",
            false
        );

    }

    if (!profissao) {

        return showToast(
            "Selecione sua profissão",
            false
        );

    }




    submitBtn.disabled = true;

    submitBtn.innerHTML = `
        <i class="fas fa-spinner fa-spin"></i>
        Enviando...
    `;



    const data = {
        nome,
        email,
        telefone,
        profissao
    };


    try {
        const response = await fetch(
            "https://script.google.com/macros/s/AKfycbxr36atWZpQ_tGwVyyhxiMQ89iIxzfGY43hVz0uZBKWDLytAls6wxQMOwhf3WjuXov_IA/exec",
            {
                method: "POST",
                body: JSON.stringify(data)
            }
        );

        const result = await response.json();

        if (result.result === "success") {

            showToast(
                "Inscrição enviada com sucesso!"
            );

            const numeroWhats = "5585998568223";

            const mensagem = `
🚀 NOVA INSCRIÇÃO - CHAOSCIENCE

👤 Nome: ${nome}

📧 E-mail: ${email}

📱 Telefone: ${telefone}

💼 Profissão: ${profissao}
`;

            const urlWhats = `https://wa.me/${numeroWhats}?text=${encodeURIComponent(mensagem)}`;

            window.open(urlWhats, "_blank");

            form.reset();
        }

    } catch (error) {

        console.error(error);

        showToast(
            "Erro ao enviar formulário",
            false
        );

    } finally {

        submitBtn.disabled = false;
        submitBtn.innerHTML = `
            <span class="btn-text">
                Quero me inscrever
            </span>

            <i class="fas fa-paper-plane"></i>
        `;

    }

});