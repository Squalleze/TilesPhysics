#pragma once

#include "Useful.hpp"
#include "Block.hpp"

typedef struct BlockPos {
  UInt32 x;
  UInt32 y;
} BlockPos;

class World {
  private:
  public:
    Block getForegroundBlock(BlockPos pos);
    Bool setForegroundBlock(BlockPos pos, Block block);
};