export function formatDate(date: Date) {
  return date.getDate().toString().padStart(2, '0') + ' ' + [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ][date.getMonth()] + ' ' + date.getFullYear();
}
