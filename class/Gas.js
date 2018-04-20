import {Block, NORTH, EAST, SOUTH, WEST} from './Block.js';
import {TemperatureBlock} from './TemperatureBlock.js';

const img = new Image;
img.src = '/texture/temperature.png';

export class Gas extends TemperatureBlock {
  constructor({temp = 0}) {
    super();
    this.nextTemp = temp;
    this.temperature = 0;
    this.lifeTime = 0;
    this.stage = 0;
    this.unstable = false;
    this.pressure = 0;
    this._mode = 0;
  }
  updateTemperature() {
    this.nextTemp = (.5 * this.temperature);

    const north = this.getNorth();
    this.nextTemp += .125 * (north instanceof TemperatureBlock ? north.temperature : this.temperature);
    const east = this.getEast();
    this.nextTemp += .125 * (east instanceof TemperatureBlock ? east.temperature : this.temperature);
    const south = this.getSouth();
    this.nextTemp += .125 * (south instanceof TemperatureBlock ? south.temperature : this.temperature);
    const west = this.getWest();
    this.nextTemp += .125 * (west instanceof TemperatureBlock ? west.temperature : this.temperature);
  }
  flow() {
    const north = this.getNorth();
    if (north instanceof Gas) {
      if (this.temperature > north.temperature) {
        this.nextTemp = north.temperature;
        return;
      }
    }
    const south = this.getSouth();
    if (south instanceof Gas) {
      if (this.temperature < south.temperature) {
        this.nextTemp = south.temperature;
        return;
      }
    }
  }
  onTick(dt) {
    this.lifeTime += dt;
    if (this.stage === 0 || this.temperature === 2) {
      this._mode = Math.sign(this.nextTemp - this.temperature);
      this.temperature = this.nextTemp;
      this.stage++;
    } else if (this.stage === 1) {
      this.updateTemperature();
      this.stage++;
    } else if (this.stage === 3) {
      this.flow();
      this.stage++;
    } else if (this.stage === 4) {
      this.stage = 0;
    } else {
      this.stage++;
    }

      // if (north && north instanceof Gas) {
      //   if (north.temperature < this.temperature) {
      //     this.switchNorth(false);
      //   } else {
      //     this.unstable = true;
      //     this.findWayNorth();  
      //   }
      // } else {
      //   this.unstable = true;
      // }
    // }
  }
  onUpdate() {  
  }
  findWayEast() {
    let east = this.getEast();
    while (east instanceof Gas) {
      if (this.temperature > east.temperature) {
        const north = east.getNorth();
        if (north instanceof Gas) {
          if (this.temperature > north.temperature) {
            this.switchEast(false);
            return true;
          }
        }
      } else if (this.temperature < east.temperature) {
        const south = east.getSouth();
        if (south instanceof Gas) {
          if (this.temperature < south.temperature) {
            this.switchEast(false);
            return true;
          }
        }
      }
      east = east.getEast();
    }
    return false;
  }
  findWayWest() {
    let west = this.getWest();
    while (west instanceof Gas) {
      if (this.temperature > west.temperature) {
        const north = west.getNorth();
        if (north instanceof Gas) {
          if (this.temperature > north.temperature) {
            this.switchWest(false);
            return true;
          }
        }
      } else if (this.temperature < west.temperature) {
        const south = west.getSouth();
        if (south instanceof Gas) {
          if (this.temperature < south.temperature) {
            this.switchWest(false);
            return true;
          }
        }
      }
      west = west.getWest();
    }
    return false;
  }
  findWayNorth() {
    // console.log('findWayNorth');
    let north = this.getNorth();
    if (north instanceof Gas) {
      if (this.temperature > north.temperature) {
        this.switchNorth(false);
        return true;
      }
      // this.unstable = true;
    }
    return false;
  }
  findWaySouth() {
    let south = this.getSouth();
    if (south instanceof Gas) {
      if (this.temperature < south.temperature) {
        this.switchSouth(false);
        return true;
      }
    }
    return false;
  }
  findWay() {
    if (Math.random() < .5) {
      if (this.findWayNorth() || this.findWaySouth()) return;
    } else {
      if (this.findWaySouth() || this.findWayNorth()) return;
    }

    if (Math.random() < .5) {
      this.findWayEast() || this.findWayWest();
    } else {
      this.findWayWest() || this.findWayEast();
    }

    // this.unstable = false;
    

    
    // while (true) {

    // }
    // if (north instanceof Gas) {
    //   this.switchNorth();
    // }
  }
  render(ctx, x, y) {
    ctx.fillStyle = `rgba(${this.temperature}, 0, ${255 - this.temperature}, .5)`;
    ctx.fillRect(x, y, 16, 16);
    if (this.unstable) {
      ctx.fillStyçe = 'rgba(255, 255, 255, .5)';
      ctx.fillRect(x + 7, y + 7, 2, 2);
    }
    if (DEBUG_MODE)
      ctx.drawImage(img, 0, 16 + 16 * this._mode, 16, 16, x, y, 16, 16);
  }
} 