import {NORTH, EAST, SOUTH, WEST} from './Block.js';
import {TemperatureBlock} from './TemperatureBlock.js';
import {Gas} from './Gas.js';

export class Cooler extends TemperatureBlock {
  constructor() {
    super();
    delete this.temperature;
  }
  get temperature() { return 0; }
  set temperature(e) {}
  onTick() {
    // return;
    /*
    const north = this.getNorth();
    const east = this.getEast();
    const south = this.getSouth();
    const west = this.getWest();

    if (north instanceof Gas) {
      if (north.temperature > this.minTemp) north.temperature = Math.max(north.temperature - this.scale, this.minTemp); }
    if (east instanceof Gas) {
      if (east.temperature > this.minTemp) east.temperature = Math.max(east.temperature - this.scale, this.minTemp); }
    if (south instanceof Gas) {
      if (south.temperature > this.minTemp) south.temperature = Math.max(south.temperature - this.scale, this.minTemp); }
    if (west instanceof Gas) {
      if (west.temperature > this.minTemp) west.temperature = Math.max(west.temperature - this.scale, this.minTemp); }
      */
  }
  render(ctx, x, y) {
    ctx.fillStyle = 'white';
    ctx.fillRect(x, y, 16, 16);
    ctx.fillStyle = 'blue';
    ctx.fillRect(x + 6, y + 6, 4, 4);
  }
}