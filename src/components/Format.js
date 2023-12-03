import moment from 'moment';

export const dateFormat = (date, format = 'DD/MM/YYYY') => {
    try {
        return date ? moment(date).format(format) : '--';
    } catch (error) {
        return '--';
    }
};