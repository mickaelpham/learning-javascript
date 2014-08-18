(function (window, document) {

  var MAXIMUM_RANDOM = 100;

  var SUCCESS = "success";
  var INFO = "info";
  var WARNING = "warning";
  var ERROR = "error";

  var btnSubmit = document.getElementById("btnSubmit");
  var btnReset = document.getElementById("btnReset");
  var inputNumber = document.getElementById("inputNumber");
  var messages = document.getElementById("messages");
  var attempts = document.getElementById("attempts");

  var secret;
  var nAttempts;

  function newTurn(userInput) {
    var status;
    if (userInput < secret) {
      display("It's more than " + userInput + ".", INFO);
      resetInputField();
      status = "more";
    } else if (userInput > secret) {
      display("It's less than " + userInput + ".", INFO);
      resetInputField();
      status = "less";
    } else {
      display("You found the secret number! It was " + userInput + "!",
          SUCCESS);
      disableInputField();
      status = "found";
    }
    updateAttempts(++nAttempts, userInput, status);
  }

  function resetInputField() {
    inputNumber.value = "";
    inputNumber.focus();
  }

  function disableInputField() {
    inputNumber.setAttribute("disabled", "disabled");
    btnSubmit.setAttribute("disabled", "disabled");
  }

  function updateAttempts(nAttempts, userInput, status) {
    var ul;
    if (attempts.firstChild) {
      ul = attempts.firstChild;
    } else {
      ul = document.createElement("ul");
      attempts.appendChild(ul);
    }
    var li = document.createElement("li");
    li.appendChild(document.createTextNode("Attempt #" + nAttempts + ": "
        + userInput + " (" + status + ")"));
    ul.appendChild(li);
  }

  function display(message, severity) {
    // Clear existing messages.
    while (messages.firstChild) {
      messages.removeChild(messages.firstChild);
    }
    // Prepare the new message to be displayed.
    var p = document.createElement("p");
    p.setAttribute("class", "alert alert-" + severity);
    p.appendChild(document.createTextNode(message));
    messages.appendChild(p);
  }

  function reset() {
    inputNumber.removeAttribute("disabled");
    btnSubmit.removeAttribute("disabled");
    while (messages.firstChild)
      messages.removeChild(messages.firstChild);
    while (attempts.firstChild)
      attempts.removeChild(attempts.firstChild);
    resetInputField();
    secret = Math.floor(Math.random() * MAXIMUM_RANDOM) + 1;
    nAttempts = 0;
    console.log(">>> secret generated = " + secret);
  }

  // Initialize the game the first time
  reset();

  btnSubmit.addEventListener("click", function (e) {
    e.preventDefault();
    newTurn(inputNumber.value);
  }, false);

  btnReset.addEventListener("click", function (e) {
    e.preventDefault();
    reset();
  }, false);

}(this, this.document));