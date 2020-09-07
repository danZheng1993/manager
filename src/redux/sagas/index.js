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
import award from './award'
import news from './news'
import media from './media'
import log from './log'
import subcategory from './subcategory'
import invoice from './invoice'
import statistic from './statistic'
import database from './database'
import contract from './contract'
import message from './messages'
import customerSupport from './customerSupport'
import department from './department'
import staff from './staff'

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
    award(),
    news(),
    log(),
    media(),
    invoice(),
    database(),
    contract(),
    statistic(),
    message(),
    customerSupport(),
    department(),
    staff(),
  ])
}
