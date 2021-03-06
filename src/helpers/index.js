import moment from 'moment'
import { requestFail, requestSuccess } from '../redux/api/request'
import 'react-notifications/lib/notifications.css'
import {NotificationManager} from 'react-notifications'
import { MSGS } from '../constants'

const phoneNumberRegex = /^[0-9]{11}$/;

export const isFieldRequired = value =>
  value ? undefined : MSGS.REQUIRED

export const isValidPhoneNumber = value =>
  value && value.match(phoneNumberRegex) ? undefined : MSGS.FORMAT_MISMATCH;

export const isValidEmail = (email) => {
  // eslint-disable-next-line
  const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regEx.test(email.toLowerCase()) ? undefined : '电子邮件无效';
}

export const minPasswordLength = (value) =>
  value && value.length < 8 ? '密码长度必须至少为8个字母' : undefined;

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
        NotificationManager.success(message, MSGS.SUCCESS, 3000)
        break
      case 'warning':
        NotificationManager.warning('Warning message', 'Close after 3000ms', 3000)
        break
      case 'error':
        NotificationManager.error(message, '错误!', 3000,)
        break
      default :
        break
    }
}

export const getPercent = (first, second) => {
  const percent = Math.abs((first - second) * 100 / (second|| 1))
  return percent.toFixed(2)
}

export const showTestStatus = (status) => {
  if (status === null)
    return '未通过'
  if (status === true)
    return '通过'
  return '------'
}

export const handleError = (payload) => {
  if (payload.error) return payload.error.message
  return MSGS.NETWORK_ERROR
}
