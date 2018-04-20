'use strict';
const ROTATE = (NUM, BITS) => ((NUM >> BITS) | (NUM << (4 - BITS))) & 0b1111;

for (let i = 0; i <= 255; i++)
  console.log(.875 * i + .125 * 255);