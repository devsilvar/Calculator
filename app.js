// list out all needed variables that will need to be sucked out

//register all the button clickc you will need by choosing there DOM representation
const buttons = document.querySelectorAll("[data-num]");
const number = document.querySelectorAll(".numbers");
const zero = document.querySelector(".zero");
const calculate = document.querySelectorAll(".btn-calc");
const deleteBtn = document.querySelector(".delete");
const Solve = document.querySelector(".btn-equal");
const Dot = document.querySelector(".dot");
const inputScreen = document.querySelector(".CalcScreen");
const clearSc = document.querySelector(".ClearScreen");

//show each value of the botton on the screen when pressed
buttons.forEach((btnNUm) => {
  btnNUm.addEventListener("click", function (e) {
    var value = e.target.dataset.num;
    inputScreen.value += value;
  });
});

// Make simple calcuclations with + - / and * when the equal butoon is clicked

Solve.addEventListener("click", function () {
  let answer = inputScreen.value;
  inputScreen.value = eval(answer);

  // while you are clicking the equals button, if the position of the dot comes after the operation the dot will be disbaled and not be clickable
  if (
    inputScreen.value.lastIndexOf(".") >
    inputScreen.value.lastIndexOf("+" || "-" || "*" || "/")
  ) {
    Dot.disabled = true;
  }
});

// dealing with issues such as 011 * 1 , 021 * 1 , 031 * 1 , 051 * 1
// we resolvve it by removing 0 if it is the fist value in the input box and replace it with the second value
number.forEach(function (btnNUm) {
  btnNUm.addEventListener("click", function () {
    if (
      inputScreen.value.charAt(0) == "0" &&
      inputScreen.value.charAt(1) != "."
    ) {
      inputScreen.value = inputScreen.value.charAt(1);
    } else if (
      inputScreen.value.charAt(0) == "0" &&
      inputScreen.value.charAt(1) == "."
    ) {
      inputScreen.value = inputScreen.value;
    }
  });
});

// now lets correct teh calculator operation appearing twuce whne clicked simultanouely eg 2++3, 3--4, 5***9, 9///8 and 4...5
// we will be selecting the

calculate.forEach(function (btnNUm) {
  btnNUm.addEventListener("click", function (e) {
    var value = e.target.dataset.operation;

    //lets loop over the data operations +,-,/,*
    for (let i in calculate)
      if (calculate.hasOwnProperty(i)) {
        let calcOp = calculate[i].getAttribute("data-operation"); // value of each of the operations

        // now let checek each condition such that when a operation is clikced twice it the next value is sliced out
        if (
          inputScreen.value.charAt(inputScreen.value.lastIndexOf(value) - 1) ==
            calcOp &&
          (inputScreen.value.charAt(inputScreen.value.lastIndexOf(value)) ==
            "+" ||
            "-" ||
            "/" ||
            "*" ||
            ".")
        ) {
          inputScreen.value = inputScreen.value.slice(
            0,
            inputScreen.value.length - 1 //does let the next value of the same operation button regoster a new click
          );
        }
      }

    if (inputScreen.value.lastIndexOf(value) == "-" || "+" || "/" || "*") {
      // this simply allows the dot appear only after an operation has been clicked
      Dot.disabled = false;
    }

    //over here lets stop the * operation and the ? opertaion from appearing firts on the scnree as it can lead to error
    // we resolve that by chnaging the index once th efirts index is recorded as * or /
    if (
      inputScreen.value.charAt(0) == "*" ||
      inputScreen.value.charAt(0) == "/"
    ) {
      inputScreen.value = inputScreen.value.charAt(1);
    }
  });
});

//lets correct the issue of the dot showing up twice in a digit you ar eyet to calculate EG 23.45.66+ 9 or 89.89.2 * 4
// wew ill disable the dot button once it is clicked and it will be enabled whne an operation is clikced.

// go to line 99 to see how we disabled the dot.
// we enabled it in line 76

Dot.addEventListener("click", function () {
  Dot.disabled = true;
});

// now lets delete the diits one by one whne the delete button is pressed
deleteBtn.addEventListener("click", function (e) {
  var value = e.target.dataset.operation;
  inputScreen.value = inputScreen.value.slice(
    0,
    inputScreen.value.length - 1 //does let the next value of the same operation button regoster a new click;
  );
  if (inputScreen.value.lastIndexOf(value) == "+" || "-" || "/" || "*") {
    Dot.disabled = false;
  }

  if (
    inputScreen.value.lastIndexOf(".") <
    inputScreen.value.lastIndexOf("+" || "-" || "*" || "/")
  ) {
    Dot.disabled = false;
  }
  if (
    inputScreen.value.lastIndexOf(".") >
    inputScreen.value.lastIndexOf("+" || "-" || "*" || "/")
  ) {
    Dot.disabled = true;
  }
});
// done finished

clearSc.addEventListener("click", function () {
  Dot.disabled = false;
});
