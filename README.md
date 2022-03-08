# FractionCalculator

## Coding Challenge

Write a command line program in the language of your choice that will take operations on fractions as an input and produce a fractional result.

- Legal operators shall be `*, /, +, -` (multiply, divide, add, subtract)
- Operands and operators shall be separated by one or more spaces
- Mixed numbers will be represented by whole numerator/denominator. e.g. "3 1/4"
- Improper fractions and whole numbers are also allowed as operands
- `exit`, `quit`, or `q` to quit

## Example run:

```
? 1/2 * 3 3/4
thinking about 1/2 * 3 3/4
Input: 1/2 (3 + 3/4)
Exact result: 15/8
Decimal form: 1.875
Mixed fraction: 1 7/8
Continued fraction: [1; 1, 7]
Egyptian fraction expansion: 1 + 1/2 + 1/3 + 1/24
Occurrence in convergents: (3 π)/5≈1, 2, 15/8, 17/9, 49/26, ...
(simple continued fraction convergent sequence)
```

```
? 2 3/8 + 9/8
thinking about 2 3/8 + 9/8
Input: (2 + 3/8) + 9/8
Exact result: 7/2
Decimal form: 3.5
Mixed fraction: 3 1/2
Continued fraction: [3; 2]
Egyptian fraction expansion: 3 + 1/2
Percent increase: (2 + 3/8) + 9/8 = 7/2 is 47.37% larger than 2 + 3/8 = 19/8.
```

## Compile
```
deno compile --allow-net index.js
```

## Run
Run compiled executable:

`./FractionCalculator`


Run from source:
```
deno run --allow-net index.js
```
