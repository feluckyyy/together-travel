(function () {
  const SRC = "https://music.163.com/outchain/player?type=2&id=306680&auto=0&height=66";
  const dock = document.getElementById("music-dock");
  const btn = document.getElementById("music-btn");
  const panel = document.getElementById("music-panel");
  const wrap = document.getElementById("music-frame-wrap");
  if (!dock || !btn || !panel || !wrap) return;

  function ensurePlayer() {
    if (wrap.querySelector("iframe")) return;
    const iframe = document.createElement("iframe");
    iframe.src = SRC;
    iframe.width = 330;
    iframe.height = 86;
    iframe.setAttribute("frameborder", "0");
    iframe.setAttribute("title", "许飞《我们终究会牵手旅行》");
    iframe.setAttribute("allow", "autoplay; encrypted-media");
    wrap.appendChild(iframe);
    dock.classList.add("ready");
  }

  function setOpen(open) {
    if (open) ensurePlayer();
    dock.classList.toggle("open", open);
    btn.setAttribute("aria-expanded", String(open));
    panel.setAttribute("aria-hidden", String(!open));
  }

  btn.addEventListener("click", function (event) {
    event.stopPropagation();
    setOpen(!dock.classList.contains("open"));
  });

  document.addEventListener("click", function (event) {
    if (!dock.classList.contains("open")) return;
    if (!dock.contains(event.target)) setOpen(false);
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && dock.classList.contains("open")) {
      setOpen(false);
      btn.focus();
    }
  });
})();
