// =====================
// AMBIL PARAMETER URL
// =====================
const params = new URLSearchParams(window.location.search);
const subName = params.get("name") || "Sub Folder";

document.getElementById("subTitle").innerText = subName;

// =====================
// FOTO DI SUBFOLDER
// =====================
const input = document.getElementById("photoInput");
const btn = document.getElementById("uploadBtn");
const container = document.getElementById("photoContainer");

let photos = [];

function render() {
  container.innerHTML = "";

  photos.forEach((src, i) => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${src}" style="width:100%;border-radius:12px;">
      ${window.isAdmin ? `<button onclick="del(${i})">Hapus</button>` : ""}
    `;

    container.appendChild(card);
  });
}

function del(i) {
  if (!window.isAdmin) return;
  photos.splice(i, 1);
  render();
}

if (window.isAdmin) {
  btn.addEventListener("click", () => {
    const file = input.files[0];
    if (!file) return;

    const r = new FileReader();
    r.onload = () => {
      photos.push(r.result);
      render();
    };
    r.readAsDataURL(file);

    input.value = "";
  });
} else {
  input.style.display = "none";
  btn.style.display = "none";
}

render();
