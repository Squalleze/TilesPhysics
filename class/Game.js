import {World} from './World.js';

export class Game {
  constructor(ctx) {
    this.world = new World;
    this.ctx = ctx;
    this.lastTime = 0;
    this.tick = this.tick.bind(this);
    this.isRunning = false;
  }
  tick(time) {
    if (this.lastTime)
      this.world.tick(time - this.lastTime);
    else
      this.world.tick(0);

    this.world.render(this.ctx);
    this.lastTime = time;
    requestAnimationFrame(this.tick);
  }
  run() {
    if (!this.isRunning) {
      requestAnimationFrame(this.tick);
      this.isRunning = true;
    }
  }
}