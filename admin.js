// ADMIN MODE GLOBAL
const params = new URLSearchParams(window.location.search);
window.isAdmin = params.get("admin") === "1";
