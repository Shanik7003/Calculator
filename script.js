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
