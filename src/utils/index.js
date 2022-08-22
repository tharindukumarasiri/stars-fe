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