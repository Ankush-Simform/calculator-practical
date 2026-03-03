import { evalHistory, getValue } from './db.js';

let isExponential = false;
let calculator;
const TRIGFUNCTIONS = ["sin", "cos", "tan", "cosec", "sec", "cot"];
const CALFUNCTIONS = ["floor", "ceil", "random"];

export function handleFE(currentValue) {
  const num = parseFloat(currentValue);
  if (isExponential) {
    return num.toString();
  } else {
    return num.toExponential();
  }
}


export class Calculator {
  constructor(displayElement) {
    this.display = displayElement;
    this.memory = "";
    this.isDegreeMode = true;
  }

  memoryClr() {
    this.memory = "";
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
     console.log(currentValue);
     if(currentValue==0){
      this.memory="";
      console.log(currentValue);
     }
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

  renderHistory() {
    const historyList = document.getElementById("history-list");
    const data = evalHistory.get();

    historyList.innerHTML = data
      .map(
        (item) => `
      <div class="history-item" style="padding: 8px; border-bottom: 1px solid #444; cursor: pointer;">
        <div style="font-size: 0.75rem; color: #aaa;">${item.expression} =</div>
        <div style="font-weight: bold;">${item.result}</div>
      </div>
    `,
      )
      .join("");
    Array.from(historyList.children).forEach((el, i) => {
      el.onclick = () => {
        this.display.value = data[i].result;
      };
    });
  }
  
  clear() {
    if (this.display) this.display.value = "";
  }

  append(value) {

    switch(value){
      case "x":
        value="*";
        break;
      case "÷":
        value="/"
        break;
      case "n!":
        value="!"
        break;
      case "π":
        value="3.14"
        break;
      case "e":
        value="2.7182"
        break; 
        case "sin":
        value="sin("
        break;
          case "e":
        value=""
        break;
          case "e":
        value=""
        break;
          case "sin":
        value="sin("
        break;
        case "mod":
        value="/";
        break;
         case "mod":
        value="/";
        break; case "1/x":
        value="/";
        break; case "2√x":
        value="2√";
        break; case "log":
        value="log(";
        break;
         case "ln":
        value="ln(";
        break; 
        case "xy":
        value="**";
        break; 
        case "10x":
        value="10**";
        break; 
        case "exp":
          value="**"
          break;   
    }
    if (value === "|x|") {
      this.display.value = "|" + this.display.value + "|";
      return;
    }
    this.display.value += value;
  }

  calc() {
    let exp = this.display.value;

    if (exp.includes("!")) {
      exp = exp.replace(/(\d+)!/g, (match, number) => {
        return this.getFactorial(parseInt(number));
      });
    }
    if (exp.includes("2√(")) {
      exp = exp.replace(/2√\(([\d.-]+)\)/g, (match, number) => {
        return Math.sqrt(parseFloat(number));
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
    if(exp.includes("|")){
      exp=exp.replace(/\|(.*?)\|/g, "Math.abs($1)");
    }

    const TRIGFUNCTIONS = ["sin", "cos", "tan", "cosec", "sec", "cot"];

    TRIGFUNCTIONS.forEach((func) => {
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

    const CALFUNCTIONS = ["floor", "ceil", "random"];
    CALFUNCTIONS.forEach((fun) => {
      const regex = new RegExp(`${fun}\\(([^()]+)\\)`, "g");

      if(exp.includes(`${fun}(`)) {
        exp = exp.replace(regex, (match, capturedValue) => {
          const num = parseFloat(capturedValue);
          switch (fun) {
            case "floor":
              return Math.floor(num);
            case "ceil":
              return Math.ceil(num);
            case "random":
              return  Math.random(num) ;
            default:
              return match;
          }
        });
      }
    });

    try {
      this.display.value = eval(exp);
    } catch (e) {
      this.display.value = "Error";
    }

    try {
      const result = eval(exp);
      const history = getValue();
      history.unshift({ expression: exp, result: result });

      evalHistory.add(exp, result);
      this.renderHistory();
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