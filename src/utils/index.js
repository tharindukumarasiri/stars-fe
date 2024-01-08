import moment from 'moment';

export const arrayToUpper = (array) => {
    return array.map(element => {
        return element.toUpperCase();
    });
}

export const formatDate = (date, format = 'MM/DD/YYYY', inputFormat) => {
    if (!date || date === '0001-01-01T00:00:00Z') return '';
    const formattedDate = moment(date, inputFormat).format(format);
    return formattedDate;
};

export const getDateDiff = (date1, date2) => {
    const formattedDate1 = moment(date1).format('YYYY-MM-DD');
    let formattedDate2 = '';
    if (!date2) formattedDate2 = moment().format('YYYY-MM-DD');
    else formattedDate2 = moment(date2).format('YYYY-MM-DD');

    return moment(formattedDate1).diff(moment(formattedDate2), 'days');
};


export const getAuthHeader = () => {
    const token = localStorage.getItem('auth_token');
    return { headers: { 'Authorization': `Bearer ${token}` } };
};

export const getCountryFlag = (countryCode) => {
    try {
        const flag = require(`../assets/images/flags/${countryCode.toLowerCase()}.png`).default;
        return flag;
    } catch {
        return ''
    }
}

export const projectCodeFormat = (id) => {
    if(id)
        return 'P' + id.toString().padStart(5, '0');
    else
        return '';
}

export const validatePhoneNumberInput = (phone) => {
    return phone.replace(/[^-+()0-9]/gi, '');
}

export const getKeyByValue = (object, value) => {
    return Object.keys(object).find(key => object[key] === value);
  }