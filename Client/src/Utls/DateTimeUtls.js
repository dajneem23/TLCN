const moment = require('moment');

export const yyyy_MM_DD = 'yyyy-MM-DD'

export const getDateWithString = () => {
    return moment(new Date()).format(yyyy_MM_DD);
}

export const getDate = (date) => {
    return new Date(date);
}

// get number of days from now to previous date
// date: format with yyyy-MM-DD
export const calculateDaysFromNow = (date) => {
    const today = moment(new Date()).startOf('day');
    const calDate = moment(date, yyyy_MM_DD);
    return today.diff(calDate, 'days');
}

// get number of days from now to previous date
// date: Date().getTime()
export const calculateDaysFromNowWithTime = (date) => {
    const today = moment(new Date()).startOf('day');
    const calDate = moment(new Date(date));
    return today.diff(calDate, 'days');
}

// convert date (int) to string
export const getDateWithFormat = (date) => {
    return moment(new Date(date)).format(yyyy_MM_DD);
}

//input: new Date().getTime() or "yyyy-MM-DD"
//output: time ago
export const calculateTimeAgo = (date) => {
    return moment(new Date(date)).fromNow();
}