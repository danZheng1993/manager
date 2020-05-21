const Menu = [
    // {
    //     heading: 'Main Navigation',
    // },
    {
        name: '首页',
        icon: 'icon-home',
        // label: { value: 3, color: 'success' },
        submenu: [{
                name: '系统首页',
                path: 'dashboard'
            },
            {
                name: '登录日志',
                path: 'logs'
            },
            {
                name: '账户设置',
                path: 'profile'
            }
        ]
    },
    {
        name: 'VR管理',
        icon: 'icon-camera',
        path: 'medias',
    },
    {
        name: '用户管理',
        icon: 'icon-user',
        submenu: [{
                name: '服务方管理',
                path: 'providers/allowed',
            },
            {
                name: '需求方管理',
                path: 'clients',
            },
            {
                name: '红包管理',
                path: 'providers/awards'
            },
            {
                name: '合作公司添加',
                path: 'providers/partners',
            },
        ]
    },
    {
        name: '订单管理',
        icon: 'icon-list',
        path: 'jobs',
    },
    {
        name: '资讯管理',
        icon: 'icon-speech',
        submenu: [{
                name: '资讯管理',
                path: 'news',
            },
            {
                name: '发布资讯',
                path: 'news/new',
            },
        ]
    },
    {
        name: '合同管理',
        icon: 'icon-graph',
        path: 'contracts',
    },
    {
        name: '发票管理',
        icon: 'icon-note',
        submenu: [{
                name: '发票列表',
                path: 'invoices',
            },
            {
                name: '发票申请列表',
                path: 'invoices/pending',
            }
        ]
    },
    {
        name: '运营',
        icon: 'icon-bell',
        submenu: [{
                name: '通知消息',
                path: '',
            },
            {
                name: '短信消息',
                path: '',
            },
            {
                name: '活动消息',
                path: '',
            },
            {
                name: '广告列表',
                path: 'banners',
            },
            {
                name: '添加广告',
                path: 'banners/new',
            },
        ]
    },
    {
        name: '统计',
        icon: 'icon-chart',
        submenu: [{
                name: '交易统计',
                path: 'statistics/transaction',
            },
            {
                name: '搜索统计',
                path: 'statistics/search'
            },
        ]
    },
    {
        name: '财务',
        icon: 'icon-wallet',
        submenu: [{
                name: '综合统计',
                path: 'financial',
            },
            {
                name: '对账列表',
                path: 'financial/list'
            },
        ]
    },
    {
        name: '设置',
        icon: 'icon-settings',
        submenu: [{
                name: '启动页设置',
                path: 'settings'
            },
            {
                name: '基本设置',
                path: 'settings/main'
            },
            {
                name: '交易信息',
                path: 'settings/transaction'
            },
        ]
    },
    {
        name: '权限管理',
        icon: 'icon-lock',
        submenu: [{
                name: '部门管理',
                path: 'permissions',
            },
            {
                name: '成员管理',
                path: ''
            },
            {
                name: '数据库管理',
                path: 'databases'
            },
        ]
    },
];

export default Menu;
