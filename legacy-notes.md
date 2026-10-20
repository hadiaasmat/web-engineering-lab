# Lab 5 – Notes

## Task 2: jQuery → native JavaScript

| jQuery | Native JavaScript |
|--------|-------------------|
| `$(document).ready(fn)` | `<script type="module">` (or `DOMContentLoaded`) |
| `$("#name").val()` | `document.querySelector("#name").value` |
| `.after(html)` | `document.createElement()` + `input.after(element)` |
| `$(".error").remove()` | `querySelectorAll(".error").forEach((el) => el.remove())` |
| `.text(...).hide().fadeIn(400)` | `status.textContent = "..."` (fade dropped; use a CSS transition if needed) |
| `$form[0].reset()` | `form.reset()` |

## Three legacy smells

1. `var` instead of `const` / `let`.
2. `$.trim()` and `indexOf("@") === -1` instead of `.trim()` and `.includes("@")`.
3. Building HTML from a string instead of creating elements and using `textContent`.

## Task 6: two type errors from `npm run typecheck`

1. `src/main.ts: error TS18047: 'tbody' is possibly 'null'.`
2. `src/utils.ts: error TS7006: Parameter 'ms' implicitly has an 'any' type.`