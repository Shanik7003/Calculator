function Operate(variable1, variable2, op) { //una misma funcion para operar cualquier cosa para no repetor codigo
    switch (op) {
        case "+":
            return Number(variable1) + Number(variable2);
            
        case "-":
            return Number(variable1) - Number(variable2);

        case "*":
            return Number(variable1) * Number(variable2);

        case "/":
            return Number(variable1) / Number(variable2);

        default:
            break;
    }
}

let buttonsContainer = document.querySelector(".buttons"); // para que funcione grid tiene que estar en colum

buttonsContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("button")) { 
    //muestra en el display el valor de ese boton
    showInDisplay(determineCase(e.target.textContent));
  }
});

function showInDisplay(value) {
    let content = document.querySelector(".content");
    content.textContent += value;
}

function determineCase(value) {
    switch (value) {
        case "1":
            return "1";
        case "2":
            return "2";
        case "3":
            return "3";
        case "4":
            return "4";
        case "5":
            return "5";
        case "6":
            return "6";
        case "7":
            return "7";
        case "8":
            return "8";
        case "9":
            return "9";
        case "0":
            return "0";
        case "=":
            return "=";
        case "+":
            return "+";
        case "-":
            return "-";
        case "*":
            return "*";
        case "/":
            return "/";
        case "del":
            return "del";
        case "C":
            return "C";
        case ",":
            return ",";

        default:
            break;
    }
}