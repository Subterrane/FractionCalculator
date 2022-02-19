export const showHelp = () => {
  console.log(
    `Fraction Calculator

    - Legal operators shall be *, /, +, - (multiply, divide, add, subtract)
    - Operands and operators shall be separated by one or more spaces
    - Mixed numbers will be represented by whole_numerator/denominator. e.g. "3_1/4"
    - Improper fractions and whole numbers are also allowed as operands
    - exit or quit to end
`
  );
};

export const showFraction = arr => {
  const {num, den} = arr[0];
  console.log(`${num}/${den}`);
}