
import Form from "../components/Form.js";
import FormForTranslit from "../components/FormForTranslit.js";
import { formSelectors, formResultSelectors } from "../utils/constants.js";
import { translitVocabulary } from "../utils/translitVocabulary.js";

  
  /** ---------------- Анализатор текста ---------------- */
  
  const formTextAnalysis = new Form(
    formSelectors.formTextAnalysis,
    {
      handleFormSubmit: (formData) => {
        /** Количество слов в тексте */
        const arr1 = formData.toLowerCase().split(' ');
        const numberOfWords = arr1.length;

        /** Количество символов в тексте */
        const arr2 = formData.toLowerCase().split('');
        const numberOfCharacters = arr2.length;

        /** Количество символов (без пробелов) в тексте */
        const arr3 = arr2.filter((elem) => {
          if (elem !== ' ') {
            return true;
          } else {
            return false;
          }
        })
        const numberOfCharactersNotBsp = arr3.length;
        
        /** Процентное содержание символов */
        let arr4 = {};
        for (let elem of arr3) {
          if (!arr4[elem]) {
            arr4[elem] = 1;
          } else {
            arr4[elem]++;
          }
        }
        let arr5 = [];
        for (let key in arr4) {
          arr5.push(key + ': ' + arr4[key]);
        }
        const arr6 = arr5.sort((a, b) => {
          if (a < b) {
            return -1;
          } else if (a > b) {
            return 1;
          } else {
            return 0;
          }
        })
        const percentageOfCharacters = arr6.join(', ');

        formTextAnalysis.setResult({
          numberOfWords: numberOfWords,
          numberOfCharacters: numberOfCharacters,
          numberOfCharactersNotBsp: numberOfCharactersNotBsp,
          percentageOfCharacters: percentageOfCharacters,
        });
    },
  },
  formResultSelectors.formTextAnalysis
);

formTextAnalysis.setEventListeners();


/** ---------------- Транслит ---------------- */

const translit = new FormForTranslit(
  formSelectors.translit,
  translitVocabulary
);

translit.setListeners();