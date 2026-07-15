(() => {
  "use strict";

  const STORAGE_PREFIX = "syleit-meme-os:v1";
  const MAX_LOG_ENTRIES = 7;
  const PANIC_DURATION = 3200;
  const BINTED_DURATION = 4200;

  const events = [
    {
      text: "A SINGLE JPEG HAS REQUESTED UNION REPRESENTATION.",
      caption: "ARTIFACT HAS DECLINED TO EXPLAIN ITSELF.",
    },
    {
      text: "THE VIBECHECK PASSED, THEN IMMEDIATELY LOST ITS RECEIPT.",
      caption: "RECEIPT STATUS: PROBABLY IN THE VOID.",
    },
    {
      text: "YOU FOUND THE BUTTON. THE BUTTON FOUND YOU BACK.",
      caption: "LOCAL LOOP DETECTED. KEEP HANDS INSIDE BROWSER.",
    },
    {
      text: "A SMALL WIZARD HAS REPLACED YOUR TABS WITH MORE TABS.",
      caption: "THE ARTIFACT IS NOW AWARE OF BROWSING HABITS.",
    },
    {
      text: "CERTIFIED FRESH. CERTIFICATION OFFICE: A PARKING LOT.",
      caption: "QUALITY CONTROL WAS A VIBE, NOT A PROCESS.",
    },
  ];

  const phrases = [
    "BINTED?",
    "BOGOS BINTED.",
    "WHAT?",
    "BEEP BEEP, BOGOS.",
    "THE ORB SAID BINTED.",
    "NO REFUNDS. ONLY BINTED.",
    "BINTED WITH INTENT.",
  ];

  const element = (id) => document.getElementById(id);
  const dom = {
    localTime: element("local-time"),
    sessionStatus: element("session-status"),
    soundToggle: element("sound-toggle"),
    rouletteResult: element("roulette-result"),
    artifactCaption: element("artifact-caption"),
    bogosPhrase: element("bogos-phrase"),
    copyPhrase: element("copy-phrase"),
    copyFeedback: element("copy-feedback"),
    visitCount: element("visit-count"),
    interactionCount: element("interaction-count"),
    activityLog: element("activity-log"),
    consoleLauncher: element("console-launcher"),
    consoleDialog: element("command-dialog"),
    consoleClose: element("console-close"),
    commandForm: element("command-form"),
    commandInput: element("command-input"),
    consoleOutput: element("console-output"),
    notice: element("screen-reader-notice"),
  };

  const memoryStore = new Map();
  let localStorageAvailable = false;
  let soundEnabled = false;
  let audioContext;
  let panicTimer;
  let bintedTimer;
  let lastFocusedElement = null;
  let activityEntries = [];
  let currentPhrase = dom.bogosPhrase.textContent;
  let konamiPosition = 0;

  try {
    const probeKey = `${STORAGE_PREFIX}:storage-probe`;
    window.localStorage.setItem(probeKey, "1");
    window.localStorage.removeItem(probeKey);
    localStorageAvailable = true;
  } catch {
    localStorageAvailable = false;
  }

  const store = {
    get(key) {
      const scopedKey = `${STORAGE_PREFIX}:${key}`;
      if (localStorageAvailable) {
        try {
          return window.localStorage.getItem(scopedKey);
        } catch {
          localStorageAvailable = false;
        }
      }
      return memoryStore.get(scopedKey) ?? null;
    },
    set(key, value) {
      const scopedKey = `${STORAGE_PREFIX}:${key}`;
      const serializedValue = String(value);
      if (localStorageAvailable) {
        try {
          window.localStorage.setItem(scopedKey, serializedValue);
          return;
        } catch {
          localStorageAvailable = false;
        }
      }
      memoryStore.set(scopedKey, serializedValue);
    },
  };

  const readNumber = (key) => {
    const value = Number.parseInt(store.get(key) || "0", 10);
    return Number.isFinite(value) && value >= 0 ? value : 0;
  };

  const updateCounterDisplay = () => {
    dom.visitCount.textContent = readNumber("visits").toLocaleString();
    dom.interactionCount.textContent = readNumber("interactions").toLocaleString();
  };

  const incrementInteractions = () => {
    store.set("interactions", readNumber("interactions") + 1);
    updateCounterDisplay();
  };

  const announce = (message) => {
    dom.notice.textContent = "";
    window.setTimeout(() => {
      dom.notice.textContent = message;
    }, 30);
  };

  const addLog = (message) => {
    activityEntries = [message, ...activityEntries].slice(0, MAX_LOG_ENTRIES);
    dom.activityLog.replaceChildren(
      ...activityEntries.map((entry) => {
        const item = document.createElement("li");
        item.textContent = entry;
        return item;
      }),
    );
  };

  const randomItem = (items, current) => {
    if (items.length < 2) return items[0];
    const possibleItems = items.filter((item) => item !== current);
    return possibleItems[Math.floor(Math.random() * possibleItems.length)];
  };

  const updateSession = (state) => {
    dom.sessionStatus.textContent = state;
  };

  const updateTime = () => {
    const now = new Date();
    dom.localTime.textContent = new Intl.DateTimeFormat(undefined, {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }).format(now);
    dom.localTime.dateTime = now.toISOString();
  };

  const playTone = (frequency = 330, duration = 0.07) => {
    if (!soundEnabled) return;

    const AudioContextConstructor = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextConstructor) return;

    try {
      audioContext ||= new AudioContextConstructor();
      const scheduleTone = () => {
        const oscillator = audioContext.createOscillator();
        const gain = audioContext.createGain();
        oscillator.type = "square";
        oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
        gain.gain.setValueAtTime(0.0001, audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.028, audioContext.currentTime + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + duration);
        oscillator.connect(gain).connect(audioContext.destination);
        oscillator.start();
        oscillator.stop(audioContext.currentTime + duration + 0.01);
      };

      if (audioContext.state === "suspended") {
        audioContext.resume().then(scheduleTone).catch(() => {});
      } else {
        scheduleTone();
      }
    } catch {
      // Audio is an optional enhancement; the interface stays fully usable without it.
    }
  };

  const syncSoundControl = () => {
    dom.soundToggle.setAttribute("aria-pressed", String(soundEnabled));
    dom.soundToggle.textContent = `SOUND: ${soundEnabled ? "ON" : "OFF"}`;
  };

  const actionRandom = () => {
    const event = randomItem(events, dom.rouletteResult.textContent);
    dom.rouletteResult.textContent = event.text;
    dom.artifactCaption.textContent = event.caption;
    incrementInteractions();
    addLog("ROULETTE EVENT DEPLOYED.");
    announce("Meme roulette updated.");
    playTone(440);
    return "ROULETTE: EVENT DEPLOYED.";
  };

  const actionBogos = () => {
    currentPhrase = randomItem(phrases, currentPhrase);
    dom.bogosPhrase.textContent = currentPhrase;
    dom.copyFeedback.textContent = "COPY BUFFER: NEW PHRASE GENERATED";
    incrementInteractions();
    addLog("BOGOS PHRASE GENERATED.");
    announce(`Phrase generated: ${currentPhrase}`);
    playTone(510);
    return `PHRASE: ${currentPhrase}`;
  };

  const actionPanic = () => {
    window.clearTimeout(panicTimer);
    document.body.classList.add("panic-mode");
    updateSession("PANIC");
    incrementInteractions();
    addLog("PANIC MODE ACTIVE. STAY CALM, WHICH IS NOW HARDER.");
    announce("Panic mode active for three seconds.");
    playTone(190, 0.11);
    panicTimer = window.setTimeout(() => {
      document.body.classList.remove("panic-mode");
      updateSession(document.body.classList.contains("binted") ? "BINTED" : "STABLE");
      addLog("PANIC MODE EXITED WITHOUT INCIDENT.");
    }, PANIC_DURATION);
    return "PANIC: TEMPORARY INVERSION ACTIVE.";
  };

  const actionGithub = () => {
    incrementInteractions();
    addLog("GITHUB REQUEST ACKNOWLEDGED.");
    window.open("https://github.com/Syleit", "_blank", "noopener,noreferrer");
    return "GITHUB: OPENING PROFILE.";
  };

  const actionSound = () => {
    soundEnabled = !soundEnabled;
    store.set("sound", soundEnabled ? "on" : "off");
    syncSoundControl();
    incrementInteractions();
    addLog(`SOUND ${soundEnabled ? "ENABLED" : "DISABLED"}.`);
    announce(`Sound ${soundEnabled ? "enabled" : "disabled"}.`);
    if (soundEnabled) playTone(370);
    return `SOUND: ${soundEnabled ? "ON" : "OFF"}.`;
  };

  const actionClear = () => {
    activityEntries = [];
    dom.activityLog.replaceChildren();
    incrementInteractions();
    addLog("CONSOLE CLEARED. THE EVIDENCE IS GONE.");
    announce("Activity log cleared.");
    return "CLEAR: ACTIVITY LOG RESET.";
  };

  const actions = {
    random: actionRandom,
    bogos: actionBogos,
    panic: actionPanic,
    github: actionGithub,
    sound: actionSound,
    clear: actionClear,
  };

  const copyPhrase = async () => {
    const text = currentPhrase;
    let copied = false;

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        copied = true;
      }
    } catch {
      copied = false;
    }

    if (!copied) {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.append(textarea);
      textarea.select();
      try {
        copied = document.execCommand("copy");
      } catch {
        copied = false;
      }
      textarea.remove();
    }

    incrementInteractions();
    if (copied) {
      dom.copyFeedback.textContent = "COPY BUFFER: PHRASE COPIED";
      addLog("PHRASE COPIED TO LOCAL CLIPBOARD.");
      announce("Phrase copied to clipboard.");
      playTone(620);
    } else {
      dom.copyFeedback.textContent = "COPY BUFFER: BLOCKED — SELECT MANUALLY";
      addLog("COPY REQUEST BLOCKED BY BROWSER.");
      announce("Copy was blocked by the browser. Please select the phrase manually.");
    }
  };

  const openConsole = () => {
    if (typeof dom.consoleDialog.showModal !== "function") {
      dom.consoleOutput.textContent = "DIALOGS ARE NOT SUPPORTED IN THIS BROWSER.";
      return;
    }
    lastFocusedElement = document.activeElement;
    if (!dom.consoleDialog.open) dom.consoleDialog.showModal();
    dom.commandInput.value = "";
    dom.consoleOutput.textContent = "AWAITING INPUT.";
    window.setTimeout(() => dom.commandInput.focus(), 0);
  };

  const closeConsole = () => {
    if (dom.consoleDialog.open) dom.consoleDialog.close();
  };

  const runCommand = (rawCommand) => {
    const command = rawCommand.trim().toLowerCase();
    if (!command) return "TYPE A COMMAND OR TRY HELP.";
    if (command === "help") {
      return "COMMANDS: HELP, RANDOM, BOGOS, PANIC, GITHUB, SOUND, CLEAR.";
    }
    return actions[command]?.() || `UNKNOWN COMMAND: ${command.toUpperCase()}. TRY HELP.`;
  };

  const activateBintedProtocol = () => {
    window.clearTimeout(bintedTimer);
    document.body.classList.add("binted");
    updateSession("BINTED");
    dom.rouletteResult.textContent = "BINTED PROTOCOL ACCEPTS YOUR SACRIFICE.";
    dom.artifactCaption.textContent = "THE PROTOCOL WILL AUTO-EXPIRE. WE THINK.";
    addLog("KONAMI INPUT ACCEPTED. BINTED PROTOCOL ACTIVE.");
    announce("Binted protocol active.");
    playTone(770, 0.12);
    bintedTimer = window.setTimeout(() => {
      document.body.classList.remove("binted");
      updateSession(document.body.classList.contains("panic-mode") ? "PANIC" : "STABLE");
      addLog("BINTED PROTOCOL EXPIRED. NORMALITY RESTORED, UNVERIFIED.");
    }, BINTED_DURATION);
  };

  const bindEvents = () => {
    document.querySelectorAll("[data-action]").forEach((button) => {
      button.addEventListener("click", () => {
        const action = button.dataset.action;
        actions[action]?.();
      });
    });

    dom.soundToggle.addEventListener("click", actionSound);
    dom.copyPhrase.addEventListener("click", copyPhrase);
    dom.consoleLauncher.addEventListener("click", openConsole);
    dom.consoleClose.addEventListener("click", closeConsole);

    dom.commandForm.addEventListener("submit", (event) => {
      event.preventDefault();
      dom.consoleOutput.textContent = runCommand(dom.commandInput.value);
      dom.commandInput.value = "";
      dom.commandInput.focus();
    });

    dom.consoleDialog.addEventListener("close", () => {
      if (lastFocusedElement instanceof HTMLElement) lastFocusedElement.focus();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && dom.consoleDialog.open) {
        event.preventDefault();
        closeConsole();
        return;
      }

      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        openConsole();
        return;
      }

      const target = event.target;
      if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || target?.isContentEditable) return;

      const konami = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
      const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
      if (key === konami[konamiPosition]) {
        konamiPosition += 1;
        if (konamiPosition === konami.length) {
          konamiPosition = 0;
          activateBintedProtocol();
        }
      } else {
        konamiPosition = key === konami[0] ? 1 : 0;
      }
    });
  };

  const initialize = () => {
    store.set("visits", readNumber("visits") + 1);
    soundEnabled = store.get("sound") === "on";
    syncSoundControl();
    updateCounterDisplay();
    updateTime();
    window.setInterval(updateTime, 1000);
    addLog(localStorageAvailable ? "LOCAL STORAGE LINKED. NO DATA LEAVES THIS DEVICE." : "IN-MEMORY MODE. STORAGE IS UNAVAILABLE.");
    bindEvents();
  };

  initialize();
})();
