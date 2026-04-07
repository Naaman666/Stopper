const { normalizeDurationParts } = require("../js/utils");

const tests = [
  // Happy paths
  {
    input: { min: "5", sec: "0" },
    expected: { min: 5, sec: 0 },
    name: "Valid string inputs",
  },
  {
    input: { min: 0, sec: 30 },
    expected: { min: 0, sec: 30 },
    name: "Valid number inputs",
  },
  {
    input: { min: 60, sec: 0 },
    expected: { min: 60, sec: 0 },
    name: "Valid max minutes",
  },

  // Error paths: non-numeric inputs causing NaN
  {
    input: { min: "abc", sec: "0" },
    expected: null,
    name: "Invalid: non-numeric minutes",
  },
  {
    input: { min: "5", sec: "xyz" },
    expected: null,
    name: "Invalid: non-numeric seconds",
  },

  // Error paths: out of bounds
  {
    input: { min: -1, sec: 0 },
    expected: null,
    name: "Invalid: negative minutes",
  },
  {
    input: { min: 0, sec: -1 },
    expected: null,
    name: "Invalid: negative seconds",
  },
  { input: { min: 61, sec: 0 }, expected: null, name: "Invalid: minutes > 60" },
  { input: { min: 0, sec: 60 }, expected: null, name: "Invalid: seconds > 59" },

  // Error paths: 60 minutes with seconds
  {
    input: { min: 60, sec: 1 },
    expected: null,
    name: "Invalid: 60 minutes with seconds > 0",
  },

  // Empty or missing
  {
    input: { min: null, sec: null },
    expected: null,
    name: "Invalid: null inputs",
  },
  {
    input: { min: undefined, sec: undefined },
    expected: null,
    name: "Invalid: undefined inputs",
  },
];

let failedCount = 0;
tests.forEach((test) => {
  try {
    const result = normalizeDurationParts(test.input.min, test.input.sec);
    const resultString = JSON.stringify(result);
    const expectedString = JSON.stringify(test.expected);

    if (resultString === expectedString) {
      console.log(`✅ PASSED: ${test.name}`);
    } else {
      console.log(
        `❌ FAILED: ${test.name} | Expected: ${expectedString}, Got: ${resultString}`,
      );
      failedCount++;
    }
  } catch (e) {
    console.log(`❌ CRASHED: ${test.name} | Error: ${e.message}`);
    failedCount++;
  }
});

if (failedCount > 0) {
  console.log(`\nTotal ${failedCount} tests failed.`);
  process.exit(1); // eslint-disable-line no-undef
} else {
  console.log("\nAll tests passed successfully!");
  process.exit(0); // eslint-disable-line no-undef
}
