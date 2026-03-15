const windowArea = document.getElementById("window-append");

const apps = {
  mail: "mail-template",
  explorer: "files-template",
  ide: "ide-template",
};

const windows = {
  mail: { element: null, state: "closed", position: { x: 0, y: 0 } },
  explorer: { element: null, state: "closed", position: { x: 0, y: 0 } },
  ide: { element: null, state: "closed", position: { x: 0, y: 0 } },
};

function create(app) {
  const template = document.getElementById(apps[app]);
  const node = template.content.cloneNode(true);
  const win = node.querySelector(".window");

  const pos = windows[app].position;
  win.style.left = pos.x + "px";
  win.style.top = pos.y + "px";

  windowArea.appendChild(node);
  makeDrag(win);

  win.querySelector(".close").onclick = () => close(app);

  windows[app].element = win;
  return win;
}

function toggleApp(app) {
  const appInfo = windows[app];

  if (appInfo.state === "closed") {
    create(app);
    appInfo.state = "open";
  } else if (appInfo.state === "open") {
    appInfo.element.style.display = "none";
    appInfo.state = "minimized";
  } else if (appInfo.state === "minimized") {
    appInfo.element.style.display = "flex";
    appInfo.state = "open";
  }
}

function close(app) {
  const appInfo = windows[app];
  if (appInfo.element) {
    appInfo.element.remove();
    appInfo.element = null;
  }
  appInfo.state = "closed";
}

document.getElementById("file-explorer-dock").onclick = () =>
  toggleApp("explorer");
document.getElementById("mail-dock").onclick = () => toggleApp("mail");
document.getElementById("ide-dock").onclick = () => toggleApp("ide");

function makeDrag(win) {
  const header = win.querySelector(".header");

  header.onmousedown = (e) => {
    const rect = win.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;

    function mouseMove(e) {
      win.style.left = e.clientX - offsetX - 60 + "px"; // MAKE SURE TO CHANGE THIS NUMBER IF YOU EVER CHANGE THE DOCK SIZE
      win.style.top = e.clientY - offsetY + "px";
    }

    function mouseUp() {
      document.removeEventListener("mousemove", mouseMove);
      document.removeEventListener("mouseup", mouseUp);
    }

    document.addEventListener("mousemove", mouseMove);
    document.addEventListener("mouseup", mouseUp);
  };
}

const palette = document.getElementById("command-pallete");
const input = document.getElementById("command-input");
const results = document.getElementById("command-list");

document.addEventListener("keydown", (e) => {
  if (e.ctrlKey && e.code === "Space") {
    e.preventDefault();
    palette.classList.toggle("hidden");
    if (!palette.classList.contains("hidden")) {
      input.focus();
      renderResults("");
    }
  }
});

input.addEventListener("input", () => {
  renderResults(input.value);
});

function renderResults(search) {
  results.innerHTML = "";
  Object.keys(apps)
    .filter((app) => app.toLowerCase().includes(search))
    .forEach((app) => {
      const li = Document.createElement("li");
      li.textContent = app;
      li.onclick = () => {
        open(app);
        palette.classList.add("hidden");
      };
      results.appendChild(li);
    });
}

toggleApp("mail");
