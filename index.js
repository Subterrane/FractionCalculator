import { showHelp, showFraction } from "./display.js";
import { evalArray } from "./math.js";
import { normalize, parseArray, split, validate } from "./parsers.js";

let input;
let loop = true;

while (loop) {
  input = prompt("?");

  switch (input) {
    case "help":
    case "h":
    case "?":
      showHelp();
      break;
    case "exit":
    case "quit":
    case "q":
      loop = false;
      break;
    default:
      if (input) {
        input = normalize(input);
        input = split(input);
        if (validate(input)) {
          input = parseArray(input);
          const result = evalArray(input);
          // TODO: reduce
          showFraction(result);
        } else {
          console.log("  - c'mon, be reasonable");
        }
      }
  }
}
