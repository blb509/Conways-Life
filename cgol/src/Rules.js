import React, { Component } from "react";

export default class Rules {
  constructor(generation = 0, liveCells = new Map()) {
    this.generation = generation;
    this.liveCells = liveCells;
    this.nextGeneration = new Map();
    this.deadCells = new Map();
  }

  getGeneration() {
    return this.generation;
  }

  getLiveCells() {
    return this.liveCells;
  }

  addCell(position) {
    this.liveCells.set(position.x + " , " + position.y, {
      x: position.x,
      y: position.y
    });
  }

  removeCell(position) {
    this.liveCells.delete(position);
  }

  isCellAlive(position) {
    return this.liveCells.has(position);
  }

  storeCell(position) {
    if (this.isCellAlive(position.x + " , " + position.y)) {
      this.removeCell(position.x + " , " + position.y);
    } else {
      this.addCell(position);
    }

    return new Rules(this.generation, this.liveCells);
  }

  addGeneration() {
    this.liveCells.forEach(cell => {
      this.calculateLiveCellsNeighbors(cell);
    });

    this.deadCells.forEach(cell => {
      this.calculateDeadCellsNeighbors(cell);
    });

    this.generation++;

    return new Rules(this.generation, this.nextGeneration);
  }

  calculateLiveCellsNeighbors(position) {
    let liveNeighbors = 0;

    for (let i = position.x - 1; i <= position.x + 1; i++) {
      for (let j = position.y - 1; j <= position.y + 1; j++) {
        if (i === position.x && j === position.y) continue;

        if (this.isCellAlive(i + " , " + j)) {
          liveNeighbors++;
        } else {
          this.deadCells.set(i + " , " + j, { x: i, y: j });
        }
      }
    }

    if (liveNeighbors === 2 || liveNeighbors === 3)
      this.nextGeneration.set(position.x + " , " + position.y, {
        x: position.x,
        y: position.y
      });
  }

  calculateDeadCellsNeighbors(position) {
    let liveNeighbors = 0;

    for (let i = position.x - 1; i <= position.x + 1; i++) {
      for (let j = position.y - 1; j <= position.y + 1; j++) {
        if (i === position.x && j === position.y) continue;

        if (this.isCellAlive(i + " , " + j)) {
          liveNeighbors++;
        }
      }
    }

    if (liveNeighbors === 3)
      this.nextGeneration.set(position.x + " , " + position.y, {
        x: position.x,
        y: position.y
      });
  }
}
