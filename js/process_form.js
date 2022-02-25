// removes the child nodes from the given element
function clearElement(el) {
  while (el.hasChildNodes()) el.removeChild(el.lastChild);
}

// shows a hint of how input should be formatted
function offerHint(e) {
  var el = e.target;
  var id = el.getAttribute("id");
  var spans = document.getElementsByTagName("span");

  if (id == "firstName") {
    clearElement(spans[0]);
    var sText = document.createTextNode("Enter only letters");
    spans[0].appendChild(sText);
  } else if (id == "lastName") {
    clearElement(spans[1]);
    var sText = document.createTextNode("Enter only letters");
    spans[1].appendChild(sText);
  } else if (id == "email") {
    clearElement(spans[2]);
    var sText = document.createTextNode(
      "Enter a valid e-mail address (must contain @)"
    );
    spans[2].appendChild(sText);
  } else if (id == "phone") {
    clearElement(spans[3]);
    var sText = document.createTextNode(
      "Enter a valid phone number (XXX-XXX-XXXX)"
    );
    spans[3].appendChild(sText);
  } else if (id == "website") {
    clearElement(spans[4]);
    var sText = document.createTextNode(
      "Enter a valid web address (must start with http:// and contain ~)"
    );
    spans[4].appendChild(sText);
  }
}

// validates input when focus is lost
function validateData(e) {
  var el = e.target;
  var id = el.getAttribute("id");
  var spans = document.getElementsByTagName("span");

  var checkmark = document.createElement("img");
  checkmark.setAttribute("src", "img/checkmark.png");

  var ex = document.createElement("img");
  ex.setAttribute("src", "img/ex.png");

  if (id == "firstName") {
    clearElement(spans[0]);
    var myRE = /^[a-zA-Z]+$/;
    if (el.value.match(myRE) == null) {
      var sText = document.createTextNode(
        "You did not enter a valid first name"
      );
      spans[0].appendChild(ex);
      spans[0].appendChild(sText);
    } else spans[0].appendChild(checkmark);
  } else if (id == "lastName") {
    clearElement(spans[1]);
    var myRE = /^[a-zA-Z]+$/;
    if (el.value.match(myRE) == null) {
      var sText = document.createTextNode(
        "You did not enter a valid last name"
      );
      spans[1].appendChild(ex);
      spans[1].appendChild(sText);
    } else spans[1].appendChild(checkmark);
  } else if (id == "email") {
    clearElement(spans[2]);
    myRE = /^[A-Za-z0-9]+@[A-Za-z]+[\.A-Za-z]+$/;
    if (el.value.match(myRE) == null) {
      var sText = document.createTextNode(
        "You did not enter a valid e-mail address"
      );
      spans[2].appendChild(ex);
      spans[2].appendChild(sText);
    } else spans[2].appendChild(checkmark);
  } else if (id == "phone") {
    clearElement(spans[3]);
    myRE = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/;
    if (el.value.match(myRE) == null) {
      var sText = document.createTextNode(
        "You did not enter a valid phone number"
      );
      spans[3].appendChild(ex);
      spans[3].appendChild(sText);
    } else spans[3].appendChild(checkmark);
  } else if (id == "website") {
    clearElement(spans[4]);
    myRE = /^http:\/\/[A-Za-z\.]+\/~[A-Za-z]{2}[0-9]{6}\/?$/;
    if (el.value.match(myRE) == null) {
      var sText = document.createTextNode(
        "You did not enter a valid website address"
      );
      spans[4].appendChild(ex);
      spans[4].appendChild(sText);
    } else spans[4].appendChild(checkmark);
  }
}

// returns true if all questions have an input and are in the correct format
function allAreInputted(inputs, myRE) {
  // checks that all text boxes have correct input
  for (var i = 0; i < inputs.length; i++)
    if (inputs[i].value.match(myRE[i]) == null) {
      console.log("text box is the issue");
      return false;
    }

  // checks that each question has an answer
  if (
    document.forms[0].timeOfDay.value == "" ||
    document.forms[0].animal.value == ""
  ) {
    console.log("the issue is the radio");
    return false;
  }

  console.log("everything is good in the hood for inputs");
  return true;
}

// returns an array of the answers and displays those answers
function getAnswers(div) {
  var answers = [];
  var answerString = "";

  if (document.forms[0].timeOfDay.value == "morning") {
    answers[0] = 0;
    answerString += "Your chosen time of day is the morning ";
  } else {
    answers[0] = 1;
    answerString += "Your chosen time of day is the night ";
  }

  if (document.forms[0].animal.value == "cat") {
    answers[1] = 0;
    answerString += "and your chosen animal is a cat.";
  } else {
    answers[1] = 1;
    answerString += "and your chosen animal is a dog.";
  }

  var answer = document.createElement("p");
  var answerText = document.createTextNode(answerString);
  answer.appendChild(answerText);
  answer.setAttribute("id", "userAnswer");

  div.appendChild(answer);
  return answers;
}

