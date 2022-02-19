export const find = (op1, op2, arr) => {
  op1 = arr.indexOf(op1);
  op2 = arr.indexOf(op2);
  if (op1 === -1) return op2;
  if (op2 === -1) return op1;
  return Math.min(op1, op2);
};

export const getExpression = (idx, arr) => {
  const left = arr[idx - 1];
  const right = arr[idx + 1];
  const op = arr[idx];
  return { left, right, op };
};

export const evaluate = expression => {
  const { left, right } = expression;
  let num, den;
  switch (expression.op) {
    case "*":
      num = left.num * right.num;
      den = left.den * right.den;
      break;
    case "/":
      num = left.num * right.den;
      den = left.den * right.num;
      break;
    case "+":
      num = left.num * right.den + left.den * right.num;
      den = left.den * right.den;
      break;
    case "-":
      num = left.num * right.den - left.den * right.num;
      den = left.den * right.den;
      break;
    default:
      throw new Error("missing operator");
  }
  return { num, den };
};

export const shrinkArray = (idx, arr) => {
  const expression = getExpression(idx, arr);
  const result = evaluate(expression);
  arr.splice(idx - 1, 3, result);
  return arr;
};

export const doEval = (op1, op2, arr) => {
  let index = find(op1, op2, arr);
  while (index > -1) {
    arr = shrinkArray(index, arr);
    index = find(op1, op2, arr);
  }
  return arr;
};

export const evalArray = arr => {
  while (arr.length > 1) {
    arr = doEval("*", "/", arr);
    arr = doEval("+", "-", arr);
  }
  return arr;
};
