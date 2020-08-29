import Form from "./Form.js";

export default class FormGuessNumber extends Form {
  constructor(formSelector, { handleFormSubmit }, resultSelectors, randomNumber) {
    super(formSelector, { handleFormSubmit }, resultSelectors);
    this._randomNumber = randomNumber;
    this._attempt = 1;
  }

  /** Отображение ответа на странице */
  setResult(result) {
    super.setResult(result);
  }

  /** Навешивание слушателя отправления формы */
  setEventListeners() {
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

}