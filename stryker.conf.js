module.exports = function(config) {
  config.set({
    mutator: "javascript",
    packageManager: "npm",
    reporters: ["html", "clear-text", "progress", "dashboard"],
    testRunner: "mocha",
    transpilers: [],
    testFramework: "mocha",
    coverageAnalysis: "perTest",
    mochaOptions: {
      spec: ['./test/unit/**/*.spec.js', './test/unit/**/*.test.js']
    },
  });
};
