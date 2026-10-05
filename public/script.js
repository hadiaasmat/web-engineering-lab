function greet(name) {
  return `Hello, ${name}!`;
}

if (typeof document !== "undefined") {
  const heading = document.getElementById("greeting");
  heading.textContent = greet("World");
}

module.exports = { greet };
