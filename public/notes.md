# Lab 4 – Notes

## Task 2: Specificity and colour prediction

| Selector                       | Specificity | Result                                   |
|--------------------------------|-------------|------------------------------------------|
| `nav ul li a`                  | (0,0,4)     | Loses to every class/attribute selector  |
| `.nav-link`                    | (0,1,0)     | Beats `nav ul li a`; loses to attribute+element |
| `a[aria-current="location"]`   | (0,1,1)     | **Wins** – the current link is crimson   |
| `:where(nav ul li) a`          | (0,0,1)     | Fix: `:where()` adds zero, so the rule drops to the lowest priority |

- **Current link ("Office Hours")** matches all three rules → crimson (0,1,1 wins).
- **Other link ("Send Feedback")** matches `nav ul li a` and `.nav-link` → dark green (0,1,0 beats 0,0,4).
- Specificity is compared left to right, never added: four elements (0,0,4) still lose to one class (0,1,0).
- Using `!important` on `.nav-link` would make both links green by jumping to the top of the origin/importance step – a trap. The real problem was the over-specific selector, so `:where()` lowers it instead.

## Task 11: Event-loop snippet

```js
console.log("1 start");
setTimeout(() => console.log("2 timeout"), 0);
Promise.resolve().then(() => console.log("3 promise"));
console.log("4 end");
```

**Predicted and observed output:**

```
1 start
4 end
3 promise
2 timeout
```

**Explanation:**
1. `console.log("1 start")` runs on the call stack immediately.
2. `setTimeout` hands the timer to the browser; its callback waits in the **task queue** even with a 0 ms delay.
3. `Promise.resolve().then(...)` puts its callback in the **microtask queue**.
4. `console.log("4 end")` runs – the synchronous code is finished and the stack is empty.
5. The event loop empties the **microtask queue** first → `3 promise`.
6. Only then does it take the next task → `2 timeout`.

**Closure:** `makeCounter` returns an inner function that keeps access to `count` after `makeCounter` has returned, so each call to `nextBooking()` gives 1, 2, 3, …

**async/await:** `await delay(1000)` pauses only that click handler; the rest of the page stays responsive because the wait is handled by the browser timer and the continuation runs later as a microtask.