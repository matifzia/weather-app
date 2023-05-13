import moment from 'moment'

const formatDate = (value: string) => {
  if (!value) {
    return ''
  } else {
    const dateToFormat = new Date(value.toString())
    const formattedDate = moment(dateToFormat).format('DD MMM YYYY')
    return formattedDate
  }
}
const formatDateFromTimeStamp = (value: number): string => value ? moment.unix(value).format('dddd DD MMM') : ''
const formatShortTimeFromTimeStamp = (value: number): string => value ? moment.unix(value).format('ha') : ''

export { formatDate, formatDateFromTimeStamp,formatShortTimeFromTimeStamp }
