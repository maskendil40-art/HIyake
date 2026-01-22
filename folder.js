// =====================
// AMBIL PARAMETER URL
// =====================
const params = new URLSearchParams(window.location.search);
const folderName = params.get("name") || "Folder";

document.getElementById("folderTitle").innerText = folderName;

// =====================
// FOTO DI FOLDER
// =====================
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
      <img src="${src}" style="width:100%;border-radius:12px;">
      ${window.isAdmin ? `<button onclick="deletePhoto(${index})">Hapus</button>` : ""}
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

// =====================
// SUBFOLDER
// =====================
const subInput = document.getElementById("subFolderInput");
const addSubBtn = document.getElementById("addSubBtn");
const subContainer = document.getElementById("subFolderContainer");

let subFolders = [];

function openSub(name) {
  const adminParam = window.isAdmin ? "&admin=1" : "";
  window.location.href =
    `subfolder.html?name=${encodeURIComponent(name)}${adminParam}`;
}

function renderSubFolders() {
  subContainer.innerHTML = "";

  subFolders.forEach((name, index) => {
    const card = document.createElement("div");
    card.className = "card";
    card.onclick = () => openSub(name);

    card.innerHTML = `
      <div class="icon">📂</div>
      <h3>${name}</h3>
      ${window.isAdmin ? `<button onclick="event.stopPropagation(); deleteSub(${index})">Hapus</button>` : ""}
    `;

    subContainer.appendChild(card);
  });
}

function deleteSub(index) {
  if (!window.isAdmin) return;
  subFolders.splice(index, 1);
  renderSubFolders();
}

if (window.isAdmin) {
  addSubBtn.addEventListener("click", () => {
    const name = subInput.value.trim();
    if (!name) return;

    subFolders.push(name);
    subInput.value = "";
    renderSubFolders();
  });
} else {
  subInput.style.display = "none";
  addSubBtn.style.display = "none";
}

renderPhotos();
renderSubFolders();
