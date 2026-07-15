(() => {
  "use strict";

  const memes = [
    {
      src: "assets/unpleasantgradient.jpg",
      alt: "The original unpleasant gradient meme arriving at a front door",
      caption: "THE ORIGINAL UNPLEASANT GRADIENT",
    },
    {
      src: "assets/bigrat.jpg",
      alt: "A very large gray pet rat sitting on someone's lap",
      caption: "BIG RAT. OBJECTIVELY BIG.",
    },
    {
      src: "assets/dream_chungus.png",
      alt: "A simple drawing combining Dream's mask face with Big Chungus",
      caption: "DREAM CHUNGUS HAS LOGGED ON",
    },
    {
      src: "assets/trollcrazy.png",
      alt: "A distorted black and white trollface",
      caption: "CERTIFIED 2011 INTERNET FACE",
    },
    {
      src: "assets/unknown.png",
      alt: "Discord message from Brady saying your opinion doesn't matter",
      caption: "BRADY HAS CLOSED THE DISCUSSION",
    },
    {
      src: "assets/printer1bigger.png",
      alt: "A mouse labelled printer",
      caption: "PHOTOS PRINTED",
    },
  ];

  const junkAssets = [
    "assets/bigrat.jpg",
    "assets/trollcrazy.png",
    "assets/dream_chungus.png",
    "assets/cartoon-cheese-3.png",
  ];

  const palettes = [
    ["#00b8a9", "#0077ff", "#ff2fb3", "#fff200"],
    ["#ff7a00", "#7434ff", "#00ff66", "#ffea00"],
    ["#ff44c7", "#00aaff", "#7dff00", "#fff200"],
    ["#65d40b", "#ff1744", "#00e5ff", "#ffe600"],
  ];

  const byId = (id) => document.getElementById(id);
  const dom = {
    root: document.documentElement,
    body: document.body,
    randomTop: byId("random-top"),
    worseTop: byId("worse-top"),
    randomMeme: byId("random-meme"),
    makeWorse: byId("make-worse"),
    resetSite: byId("reset-site"),
    memeStage: byId("meme-stage"),
    memeImage: byId("meme-image"),
    memeCaption: byId("meme-caption"),
    damageStatus: byId("damage-status"),
    ratSize: byId("rat-size"),
    addRat: byId("add-rat"),
    releaseCheese: byId("release-cheese"),
    trollButton: byId("troll-button"),
    controlStatus: byId("control-status"),
    printBogos: byId("print-bogos"),
    printerOutput: byId("printer-output"),
    printerSound: byId("printer-sound"),
    printStatus: byId("print-status"),
    junkLayer: byId("junk-layer"),
    visitCount: byId("visit-count"),
  };

  let currentMeme = 0;
  let chaosLevel = 0;
  let printerTimer;
  let konamiPosition = 0;

  const randomBetween = (min, max) => Math.random() * (max - min) + min;
  const randomItem = (items) => items[Math.floor(Math.random() * items.length)];
  const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const setVisitCount = () => {
    const key = "syleit-goofy-site:v2:visits";
    let visits = 1;
    try {
      visits = Number.parseInt(window.localStorage.getItem(key) || "0", 10) + 1;
      if (!Number.isFinite(visits)) visits = 1;
      window.localStorage.setItem(key, String(visits));
    } catch {
      visits = 1;
    }
    dom.visitCount.textContent = visits.toLocaleString();
  };

  const applyRandomPalette = () => {
    const [background, backgroundTwo, hot, yellow] = randomItem(palettes);
    dom.root.style.setProperty("--page-bg", background);
    dom.root.style.setProperty("--page-bg-2", backgroundTwo);
    dom.root.style.setProperty("--hot", hot);
    dom.root.style.setProperty("--yellow", yellow);
  };

  const showMeme = (index) => {
    const meme = memes[index];
    currentMeme = index;
    dom.memeImage.src = meme.src;
    dom.memeImage.alt = meme.alt;
    dom.memeCaption.textContent = meme.caption;
    dom.memeStage.style.setProperty("--stage-tilt", `${randomBetween(-4, 4).toFixed(1)}deg`);
  };

  const showRandomMeme = () => {
    let next = currentMeme;
    while (next === currentMeme && memes.length > 1) {
      next = Math.floor(Math.random() * memes.length);
    }
    showMeme(next);
    applyRandomPalette();
    dom.controlStatus.textContent = `MEME LOADED: ${memes[next].caption}`;
    byId("meme-machine").scrollIntoView({ behavior: reducedMotion() ? "auto" : "smooth", block: "start" });
  };

  const createJunk = (forcedAsset) => {
    const image = document.createElement("img");
    image.className = "junk-item";
    image.src = forcedAsset || randomItem(junkAssets);
    image.alt = "";
    image.style.setProperty("--junk-left", `${randomBetween(0, 88).toFixed(1)}vw`);
    image.style.setProperty("--junk-top", `${randomBetween(4, 82).toFixed(1)}vh`);
    image.style.setProperty("--junk-size", `${randomBetween(55, 175).toFixed(0)}px`);
    image.style.setProperty("--junk-angle", `${randomBetween(-30, 30).toFixed(0)}deg`);
    image.style.setProperty("--junk-speed", `${randomBetween(1.4, 3.5).toFixed(1)}s`);
    dom.junkLayer.append(image);
  };

  const makeWebsiteWorse = () => {
    if (chaosLevel < 5) chaosLevel += 1;
    dom.body.dataset.chaos = String(chaosLevel);
    applyRandomPalette();
    for (let index = 0; index < chaosLevel; index += 1) createJunk();
    dom.damageStatus.textContent = `WEBSITE DAMAGE: ${chaosLevel} / 5`;
    dom.controlStatus.textContent = chaosLevel === 5 ? "MAXIMUM WEBSITE ACHIEVED." : `DAMAGE LAYER ${chaosLevel} ADDED.`;
    dom.makeWorse.textContent = chaosLevel === 5 ? "IT CANNOT GET WORSE (CLICK ANYWAY)" : "ADD 1 WEBSITE DAMAGE";
  };

  const releaseCheese = () => {
    const count = reducedMotion() ? 5 : 16;
    for (let index = 0; index < count; index += 1) {
      if (reducedMotion()) {
        createJunk("assets/cartoon-cheese-3.png");
        continue;
      }
      const cheese = document.createElement("img");
      cheese.className = "cheese-drop";
      cheese.src = "assets/cartoon-cheese-3.png";
      cheese.alt = "";
      cheese.style.setProperty("--junk-left", `${randomBetween(0, 94).toFixed(1)}vw`);
      cheese.style.setProperty("--junk-size", `${randomBetween(45, 120).toFixed(0)}px`);
      cheese.style.setProperty("--junk-angle", `${randomBetween(-45, 45).toFixed(0)}deg`);
      cheese.style.setProperty("--fall-speed", `${randomBetween(2.8, 4.8).toFixed(1)}s`);
      cheese.style.setProperty("--fall-delay", `${randomBetween(0, 1.2).toFixed(1)}s`);
      dom.junkLayer.append(cheese);
      window.setTimeout(() => cheese.remove(), 6500);
    }
    dom.controlStatus.textContent = "CHEESE RELEASED. LOOK UP.";
  };

  const addRat = () => {
    createJunk("assets/bigrat.jpg");
    dom.controlStatus.textContent = "ONE ADDITIONAL RAT HAS ENTERED THE WEBSITE.";
  };

  const summonTroll = () => {
    for (let index = 0; index < 9; index += 1) createJunk("assets/trollcrazy.png");
    dom.controlStatus.textContent = "TROLLFACE EMERGENCY SUCCESSFUL.";
  };

  const printBogos = () => {
    window.clearTimeout(printerTimer);
    dom.printerOutput.hidden = false;
    dom.printStatus.textContent = "PRINTING BOGOS...";
    dom.printerSound.currentTime = 0;
    const playback = dom.printerSound.play();
    if (playback) {
      playback.catch(() => {
        dom.printStatus.textContent = "PHOTOS PRINTED. AUDIO WAS BLOCKED.";
      });
    }
    printerTimer = window.setTimeout(() => {
      dom.printStatus.textContent = "PHOTOS PRINTED.";
    }, 1400);
  };

  const resetEverything = () => {
    window.clearTimeout(printerTimer);
    chaosLevel = 0;
    dom.body.dataset.chaos = "0";
    dom.root.style.removeProperty("--page-bg");
    dom.root.style.removeProperty("--page-bg-2");
    dom.root.style.removeProperty("--hot");
    dom.root.style.removeProperty("--yellow");
    dom.root.style.setProperty("--rat-scale", "1");
    dom.ratSize.value = "100";
    dom.junkLayer.replaceChildren();
    dom.printerOutput.hidden = true;
    dom.printerSound.pause();
    dom.printerSound.currentTime = 0;
    dom.makeWorse.textContent = "ADD 1 WEBSITE DAMAGE";
    dom.damageStatus.textContent = "WEBSITE DAMAGE: 0 / 5";
    dom.controlStatus.textContent = "WEBSITE RESET. THE RAT REMAINS.";
    showMeme(0);
    dom.memeStage.style.setProperty("--stage-tilt", "-1deg");
  };

  const bindEvents = () => {
    dom.randomTop.addEventListener("click", showRandomMeme);
    dom.randomMeme.addEventListener("click", showRandomMeme);
    dom.worseTop.addEventListener("click", makeWebsiteWorse);
    dom.makeWorse.addEventListener("click", makeWebsiteWorse);
    dom.resetSite.addEventListener("click", resetEverything);
    dom.addRat.addEventListener("click", addRat);
    dom.releaseCheese.addEventListener("click", releaseCheese);
    dom.trollButton.addEventListener("click", summonTroll);
    dom.printBogos.addEventListener("click", printBogos);

    dom.ratSize.addEventListener("input", () => {
      dom.root.style.setProperty("--rat-scale", String(Number(dom.ratSize.value) / 100));
      dom.controlStatus.textContent = `RAT SIZE: ${dom.ratSize.value}%`;
    });

    document.addEventListener("keydown", (event) => {
      const target = event.target;
      if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || target?.isContentEditable) return;
      const sequence = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
      const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
      if (key === sequence[konamiPosition]) {
        konamiPosition += 1;
        if (konamiPosition === sequence.length) {
          konamiPosition = 0;
          chaosLevel = 5;
          dom.body.dataset.chaos = "5";
          for (let index = 0; index < 20; index += 1) createJunk("assets/trollcrazy.png");
          dom.damageStatus.textContent = "WEBSITE DAMAGE: KONAMI / 5";
          dom.controlStatus.textContent = "KONAMI TROLLFACE MODE.";
        }
      } else {
        konamiPosition = key === sequence[0] ? 1 : 0;
      }
    });
  };

  setVisitCount();
  bindEvents();
})();
