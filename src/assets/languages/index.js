import enTranslation from "./en-US.json";
import noTranslation from "./nb-NO.json";
import daTranslation from "./da-DK.json";
import fiTranslation from "./fi-FI.json";
import deTranslation from "./de.json";
import svTranslation from "./sv-SE.json";
import cnTranslation from "./zh.json";
import enGBTranslation from "./en-GB.json";
import { getLanguageFile } from "../../services/applicationService";

const resources = {
  'en-US': {
     translation: enTranslation 
    },
  'nb-NO': {
    translation: noTranslation
  },
  'da-DK': {
    translation: daTranslation
  },
  'fi-FI': {
    translation: fiTranslation
  },
  'de': {
    translation: deTranslation
  },
  'sv-SE': {
    translation: svTranslation
  },
  'zh': {
    translation: cnTranslation
  },
  'en-GB': {
    translation: enGBTranslation
  }
}

const transformArrayToObject = async (arr) => {
  try{
    const result = {};

    arr.forEach(item => {
      const finalValue = item.Value && item.Value.trim() !== "" ? item.Value : item.DefaultValue;
      result[item.Key] = finalValue;
    });
  
    return result;
  } catch {
    console.log('Language file convert failed')
  }
}

const fetchLanguage = async () => {
  try{
    const cultureCode = localStorage.getItem('i18nextLng');

    const response = await getLanguageFile(cultureCode)
    const data = await response.data
    const languageObj = await transformArrayToObject(data);
  
    return {
      [cultureCode]: {
         translation: languageObj 
        }
    };
  } catch {
    console.log('Language file fetch failed')
  }
}

export default fetchLanguage;
