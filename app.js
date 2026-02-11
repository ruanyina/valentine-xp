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

  // ----------------------------
  // Photo folder system
  // ----------------------------
  const photoFiles = [
    "First Date.jpg",
    "Second Date.jpg",
    "Third Date.jpg",
    "Freak Out.jpg",
    "Huge Ass.jpg",
    "Our Chairs.jpg",
    "Roof.jpg",
    "Double Cow.jpg",
    "Cucumber.jpg",
    "Empty Park.jpg",
    "Bruger.jpg",
    "Best Day Ever.jpg",
    "Go Dodgers.jpg",
    "Us.jpg",
    "You Didnt Want to Play.jpg",
    "Pier.jpg",
    "Photography.jpg",
    "The Miata.jpg"
  ];

  const folderWindow = document.getElementById("folderWindow");
  const viewerWindow = document.getElementById("viewerWindow");
  const photoList = document.getElementById("photoList");

  const closeFolderBtn = document.getElementById("closeFolderBtn");
  const closeViewerBtn = document.getElementById("closeViewerBtn");

  const viewerImg = document.getElementById("viewerImg");
  const viewerTitle = document.getElementById("viewerTitle");

  function getDisplayName(file) {
    return file.replace(/\.jpg$/i, "");
  }

  function openFolder() {
    if (!folderWindow || !photoList) {
      console.error("folderWindow or photoList missing in HTML");
      return;
    }

    photoList.innerHTML = "";

    photoFiles.forEach((file) => {
      const row = document.createElement("div");
      row.className = "xp-file";

      const icon = document.createElement("div");
      icon.className = "xp-file-icon";

      const label = document.createElement("div");
      label.className = "xp-file-name";
      label.textContent = getDisplayName(file);

      row.appendChild(icon);
      row.appendChild(label);

      row.addEventListener("click", () => openViewer(file));

      photoList.appendChild(row);
    });

    folderWindow.classList.remove("hidden");
  }

  function closeFolder() {
    folderWindow.classList.add("hidden");
  }

  function openViewer(file) {
    if (!viewerWindow || !viewerImg || !viewerTitle) {
      console.error("viewer elements missing in HTML");
      return;
    }

    viewerTitle.textContent = getDisplayName(file);
    viewerImg.src = file;
    viewerImg.alt = getDisplayName(file);

    viewerWindow.classList.remove("hidden");
  }

  function closeViewer() {
    viewerWindow.classList.add("hidden");
    viewerImg.src = "";
  }

  if (closeFolderBtn) closeFolderBtn.addEventListener("click", closeFolder);
  if (closeViewerBtn) closeViewerBtn.addEventListener("click", closeViewer);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (viewerWindow && !viewerWindow.classList.contains("hidden")) closeViewer();
      else if (folderWindow && !folderWindow.classList.contains("hidden")) closeFolder();
    }
  });

  // ----------------------------
  // Desktop icon clicks
  // Files opens the photo folder
  // Others open placeholder windows
  // ----------------------------
  document.querySelectorAll(".desktop-icon").forEach((icon) => {
    icon.addEventListener("click", () => {
      const app = icon.dataset.app;

      if (app === "files") {
        openFolder();
        return;
      }

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

  // ----------------------------
  // Music toggle (now safely inside DOMContentLoaded)
  // ----------------------------
  const music = document.getElementById("bgMusic");
  const btn = document.getElementById("musicBtn");

  if (music && btn) {
    btn.addEventListener("click", () => {
      if (music.paused) {
        music.play();
        btn.textContent = "❚❚";
      } else {
        music.pause();
        btn.textContent = "♫";
      }
    });
  } else {
    console.warn("bgMusic or musicBtn not found");
  }
});
