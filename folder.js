// =====================
// KUNCI VIEWER (FINAL)
// =====================
if (!window.isAdmin) {
  const hideIds = [
    "photoInput",
    "uploadPhotoBtn",
    "subFolderInput",
    "addSubBtn"
  ];

  hideIds.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = "none";
  });
}
