function getValue() {
  return JSON.parse(localStorage.getItem("calculates")) || [];
}

function saveValue(data) {
  localStorage.setItem("calculates", JSON.stringify(data));
}
console.log("clicked");

class Calculator {
  constructor(DISPLAYELEMENT) {
    this.display = DISPLAYELEMENT;
    this.memory = 0;
    this.isDegreeMode = true;
  }

  memoryClr() {
    this.memory = 0;
    this.display.value = "";
  }
  memoryRec() {
    this.display.value = this.memory;
  }
  memoryAdd() {
    let currValue = eval(this.display.value) || 0;
    this.memory += parseFloat(currValue);
    this.display.value = "";
  }
  memorySub() {
    let currValue = eval(this.display.value) || 0;

    this.memory -= parseFloat(currValue);
    this.display.value = "";
  }
  memoryStr() {
    if (this.display.value === "") return;

    try {
      const currentValue = eval(this.display.value);
      this.memory = parseFloat(currentValue);
      this.display.value = "";
    } catch (e) {
      this.display.value = "Error";
    }
  }
  changeSign() {
    if (this.display.value === "") return;
    try {
      let result = eval(this.display.value);
      this.display.value = result * -1;
    } catch (e) {
      this.display.value = "error";
    }
  }
  clear() {
    if (this.display) this.display.value = "";
  }
  append(value) {
    if (value === "x") value = "*";
    if (value === "÷") value = "/";
    if (value === "n!") value = "!";
    if (value === "π") value = "3.14";
    if (value === "e") value = "2.71828";

    if (value === "sin") value = "sin(";
    if (value === "mod") value = "/";
    if (value === "1/x") {
      this.display.value = "1/ " + this.display.value + "";
      return;
    }
    if (value === "3√x") {
      this.display.value = "3√(" + this.display.value + ")";
      return;
    }
    if (value === "log") {
      this.display.value += "log(";
      return;
    }
    if (value === "ln") {
      this.display.value += "ln(";
      return;
    }
    if (value === "xy" || value === "x^y") {
      this.display.value += "**";
      return;
    }
    if (value === "10x" || value === "10^x") {
      this.display.value += "10**";
      return;
    }

    if (value === "|x|") {
      this.display.value = "|" + this.display.value + "|";
      return;
    }
    console.log(this.display.value, value);
    this.display.value += value;
        console.log(this.display.value);

  }

  calc() {
    let exp = this.display.value;

    if (exp.includes("!")) {
      exp = exp.replace(/(\d+)!/g, (match, number) => {
        return this.getFactorial(parseInt(number));
      });
    }
    if (exp.includes("3√(")) {
      exp = exp.replace(/3√\(([\d.-]+)\)/g, (match, number) => {
        return Math.cbrt(parseFloat(number));
      });
    }
    if (exp.includes("log(")) {
      exp = exp.replace(/log\(([\d.]+)\)/g, (match, number) => {
        return Math.log10(parseFloat(number));
      });
    }

    if (exp.includes("ln(")) {
      exp = exp.replace(/ln\(([\d.]+)\)/g, (match, number) => {
        return Math.log(parseFloat(number));
      });
    }

    // if (exp.includes("3√(")) {
    //   exp = exp.replace(/3√\(([\d.-]+)\)/g, (match, number) => {
    //     return Math.cbrt(parseFloat(number));
    //   });
    // }
    // if (exp.includes("sin(")) {
    //   exp = exp.replace(/sin\((\d+)\)/g, (match, number) => {
    //     const degrees = parseFloat(number);
    //     const radians = degrees * (Math.PI / 180);
    //     return Math.sin(radians);
    //   });
    // }
    // if (exp.includes("cos(")) {
    //   exp = exp.replace(/cos  \((\d+)\)/g, (match, number) => {
    //     const degrees = parseFloat(number);
    //     const radians = degrees * (Math.PI / 180);
    //     return Math.cos(radians);
    //   });
    // }
    const trigFunctions = ["sin", "cos", "tan", "cosec", "sec", "cot"];

    trigFunctions.forEach((func) => {
      if (exp.includes(`${func}(`)) {
        const regex = new RegExp(`${func}\\(([\\d.]+)\\)`, "g");

        exp = exp.replace(regex, (match, number) => {
          const degrees = parseFloat(number);
          const radians = degrees * (Math.PI / 180);

          if (func === "sin") return Math.sin(radians);
          if (func === "cos") return Math.cos(radians);
          if (func === "tan") return Math.tan(radians);
          if (func === "cosec") return 1 / Math.sin(radians);
          if (func === "sec") return 1 / Math.cos(radians);
          if (func === "cot") return 1 / Math.tan(radians);
        });
      }
    });

    try {
      this.display.value = eval(exp);
    } catch (e) {
      this.display.value = "Error";
    }
  }

  square() {
    this.display.value = Math.pow(parseFloat(this.display.value), 2);
  }

  getFactorial(n) {
    if (n < 0) return "Error";
    let result = 1;
    for (let i = 2; i <= n; i++) result *= i;
    return result;
  }
}
const DISPLAYELEMENT = document.getElementById("input");
const MYCALCULATOR = new Calculator(DISPLAYELEMENT);
const BUTTONS = document.querySelectorAll(".btn");
const TRIGNO = document.querySelector("select[value=trignometry]");
document.addEventListener("DOMContentLoaded", () => {
  BUTTONS.forEach((button) => {
    button.addEventListener("click", () => {
      const btnText = button.innerText;
      if (btnText == "=") {
        MYCALCULATOR.calc();
      } else if (btnText == "C") {
        MYCALCULATOR.clear();
      } else if (btnText == "x2") {
        MYCALCULATOR.square();
      } else if (btnText == "n!") {
        MYCALCULATOR.append("!");
        // } else if (btnText == "sin") {
        //   MYCALCULATOR.append("sin(");
      } else if (btnText === "MS") {
        MYCALCULATOR.memoryStr();
      } else if (btnText === "MC") {
        MYCALCULATOR.memoryClr();
      } else if (btnText === "MR") {
        MYCALCULATOR.memoryRec();
      } else if (btnText === "M+") {
        MYCALCULATOR.memoryAdd();
      } else if (btnText === "M-") {
        MYCALCULATOR.memorySub();
      } else if (btnText === "+/-") {
        MYCALCULATOR.changeSign();
      } else {
        MYCALCULATOR.append(btnText);
      }
    });
  });

  TRIGNO.addEventListener("change", (e) => {
    const selectedValue = e.target.value;

    if (selectedValue) {
      MYCALCULATOR.append(`${selectedValue}(`);
    }

    e.target.selectedIndex = 0;
  });
});

const THEMEBTN = document.getElementById("theme-toggle");
THEMEBTN.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  THEMEBTN.innerText = document.body.classList.contains("dark-mode")
    ? "Light ☀️"
    : "Dark 🌙";
});
