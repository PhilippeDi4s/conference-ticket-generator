  const imageData = localStorage.getItem("userImage");

  const img = document.getElementById("imageDisplay");
  if (img && imageData) {
    img.src = imageData;
  } else {
    img.alt = "Error 404";
  }
  
const userName = localStorage.getItem("userName");
const userEmail = localStorage.getItem("userEmail");
const userGit = localStorage.getItem("userGit");

document.getElementById("user__name").textContent = userName;
document.getElementById("user__email").textContent = userEmail;
document.getElementById("ticket__user-name").textContent = userName;
document.getElementById("ticket__user-git").textContent = userGit;

