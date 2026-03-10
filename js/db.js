export function getValue() {
  return JSON.parse(localStorage.getItem("calculates")) || [];
}

export function saveValue(data) {
  localStorage.setItem("calculates", JSON.stringify(data));
}

export function calculatedHistory() {
  let history = getValue() || [];

  return {
    add: function (expression, result) {
      if (result === "Error" || expression === "") return;
      history.unshift({ expression, result });
      if (history.length > 10) history.pop();
      saveValue(history);
    },
    get: function () {
      return history;
    },
    clear: function () {
      history = [];
      localStorage.removeItem("calculates");
    },
  };
}
export const evalHistory = calculatedHistory();