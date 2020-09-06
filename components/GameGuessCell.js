
import { randomNumber } from "../utils/utils.js";

export default class GameGuessCell {
  constructor({gameSelector, resultSelectors}) {
    this._gameSelector = gameSelector;
    this._resultSelectors = resultSelectors.gameResult;
    this._game = document.querySelector(this._gameSelector);
    this._grid = this._game.querySelector('.form__grid');
    this._buttonOptions = this._game.querySelector('.js-options');
    this._buttonStart = this._game.querySelector('.js-start');
    this._optionsBlock = this._game.querySelector('.form__options');
    this._resultDOM = this._game.querySelector(this._resultSelectors);
    this._rows = 0;
    this._columns = 0;
    this._cells = 0;
    this._hiddenCells = 0;
    this._time = 0; 
    this._randomArr = [];
    this._guessedCells = 0;
    this._pastTime = 0;
    this._win = false;
    this._handleButtonClick = this._handleButtonClick.bind(this);
    this._handleCellClick = this._handleCellClick.bind(this);
  }

  /** Получение значений инпутов */
  _getInputVelue() {
    this._inputsValues = {};
    const inputList = this._game.querySelectorAll('.form__input');
    inputList.forEach((input) => {
      this._inputsValues[input.name] = input.value;
    });
    return this._inputsValues;
  }

  /** Вывод результата игры на экран */
  _setResult() {
    let message = this._win ? 'Вы выиграли!' : 'Игра окончена!';
    this._resultDOM.textContent = `${message} За ${this._pastTime} секунд вы нашли ${this._guessedCells} из ${this._hiddenCells} ячеек.`
  }

  /** Установка свойств сетки поля игры */
  _setGrid() {
    this._grid.style.gridTemplateRows = `repeat(${this._rows}, 1fr)`
    this._grid.style.gridTemplateColumns = `repeat(${this._columns}, 1fr)`
  }

  /** Создание ячейки */
  _createCell() {
    const cell = document.createElement('div');
    cell.classList.add('form__cell');
    return cell;
  }
  
  /** Подсчет количества ячеек */
  _calcCells() {
    return this._rows * this._columns;
  }
  
  /** Создание сетки поля игры */
  renderCells() {
    this._grid.innerHTML = '';

    const data = this._getInputVelue();

    this._rows = data.cellsOnRows;
    this._columns = data.cellsOnColumns;
    this._hiddenCells = data.hiddenCells;
    this._time = data.timeForGuess;

    this._setGrid();

    for (let i = 1; i <= this._calcCells(); i++) {
      let cell = this._createCell()
      cell.setAttribute('id', i)
      this._grid.append(cell);
    }
  }

  /** Получение массива номеров спрятанных ячеек */
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

  /** Установка слушателей событий */
  setListeners() {
    this._buttonStart.addEventListener('click', this._handleButtonClick);
    this._buttonOptions.addEventListener('click', this._handleOptions.bind(this));
  }

  /** Обработка событий при клике на ячейку */
  _handleCellClick(evt) {
    this._isHidden(evt.target);
    evt.target.removeEventListener('click', this._handleCellClick);
  }

  /** Обработка событий при клике на кнопку настроек */
  _handleOptions() {
    this._optionsBlock.classList.toggle('hidden');
  }

  /** Обработка событий при клике на кнопку старта*/
  _handleButtonClick() {
    this._buttonStart.setAttribute('disabled', 'true');
    this._resultDOM.textContent = `Найдите все спрятанные ячейки за время!`

    this.renderCells();
    this._randomArr = this._getRandomNumbers();
    this._setTimerStart();

    this._cells = this._grid.querySelectorAll('.form__cell');
    const cellsArray = Array.from(this._cells);
    cellsArray.forEach((cell) => {
      cell.addEventListener('click', this._handleCellClick);
    })
  }

  /** Функция для отметки ячейки после клика на нее */
  _isHidden(cell) {
    let id = Number(cell.getAttribute('id'));
    if (this._randomArr.includes(id)) {
      cell.classList.add('form__cell_guessed');
      this._guessedCells ++;
      this._resultDOM.textContent = `Вы нашли ${this._guessedCells} из ${this._hiddenCells} ячеек`;
    } else {
      cell.classList.add('form__cell_checked');
    }
  }

  /** Функция начала игры */
  _setTimerStart() {
    let time = this._formatTime(this._time);
    this._showResult(time);
    this._setInterval();
    this._buttonStart.removeEventListener('click', this._setTimerStart.bind(this));
  }

  /** Форматирование времени */
  _formatTime(ms) {
    return Number.parseFloat(ms).toFixed(2);
  }

  /** Установка текста кнопке */
  _showResult(content) {
    this._buttonStart.textContent = content;
  }

  /** Функция счетчика времени игры */
  _setInterval() {
    let time = this._time;
    let pastTime = this._pastTime;

    let timerId = setInterval(() => {
      time = this._formatTime(time - 0.1);
      pastTime = this._formatTime(this._time - time);

      this._showResult(time);
      this._pastTime = pastTime;
      
      if (this._guessedCells == this._hiddenCells) {
        clearInterval(timerId);
        this._win = true;
        this._handleEndGeme();
      };
      
      if (time == 0) {
        clearInterval(timerId);
        this._win = false;
        this._handleEndGeme();
      }
    }, 100);
  }
  
  /** Окончание игры */
  _handleEndGeme() {
    this._setResult();
    this._showResult('Начать заново');
    this._buttonStart.removeAttribute('disabled', 'false');
    this._randomArr = [];
    this._guessedCells = 0;
    const cellsArray = Array.from(this._cells);
    cellsArray.forEach((cell) => {
      cell.removeEventListener('click', this._handleCellClick);
    })
  }
}