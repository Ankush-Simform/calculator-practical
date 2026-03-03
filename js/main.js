import { Calculator, handleFE } from './model.js';
import { evalHistory } from './db.js';

const displayElement = document.getElementById("input");
const myCalculator = new Calculator(displayElement);
const buttons = document.querySelectorAll(".btn");
const trigno = document.querySelector("select[value=trignometry]");
const functions = document.querySelector("select[value=function]");


 document.getElementById("input").addEventListener("keydown",
    function(e){
      if (e.key.length === 1) {
    myCalculator.append(e.key);
  }
    });
 
document.addEventListener("DOMContentLoaded", () => {
  myCalculator.renderHistory(); 

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const btnText = button.innerText;
      switch (btnText) {
        case "=":
          myCalculator.calc();
          break;
        case "C":
          myCalculator.clear();
          break;
        case "x2":
          myCalculator.square();
          break;
        case "n!":
          myCalculator.append("!");
          break;
        case "MS":
          myCalculator.memoryStr();
          break;
        case "MC":
          myCalculator.memoryClr();
          break;
        case "MR":
          myCalculator.memoryRec();
          break;
        case "M+":
          myCalculator.memoryAdd();
          break;
        case "M-":
          myCalculator.memorySub();
          break;
        case "+/-":
          myCalculator.changeSign();
          break;
        case "F-E":
          myCalculator.display.value = handleFE(myCalculator.display.value);
          break;
        default:
          myCalculator.append(btnText);
          break;
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