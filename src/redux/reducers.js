import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import { reducer as modal } from 'redux-modal'

import auth from './modules/auth'
import tracking from './modules/tracking'
import type from './modules/type'
import scene from './modules/scene'
import feedback from './modules/feedback'
import service from './modules/service'
import subcategory from './modules/subcategory'
import user from './modules/user'
import job from './modules/job'
import chat from './modules/chat'
import banner from './modules/banner'
import news from './modules/news'

export default combineReducers({
  auth,
  form,
  modal,
  tracking,
  user,
  type,
  scene,
  service,
  job,
  feedback,
  subcategory,
  chat,
  banner,
  news
})
