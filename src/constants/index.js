// const IP = "192.168.1.86"
const IP = "localhost"
const PORT = 4000
const SITE_ADDRESS = `http://${IP}:${PORT}/`

export const BUTTONS = {
    ADD: 'Add',
    TEST: 'Test',
    EDIT: 'Edit',
    VIEW: 'View',
    DELETE: 'Delete',
    CANCEL: 'Cancel',
    OK: 'OK',
    YES: 'Yes',
    NO: 'No',
    FILTER: 'Filter',
    POST: 'Post',
    CLOSE: 'Close',
    SAVE: 'Save',
    RESTORE: 'Restore',
    BACKUP: 'Backup',
    UPLOAD: 'Upload',
    VIEW_JOB: 'View Job',
    LOGIN: 'Login',
    ACCEPT: 'Accept',
    DECLINE: 'Decline',
}

export const LABEL = {
    DATE: 'Date',
    TITLE: 'Title',
    ISPUBLIC: 'Is Public',
    CHECK_OPTION: 'Check Option',
    KEYWORD: 'Keyword',
}

export const PLACEHOLDER = {
    DATE: 'Select date...',
    IMAGE: 'Select image...',
    TITLE: 'Input title',
    CONTRACT_PERSON: 'Contract Person',
}

export const cnLocale = {
    format: 'YYYY年 M月 D日',
    separator: ' - ',
    applyLabel: 'Apply',
    cancelLabel: 'Cancel',
    fromLabel: 'From',
    toLabel: 'To',
    customRangeLabel: 'Custom Range',
    daysOfWeek: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    monthNames: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    firstDay: 1
};
export const RULES = {
    IMAGE: ".gif,.jpg,.jpeg,.png"
}

export const MSGS = {
    NETWORK_ERROR: 'NETWORK ERROR',
    REQUIRED: 'THIS FEILD IS REQUIRED',
    SUCCESS: 'SUCCESS',
}

export const CONFIRM = {
    DELETE: 'ARE YOU SURE TO DELETE?',
}

export const TABLE_HEADERS = {
    INDEX: 'Index',
    SNAPSHOT: 'Snapshot',
    TITLE: 'Title',
    CLIENT: 'Client',
    PROVIDER: 'Provider',
    CREATED: 'Created',
    TEST_STATUS: 'Test Status',
    ACTION: 'Action',
    CONTRACT_TIME: 'Contract Time',
    CONTRACT_ONE: 'Contract One',
    CONTRACT_TWO: 'Contract Two',
}

export const ADDRESS = {
    BASE_URL: SITE_ADDRESS,
    BANNER_BASE_URL: `${SITE_ADDRESS}/bannersImage/`,
    NEWS_BASE_URL: `${SITE_ADDRESS}/newsImage/`,
    MEDIA_BASE_URL: `${SITE_ADDRESS}/mediaSource/`,
    INVOICE_BASE_URL: `${SITE_ADDRESS}/invoiceImage/`,
}