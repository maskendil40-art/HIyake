const params = new URLSearchParams(window.location.search);
const folderName = params.get("name");

document.getElementById("folderTitle").innerText = folderName;

/* ================= FOTO LANGSUNG ================= */

const photoInput = document.getElementById("photoInput");
const uploadPhotoBtn = document.getElementById("uploadPhotoBtn");
const photoContainer = document.getElementById("photoContainer");

let photos = [];

function renderPhotos() {
  photoContainer.innerHTML = "";

  photos.forEach((src, index) => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${src}" style="width:100%; border-radius:12px;">
      ${window.isAdmin ? `<button onclick="deletePhoto(${index})">Hapus</button>` : ``}
    `;

    photoContainer.appendChild(card);
  });
}

function deletePhoto(index) {
  if (!window.isAdmin) return;
  photos.splice(index, 1);
  renderPhotos();
}

if (window.isAdmin) {
  uploadPhotoBtn.addEventListener("click", () => {
    const file = photoInput.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      photos.push(reader.result);
      renderPhotos();
    };
    reader.readAsDataURL(file);

    photoInput.value = "";
  });
} else {
  photoInput.style.display = "none";
  uploadPhotoBtn.style.display = "none";
}

/* ================= SUB FOLDER ================= */

const input = document.getElementById("subFolderInput");
const btn = document.getElementById("addSubBtn");
const container = document.getElementById("subFolderContainer");

let subFolders = [];

function openSub(name) {
  window.location.href =
    `subfolder.html?name=${encodeURIComponent(name)}${window.isAdmin ? "&admin=1" : ""}`;
}

function renderSubFolders() {
  container.innerHTML = "";

  subFolders.forEach((name, index) => {
    const card = document.createElement("div");
    card.className = "card";
    card.onclick = () => openSub(name);

    card.innerHTML = `
      <div class="icon">📂</div>
      <h3>${name}</h3>
      ${window.isAdmin ? `<button onclick="event.stopPropagation(); deleteSub(${index})">Hapus</button>` : ``}
    `;

    container.appendChild(card);
  });
}

function deleteSub(index) {
  if (!window.isAdmin) return;
  subFolders.splice(index, 1);
  renderSubFolders();
}

if (window.isAdmin) {
  btn.addEventListener("click", () => {
    const name = input.value.trim();
    if (!name) return;

    subFolders.push(name);
    input.value = "";
    renderSubFolders();
  });
} else {
  input.style.display = "none";
  btn.style.display = "none";
}

renderSubFolders();
