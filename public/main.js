import { delay, makeCounter, getRequired, describeSlot } from "./utils.js";
// Matches the three rows of the office-hours table.
const slots = [
    { day: "Monday", start: "10:00", end: "11:00", room: "Room 214" },
    { day: "Wednesday", start: "14:00", end: "15:00", room: "Room 214" },
    { day: "Friday", start: "09:00", end: "10:00", room: "Room 214" },
];
const status = getRequired("#status");
const tbody = getRequired("#schedule tbody");
const nextBooking = makeCounter();
tbody.addEventListener("click", async (event) => {
    const target = event.target;
    if (!(target instanceof Element))
        return; // EventTarget | null -> Element
    const button = target.closest("button[data-day]");
    const row = target.closest("tr");
    if (button === null || row === null)
        return; // closest() may return null
    const slot = slots.find((s) => s.day === button.dataset.day);
    if (slot === undefined)
        return; // find() may return undefined
    // Ignore extra clicks while this row is still updating.
    if (row.dataset.busy)
        return;
    row.dataset.busy = "true";
    status.textContent = `Updating ${slot.day}...`;
    await delay(1000);
    const booked = row.classList.toggle("selected");
    button.setAttribute("aria-pressed", String(booked));
    delete row.dataset.busy;
    const count = document.querySelectorAll("#schedule tr.selected").length;
    status.textContent = booked
        ? `Booking #${nextBooking()} confirmed: ${describeSlot(slot)}. ${count} of ${slots.length} slots booked.`
        : `Booking for ${slot.day} cancelled. ${count} of ${slots.length} slots booked.`;
});
