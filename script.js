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
    let display = document.querySelector(".content");
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
            let displayExp = display.textContent;
            let tokenizeExp = tokenize(displayExp);
            let node = parse(tokenizeExp);
            display.textContent = evaluateAST(node);
            return "";
        case "+":
            return "+";
        case "-":
            return "-";
        case "*":
            return "*";
        case "/":
            return "/";
        case "del":
            display.textContent = display.textContent.slice(0,display.textContent.length-1);
            return "";
        case "C":
            display.textContent = "";
            return "";
        case ",":
            return ",";

        default:
            return "";
    }
}

// ----------------------- TOKENIZER -----------------------
function tokenize(exp) {
  // normaliza coma a punto decimal y quita espacios
  exp = exp.replace(/,/g, ".").replace(/\s+/g, "");
  const tokens = [];
  let i = 0;

  while (i < exp.length) {
    const ch = exp[i];

    // número (entero o decimal)
    if (/\d/.test(ch) || (ch === "." && i + 1 < exp.length && /\d/.test(exp[i+1]))) {
      let num = ch;
      i++;
      while (i < exp.length && /[\d.]/.test(exp[i])) {
        num += exp[i++];
      }
      // evita varios puntos en un número
      if ((num.match(/\./g) || []).length > 1) throw new Error("Número inválido: " + num);
      tokens.push({ type: "number", value: Number(num) });
      continue;
    }

    // operadores y paréntesis
    if (ch === "+" || ch === "-" || ch === "*" || ch === "/" || ch === "(" || ch === ")") {
      tokens.push({ type: "op", value: ch });
      i++;
      continue;
    }

    // cualquier otro caracter
    throw new Error("Caracter inválido: " + ch);
  }

  return tokens;
}

// ----------------------- PARSER (Recursive Descent) -----------------------
// Gramática (priority):
// Expression := Term (('+' | '-') Term)*
// Term       := Factor (('*' | '/') Factor)*
// Factor     := ('+'|'-')? Primary
// Primary    := NUMBER | '(' Expression ')'

function parse(tokens) {
  let pos = 0;

  function peek() {
    return tokens[pos];
  }
  function consume() {
    return tokens[pos++];
  }

  function parseExpression() {
    let node = parseTerm();
    while (peek() && peek().type === "op" && (peek().value === "+" || peek().value === "-")) {
      const op = consume().value;
      const right = parseTerm();
      node = { type: "binop", op, left: node, right };
    }
    return node;
  }

  function parseTerm() {
    let node = parseFactor();
    while (peek() && peek().type === "op" && (peek().value === "*" || peek().value === "/")) {
      const op = consume().value;
      const right = parseFactor();
      node = { type: "binop", op, left: node, right };
    }
    return node;
  }

  function parseFactor() {
    // soporta unary + y -
    if (peek() && peek().type === "op" && (peek().value === "+" || peek().value === "-")) {
      const op = consume().value;
      const factor = parseFactor();
      // unary as binary with left = 0 (0 - x) para simplificar
      if (op === "+") return factor;
      return { type: "binop", op: "-", left: { type: "number", value: 0 }, right: factor };
    }
    return parsePrimary();
  }

  function parsePrimary() {
    const token = peek();
    if (!token) throw new Error("Expresión incompleta");
    if (token.type === "number") {
      consume();
      return { type: "number", value: token.value };
    }
    if (token.type === "op" && token.value === "(") {
      consume(); // consume '('
      const node = parseExpression();
      if (!peek() || peek().type !== "op" || peek().value !== ")") {
        throw new Error("Paréntesis sin cerrar");
      }
      consume(); // consume ')'
      return node;
    }
    throw new Error("Token inesperado: " + JSON.stringify(token));
  }

  const ast = parseExpression();
  if (pos < tokens.length) throw new Error("Tokens sobrantes");
  return ast;
}

// ----------------------- EVALUATOR -----------------------
function evaluateAST(node) {
  if (node.type === "number") return node.value;
  if (node.type === "binop") {
    const L = evaluateAST(node.left);
    const R = evaluateAST(node.right);
    switch (node.op) {
      case "+": return L + R;
      case "-": return L - R;
      case "*": return L * R;
      case "/":
        if (R === 0) throw new Error("División por cero");
        return L / R;
      default:
        throw new Error("Operador desconocido: " + node.op);
    }
  }
  throw new Error("Nodo AST desconocido");
}


































































































