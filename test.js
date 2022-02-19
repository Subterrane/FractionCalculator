import { normalize, split, isOperator, parse, validate } from "./parsers.js";
import { equals, arrEquals, objEquals } from "./assertions.js";

const test = (fn, assertion, expression, expected) => {
  const returned = fn(expression);
  console.assert(assertion(expected, returned), "failed test", {
    expression,
    expected,
    returned
  });
};

test(normalize, equals, "3 * 4", "3 * 4");
test(normalize, equals, "3*4", "3 * 4");
test(normalize, equals, "3  *    4", "3 * 4");
test(normalize, equals, "3  *  as  4", "3 * 4");
test(normalize, equals, "-3/4 * 4", "0 - 3/4 * 4");
test(normalize, equals, "- 3/4 * 4", "0 - 3/4 * 4");
test(normalize, equals, "3_3/4 * 4", "3_3/4 * 4");
test(normalize, equals, "3_3/4 * 4 + 1", "3_3/4 * 4 + 1");
test(normalize, equals, "3_3/4 * -4 + 1", "3_3/4 * - 4 + 1");
test(normalize, equals, "3_3/4 / -4 + 1", "3_3/4 / - 4 + 1");
test(normalize, equals, "3_3/4 * 4 + 1 -", "3_3/4 * 4 + 1");
test(normalize, equals, "3_3/4 * 4 + 1 -+", "3_3/4 * 4 + 1");
test(normalize, equals, "3_3/4 * 4 + 1 -- -", "3_3/4 * 4 + 1");
test(normalize, equals, "* 4 + 1", "4 + 1");
test(normalize, equals, "*+ 4 + 1", "4 + 1");
test(normalize, equals, "*/ 4 + 1", " 4 + 1");
test(normalize, equals, "+ 4 + 1", "4 + 1");
test(normalize, equals, "+ 4 *+ 1", "4 * 1");
test(normalize, equals, "+ 4 + - 1", "4 - 1");
test(normalize, equals, "+4 + - 1", "4 - 1");
test(normalize, equals, "-4 + 1", "0 - 4 + 1");
test(normalize, equals, " -4 + 1", "0 - 4 + 1");
test(normalize, equals, "--5 ++ 5", "5 + 5");
test(normalize, equals, "--5 +++ 5", "5 + 5");
test(normalize, equals, "asdf", "");

test(split, arrEquals, "3 * 4", ["3", "*", "4"]);
test(split, arrEquals, "0 - 3/4 * 4", ["0", "-", "3/4", "*", "4"]);
test(split, arrEquals, "3_3/4 * 4", ["3_3/4", "*", "4"]);
test(split, arrEquals, "3_3/4 * 4 + 1", ["3_3/4", "*", "4", "+", "1"]);
test(split, arrEquals, "4 - 1", ["4", "-", "1"]);
test(split, arrEquals, "0 - 4 + 1", ["0", "-", "4", "+", "1"]);
test(split, arrEquals, "3_3/4 * - 4 + 1", ["3_3/4", "*", "-", "4", "+", "1"]);
test(split, arrEquals, "3_3/4 / - 4 + 1", [ "3_3/4", "/", "-", "4", "+", "1" ]);
test(split, arrEquals, " 4 + 1", [ "", "4", "+", "1" ]);
test(split, arrEquals, "", [ "" ]);

test(isOperator, equals, "*", true);
test(isOperator, equals, "3", false);

test(validate, equals, [ "", "4", "+", "1" ], false);
test(validate, equals, ["3_3/4", "*", "-", "4", "+", "1"], false);
test(validate, equals, ["0", "-", "3/4", "*", "4"], true);
test(validate, equals, [""], false);

test(parse, objEquals, "0", { num: 0, den: 1 });
test(parse, objEquals, "3", { num: 3, den: 1 });
test(parse, objEquals, "1/2", { num: 1, den: 2 });
test(parse, objEquals, "0/5", { num: 0, den: 5 });
test(parse, objEquals, "5/5", { num: 5, den: 5 });
test(parse, objEquals, "3_1/2", { num: 7, den: 2 });
test(parse, objEquals, "2_5/2", { num: 9, den: 2 });
test(parse, objEquals, "2_5", { num: 7, den: 1 });
test(parse, objEquals, "5_5", { num: 10, den: 1 });
test(parse, objEquals, "0_5", { num: 5, den: 1 });
test(parse, objEquals, "0_5/3", { num: 5, den: 3 });
test(parse, objEquals, "1_5/3", { num: 8, den: 3 });
