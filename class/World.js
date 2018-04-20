// import {Block} from './Block.js';

export class World {
  constructor() {
    this.width = 43;
    this.height = 39;
    this.blocks = new Array(this.width * this.height).fill(null);
  }
  testPos(x, y) { return x >= 0 && y >= 0 && x < this.width && y < this.height; }
  pos(x, y) { return y * this.width + x; }
  get(x, y) { return this.testPos(x, y) ? this.blocks[this.pos(x, y)] : undefined; }
  set(x, y, Klass, extra) {
    if (!this.testPos(x, y)) return undefined;
    if (this.has(x, y)) this.destroy(x, y); // destroy old block before replace
    const newBlock = new Klass(extra);
    this.blocks[this.pos(x, y)] = newBlock; // replace block
    newBlock.onPlace(x, y); // trigger block on place event
    this.update(x, y); // update neighbours
    return newBlock;
  }
  has(x, y) { return this.testPos(x, y) ? (this.get(x, y) !== null) : undefined; }
  destroy(x, y) {
    if (!this.testPos(x, y)) return undefined;
    const index = this.pos(x, y);
    const block = this.blocks[index];
    if (block) block.onDestroy();
    this.blocks[index] = null;
    this.update(x, y);
    return block;
  }
  tick(dt) {
    for (let y = 0, i = 0; y < this.height; y++)
      for (let x = 0; x < this.width; x++, i++) {
        const block = this.blocks[i];
        if (block) block.onTick(dt);
      }
  }
  update(x, y) {
    const north = this.get(x, y - 1),
          east = this.get(x + 1, y),
          south = this.get(x, y + 1),
          west = this.get(x - 1, y);

    if (north) north.onUpdate();
    if (east) east.onUpdate();
    if (south) south.onUpdate();
    if (west) west.onUpdate();
  }
  render(ctx) {
    // console.log(dt);
    const fX = 16 * this.width, fY = 16 * this.height;
    ctx.clearRect(0, 0, fX, fY);

    for (let y = 0, i = 0; y < fY; y += 16)
      for (let x = 0; x < fX; x += 16, i++) {
        const block = this.blocks[i];
        if (block) {
          ctx.save();
          block.render(ctx, x, y);
          ctx.restore();
        }
      }
  }
}