#pragma once
#include "Useful.hpp"
#include "Block.hpp"

class Chunk {
  private:
    const UInt8 width = 16;
    const UInt8 height = 16;
    Block foreground[16][16];

  public:
    Block getForegroundBlock(BlockPos pos);// const { return foreground[x][y]; };
    bool setForegroundBlock(BlockPos pos, Block block);
};