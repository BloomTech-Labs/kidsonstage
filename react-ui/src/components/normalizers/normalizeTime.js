

const normalizeTime = (value, previousValue) => { // todo check that all group times are increasing
  if (!value) {
    return value;
  }
  const onlyNums = value.replace(/[^\d]/g, '');
  if (!previousValue || value.length > previousValue.length) {
    // typing forward
    if (onlyNums.length === 2) {
      return `${onlyNums}:`;
    }
  }
  if (onlyNums.length <= 4) {
    return onlyNums;
  }
  if (onlyNums[0] === '0') onlyNums[0] = ' ';
  return `${onlyNums.slice(0, 2)}:${onlyNums.slice(3, 5)}`;
};
export default normalizeTime;
/**
 * Force after min date
 */
// const timeNormalize = (value, previousValue, values) => {
//   const momentTime = moment(values.time, 'HH:MM', true);
//   if (!momentTime.isValid()) {
//     return value;
//   }
//   if (!momentMaxDate.isAfter(momentMinDate)) {
//     return momentMinDate.add(1, 'd').format('MM-DD-YYYY');
//   }
//   return value;
// };

// /**
//  * Force before max date
//  */
// const minDateNormalize = (value, previousValue, values) => {
//   const momentMaxDate = moment(values.maxDate, 'MM-DD-YYYY', true);
//   const momentMinDate = moment(value, 'MM-DD-YYYY', true);
//   if (!momentMinDate.isValid() || !momentMaxDate.isValid()) {
//     return value;
//   }
//   if (!momentMinDate.isBefore(momentMaxDate)) {
//     return momentMaxDate.subtract(1, 'd').format('MM-DD-YYYY');
//   }
//   return value;
// };