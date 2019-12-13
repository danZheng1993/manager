import { all } from 'redux-saga/effects'
import auth from './auth'
import tracking from './tracking'
import user from './user'
import type from './type'
import setting from './setting'
import scene from './scene'
import feedback from './feedback'
import service from './service'
import job from './job'
import chat from './chat'
import payment from './payment'
import banner from './banner'
import news from './news'
import media from './media'
import log from './log'
import subcategory from './subcategory'
import invoice from './invoice'
import statistic from './statistic'
import database from './database'

export default function* rootSaga () {
  yield all([
    auth(),
    tracking(),
    user(),
    type(),
    setting(),
    scene(),
    service(),
    subcategory(),
    job(),
    feedback(),
    chat(),
    payment(),
    banner(),
    news(),
    log(),
    media(),
    invoice(),
    database(),
    statistic()
  ])
}
