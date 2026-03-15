const windowArea = document.getElementById("window-append");

const apps = {
  mail: "mail-template",
  explorer: "files-template",
  ide: "ide-template",
};

function open(app) {
  const template = document.getElementById(apps[app]);
  const node = template.content.cloneNode(true);
  const win = node.querySelector(".window");

  win.style.left = Math.random() * 300 + "px";
  win.style.top = Math.random() * 200 + "px";

  windowArea.appendChild(node);
  makeDrag(win);

  win.querySelector(".close").onclick = () => win.remove();
}

document.getElementById("file-explorer-dock").onclick = () => open("explorer");
document.getElementById("mail-dock").onclick = () => open("mail");
document.getElementById("ide-dock").onclick = () => open("ide");

function makeDrag(win) {
  const header = win.querySelector(".header");
  let offsetX,
    offsetY,
    drag = false;

  header.onmousedown = (e) => {
    drag = true;
    offsetX = e.clientX - offsetX + "px";
    offsetY = e.clientY - offsetY + "px";
  };

  document.onmouseup = () => {
    drag = false;
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
