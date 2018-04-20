import game from '../game.js';
const world = game.world;

export const NORTH = 1 << 3,
  EAST  = 1 << 2,
  SOUTH = 1 << 1,
  WEST  = 1,
  OPOSITE = (SIDE) => ((SIDE >> 2) | (SIDE << 2)) & 0b1111;

export class Block {
  constructor() {
    this.x = this.y = null;
  }
  destroy() {
    world.destroy(this.x, this.y);
  }
  onUpdate() {} // when neighbours change
  onTick() {} // every frame before rendering
  onPlace(x, y) {
    this.onMove(x, y);
  }
  onMove(x, y) {
    this.x = x;
    this.y = y;
  }
  onDestroy() {}
  render() {} // rendering
  getSide(side) {
    switch (side) {
      case NORTH: return this.getNorth();
      case EAST: return this.getEast();
      case SOUTH: return this.getSouth();
      case WEST: return this.getWest();
      default: return null;
    }
  }
  getNorth() { return world.get(this.x, this.y - 1); }
  getEast() { return world.get(this.x + 1, this.y); }
  getSouth() { return world.get(this.x, this.y + 1); }
  getWest() { return world.get(this.x - 1, this.y); }
  moveNorth() {}
  moveSouth(causeUpdate = true) {
    const south = this.getSouth();
    if (south === null) {
      [
        world.blocks[world.pos(this.x, this.y)],
        world.blocks[world.pos(this.x, this.y + 1)]
      ] = [null, this];
      this.onMove(this.x, this.y + 1);
      if (causeUpdate) {
        world.update(this.x, this.y - 1);
        world.update(this.x, this.y);
      }
    }
  }
  switch(block, causeUpdate = true) {
    if (block !== undefined) {
      if (block === null) {
        return;
      } else {
        const {x: oldx, y: oldy} = this;
        [
          world.blocks[world.pos(this.x, this.y)],
          world.blocks[world.pos(block.x, block.y)]
        ] = [block, this];  
  
        this.onMove(block.x, block.y);
        block.onMove(oldx, oldy);
        
        if (causeUpdate) {
          world.update(this.x, this.y);
          world.update(block.x, block.y);
        }
      }
    }
  }
  switchNorth(causeUpdate = true) {
    return this.switch(this.getNorth(), causeUpdate);
  }
  switchEast(causeUpdate = true) {
    return this.switch(this.getEast(), causeUpdate);
  }
  switchSouth(causeUpdate = true) {
    return this.switch(this.getSouth(), causeUpdate);
  }
  switchWest(causeUpdate = true) {
    return this.switch(this.getWest(), causeUpdate);
  }
}