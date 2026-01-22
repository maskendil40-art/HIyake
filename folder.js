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
      <button onclick="deletePhoto(${index})">Hapus</button>
    `;

    photoContainer.appendChild(card);
  });
}

function deletePhoto(index) {
  photos.splice(index, 1);
  renderPhotos();
}

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

/* ================= SUB FOLDER ================= */

const input = document.getElementById("subFolderInput");
const btn = document.getElementById("addSubBtn");
const container = document.getElementById("subFolderContainer");

let subFolders = [];

function openSub(name) {
  window.location.href = `subfolder.html?name=${encodeURIComponent(name)}`;
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
      <button onclick="event.stopPropagation(); deleteSub(${index})">
        Hapus
      </button>
    `;

    container.appendChild(card);
  });
}

function deleteSub(index) {
  subFolders.splice(index, 1);
  renderSubFolders();
}

btn.addEventListener("click", () => {
  const name = input.value.trim();
  if (name === "") return;

  subFolders.push(name);
  input.value = "";
  renderSubFolders();
});
