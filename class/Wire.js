import {Block, NORTH, EAST, SOUTH, WEST, OPOSITE} from './Block.js';

export class Wire extends Block {
  constructor() {
    super();
    this.lifeTime = 0;
    this.mode = 0;
    this.isActive = false;
  }
  onUpdate() {
    this.mode = this.wireNorth() << 3 | this.wireEast() << 2 | this.wireSouth() << 1 | this.wireWest();
  }
  onTick(dt) {
    this.lifeTime += dt;
    // console.log(this.mode);
  }
  onPlace(x, y) {
    super.onPlace(x, y)
    this.onUpdate();
  }
  sendData(side, data) {
    const block = this.getSide(side);
    if (block !== null) return block.onData(OPOSITE(side), data); // tail call
  }
  onData(side, data) {
    if (this.isActive) return;
    this.isActive = true;
    for (let i = 1 << 3; i > 0; i >>= 1) {
      if (i === side) continue;
      this.sendData(i, data);
    }
  }
  render(ctx, x, y) {
    ctx.fillStyle = this.isActive ? 'blue' : 'purple';
    ctx.fillRect(x, y, 16, 16);

    ctx.fillStyle = 'lime';
    ctx.fillRect(x + 7, y + 7, 2, 2);
    if (this.mode & NORTH) {
      ctx.fillRect(x + 7, y, 2, 7);
    }
    if (this.mode & EAST) {
      ctx.fillRect(x + 9, y + 7, 7, 2);
    }
    if (this.mode & SOUTH) {
      ctx.fillRect(x + 7, y + 9, 2, 7);
    }
    if (this.mode & WEST) {
      ctx.fillRect(x, y + 7, 7, 2);
    }
  }
  wireNorth() { return this.getNorth() instanceof Wire; }
  wireEast() { return this.getEast() instanceof Wire; }
  wireSouth() { return this.getSouth() instanceof Wire; }
  wireWest() { return this.getWest() instanceof Wire; }
}