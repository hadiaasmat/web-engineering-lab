import { delay, makeCounter } from "./utils.js";

const status = document.querySelector("#status");
const tbody = document.querySelector("#schedule tbody");
const nextBooking = makeCounter();

// One delegated listener on the parent <tbody>.
tbody.addEventListener("click", async (event) => {
  const button = event.target.closest("button[data-day]");
  if (!button) return;

  const day = button.dataset.day;
  const row = button.closest("tr");

  // Ignore extra clicks while this row is still updating
  // (not using `disabled`, so keyboard focus is not lost).
  if (row.dataset.busy) return;
  row.dataset.busy = "true";

  status.textContent = `Updating ${day}...`;
  await delay(1000); // pauses only this handler; the page stays responsive

  const selected = row.classList.toggle("selected");
  button.setAttribute("aria-pressed", String(selected));
  delete row.dataset.busy;

  const count = document.querySelectorAll("#schedule tr.selected").length;
  status.textContent = selected
    ? `Booking #${nextBooking()} confirmed for ${day}. ${count} slot(s) booked.`
    : `Booking for ${day} cancelled. ${count} slot(s) booked.`;
});