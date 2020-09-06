import Form from "./Form.js";

export default class FormGuessNumber extends Form {
  constructor(formSelector, { handleFormSubmit }, resultSelectors) {
    super(formSelector, { handleFormSubmit }, resultSelectors);
    this._randomNumber = 0;
    this._attempt = 1;
    this._button = this._form.querySelector(".form__button");
  }

  /** Отображение ответа на странице */
  setResult(result) {
    super.setResult(result);
    if (result.answer === 'Вы угадали!') {
      this._button.textContent = 'Попробывать еще';
      this._attempt = 1;
      this._randomNumber = this._getRandomNumber(1, 100);
      console.log(this._randomNumber)
    } else {
      this._button.textContent = 'Проверить';
    }
  }

  /** Навешивание слушателя отправления формы */
  setEventListeners() {
    this._randomNumber = this._getRandomNumber(1, 100);
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this.handleFormSubmit(this._getInputValues(), this._attempt, this._randomNumber);
    });
  }

  /** Получение значений инпутов формы */
  _getInputValues() {
    this._inputsValues = {};

    this._inputList.forEach((input) => {
      this._inputsValues[input.name] = input.value;
    });
    return this._inputsValues;
  }

  addAttempt() {
    this._attempt ++;
  }

  _getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

}