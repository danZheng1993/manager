import { get } from 'lodash'

export const authStateSelector = (state) =>
  get(state, 'auth')
  
export const verifyStateSelector = (state) =>
  get(state, 'auth.verified')

export const authloadingSelector = (state) =>
  get(state, 'auth.loading', false)

export const profileSelector = (state) =>
  get(state, 'auth.me', null)

export const unreadMessagesSelector = (state) =>
  get(state, 'auth.unread', {})

export const notificationsSelector = (state) =>
  get(state, 'auth.notification', [])

export const contactsSelector = (state) =>
  get(state, 'auth.contacts', null)

export const userDetailSelector = (state) =>
  get(state, 'user.user', {})

export const usersListSelector = (state) =>
  get(state, 'user.users', [])

export const usersSearchResultSelector = (state) =>
  get(state, 'user.searchResult', [])
  
export const recordDetailSelector = (state) =>
  get(state, 'tracking.record', {})

export const recordsListSelector = (state) =>
  get(state, 'tracking.records', [])

export const trackingStateSelector = (state) =>
  get(state, 'tracking', {})

export const jobDetailSelector = (state) =>
  get(state, 'job.job', {})

export const jobsListSelector = (state) =>
  get(state, 'job.jobs', [])

export const jobsloadingSelector = (state) =>
  get(state, 'job.loading', false)

export const jobStateSelector = (state) =>
  get(state, 'job', {})

export const jobsSearchResultSelector = (state) =>
  get(state, 'job.searchResult', [])

export const jobsFeedbackSelector = (state) =>
  get(state, 'job.feedbacks', [])

export const typeDetailSelector = (state) =>
  get(state, 'type.type', {})

export const typesListSelector = (state) =>
  get(state, 'type.types', [])

export const typesloadingSelector = (state) =>
  get(state, 'type.loading', false)

export const typeStateSelector = (state) =>
  get(state, 'type', {})

export const settingsListSelector = (state) =>
  get(state, 'setting.settings', [])

export const settingsloadingSelector = (state) =>
  get(state, 'setting.loading', false)

export const sceneDetailSelector = (state) =>
  get(state, 'scene.scene', {})

export const scenesListSelector = (state) =>
  get(state, 'scene.scenes', [])

export const scenesloadingSelector = (state) =>
  get(state, 'scene.loading', false)

export const sceneStateSelector = (state) =>
  get(state, 'scene', {})

export const logDetailSelector = (state) =>
  get(state, 'log.log', {})

export const logsListSelector = (state) =>
  get(state, 'log.logs', [])

export const logsloadingSelector = (state) =>
  get(state, 'log.loading', false)

export const logStateSelector = (state) =>
  get(state, 'log', {})
export const invoiceDetailSelector = (state) =>
  get(state, 'invoice.invoice', {})

export const invoicesListSelector = (state) =>
  get(state, 'invoice.invoices', [])

export const invoicesloadingSelector = (state) =>
  get(state, 'invoice.loading', false)

export const invoiceStateSelector = (state) =>
  get(state, 'invoice', {})

export const mediaDetailSelector = (state) =>
  get(state, 'media.media', {})

export const mediasListSelector = (state) =>
  get(state, 'media.medias', [])

export const mediasSearchResultSelector = (state) =>
  get(state, 'media.searchResult', [])

export const mediasloadingSelector = (state) =>
  get(state, 'media.loading', false)

export const mediaStateSelector = (state) =>
  get(state, 'media', {})

export const feedbackDetailSelector = (state) =>
  get(state, 'feedback.feedback', {})

export const feedbacksListSelector = (state) =>
  get(state, 'feedback.feedbacks', [])

export const feedbacksloadingSelector = (state) =>
  get(state, 'feedback.loading', false)

export const feedbackStateSelector = (state) =>
  get(state, 'feedback', {})

export const serviceDetailSelector = (state) =>
  get(state, 'service.service', {})

export const servicesListSelector = (state) =>
  get(state, 'service.services', [])

export const servicesloadingSelector = (state) =>
  get(state, 'service.loading', false)

export const serviceStateSelector = (state) =>
  get(state, 'service', {})

export const chatDetailSelector = (state) =>
  get(state, 'chat.chat', {})

export const chatsListSelector = (state) =>
  get(state, 'chat.chats', [])

