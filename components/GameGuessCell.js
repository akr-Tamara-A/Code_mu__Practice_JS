
import { randomNumber } from "../utils/utils.js";

export default class GameGuessCell {
  constructor({gameSelector, resultSelectors}, {rows, columns, hiddenCells, time}) {
    this._gameSelector = gameSelector;
    this._resultSelectors = resultSelectors;
    this._rows = rows;
    this._columns = columns;
    this._hiddenCells = hiddenCells;
    this._time = time; /** !!!!!! */
    this._game = document.querySelector(this._gameSelector);
    this._grid = this._game.querySelector('.form__grid');
    this._randomArr = this._getRandomNumbers();
    this._timer = this._game.querySelector('.form__timer');
    this._click = 0;
  }

  setResult() {

  }

  _setGrid() {
    this._grid.gridTemplateRows = `repeat(${this._rows}, 1fr)`
    this._grid.gridTemplateColumns = `repeat(${this._columns}, 1fr)`
  }

  _createCell() {
    const cell = document.createElement('div');
    cell.classList.add('form__cell');
    return cell;
  }
  
  _calcCells() {
    return this._rows * this._columns;
  }
  
  renderCells() {
    for (let i = 1; i <= this._calcCells(); i++) {
      let cell = this._createCell()
      cell.setAttribute('id', i)
      this._grid.append(cell);
    }
  }

  _getRandomNumbers() {
    let arr = [];

    while (arr.length < this._hiddenCells) {
      let num = randomNumber(1, this._calcCells());

      while (arr.indexOf(num) === -1) {
        arr.push(num);
      }
    }
    return arr;
  }

  setListeners() {
    const cells = this._grid.querySelectorAll('.form__cell');
    const cellsArray = Array.from(cells);
    cellsArray.forEach((cell) => {
      cell.addEventListener('click', this._handleCellClick.bind(this));
    })
  }

  _handleCellClick(evt) {
    this._isHidden(evt.target);
    this._click ++;
    console.log(this._click);
    this._setTimerStart();
  }

  _isHidden(cell) {
    let id = Number(cell.getAttribute('id'));
    let arr = this._randomArr;
    if (arr.includes(id)) {
      cell.classList.add('form__cell_guessed');
    } else {
      cell.classList.add('form__cell_checked');
    }
  }

  _setTimerStart() {
    if (this._click === 1) {
      this._timer.textContent = this._time;
    }
  }
}