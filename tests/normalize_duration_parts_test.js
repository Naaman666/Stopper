const { normalizeDurationParts } = require("../js/utils");

const tests = [
  // Happy paths
  {
    input: [5, 30],
    expected: { min: 5, sec: 30 },
    name: "Valid duration (5:30)",
  },
  {
    input: [0, 0],
    expected: { min: 0, sec: 0 },
    name: "Valid duration (0:00)",
  },
  {
    input: [60, 0],
    expected: { min: 60, sec: 0 },
    name: "Maximum valid duration (60:00)",
  },

  // String conversions
  {
    input: ["12", "45"],
    expected: { min: 12, sec: 45 },
    name: "String values converted to numbers",
  },
  {
    input: [" 5 ", " 0 "],
    expected: { min: 5, sec: 0 },
    name: "String values with spaces converted to numbers",
  },

  // Validation error paths
  { input: [-1, 30], expected: null, name: "Negative min" },
  { input: [5, -1], expected: null, name: "Negative sec" },
  { input: [61, 0], expected: null, name: "Min exceeds maximum (61)" },
  { input: [5, 60], expected: null, name: "Sec exceeds maximum (60)" },
  {
    input: [60, 1],
    expected: null,
    name: "Sec not zero when min is 60",
  },

  // Non-number / invalid parsing
  { input: ["abc", 30], expected: null, name: "Non-numeric min string" },
  { input: [5, "xyz"], expected: null, name: "Non-numeric sec string" },
  { input: [null, 30], expected: null, name: "Null min" },
  { input: [5, null], expected: null, name: "Null sec" },
  { input: [undefined, undefined], expected: null, name: "Undefined inputs" },
  { input: ["", ""], expected: null, name: "Empty strings" },
  { input: [true, false], expected: null, name: "Boolean types" },
  { input: [[], {}], expected: null, name: "Array and Object types" },
  { input: [NaN, 30], expected: null, name: "NaN min" },
  { input: [5, NaN], expected: null, name: "NaN sec" },
  { input: [Infinity, 30], expected: null, name: "Infinity min" },
  { input: [5, -Infinity], expected: null, name: "Negative Infinity sec" },

  // Float parsing (parseInt truncates floats)
  {
    input: [5.5, 30.9],
    expected: { min: 5, sec: 30 },
    name: "Floats are truncated to integers",
  },
];

let failedCount = 0;
tests.forEach((test) => {
  try {
    const result = normalizeDurationParts(test.input[0], test.input[1]);

    // Deep comparison of two objects
    const isSame = (a, b) => {
      if (a === b) return true;
      if (a === null && b === null) return true;
      if (a === null || b === null) return false;
      return a.min === b.min && a.sec === b.sec;
    };

    if (isSame(result, test.expected)) {
      console.log(`✅ PASSED: ${test.name}`);
    } else {
      console.log(
        `❌ FAILED: ${test.name} | Expected: ${JSON.stringify(test.expected)}, Got: ${JSON.stringify(result)}`,
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
  // eslint-disable-next-line no-undef
  process.exit(1);
} else {
  console.log("\nAll tests passed successfully!");
  // eslint-disable-next-line no-undef
  process.exit(0);
}
