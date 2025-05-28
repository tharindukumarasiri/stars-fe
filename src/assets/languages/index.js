import enTranslation from "./en-US.json";
import { getLanguageFile } from "../../services/applicationService";

const resources = {
  'en-US': {
    translation: enTranslation
  },
}

function pascalToSnakeCase(word) {
  return word
    .replace(/([a-z0-9])([A-Z])/g, '$1_$2') // Add underscore between camel bumps
    .replace(/([A-Z])([0-9])/g, '$1_$2')     // Add underscore before numbers
    .toUpperCase().trim();
}

const transformArrayToObject = async (arr) => {
  try {
    const result = {};

    arr.forEach(item => {
      const finalValue = item.Value && item.Value.trim() !== "" ? item.Value : item.DefaultValue;
      result[pascalToSnakeCase(item.Key)] = finalValue;
    });

    return result;
  } catch {
    console.log('Language file convert failed')
  }
}

const fetchLanguage = async () => {
  try {
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
    return resources;
  }
}

export default fetchLanguage;
