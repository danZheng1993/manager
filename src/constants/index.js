// const SITE_ADDRESS = `http://localhost:4000/`;
const SITE_ADDRESS = `http://47.105.53.235/api/`;

export const BUTTONS = {
  ADD: '添新',
  TEST: '审核',
  EDIT: '编辑',
  VIEW: '查看',
  DELETE: '删除',
  CANCEL: '取消',
  OK: 'OK',
  YES: '是',
  NO: '不',
  FILTER: '过滤',
  POST: '提交',
  CLOSE: '关',
  SAVE: '保存',
  RESTORE: '恢复',
  BACKUP: '开始备份',
  UPLOAD: '上传',
  VIEW_JOB: '查看订单',
  LOGIN: '登录',
  ACCEPT: '审核通过',
  DECLINE: '不通过',
}

export const LABEL = {
  DATE: 'DATE',
  TITLE: 'TITLE',
  ISPUBLIC: '是否公开',
  CHECK_OPTION: '审核状态',
  KEYWORD: '输入搜索',
}

export const PLACEHOLDER = {
  DATE: '选择日期...',
  IMAGE: '选择图片...',
  TITLE: '输入标题',
  CONTRACT_PERSON: '输入甲方名称、乙方名称',
}

export const cnLocale = {
  format: 'YYYY年 M月 D日',
  separator: ' - ',
  applyLabel: '确认',
  cancelLabel: '取消',
  fromLabel: '从何时起',
  toLabel: '多久',
  customRangeLabel: '自订范围',
  daysOfWeek: ['日', '一', '二', '三', '四', '五', '六'],
  monthNames: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
  firstDay: 1
};
export const RULES = {
  IMAGE: ".gif,.jpg,.jpeg,.png"
}

export const MSGS = {
  NETWORK_ERROR: '网络错误',
  REQUIRED: '这是必填栏',
  SUCCESS: '成功',
  FORMAT_MISMATCH: '输入格式无效',
}

export const CONFIRM = {
  DELETE: '您确定要删除吗',
}

export const TABLE_HEADERS = {
  INDEX: '编号',
  SNAPSHOT: '封面',
  TITLE: '标题',
  CLIENT: '需求方',
  PROVIDER: '服务方',
  CREATED: '发布时间',
  TEST_STATUS: '审核状态',
  ACTION: '操作',
  CONTRACT_TIME: '签订时间',
  CONTRACT_ONE: '甲方',
  CONTRACT_TWO: '乙方',
}

export const ADDRESS = {
    BASE_URL: SITE_ADDRESS,
    BANNER_BASE_URL: `${SITE_ADDRESS}bannersImage/`,
    NEWS_BASE_URL: `${SITE_ADDRESS}newsImage/`,
    MEDIA_BASE_URL: `${SITE_ADDRESS}mediaSource/`,
    INVOICE_BASE_URL: `${SITE_ADDRESS}invoiceImage/`,
    PROFILE_BASE_URL: `${SITE_ADDRESS}profileImage/`,
}

export const TARGET_AUDIENCE = [
  { label: 'All', value: 'all' },
  { label: 'Client', value: 'client' },
  { label: 'Provider', value: 'provider' },
]

export const CUSTOMER_TYPE = [
  { label: '服务方', value: 'client' },
  { label: '需求方', value: 'provider' },
]
