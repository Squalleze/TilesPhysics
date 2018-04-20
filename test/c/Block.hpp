#pragma once

#include "World.hpp"

class Block {
  private:
  public:
    void onPlacement(World world, BlockPos pos);
    void onTick(World world);
    void onUpdate(World world);
    void onDestroy(World world);
};