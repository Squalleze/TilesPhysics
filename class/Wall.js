import {Block} from './Block.js';

export class Wall extends Block {
  render(ctx, x, y) {
    ctx.fillStyle = 'teal';
    ctx.fillRect(x, y, 16, 16);
  }
}