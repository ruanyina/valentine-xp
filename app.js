console.log("app.js loaded");

document.addEventListener("DOMContentLoaded", () => {
  const layer = document.getElementById("windowLayer");
  if (!layer) {
    console.error("windowLayer not found");
    return;
  }

  const titles = {
    files: "files",
    favorite: "favorite",
    dvd: "dvd",
    question: "question",
    music: "music"
  };

  let z = 10;

  document.querySelectorAll(".desktop-icon").forEach((icon) => {
    icon.addEventListener("click", () => {
      const app = icon.dataset.app;
      openWindow(app);
    });
  });

  function openWindow(app) {
    const win = document.createElement("div");
    win.className = "xp-window";
    win.style.left = "120px";
    win.style.top = "120px";
    win.style.zIndex = String(++z);

    const bar = document.createElement("div");
    bar.className = "xp-titlebar";

    const title = document.createElement("span");
    title.textContent = titles[app] || "window";

    const close = document.createElement("button");
    close.type = "button";
    close.textContent = "x";
    close.addEventListener("click", () => win.remove());

    bar.append(title, close);

    const content = document.createElement("div");
    content.className = "xp-content";
    content.innerHTML = `<p>${titles[app] || "window"} window placeholder</p>`;

    win.append(bar, content);
    layer.appendChild(win);

    drag(win, bar);
  }

  function drag(win, bar) {
    let dx = 0;
    let dy = 0;

    bar.addEventListener("mousedown", (e) => {
      dx = e.clientX - win.offsetLeft;
      dy = e.clientY - win.offsetTop;

      function move(ev) {
        win.style.left = ev.clientX - dx + "px";
        win.style.top = ev.clientY - dy + "px";
      }

      function up() {
        window.removeEventListener("mousemove", move);
        window.removeEventListener("mouseup", up);
      }

      window.addEventListener("mousemove", move);
      window.addEventListener("mouseup", up);
    });
  }
});
