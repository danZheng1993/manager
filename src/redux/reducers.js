import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import { reducer as modal } from 'redux-modal'

import auth from './modules/auth'
import tracking from './modules/tracking'
import type from './modules/type'
import setting from './modules/setting'
import scene from './modules/scene'
import feedback from './modules/feedback'
import service from './modules/service'
import subcategory from './modules/subcategory'
import user from './modules/user'
import job from './modules/job'
import chat from './modules/chat'
import banner from './modules/banner'
import award from './modules/award'
import news from './modules/news'
import log from './modules/log'
import media from './modules/media'
import invoice from './modules/invoice'
import statistic from './modules/statistic'
import database from './modules/database'
import contract from './modules/contract'
import message from './modules/messages'
import customerSupport from './modules/customerSupport'

export default combineReducers({
  auth,
  form,
  modal,
  tracking,
  user,
  type,
  setting,
  scene,
  service,
  job,
  feedback,
  subcategory,
  chat,
  banner,
  award,
  news,
  log,
  media,
  invoice,
  contract,
  database,
  statistic,
  message,
  customerSupport,
})
