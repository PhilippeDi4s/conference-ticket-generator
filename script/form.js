// VERIFICA SE OS INPUTS ESTÃO VAZIOS
const campos = ["name", "email", "nameGit"];

campos.forEach((id) => {
  const input = document.getElementById(id);
  const erro = document.getElementById(`error--${id}`);
  input.addEventListener("input", () => {
    if (input.value.trim()) {
      erro.style.display = "none";
    } else {
      erro.style.display = "block";
    }
  });
});

// APAGAR E ALTERAR AVATR
const delete_avatar = document.getElementById("delete_avatar");
const uploadContainer = document.querySelector(".uploadAvatar__box");
const change_avatar = document.getElementById("change_avatar");

delete_avatar.onclick = function () {
  localStorage.removeItem("userImage");
  const file = document.getElementById("avatar");
  file.value = null;
  document.getElementById("upload__icon").style.display = "block";
  document.getElementById("upload__text").style.display = "block";
  document.getElementById("preview_buttons").style.display = "none";
  document.getElementById("uploadPreview__avatar").style.display = "none";
  uploadContainer.style.padding = "clamp(1rem, 5vw, 3rem)";
};

change_avatar.onclick = function () {
  uploadContainer.click();
};

// SERVE PRA MOSTRAS O PREVIEW DO AVATAR
document.getElementById("avatar").addEventListener("input", () => {
  const file = document.getElementById("avatar").files[0];
  const previewAvatar = document.getElementById("uploadPreview__avatar");

  if (file) {
    document.getElementById("error--upload").style.display = "none";
  } else {
    document.getElementById("error--upload").style.display = "block";
    return;
  }

  const reader = new FileReader();

  reader.onload = function () {
    const imageData = reader.result;
    if (file.size > 500 * 1024) {
      document.getElementById("error--size").style.display = "block";
      document.querySelector(".file-note").style.display = "none";
      localStorage.removeItem("avatar");
    } else {
      document.getElementById("error--size").style.display = "none";
      previewAvatar.style.display = "block";
      document.getElementById("upload__icon").style.display = "none";
      previewAvatar.src = imageData;
      localStorage.setItem("userImage", imageData);
      document.getElementById("upload__text").style.display = "none";
      uploadContainer.style.paddingBottom = "4rem";
      document.getElementById("preview_buttons").style.display = "flex";
      return;
    }
  };
  reader.readAsDataURL(file);
});

// SERVE PARA FAZER UMA ÚLTIMA VERIFICAÇÃO E GUARDAR NO localStorage
document
  .querySelector(".registrationForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const userName = document.getElementById("name").value;
    const userEmail = document.getElementById("email").value;
    const userGit = document.getElementById("nameGit").value;
    const file = document.getElementById("avatar").files[0]; //transforma a cont file em um objeto do tipo File || files[0] -> pega o primeiro arquivo de um usuário

    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userEmail);

    if (file) {
      document.getElementById("error--upload").style.display = "none";
    } else {
      document.getElementById("error--upload").style.display = "block";
      document.querySelector(".file-note").style.display = "none";
    }
    if (userName) {
      document.getElementById("error--name").style.display = "none";
    } else {
      document.getElementById("error--name").style.display = "block";
    }

    if (emailValido) {
      document.getElementById("error--email").style.display = "none";
    } else {
      document.getElementById("error--email").style.display = "block";
      document.getElementById("email").value = "";
      document.getElementById("email").type = "email";
    }

    if (userGit) {
      document.getElementById("error--nameGit").style.display = "none";
    } else {
      document.getElementById("error--nameGit").style.display = "block";
    }

    if (userName && emailValido && userGit && file && file.size < 500 * 1024) {
      localStorage.setItem("userName", userName);
      localStorage.setItem("userEmail", userEmail);
      localStorage.setItem("userGit", userGit);

      window.location.href = "tickect.html";
    }
  });

window.onload = function () {
  localStorage.clear();
  const file = document.getElementById("avatar");
  if (file) {
    file.value = "";
  }
  campos.forEach((id) => {
    const input = document.getElementById(id);
    if (input) {
      input.value = "";
    }
  });
};
