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

const idleGame = {
  optimization: 0,
  cpuBits: 0,
  gpuBits: 0,
};

const typingGame = {
  word: "",
  inputVal: "",
  startTime: null,
  correctChar: 0,
  totalChar: 0,
  completedWords: 0,
  element: null,
  input: null,
  wordDisplay: null,

  init() {
    const ide = document.getElementsByClassName("ide-content")[0];

    this.wordDisplay = ide.getElementsByClassName("word-elem")[0];
    this.input = ide.getElementsByClassName("input-elem")[0];

    this.generateWord();

    this.input.addEventListener("input", (e) => {
      this.inputStuff(e);
    });
  },

  generateWord() {
    this.word = WORDS[Math.floor(Math.random() * WORDS.length)];
    this.inputVal = "";
    this.startTime = Date.now();
    this.renderStuff();
    this.input.value = "";
    this.input.focus();
  },

  inputStuff(e) {
    if (!this.startTime) {
      this.startTime = Date.now();
    }

    this.inputVal = e.target.value;
    this.totalChar++;

    if (this.inputVal === this.word) {
      this.correctChar += this.word.length;
      this.completedWords++;
      this.generateWord();
    }

    this.renderStuff();
    this.updateStat();
  },

  renderStuff() {
    let html = "";
    for (let i = 0; i < this.word.length; i++) {
      if (i < this.inputVal.length) {
        const correct = this.inputVal[i] === this.word[i];
        html += `<span class="${correct ? "correct" : "wrong"}">${this.word[i]}</span>`;
      } else {
        html += `<span>${this.word[i]}</span>`;
      }
    }
    this.wordDisplay.innerHTML = html;
  },

  updateStat() {
    const timeSpent = (Date.now() - this.startTime) / 1000 / 60;
    document.getElementById("wpm").textContent =
      timeSpent > 0 ? Math.round(this.completedWords / timeSpent) : 0;
    document.getElementById("accuracy").textContent =
      this.totalChar > 0
        ? Math.round((this.correctChar / this.totalChar) * 100)
        : 100;
    document.getElementById("complete-words").textContent = this.completedWords;
  },
};

const WORDS = [
  "function",
  "const",
  "return",
  "async",
  "await",
  "import",
  "export",
  "class",
  "extends",
  "interface",
  "type",
  "enum",
  "namespace",
  "module",
  "declare",
  "abstract",
  "implements",
  "public",
  "private",
  "static",
  "override",
  "super",
  "this",
  "typeof",
  "void",
  "null",
  "string",
  "int",
  "boolean",
];

const palette = document.getElementById("command-pallete");
const input = document.getElementById("command-input");
const results = document.getElementById("command-list");

document.getElementById("file-explorer-dock").onclick = () => open("explorer");
document.getElementById("mail-dock").onclick = () => open("mail");
document.getElementById("ide-dock").onclick = () => open("ide");

// window management
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
  win.querySelector(".minimize").onclick = () => open(app);

  windows[app].element = win;
  return win;
}

function open(app) {
  const appInfo = windows[app];

  if (appInfo.state === "closed") {
    create(app);
    appInfo.state = "open";
    if (app === "ide") {
      setTimeout(() => typingGame.init(), 100);
    }
  } else if (appInfo.state === "open") {
    appInfo.element.style.display = "none";
    appInfo.state = "minimized";
  } else if (appInfo.state === "minimized") {
    appInfo.element.style.display = "block";
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

function renderResults(search) {
  results.innerHTML = "";
  Object.keys(apps)
    .filter((app) => app.toLowerCase().includes(search))
    .forEach((app) => {
      const li = document.createElement("li");
      li.textContent = app;
      li.onclick = () => {
        open(app);
        palette.classList.add("hidden");
      };
      results.appendChild(li);
    });
}

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

//command pallete
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

document.addEventListener("click", (e) => {
  if (!palette.contains(e.target) && !palette.classList.contains("hidden")) {
    palette.classList.add("hidden");
  }
});

open("mail");
