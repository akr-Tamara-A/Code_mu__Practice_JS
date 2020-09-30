
export default class FormForTranslit {
  constructor(formSelector, vocabulary) {
    this._formSelector = formSelector;
    this._vocabulary = vocabulary;
    this._form = document.querySelector(this._formSelector);
    this._textareaRu = this._form.querySelector('#ruText');
    this._textareaTranslit = this._form.querySelector('#translitText');
    this._ruText = '';
  }

  /** Слушатели полей формы */
  setListeners() {
    this._textareaRu.addEventListener('input', () => {
      this._handleInputRuText(this._textareaRu.value);
    });
    this._textareaTranslit.addEventListener('input', () => {
      this._handleInputTranslit(this._textareaTranslit.value);
    });
  }

  /** Обработка ввода в поле для русского текста */
  _handleInputRuText(data) {
    this._textareaTranslit.value = this._textToTranslit(data);
  }
  
  /** Обработка ввода в поле для транслита */
  _handleInputTranslit(data) {
    this._textareaRu.value = this._textFromTranslit(data);
  }

  /** Перевод текста из русского в транслит */
  _textToTranslit(data) {
    const arr = data.toLowerCase().split('');
    let newArr = [];

    for (let letter of arr) {
      if (this._vocabulary.some((item) => {
        return item.ru === letter
      })) {
        let elem = this._vocabulary.find((item) => {
          return item.ru == letter;
        });
        newArr.push(elem.translit);
      } else {
        newArr.push(letter);
      }
    }

    return newArr.join('');
  }

  /** Перевод текста из транслита в русский */
  _textFromTranslit(data) {
    const arr = data.toLowerCase().split('');
    let newArr = [];
    for (let i = 0; i < arr.length; i++) {
      switch (arr[i]) {
        case 'a': 
            if (arr[i - 1] == 'y') {
              newArr[newArr.length - 1] = 'ya';
            } else {
              newArr.push('a');
            }
        break;
        
        case 'o': 
            if (arr[i - 1] == 'y') {
              newArr[newArr.length - 1] = 'yo';
            } else {
              newArr.push('o');
            }
        break;
        
        case 'u': 
            if (arr[i - 1] == 'y') {
              newArr[newArr.length - 1] = 'yu';
            } else {
              newArr.push('u');
            }
        break;
        
        case 's': 
            if (arr[i - 1] == 't') {
              newArr[newArr.length - 1] = 'ts';
            } else {
              newArr.push('s');
            }
          break;
          
        case 'h': 
            switch (arr[i - 1]) {
              case 'z': 
                  newArr[newArr.length - 1] = 'zh'; 
                  break;

              case 's': 
                  newArr[newArr.length - 1] = 'sh'; 
                  break;

              case 'c': 
                  if (arr[i - 2] == 's') {
                    newArr[newArr.length - 2] = 'sch';
                    newArr.pop();
                  } else {
                    newArr[newArr.length - 1] = 'ch';
                  }
                  break;
              
              default: 
                  newArr.push('h');
            }
        break;
        
        default: 
          newArr.push(arr[i]);
      }
    }
    let translatedArr = [];
    for (let letter of newArr) {
      if (this._vocabulary.some((item) => {
        return item.translit === letter
      })) {
        let elem = this._vocabulary.find((item) => {
          return item.translit == letter;
        });
        translatedArr.push(elem.ru);
      } else {
        translatedArr.push(letter);
      }
    }
    return translatedArr.join('');
  }
}
