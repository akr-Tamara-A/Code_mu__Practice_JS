
import Horoscope from "../components/Horoscope.js";
import { formSelectors, formResultSelectors } from "../utils/constants.js";
import { zodiacDates } from "../utils/zodiacDates.js";
import { horoscopeTexts } from "../utils/horoscopeTexts.js";

/** ---------------- Гороскоп ---------------- */
const getHoroscope = new Horoscope(
  formSelectors.getHoroscope,
  formResultSelectors.getHoroscope,
  zodiacDates,
  horoscopeTexts
);

getHoroscope.setEventListeners();