// shows user their info and badge image
function outputResults(e) {
  e.preventDefault();

  var firstName = document.getElementById("firstName");
  var lastName = document.getElementById("lastName");
  var email = document.getElementById("email");
  var phone = document.getElementById("phone");
  var website = document.getElementById("website");

  var inputs = [firstName, lastName, email, phone, website];
  var myRE = [
    /^[a-zA-Z]+$/,
    /^[a-zA-Z]+$/,
    /^[A-Za-z0-9]+@[A-Za-z]+[\.A-Za-z]+$/,
    /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/,
    /^http:\/\/[A-Za-z\.]+\/~[A-Za-z]{2}[0-9]{6}\/?$/,
  ];

  console.log("..before the check");
  if (allAreInputted(inputs, myRE)) {
    // outputting user info
    console.log("after the check...");
    var outputDiv = document.getElementById("output");
    clearElement(outputDiv);

    var name = document.createElement("h2");
    var greeting = document.createTextNode(
      "Howdy, " + firstName.value + " " + lastName.value
    );
    name.appendChild(greeting);

    var pEmail = document.createElement("p");
    var eAddress = document.createTextNode("email: " + email.value);
    pEmail.appendChild(eAddress);

    var pPhone = document.createElement("p");
    var phoneNum = document.createTextNode("phone: " + phone.value);
    pPhone.appendChild(phoneNum);

    var pWebsite = document.createElement("p");
    var wAddress = document.createTextNode("website: " + website.value);
    pWebsite.appendChild(wAddress);

    console.log("the div is empty at this point");

    outputDiv.appendChild(name);
    outputDiv.appendChild(pEmail);
    outputDiv.appendChild(pPhone);
    outputDiv.appendChild(pWebsite);

    console.log("the div has content (at least it should)");

    // outputting badge and related info
    var badgeDiv = document.createElement("div");

    var startText = document.createElement("h2");
    var stText = document.createTextNode("You are ...");
    startText.appendChild(stText);

    var characters = [
      ["Garfield", "a Golden Retriever"],
      ["a Black Panther", "a Night Wolf"],
    ];
    var imgs = [
      ["img/garfield-edited.jpg", "img/golden-retriever-edited.jpg"],
      ["img/black-panther-edited.jpg", "img/wolf-edited.jpg"],
    ];
    var radioAnswers = getAnswers(outputDiv);

    var endText = document.createElement("h2");
    var eText = document.createTextNode(
      characters[radioAnswers[0]][radioAnswers[1]]
    );
    endText.appendChild(eText);

    var imgDiv = document.createElement("div");
    var img = document.createElement("img");
    img.setAttribute("src", imgs[radioAnswers[0]][radioAnswers[1]]);
    imgDiv.appendChild(img);

    var anchor = document.createElement("a");
    anchor.setAttribute(
      "href",
      "http://students.cah.ucf.edu/~fr910229/dig3716c/assignment2/" +
        imgs[radioAnswers[0]][radioAnswers[1]]
    );
    anchor.setAttribute("target", "_blank");
    var aText = document.createTextNode(anchor.getAttribute("href"));
    anchor.appendChild(aText);

    badgeDiv.appendChild(startText);
    badgeDiv.appendChild(endText);
    badgeDiv.appendChild(imgDiv);
    badgeDiv.appendChild(anchor);

    outputDiv.appendChild(badgeDiv);
    outputDiv.scrollIntoView(true);
  } else {
    var outputDiv = document.getElementById("output");
    clearElement(outputDiv);

    var errorMsg = document.createElement("h2");
    var errorText = document.createTextNode(
      "Please enter all of your information correctly and answer all the questions :D"
    );
    errorMsg.appendChild(errorText);

    outputDiv.appendChild(errorMsg);
    outputDiv.scrollIntoView(true);
  }
}

// sets up event listeners
function init() {
  var firstName = document.getElementById("firstName");
  firstName.addEventListener("focus", offerHint, false);
  firstName.addEventListener("blur", validateData, false);

  var lastName = document.getElementById("lastName");
  lastName.addEventListener("focus", offerHint, false);
  lastName.addEventListener("blur", validateData, false);

  var email = document.getElementById("email");
  email.addEventListener("focus", offerHint, false);
  email.addEventListener("blur", validateData, false);

  var phone = document.getElementById("phone");
  phone.addEventListener("focus", offerHint, false);
  phone.addEventListener("blur", validateData, false);

  var website = document.getElementById("website");
  website.addEventListener("focus", offerHint, false);
  website.addEventListener("blur", validateData, false);

  var submit = document.getElementById("submitButton");
  submit.addEventListener("click", outputResults, false);
}

// ...
window.addEventListener("load", init, false);
