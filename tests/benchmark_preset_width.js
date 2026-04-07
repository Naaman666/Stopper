const { performance } = require("perf_hooks");

// --- DOM Mock ---
class MockElement {
  constructor(tag, id = "") {
    this.tag = tag;
    this.id = id;
    this.className = "";
    this.style = { width: "" };
    this.children = [];
    this.clientWidth = 100;
  }
  appendChild(child) {
    this.children.push(child);
  }
  querySelectorAll(selector) {
    if (selector === ".preset-slot") {
      return this.children.filter((c) => c.className === "preset-slot");
    }
    return [];
  }
}

const mockDocument = {
  getElementById: (id) => {
    if (id === "presetScroll") return global.presetScrollEl;
    return null;
  },
};

// Setup mock DOM state
global.presetScrollEl = new MockElement("div", "presetScroll");
for (let i = 0; i < 10; i++) {
  const btn = new MockElement("button");
  btn.className = "preset-slot";
  global.presetScrollEl.appendChild(btn);
}
global.presetSlotEls = global.presetScrollEl.querySelectorAll(".preset-slot");
global.document = mockDocument;

// --- Eredeti / Unoptimized ---
function updatePresetSlotWidthsUnoptimized() {
  const scroll = global.document.getElementById("presetScroll");
  if (!scroll) return;
  const GAP = 8;
  const w = Math.floor((scroll.clientWidth - GAP * 2) / 3);
  if (w <= 0) return;
  scroll.querySelectorAll(".preset-slot").forEach((s) => {
    s.style.width = w + "px";
  });
}

// --- Jelenlegi / Optimized ---
function updatePresetSlotWidthsOptimized() {
  if (!global.presetScrollEl) return;
  const GAP = 8;
  const w = Math.floor((global.presetScrollEl.clientWidth - GAP * 2) / 3);
  if (w <= 0) return;
  global.presetSlotEls.forEach((s) => {
    s.style.width = w + "px";
  });
}

// --- Benchmark ---
function runBenchmark() {
  const ITERATIONS = 100000;

  let start = performance.now();
  for (let i = 0; i < ITERATIONS; i++) {
    updatePresetSlotWidthsUnoptimized();
  }
  let unoptimizedTime = performance.now() - start;

  start = performance.now();
  for (let i = 0; i < ITERATIONS; i++) {
    updatePresetSlotWidthsOptimized();
  }
  let optimizedTime = performance.now() - start;

  console.log(`--- Benchmark Eredmények (${ITERATIONS} iteráció) ---`);
  console.log(
    `Unoptimized (querySelectorAll): ${unoptimizedTime.toFixed(2)} ms`,
  );
  console.log(`Optimized (cached variables): ${optimizedTime.toFixed(2)} ms`);
  const improvement =
    ((unoptimizedTime - optimizedTime) / unoptimizedTime) * 100;
  console.log(`Javulás: ${improvement.toFixed(2)}% gyorsabb`);
}

runBenchmark();
