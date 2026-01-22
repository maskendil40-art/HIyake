// ================================
// ADMIN MODE (GLOBAL)
// Aktif kalau URL ada ?admin=1
// ================================

(function () {
  const params = new URLSearchParams(window.location.search);
  const isAdmin = params.get("admin") === "1";

  // bikin global biar kebaca semua file JS
  window.isAdmin = isAdmin;

  // helper buat sembunyiin elemen
  window.hideIfNotAdmin = function (selector) {
    if (!window.isAdmin) {
      document.querySelectorAll(selector).forEach(el => {
        el.style.display = "none";
      });
    }
  };

  // helper buat ngejaga klik (viewer ga bisa)
  window.blockIfNotAdmin = function (handler) {
    return function (...args) {
      if (!window.isAdmin) return;
      return handler.apply(this, args);
    };
  };
})();
