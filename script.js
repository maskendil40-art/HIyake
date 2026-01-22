const folderContainer = document.getElementById("folderContainer");
const addBtn = document.getElementById("addBtn");
const folderInput = document.getElementById("folderInput");

let folders = [
  "PK",
  "PM",
  "PU",
  "PPU",
  "TryOut",
  "Pembahasan TryOut",
  "LIG",
  "LID",
  "PBM"
];

function getIcon(name) {
  const icons = {
    PK: "fa-book",
    PM: "fa-calculator",
    PU: "fa-flask",
    PPU: "fa-pen",
    TryOut: "fa-file-circle-check",
    "Pembahasan TryOut": "fa-lightbulb",
    LIG: "fa-graduation-cap",
    LID: "fa-school",
    PBM: "fa-chalkboard-user"
  };
  return icons[name] || "fa-folder";
}

function openFolder(name) {
  const adminParam = isAdmin ? "?admin=1" : "";
  window.location.href = `folder.html?name=${encodeURIComponent(name)}${adminParam}`;
}

function renderFolders() {
  folderContainer.innerHTML = "";

  folders.forEach((name, index) => {
    const card = document.createElement("div");
    card.className = "card";
    card.onclick = () => openFolder(name);

    card.innerHTML = `
      <div class="icon">
        <i class="fa-solid ${getIcon(name)}"></i>
      </div>
      <h3>${name}</h3>
      ${isAdmin ? `<button onclick="event.stopPropagation(); deleteFolder(${index})">Hapus</button>` : ""}
    `;

    folderContainer.appendChild(card);
  });
}

function deleteFolder(index) {
  folders.splice(index, 1);
  renderFolders();
}

if (isAdmin && addBtn) {
  addBtn.addEventListener("click", () => {
    const name = folderInput.value.trim();
    if (!name) return;
    folders.push(name);
    folderInput.value = "";
    renderFolders();
  });
}

renderFolders();
