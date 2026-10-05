const test = require("node:test");
const assert = require("node:assert");
const { greet } = require("../public/script.js");

test("Hello, World!", () => {
  assert.strictEqual(greet("World"), "Hello, World!");
});
