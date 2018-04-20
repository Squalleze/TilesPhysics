import {NORTH, EAST, SOUTH, WEST} from './Block.js';
import {TemperatureBlock} from './TemperatureBlock.js';
import game from '../game.js';
const world = game.world;

const PORTIONS = (SUM, NUM) => [Math.floor(SUM / NUM), SUM % NUM]; 

export class Liquid extends TemperatureBlock {
  constructor({temperature = 0, amount = 255}) {
    super({temperature});
    this.amount = 0;
    this.nextAmount = amount;
    this.stage = 0;
  }
  findWay() {
    if (this.amount < 255) {
      const north = this.getNorth();
      if (north instanceof Liquid && north.amount > 0) {
        const sum = this.amount + north.amount;
        this.nextAmount = Math.min(sum, 255);
        return;
      }
    }

    if (this.amount > 0) {
      const south = this.getSouth();
      if (south instanceof Liquid && south.amount < 255) {
        const sum = this.amount + south.amount;
        this.nextAmount = sum - Math.min(sum, 255);
        return;
      }
    }

    const east = this.getEast();
    const west = this.getWest();

    if (east instanceof Liquid && west instanceof Liquid) {

    } else {
      if (east instanceof Liquid) {

      } else if (west instanceof Liquid) {

      }
    }
  }
  onTick() {
    // this.stage++;
    if (this.stage === 0) {
      // if (this.nextAmount === 0) {
      //   console.log('destroy');
      //   this.destroy();
      //   return;
      // }

      this.amount = this.nextAmount;
      // this.nextAmount = 0;
      this.stage++;
    } else if (this.stage === 1) {
      this.findWay();
      this.stage++;
    } else if (this.stage === 20) {
      this.stage = 0;
    } else {
      this.stage++;
    }
  }
  onUpdate() {}
  render(ctx, x, y) {
    ctx.fillStyle = `rgba(0, 127, 255, ${this.amount / 255})`;
    ctx.fillRect(x, y, 16, 16);
    ctx.fillStyle = 'rgba(255, 255, 255, .5)';
    ctx.fillRect(x + 7, y + 7, 2, 2);
  }
}

// http://127.0.0.1:8000/main.html