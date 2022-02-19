export const equals = (a, b) => a === b;

export const arrEquals = (a, b) => {
  if (a.length !== b.length) return false;
  for (let ix = 0; ix < a.length; ix++) {
    if (a[ix] !== b[ix]) return false;
  }
  return true;
};

export const objEquals = (a, b) => JSON.stringify(a) === JSON.stringify(b);
