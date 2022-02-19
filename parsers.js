export const normalize = input => {
  // Close enough. If the input is worse that this, start throwing errors
  input = input.replace(/[^\d\-+*\/_]/gm, " "); // remove letters and garbage
  input = input.replace(/\D*$/gm, ""); // remove trailing operators
  input = input.replace(/([*\/])[+]/gm, "$1"); // *+ and /+ becomes * and / respectively
  input = input.replace(/(\++)/gm, "+"); // ++ becomes +
  input = input.replace(/\*\//gm, ""); // */ doesn't make any sense
  input = input.replace(/-\s*-/gm, "+"); // -- becomes +
  input = input.replace(/\+\s*-/gm, "-"); // +- becomes -
  input = input.replace(/([*])/gm, " $1 "); // stuff at least 1 space around *
  input = input.replace(/([*\/])([-])/gm, "$1 $2"); // stuff a space between *- or /-
  input = input.replace(/\s+/g, " "); // collapse extra spaces
  input = input.replace(/^\s*[*+]\s*/gm, ""); // if starts with + or *, remove it
  input = input.replace(/^\s*(-)/gm, "0 $1"); // if starts with -, insert a 0 first
  input = input.replace(/^\s*(\/)/gm, "1 $1"); // if starts with /, insert a 1 first
  input = input.replace(/([-+])(\d)/gm, "$1 $2"); // put a space between +n & -n
  return input;
};

export const parse = str => {
  let num = 0;
  let den = 1;

  str = str.toString();

  if (str.includes("/")) {
    const [rest, denominator] = str.split("/");
    str = rest;
    den = parseInt(denominator, 10);
  }

  if (str.includes("_")) {
    const [whole, numerator] = str.split("_");
    num = den * parseInt(whole) + parseInt(numerator);
  } else {
    num = parseInt(str);
  }

  return { num, den };
};

export const split = input => input.toString().split(" ");
export const isOperator = char => ["+", "-", "*", "/"].includes(char);

export const validate = arr =>
  arr[0] !== "" && arr.reduce((pre, cur, idx) => {
    const expected = idx % 2 === 0 ? false : true;
    pre = isOperator(cur) == expected;
    return pre;
  }, true);

export const parseArray = input =>
  input.map(el => (isOperator(el) ? el : parse(el)));
