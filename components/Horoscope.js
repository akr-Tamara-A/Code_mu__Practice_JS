
export default class Horoscope {
  constructor(formSelector, resultSelectors, zodiackDates, horoscopeTexts) {
    this._formSelector = formSelector;
    this._resultSelectors = resultSelectors;
    this._zodiackDates = zodiackDates;
    this._horoscopeTexts = horoscopeTexts;
    this._form = document.querySelector(this._formSelector);
    this._inputElem = this._form.querySelector('.form__input');
    this._radios = this._form.querySelectorAll('.form__radio');
    this._submitButton = this._form.querySelector('.form__button');
    this._horoscopeSignDay = this._form.querySelector(this._resultSelectors.horoscopeSignDay);
    this._horoscopeResult = this._form.querySelector(this._resultSelectors.horoscopeResult);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._sign;
    this._signNameRus;
  }

  /** Навешивание обработчиков форме */
  setEventListeners() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValue());
    });
  }

  /** Получение даты рождения */
  _getInputValue() {
    return this._inputElem.value;
  }

  /** Получение выбраного дня для гороскопа */
  _getRadioValue() {
    let checkedDay = '';
    let checkedDayRus = '';
    for (let radio of this._radios) {
      if (radio.checked) {
        checkedDay = radio.value;
      }
    }
      switch (checkedDay) {
        case 'today':
          checkedDayRus = 'сегодня';
          break;
        case 'tomorrow':
          checkedDayRus = 'завтра';
          break;
        case 'dayAfterTomorrow':
          checkedDayRus = 'послезавтра';
          break;
      }
    return {
      checkedDay: checkedDay,
      checkedDayRus: checkedDayRus};
  }

  /** Обработка сабмита формы */
  _handleFormSubmit(date) {
    this._calcZodiacSign(date);
    this._getHoroscopeText();
  }

  /** Вычисление знака зодиака */
  _calcZodiacSign(date) {
    const dateArr = date.split('-');
    const month = dateArr[1];
    const day = dateArr[2];

    for (let item in this._zodiackDates) {
      if (this._zodiackDates[item].month == month) {
        if (day >= this._zodiackDates[item].day) {
          this._sign = this._zodiackDates[item].sign;
          this._signNameRus = this._zodiackDates[item].nameRus;
        } else {
          let prevItem = item - 1;
          if (prevItem < 1) {
            prevItem = 12;
          }
          this._sign = this._zodiackDates[prevItem].sign;
          this._signNameRus = this._zodiackDates[prevItem].nameRus;
        }
      }
    }
  }

  /** Получение гороскопа */
  _getHoroscopeText() {
    let horoscopeSignDay = `Прогноз на ${this._getRadioValue().checkedDayRus} для ${this._signNameRus}:`;
    let horoscopeResult = this._horoscopeTexts[this._sign][this._getRadioValue().checkedDay];

    this._horoscopeSignDay.textContent = horoscopeSignDay;
    this._horoscopeResult.textContent = horoscopeResult;
  }
}