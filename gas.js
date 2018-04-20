import game from './game.js';
import {Wire} from './class/Wire.js';
import {Timer} from './class/Timer.js';
import {Gas} from './class/Gas.js';
import {Cooler} from './class/Cooler.js';
import {Heater} from './class/Heater.js';
import {Wall} from './class/Wall.js';

const world = game.world;
console.log(world);

for (let x = 0; x < world.width; x++) {
  for (let y = 0; y < world.height; y++)
    world.set(x, y, Gas, {temp: 127.5});
}

for (let x = 0; x < world.width; x++) {
  if (x === 20) continue;
  world.set(x, 19, Wall, null);
}

world.set(10, 9, Cooler, null);
world.set(10, 29, Heater, null);

game.ctx.canvas.oncontextmenu = (e) => {
  e.preventDefault();
  const x = Math.floor(e.offsetX / 16),
        y = Math.floor(e.offsetY / 16);
  console.log(world.get(x, y));
}

game.run();
