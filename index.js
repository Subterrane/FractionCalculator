import { showHelp } from "./help.js";
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
          // TODO: do some math
          console.log(input);
        } else {
          console.log("  - c'mon, be reasonable");
        }
      }
  }
}
