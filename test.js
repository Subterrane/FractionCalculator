import { normalize, split, isOperator, parse, validate } from "./parsers.js";
import { equals, arrEquals, objEquals } from "./assertions.js";
import { find, getExpression, evaluate, shrinkArray, doEval } from "./math.js";

const test = (fn, assertion, expected, ...params) => {
  const returned = fn(...params);
  console.assert(assertion(expected, returned), "failed test", {
    expression: params,
    expected,
    returned
  });
};

test(normalize, equals, "3 * 4", "3 * 4");
test(normalize, equals, "3 * 4", "3*4");
test(normalize, equals, "3 * 4", "3  *    4");
test(normalize, equals, "3 * 4", "3  *  as  4");
test(normalize, equals, "0 - 3/4 * 4", "-3/4 * 4");
test(normalize, equals, "0 - 3/4 * 4", "- 3/4 * 4");
test(normalize, equals, "3_3/4 * 4", "3_3/4 * 4");
test(normalize, equals, "3_3/4 * 4 + 1", "3_3/4 * 4 + 1");
test(normalize, equals, "3_3/4 * - 4 + 1", "3_3/4 * -4 + 1");
test(normalize, equals, "3_3/4 / - 4 + 1", "3_3/4 / -4 + 1");
test(normalize, equals, "3_3/4 * 4 + 1", "3_3/4 * 4 + 1 -");
test(normalize, equals, "3_3/4 * 4 + 1", "3_3/4 * 4 + 1 -+");
test(normalize, equals, "3_3/4 * 4 + 1", "3_3/4 * 4 + 1 -- -");
test(normalize, equals, "4 + 1", "* 4 + 1");
test(normalize, equals, "4 + 1", "*+ 4 + 1");
test(normalize, equals, " 4 + 1", "*/ 4 + 1");
test(normalize, equals, "4 + 1", "+ 4 + 1");
test(normalize, equals, "4 * 1", "+ 4 *+ 1");
test(normalize, equals, "4 - 1", "+ 4 + - 1");
test(normalize, equals, "4 - 1", "+4 + - 1");
test(normalize, equals, "0 - 4 + 1", "-4 + 1");
test(normalize, equals, "0 - 4 + 1", " -4 + 1");
test(normalize, equals, "5 + 5", "--5 ++ 5");
test(normalize, equals, "5 + 5", "--5 +++ 5");
test(normalize, equals, "0 - 2 + 1", "-2 + 1");
test(normalize, equals, "", "asdf");

test(split, arrEquals, ["3", "*", "4"], "3 * 4");
test(split, arrEquals, ["0", "-", "3/4", "*", "4"], "0 - 3/4 * 4");
test(split, arrEquals, ["3_3/4", "*", "4"], "3_3/4 * 4");
test(split, arrEquals, ["3_3/4", "*", "4", "+", "1"], "3_3/4 * 4 + 1");
test(split, arrEquals, ["4", "-", "1"], "4 - 1");
test(split, arrEquals, ["0", "-", "4", "+", "1"], "0 - 4 + 1");
test(split, arrEquals, ["3_3/4", "*", "-", "4", "+", "1"], "3_3/4 * - 4 + 1");
test(split, arrEquals, ["3_3/4", "/", "-", "4", "+", "1"], "3_3/4 / - 4 + 1");
test(split, arrEquals, ["", "4", "+", "1"], " 4 + 1");
test(split, arrEquals, ["0", "-", "2", "+", "1"], "0 - 2 + 1");
test(split, arrEquals, [""], "");

test(isOperator, equals, true, "*");
test(isOperator, equals, false, "3");

test(validate, equals, false, ["", "4", "+", "1"]);
test(validate, equals, false, ["3_3/4", "*", "-", "4", "+", "1"]);
test(validate, equals, true, ["0", "-", "3/4", "*", "4"]);
test(validate, equals, true, ["0", "-", "2", "+", "1"]);
test(validate, equals, false, [""]);

test(parse, objEquals, { num: 0, den: 1 }, "0");
test(parse, objEquals, { num: 3, den: 1 }, "3");
test(parse, objEquals, { num: 1, den: 2 }, "1/2");
test(parse, objEquals, { num: 0, den: 5 }, "0/5");
test(parse, objEquals, { num: 5, den: 5 }, "5/5");
test(parse, objEquals, { num: 7, den: 2 }, "3_1/2");
test(parse, objEquals, { num: 9, den: 2 }, "2_5/2");
test(parse, objEquals, { num: 7, den: 1 }, "2_5");
test(parse, objEquals, { num: 10, den: 1 }, "5_5");
test(parse, objEquals, { num: 5, den: 1 }, "0_5");
test(parse, objEquals, { num: 5, den: 3 }, "0_5/3");
test(parse, objEquals, { num: 8, den: 3 }, "1_5/3");

test(find, equals, -1, "*", "/", [{ num: 1, den: 2 }, "+", { num: 9, den: 2 }]);
test(find, equals, 1, "*", "/", [{ num: 1, den: 2 }, "*", { num: 9, den: 2 }]);
test(find, equals, 3, "*", "/", [
  { num: 0, den: 1 },
  "-",
  { num: 1, den: 2 },
  "*",
  { num: 3, den: 1 }
]);

test(
  getExpression,
  objEquals,
  { left: { num: 1, den: 2 }, right: { num: 3, den: 1 }, op: "*" },
  3,
  [{ num: 0, den: 1 }, "-", { num: 1, den: 2 }, "*", { num: 3, den: 1 }]
);

test(
  evaluate,
  objEquals,
  { num: 3, den: 2 },
  { left: { num: 1, den: 2 }, right: { num: 3, den: 1 }, op: "*" }
);
test(
  evaluate,
  objEquals,
  { num: 35, den: 24 },
  { left: { num: 5, den: 8 }, right: { num: 3, den: 7 }, op: "/" }
);
test(
  evaluate,
  objEquals,
  { num: 11, den: 15 },
  { left: { num: 1, den: 3 }, right: { num: 2, den: 5 }, op: "+" }
);
test(
  evaluate,
  objEquals,
  { num: 16, den: 35 },
  { left: { num: 6, den: 7 }, right: { num: 2, den: 5 }, op: "-" }
);

test(shrinkArray, objEquals, [{ num: 0, den: 1 }, "-", { num: 3, den: 2 }], 3, [
  { num: 0, den: 1 },
  "-",
  { num: 1, den: 2 },
  "*",
  { num: 3, den: 1 }
]);

test(doEval, objEquals, [{ num: 27, den: 8 }], "*", "/", [
  { num: 3, den: 2 },
  "*",
  { num: 3, den: 2 },
  "*",
  { num: 3, den: 2 }
]);