export const chatsloadingSelector = (state) =>
  get(state, 'chat.loading', false)

export const chatStateSelector = (state) =>
  get(state, 'chat', {})

export const newsDetailSelector = (state) =>
  get(state, 'news.news', {})

export const newssListSelector = (state) =>
  get(state, 'news.newss', [])

export const newssloadingSelector = (state) =>
  get(state, 'news.loading', false)

export const newsStateSelector = (state) =>
  get(state, 'news', {})

export const newsSearchResultSelector = (state) =>
  get(state, 'news.searchResult', [])

export const messageDetailSelector = (state) =>
  get(state, 'message.message', {})

export const messagesListSelector = (state) =>
  get(state, 'message.messages', [])

export const messagesloadingSelector = (state) =>
  get(state, 'messages.loading', false)

export const messageStateSelector = (state) =>
  get(state, 'message', {})

export const messageSearchResultSelector = (state) =>
  get(state, 'message.searchResult', [])

export const bannerDetailSelector = (state) =>
  get(state, 'banner.banner', {})

export const bannersListSelector = (state) =>
  get(state, 'banner.banners', [])

export const bannersloadingSelector = (state) =>
  get(state, 'banner.loading', false)

export const bannerStateSelector = (state) =>
  get(state, 'banner', {})

export const contractDetailSelector = (state) =>
  get(state, 'contract.contract', {})

export const contractsListSelector = (state) =>
  get(state, 'contract.contracts', [])

export const contractsloadingSelector = (state) =>
  get(state, 'contract.loading', false)

export const contractStateSelector = (state) =>
  get(state, 'contract', {})

export const databasesListSelector = (state) =>
  get(state, 'database.databases', [])

export const databasesloadingSelector = (state) =>
  get(state, 'database.loading', false)

export const databaseStateSelector = (state) =>
  get(state, 'database', {})

export const subcategoryDetailSelector = (state) =>
  get(state, 'subcategory.subcategory', {})

export const subcategorysListSelector = (state) =>
  get(state, 'subcategory.subcategorys', [])

export const subcategorysloadingSelector = (state) =>
  get(state, 'subcategory.loading', false)

export const subcategoryStateSelector = (state) =>
  get(state, 'subcategory', {})

export const userStateSelector = (state) =>
  get(state, 'user', {})

export const reportSelector = (state) =>
  get(state, 'user.report', {})

export const recordsParamsSelector = (state) =>
  get(state, 'tracking.params', {})

export const usersParamsSelector = (state) =>
  get(state, 'user.params', {})
  
export const logsParamsSelector = (state) =>
  get(state, 'log.params', {})
  
export const mediasParamsSelector = (state) =>
  get(state, 'media.params', {})

export const newssParamsSelector = (state) =>
  get(state, 'news.params', {})
  
export const jobsParamsSelector = (state) =>
  get(state, 'job.params', {})

export const invoicesParamsSelector = (state) =>
  get(state, 'invoice.params', {})

export const bannersParamsSelector = (state) =>
  get(state, 'banner.params', {})

export const databasesParamsSelector = (state) =>
  get(state, 'database.params', {})
  
export const contractsParamsSelector = (state) =>
  get(state, 'contract.params', {})
  
export const myInvoiceSelector = (state) =>
  get(state, 'invoice.myInvoice', false)
  
export const myJobsSelector = (state) =>
  get(state, 'job.myJobs', false)
  
export const mediaStatusSelector = (state) =>
  get(state, 'media.status', false)
  
export const mediaErrorSelector = (state) =>
  get(state, 'media.error', false)
  
export const usersloadingSelector = (state) =>
  get(state, 'user.loading', false)
  
export const statisticsloadingSelector = (state) =>
  get(state, 'statistic.loading', false)
  
export const dashboardTransactionSelector = (state) =>
  get(state, 'statistic.dashboardTransaction', false)
  
export const createdUsersSelector = (state) =>
  get(state, 'statistic.createdUsers', false)

export const jobStatisticSelector = (state) =>
  get(state, 'statistic.jobStatistics', false)

export const jobCompareSelector = (state) =>
  get(state, 'statistic.jobsCompare', false)

export const transactionCompareSelector = (state) =>
  get(state, 'statistic.transactionsCompare', false)

export const transactionStatisticSelector = (state) =>
  get(state, 'statistic.transactionStatistics', false)
