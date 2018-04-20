import {NORTH, EAST, SOUTH, WEST, OPOSITE} from './Block.js';
import {Wire} from './Wire.js';

export class Timer extends Wire {
  constructor(extra) {
    super(extra);
    this.accumulatedTime = 0;
    this.count = 0;
  }
  onTick(dt) {
    super.onTick(dt);
    this.accumulatedTime += dt;
    if (this.accumulatedTime >= 1000) {
      console.log('hehe');
      this.accumulatedTime -= 1000;
      this.count++;
      this.sendData(SOUTH, this.count);
    } else {
      this.sendData(SOUTH, 0);
    }
    // console.log(...e);
  }
  render(ctx, x, y) {
    super.render(...arguments);
    ctx.fillStyle = this.count % 2 ? 'red' : 'orange';
    ctx.fillRect(x + 4, y + 4, 8, 8);
  }
}