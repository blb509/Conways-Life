import React, { Component } from "react";
import Cell from "./Cell.js";
import Rules from "./Rules.js";
import "./App.css";

export default class App extends Component {
  state = {
    rules: new Rules(),
    size: [40, 20],
    running: false
  };

  handleRowChange = e => {
    if (!this.state.running) {
      let actualSize = this.state.size;

      if (e.target.value < 20) actualSize[1] = e.target.value;
      else actualSize[1] = 20;

      this.setState({
        size: actualSize
      });

      this.renderBoard();
    }
  };

  handleColumnChange = e => {
    if (!this.state.running) {
      let actualSize = this.state.size;
      if (e.target.value < 40) actualSize[0] = e.target.value;
      else actualSize[0] = 40;

      this.setState({
        size: actualSize
      });

      this.renderBoard();
    }
  };

  startGame = () => {
    if (!this.state.running) {
      this.setState(
        {
          running: true
        },
        () => {
          this.intervalRef = setInterval(() => this.runGame(), 10);
        }
      );
    }
  };

  stopGame = () => {
    this.setState(
      {
        running: false
      },
      () => {
        if (this.intervalRef) {
          clearInterval(this.intervalRef);
        }
      }
    );
  };

  runGame = () => {
    this.setState({
      rules: this.state.rules.addGeneration()
    });
  };

  storeCell = position => {
    if (!this.state.running) {
      this.setState({
        rules: this.state.rules.storeCell(position)
      });
    }
  };

  renderGrid = () => {
    let grid = [];
    let cellRow = [];

    for (var i = 0; i < this.state.size[0]; i++) {
      for (var j = 0; j < this.state.size[1]; j++) {
        if (this.state.rules.isCellAlive(i + " , " + j)) {
          cellRow.push(
            <Cell
              key={[i, j]}
              position={{ x: i, y: j }}
              live={true}
              storeCell={this.storeCell}
            />
          );
        } else {
          cellRow.push(
            <Cell
              key={[i, j]}
              position={{ x: i, y: j }}
              live={false}
              storeCell={this.storeCell}
            />
          );
        }
      }
      grid.push(
        <div className="row" key={i}>
          {cellRow}
        </div>
      );
      cellRow = [];
    }

    return grid;
  };

  render() {
    return (
      <div className="container">
        <div className="controls">
          <div className="innerControls">
            <label className="label">
              Rows:
              <input
                className="input"
                type="text"
                value={this.state.size[1]}
                onChange={this.handleRowChange}
              />
            </label>
            <label className="label">
              Columns:
              <input
                className="input"
                type="text"
                value={this.state.size[0]}
                onChange={this.handleColumnChange}
              />
            </label>
          </div>
          <div className="buttons">
            <button className="submit" onClick={this.startGame}>
              Start
            </button>
            <button className="submit" onClick={this.stopGame}>
              Stop
            </button>
          </div>
          Generation:
          {this.state.rules.getGeneration()}
        </div>
        <div className="gridContainer">{this.renderGrid()}</div>
      </div>
    );
  }
}
