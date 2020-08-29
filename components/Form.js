export default class Form {
  constructor(formSelector, { handleFormSubmit }, resultSelectors) {
    this._formSelector = formSelector;
    this._resultSelectors = resultSelectors;
    this._form = document.querySelector(this._formSelector);
    this.handleFormSubmit = handleFormSubmit;
    this._inputList = this._form.querySelectorAll(".form__input");
    this._textarea = this._form.querySelector(".form__textarea");
    this._answersList = this._form.querySelectorAll(".form__result");
  }

  /** Получение значений инпутов формы */
  _getInputValues() {
    this._inputsValues = {};

    this._inputList.forEach((input) => {
      this._inputsValues[input.name] = input.value;
    });
    return this._inputsValues;
  }

  /** Получение значения textarea формы */
  _getTextareaValue() {
    return this._textareaValue = this._textarea.value;
  }

  /** Выбор значений полей формы */
  _setFormValues() {
    if (this._form.contains(this._textarea)) {
      return this._getTextareaValue();
    } else {
      return this._getInputValues();
    }
  }

  /** Навешивание слушателя отправления формы */
  setEventListeners() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this.handleFormSubmit(this._setFormValues());
    });
  }

  /** Отображение ответа на странице */
  setResult(result) {
    this._answersList.forEach((answer) => {
      const answerID = answer.getAttribute("id");
      for (let item in result) {
        if (item === answerID) {
          answer.textContent = result[item];
        }
      }
    });
  }
}
