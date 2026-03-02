
function calculatedHistory() {
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

