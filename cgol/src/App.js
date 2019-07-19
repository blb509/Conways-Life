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

      this.renderGrid();
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

      this.renderGrid();
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

  clearGame = () => {
    this.setState(
      {
        running: false
      },
      () => {
        if (this.intervalRef) {
          clearInterval(this.intervalRef);
          this.setState({
            rules: new Rules()
          });
        }
      }
    );
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
            <button className="submit" onClick={this.clearGame}>
              Clear
            </button>
          </div>
          Generation: {this.state.rules.getGeneration()}
        </div>
        <div className="text">
          <div>
            Rules:
            <ol>
              <li>If a living cell does not have 2 or 3 neighbors, it dies</li>
              <li>If a dead cell has 3 neighbors, it becomes alive</li>
            </ol>
          </div>
          <div>
            History of Conways Rules of Life:
            <br />
            Created by mathematician John Horton Conway, the Game of Life was
            made because Conway was interested in finding unique and interesting
            cell automaton after being inspired by the work of Jon von Neumann
            and Stanislaw Ulman. <br /> <br />
          </div>
          <div>
            Process of making Conways Game of Life:
            <br />
            Having never heard of Conways Game of Life, the first thing I had to
            do was research online extensively what it was and how it worked.
            After having read some articles and seen examples of the game
            working I felt like understood what it was that I needed to do. I
            felt most comfortable using react so I chose that as the tool I was
            going to use to implement the game. I then followed along with a
            tutorial I found online to actually do the project. While I would
            have liked to do the project completely by myself, I had never done
            anything like it nor did I feel like there were things I had done in
            the past that were similar enough to this. So for me, using a
            tutorial was the best way for me to understand and complete this
            project.
          </div>
        </div>
        <div className="gridContainer">{this.renderGrid()}</div>
      </div>
    );
  }
}
