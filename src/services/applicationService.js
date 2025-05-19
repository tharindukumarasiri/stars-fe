import config from './config.json'
import http from './httpService'

//Projects
export async function getLanguageFile(cultureCode = 'en-GB') {
    const { data } = await http.get(process.env.LOCAL_API + config.GET_LANGUAGE_BY_CULTURE + cultureCode);
    return data;
}