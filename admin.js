// ================= ADMIN CHECK =================
const params = new URLSearchParams(window.location.search);
const isAdmin = params.get("admin") === "1";

// ================= HIDE EDIT BUTTONS =================
window.addEventListener("DOMContentLoaded", () => {
  if (!isAdmin) {
    document.querySelectorAll("button").forEach(btn => {
      btn.style.display = "none";
    });
  }
});
