// ============================================================
// TASK 1: Asynchronous JavaScript Practice
// ============================================================

const outputBox = document.getElementById("async-output");

// Helper: show a message on the page AND in the console
function log(message) {
  console.log(message);
  const p = document.createElement("p");
  p.textContent = message;
  outputBox.appendChild(p);
}

// ------------------------------------------------------------
// 1 & 2. Execution Context + Event Loop
// ------------------------------------------------------------
// Execution context = the "environment" where code runs.
//   - Global context: runs first, top-level code lives here.
//   - Function context: created every time a function is called.
// Event loop = decides WHEN async code runs.
//   Order: 1) all synchronous code  2) promises (microtasks)  3) timers (macrotasks)
function showExecutionOrder() {
  log("--- Execution Order ---");
  log("1. Start (synchronous)");

  setTimeout(function () {
    log("4. setTimeout callback (runs last, waits in the callback queue)");
  }, 0);

  Promise.resolve().then(function () {
    log("3. Promise .then (runs before setTimeout)");
  });

  log("2. End (synchronous)");
}

// ------------------------------------------------------------
// 3. setTimeout() - run code ONE time after a delay
// ------------------------------------------------------------
function showTimeoutMessage() {
  log("Waiting 3 seconds...");
  setTimeout(function () {
    log("Hello! This message came after 3 seconds.");
  }, 3000);
}

// ------------------------------------------------------------
// 4. setInterval() - run code again and again
// ------------------------------------------------------------
let countdownId = null; // stores the timer id so we can stop it

function startCountdown() {
  if (countdownId !== null) return; // already running, do nothing

  let seconds = 5;
  log("Countdown started!");

  countdownId = setInterval(function () {
    log("Countdown: " + seconds);
    seconds--;

    if (seconds < 0) {
      clearInterval(countdownId); // stop the timer
      countdownId = null;
      log("Time's up!");
    }
  }, 1000);
}

// ------------------------------------------------------------
// 5. Callback function - a function passed into another function
// ------------------------------------------------------------
function getUser(name, callback) {
  log("Getting user...");
  setTimeout(function () {
    callback("Hello, " + name + "!"); // call the callback when ready
  }, 1000);
}

function showCallbackExample() {
  getUser("Maruf", function (message) {
    log(message);
  });
}

// ------------------------------------------------------------
// 6. Promise - resolve = success, reject = failure
// ------------------------------------------------------------
function checkAge(age) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      if (age >= 18) {
        resolve("Age " + age + ": Access granted.");
      } else {
        reject("Age " + age + ": Access denied (too young).");
      }
    }, 1000);
  });
}

function showPromiseExample() {
  // Success case
  checkAge(20)
    .then(function (result) { log(result); })
    .catch(function (error) { log(error); });

  // Failure case
  checkAge(15)
    .then(function (result) { log(result); })
    .catch(function (error) { log(error); });
}

// ------------------------------------------------------------
// 7. Async/Await - same Promise example, but easier to read
// ------------------------------------------------------------
async function showAsyncAwaitExample() {
  try {
    const result1 = await checkAge(20); // wait for the promise
    log(result1);

    const result2 = await checkAge(15); // this one rejects
    log(result2);
  } catch (error) {
    log(error); // rejected promise lands here
  }
}

// ------------------------------------------------------------
// Connect the buttons
// ------------------------------------------------------------
document.getElementById("btn-order").addEventListener("click", showExecutionOrder);
document.getElementById("btn-timeout").addEventListener("click", showTimeoutMessage);
document.getElementById("btn-interval").addEventListener("click", startCountdown);
document.getElementById("btn-callback").addEventListener("click", showCallbackExample);
document.getElementById("btn-promise").addEventListener("click", showPromiseExample);
document.getElementById("btn-async").addEventListener("click", showAsyncAwaitExample);
document.getElementById("btn-clear").addEventListener("click", function () {
  outputBox.innerHTML = "";
});
