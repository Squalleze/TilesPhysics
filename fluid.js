import game from './game.js';
import {Liquid} from './class/Liquid.js';
import {Wall} from './class/Wall.js';

const world = game.world;
console.log(world);

for (let x = 0; x < world.width; x++) {
  for (let y = 0; y < world.height; y++) {
    world.set(x, y, Liquid, {amount: 0});
  }
  world.set(x, world.height - 1, Wall, null);
  if (x == 30) continue;
  world.set(x, 21, Wall, null);
}

for (let y = 0; y < world.height; y++) {
  world.set(0, y, Wall, null);
  world.set(world.width - 1, y, Wall, null);
  if (y == 30) continue;
  world.set(21, y, Wall, null);
}

world.set(19, 5, Liquid, {});
world.set(26, 5, Liquid, {});

game.run();

game.ctx.canvas.onclick = (e) => {
  e.preventDefault();
  const x = Math.floor(e.offsetX / 16),
        y = Math.floor(e.offsetY / 16);
  const block = world.get(x, y);
  if (block instanceof Liquid)
    block.nextAmount = window.perClick;
}

game.ctx.canvas.oncontextmenu = (e) => {
  e.preventDefault();
  const x = Math.floor(e.offsetX / 16),
        y = Math.floor(e.offsetY / 16);
  console.log(world.get(x, y));
}

game.ctx.canvas.onmousemove = (e) => {
  e.preventDefault();
  if (e.buttons === 1) {
    const x = Math.floor(e.offsetX / 16),
          y = Math.floor(e.offsetY / 16);
    const block = world.get(x, y);
    if (block instanceof Liquid)
      block.nextAmount = window.perClick;
  }
}

window.perClick = 127;