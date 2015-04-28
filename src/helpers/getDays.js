var moment = require('moment');

function getDays(month, value) {
  var today = moment();
  var endDay = moment(month).endOf('month').endOf('week');
  var currentDay = moment(month).startOf('month').startOf('week');
  var currentWeek;
  var weeks = [];

  while (!currentDay.isAfter(endDay)) {
    if (currentDay.day() === 0) {
      currentWeek = [];
      weeks.push(currentWeek);
    }

    currentWeek.push({
      isOtherMonth: currentDay.month() !== month.month(),
      isValue: value && currentDay.isSame(value, 'day'),
      isToday: currentDay.isSame(today, 'day'),
      value: moment(currentDay),
      formatted: currentDay.format('D')
    });

    currentDay.add(1, 'days');
  }

  return weeks;
}

module.exports = getDays;