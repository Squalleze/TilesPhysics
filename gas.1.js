import game from './game.js';
import {Wire} from './class/Wire.js';
import {Timer} from './class/Timer.js';
import {Gas} from './class/Gas.js';
import {Cooler} from './class/Cooler.js';
import {Heater} from './class/Heater.js';
import {Wall} from './class/Wall.js';

const world = game.world;
console.log(world);
// world.set(0, 0, Timer, null);

for (let x = 0; x < world.width; x++) {
  // if (x === 21) continue;
  for (let y = 0; y < world.height; y++)
    world.set(x, y, Gas, {temp: 127.5});
  // for (let y = 0; y < 5; y++)
  //   world.set(x, y, Gas, {temp: 0});

  // for (let y = 5; y < 10; y++)
  //   world.set(x, y, Gas, {temp: 255});
}

for (let x = 0; x < world.width; x++) {
  if (x === 21) continue;
  world.set(x, 21, Wall, null);
}

// world.set(5, 4, Cooler, null);
// world.set(10, 20, Heater, null);
// world.set(32, 20, Cooler, null);
world.set(10, 9, Cooler, null);
// world.set(21, 31, Heater, null);

// for (let y = 1; y < 20; y++)
//   for (let x = 0; x < 20; x ++)
//     if (Math.random() >= .5)
//       world.set(x, y, Wire, null);

// for (let x = 0; x < 9; x += 2) {
//   world.set(11 + x, 4, Wire, null);
//   world.set(10 + x, 6, Wire, null);
// }


// world.set(11, 5, Wire, null);

game.run();
