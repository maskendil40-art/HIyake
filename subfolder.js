const params = new URLSearchParams(window.location.search);
const title = document.getElementById("subTitle");
const name = params.get("name");

title.innerText = name;

const input = document.getElementById("photoInput");
const btn = document.getElementById("uploadBtn");
const container = document.getElementById("photoContainer");

let photos = [];

function renderPhotos() {
  container.innerHTML = "";

  photos.forEach((src, index) => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${src}" style="width:100%; border-radius:12px;">
      <button onclick="deletePhoto(${index})">Hapus</button>
    `;

    container.appendChild(card);
  });
}

function deletePhoto(index) {
  photos.splice(index, 1);
  renderPhotos();
}

btn.addEventListener("click", () => {
  const file = input.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    photos.push(reader.result);
    renderPhotos();
  };
  reader.readAsDataURL(file);

  input.value = "";
});
