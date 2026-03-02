import { Calculator, handleFE } from './model.js';
import { evalHistory } from './db.js';

const displayElement = document.getElementById("input");
const myCalculator = new Calculator(displayElement);
const buttons = document.querySelectorAll(".btn");
const trigno = document.querySelector("select[value=trignometry]");
const functions = document.querySelector("select[value=function]");

document.addEventListener("DOMContentLoaded", () => {
  myCalculator.renderHistory();
  
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const btnText = button.innerText;
      if (btnText == "=") {
        myCalculator.calc();
      } else if (btnText == "C") {
        myCalculator.clear();
      } else if (btnText == "x2") {
        myCalculator.square();
      } else if (btnText == "n!") {
        myCalculator.append("!");
      } else if (btnText === "MS") {
        myCalculator.memoryStr();
      } else if (btnText === "MC") {
        myCalculator.memoryClr();
      } else if (btnText === "MR") {
        myCalculator.memoryRec();
      } else if (btnText === "M+") {
        myCalculator.memoryAdd();
      } else if (btnText === "M-") {
        myCalculator.memorySub();
      } else if (btnText === "+/-") {
        myCalculator.changeSign();
      } else if (btnText === "F-E") {
        myCalculator.display.value = handleFE(myCalculator.display.value);
    
      } else {
        myCalculator.append(btnText);
      }
    });
  });

  document.getElementById("clearHistory").addEventListener("click", () => {
    evalHistory.clear();
    myCalculator.renderHistory();
  });

  const spaceBtn = document.querySelector("#backspace-btn");
  const disp = document.querySelector("#input");

  spaceBtn.addEventListener("click", () => {
    if (disp.value.length > 0) {
      disp.value = disp.value.slice(0, -1);
    }
    if (disp.value === "") {
      disp.value = "0";
    }
  });

  trigno.addEventListener("change", (e) => {
    if (e.target.value) {
      myCalculator.append(`${e.target.value}(`);
    }
    e.target.selectedIndex = 0;
  });

  functions.addEventListener("change", (e) => {
    if (e.target.value) {
      myCalculator.append(`${e.target.value}(`);
    }
    e.target.selectedIndex = 0;
  });

  const themeBtn = document.getElementById("theme-toggle");
  themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    themeBtn.innerText = document.body.classList.contains("dark-mode")
      ? "Light ☀️"
      : "Dark 🌙";
  });
});