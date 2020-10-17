import { randomNumber } from "../utils/utils.js";

const selectors = {
  form: ".form",
  inputs: ".form__input",
  input1: "#gamerOne",
  input2: "#gamerTwo",
  gameResult: "#gameResult",
  gameAnswer: "#gameAnswer",
  button: ".form__button",
};

const letterList = [
  'а', 'б', 'в', 'г', 'д', 'е', 'ж',
  'з', 'и', 'к', 'л', 'м', 'н', 'о',
  'п', 'р', 'с', 'т', 'у', 'ф', 'х',
  'ц', 'ч', 'ш', 'щ', 'э', 'ю', 'я'
];

class GameCities {
  constructor(selectors, letterList) {
    this._selectors = selectors;
    this._letterList = letterList;
    this._form = document.querySelector(this._selectors.form);
    this._inputs = this._form.querySelectorAll(this._selectors.inputs);
    this._input1 = this._form.querySelector(this._selectors.input1);
    this._input2 = this._form.querySelector(this._selectors.input2);
    this._answer = this._form.querySelector(this._selectors.gameAnswer);
    this._result = this._form.querySelector(this._selectors.gameResult);
    this._citiesArr = [];
    this._letter = "";
    this._inputValue = "";
    this._activeInput = null;
    this._inputsStatus = {
      input1: {
        isActive: true,
        selector: "#gamerOne",
      },
      input2: {
        isActive: false,
        selector: "#gamerTwo",
      },
    };
  }

  setInitState() {
    this._setFirstLetter();
    this._setInputsStatus();
    this._setResult("");
    this._activeInput = this._input1;
  }

  setEventListeners() {
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
      this._getInputValue();
      this._handleSubmit();
      this._form.reset();
    });
  }

  _handleSubmit() {
    if (!this._checkIsAnswerValid()) {
      this._setResult("Неправильное слово! ");
    } else {
      if (!this._checkIsAnswerNew()) {
        this._citiesArr[this._citiesArr.length] = this._inputValue;
        this._setFirstLetter();
        this._setIsActive();
        this._setInputsStatus();
        this._setResult("");
        this._setAnswer();
      } else {
        this._setResult("Такое слово было! ");
      }
    }
  }

  _setFirstLetter() {
    if (!this._letter) {
      const letterIndex = randomNumber(0, this._letterList.length - 1);
      this._letter = this._letterList[letterIndex];
    } else {
      if (
        this._letterList.some((letter) => {
          return letter === this._inputValue[this._inputValue.length - 1];
        })
      ) {
        this._letter = this._inputValue[this._inputValue.length - 1];
      } else {
        this._letter = this._inputValue[this._inputValue.length - 2];
      }
    }
  }

  _setResult(text) {
    this._result.textContent = `${text}Первая буква: "${this._letter.toUpperCase()}"`;
  }

  _setInputsStatus() {
    for (let inputItem in this._inputsStatus) {
      const input = this._form.querySelector(
        this._inputsStatus[inputItem].selector
      );
      const label = input.parentElement;

      if (!this._inputsStatus[inputItem].isActive) {
        input.setAttribute("disabled", true);
        label.classList.add("form__label_disabled");
      } else {
        input.removeAttribute("disabled");
        input.focus();
        label.classList.remove("form__label_disabled");
        this._activeInput = input;
      }
    }
  }

  _setIsActive() {
    this._inputsStatus = {
      input1: {
        isActive: !this._inputsStatus.input1.isActive,
        selector: "#gamerOne",
      },
      input2: {
        isActive: !this._inputsStatus.input2.isActive,
        selector: "#gamerTwo",
      },
    };
  }

  _getInputValue() {
    this._inputValue = this._activeInput.value.toLowerCase();
  }

  _checkIsAnswerValid() {
    return this._inputValue[0] === this._letter;
  }

  _checkIsAnswerNew() {
    if (this._citiesArr.length === 0) {
      return false;
    } else {
      return this._citiesArr.some((city) => {
        return this._inputValue === city;
      });
    }
  }

  _setAnswer() {
    const arr = this._citiesArr.map(city => {
      let nCity = city.split('');
      nCity[0] = nCity[0].toUpperCase();
      return nCity.join('');
    });
    this._answer.textContent = arr.join(', ');
  }
}

const gameCities = new GameCities(selectors, letterList);

gameCities.setInitState();
gameCities.setEventListeners();
