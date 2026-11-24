(() => {
  const root = document.documentElement;
  const button = document.getElementById("theme-toggle");
  if (!button) return;
  let saved;
  try { saved = localStorage.getItem("mergington-theme"); } catch (_) {}
  const media = typeof matchMedia === "function" ? matchMedia("(prefers-color-scheme: dark)") : null;
  let explicit = saved === "dark" || saved === "light";
  function apply(dark) {
    root.dataset.theme = dark ? "dark" : "light";
    button.setAttribute("aria-pressed", String(dark));
    button.textContent = dark ? "Light mode" : "Dark mode";
  }
  apply(explicit ? saved === "dark" : Boolean(media?.matches));
  button.addEventListener("click", () => {
    explicit = true;
    apply(root.dataset.theme !== "dark");
    try { localStorage.setItem("mergington-theme", root.dataset.theme); } catch (_) {}
  });
  media?.addEventListener?.("change", event => { if (!explicit) apply(event.matches); });
})();
