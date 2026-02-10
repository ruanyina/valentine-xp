const layer = document.getElementById("windowLayer");

const titles = {
  files: "files",
  favorite: "favorite",
  dvd: "dvd",
  question: "question",
  music: "music"
};

let z = 10;

document.querySelectorAll(".desktop-icon").forEach(icon => {
  icon.onclick = () => openWindow(icon.dataset.app);
});

function openWindow(app) {
  const win = document.createElement("div");
  win.className = "xp-window";
  win.style.left = "120px";
  win.style.top = "120px";
  win.style.zIndex = ++z;

  const bar = document.createElement("div");
  bar.className = "xp-titlebar";

  const title = document.createElement("span");
  title.textContent = titles[app];

  const close = document.createElement("button");
  close.textContent = "x";
  close.onclick = () => win.remove();

  bar.append(title, close);

  const content = document.createElement("div");
  content.className = "xp-content";
  content.innerHTML = `<p>${titles[app]} window placeholder</p>`;

  win.append(bar, content);
  layer.appendChild(win);

  drag(win, bar);
}

function drag(win, bar) {
  let dx, dy;

  bar.onmousedown = e => {
    dx = e.clientX - win.offsetLeft;
    dy = e.clientY - win.offsetTop;

    document.onmousemove = e => {
      win.style.left = e.clientX - dx + "px";
      win.style.top = e.clientY - dy + "px";
    };

    document.onmouseup = () => {
      document.onmousemove = null;
    };
  };
}
