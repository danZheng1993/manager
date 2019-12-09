import moment from 'moment'
import { requestFail, requestSuccess } from '../redux/api/request'
import 'react-notifications/lib/notifications.css'
import {NotificationManager} from 'react-notifications'

export const isFieldRequired = value =>
  value ? undefined : 'This Field is Required.'

export const ucFirst = (str) =>
  str.charAt(0).toUpperCase() + str.slice(1)

export const padStart = (num, digits = 2) =>
  num.toString().padStart(digits, '0')

export const hhmmss = (secs) => {
  const seconds = secs % 60
  const minutes = Math.floor(secs / 60) % 60
  const hours = Math.floor(secs / 3600)
  return (hours ? padStart(hours) + ':' : '') +
    (minutes ? padStart(minutes) : '00') + ':' +
    padStart(seconds)
}

export const distanceUnit = (distance, suffix = '') =>
  distance < 1000
  ? Math.round(distance * 10) / 10 + ' m' + suffix
  : Math.round(distance / 100) / 10 + ' km' + suffix

export const getDateStr = (dateTime) =>
  dateTime ? moment(dateTime).format('YYYY-MM-DD') : undefined

export const getDateTimeStr = (dateTime) =>
  dateTime ? moment(dateTime).format('YYYY-MM-DD hh:mm:ss') : undefined

export const getPageCount = ({ page_size, count }) =>
  Math.ceil(count / page_size)

export const requestIsFailed = (status, action) =>
{ return status === requestFail(action) }

export const requestIsSuccess = (status, action) =>
{ return status === requestSuccess(action) }

export const  createNotification = (type, message = '') => {
    switch (type) {
      case 'info':
        NotificationManager.info('message')
        break
      case 'success':
        NotificationManager.success(message, 'Success!', 3000)
        break
      case 'warning':
        NotificationManager.warning('Warning message', 'Close after 3000ms', 3000)
        break
      case 'error':
        NotificationManager.error(message, 'Error!', 3000,)
        break
      default :
        break
    }
}

