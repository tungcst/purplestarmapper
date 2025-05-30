// 星途羅盤導航配置文件
// 統一管理所有頁面的路由和導航連結

export const ROUTES = {
    // 主要頁面
    HOME: '/',
    INPUT: '/input',
    CHART: '/chart',
    
    // 會員相關
    MEMBER_AREA: '/member-area',
    MEMBER_PAGE: '/member-page',
    LOGIN: '/login',
    SIGNUP: '/signup',
    
    // 其他頁面
    ABOUT: '/about',
    CONTACT: '/contact',
    PRIVACY: '/privacy',
    TERMS: '/terms',
    
    // 服務頁面
    SERVICES: '/services',
    PRICING: '/pricing',
    
    // 特殊路由
    CHECKOUT: '/checkout',
    THANK_YOU: '/thank-you'
};

// 按鈕ID和對應的導航配置
export const NAVIGATION_CONFIG = {
    // 主導航按鈕
    homeButton: ROUTES.HOME,
    startButton: ROUTES.INPUT,
    chartButton: ROUTES.INPUT,
    memberAreaButton: ROUTES.MEMBER_AREA,
    memberButton: ROUTES.MEMBER_PAGE,
    aboutButton: ROUTES.ABOUT,
    contactButton: ROUTES.CONTACT,
    
    // 服務相關按鈕
    'ziwei-service': `${ROUTES.INPUT}?service=ziwei`,
    'career-service': `${ROUTES.INPUT}?service=career`,
    'love-service': `${ROUTES.INPUT}?service=love`,
    'trial-demo': `${ROUTES.INPUT}?demo=true`,
    
    // CTA按鈕
    getStartedButton: ROUTES.INPUT,
    beginButton: `${ROUTES.INPUT}?demo=true`,
    tryNowButton: `${ROUTES.INPUT}?trial=true`,
    startAnalysisButton: ROUTES.INPUT,
    ctaButton: ROUTES.INPUT,
    heroButton: ROUTES.INPUT,
    mainCTAButton: ROUTES.INPUT,
    
    // 學習和資訊按鈕
    learnMoreButton: ROUTES.ABOUT,
    viewExampleButton: `${ROUTES.INPUT}?demo=true`,
    ziweiLearnMore: `${ROUTES.ABOUT}?section=ziwei`,
    careerLearnMore: `${ROUTES.ABOUT}?section=career`,
    loveLearnMore: `${ROUTES.ABOUT}?section=love`,
    
    // 會員相關按鈕
    newReportButton: ROUTES.INPUT,
    createFirstReportButton: ROUTES.INPUT,
    goToMemberAreaButton: ROUTES.MEMBER_AREA,
    continueReportButton: ROUTES.MEMBER_AREA,
    viewReportsButton: ROUTES.MEMBER_AREA,
    
    // 導航按鈕
    memberHomeButton: ROUTES.HOME,
    memberInputButton: ROUTES.INPUT,
    memberAboutButton: ROUTES.ABOUT
};

// 需要登入才能訪問的頁面
export const PROTECTED_ROUTES = [
    ROUTES.MEMBER_AREA,
    ROUTES.MEMBER_PAGE,
    ROUTES.CHART
];

// 頁面標題配置
export const PAGE_TITLES = {
    [ROUTES.HOME]: '星途羅盤 - 專業命理分析平台',
    [ROUTES.INPUT]: '生辰資料輸入 - 星途羅盤',
    [ROUTES.CHART]: '命理報告 - 星途羅盤',
    [ROUTES.MEMBER_AREA]: '會員專區 - 星途羅盤',
    [ROUTES.MEMBER_PAGE]: '個人中心 - 星途羅盤',
    [ROUTES.ABOUT]: '關於我們 - 星途羅盤',
    [ROUTES.CONTACT]: '聯絡我們 - 星途羅盤'
};

// 服務配置
export const SERVICES = {
    ZIWEI: {
        id: 'ziwei',
        name: '紫微斗數全面分析',
        description: '深度解析您的命運軌跡，揭示人生各個層面的發展潛力',
        price: 'NT$ 299',
        route: `${ROUTES.INPUT}?service=ziwei`
    },
    CAREER: {
        id: 'career',
        name: '事業運勢分析',
        description: '專業分析您的職場發展方向和事業運勢',
        price: 'NT$ 199',
        route: `${ROUTES.INPUT}?service=career`
    },
    LOVE: {
        id: 'love',
        name: '愛情關係分析',
        description: '深入了解您的感情運勢和人際關係',
        price: 'NT$ 199',
        route: `${ROUTES.INPUT}?service=love`
    }
};

// 導航工具函數
export function getServiceName(serviceId) {
    const service = Object.values(SERVICES).find(s => s.id === serviceId);
    return service ? service.name : '命理分析報告';
}

export function getServiceDescription(serviceId) {
    const service = Object.values(SERVICES).find(s => s.id === serviceId);
    return service ? service.description : '';
}

export function getServicePrice(serviceId) {
    const service = Object.values(SERVICES).find(s => s.id === serviceId);
    return service ? service.price : '';
}

export function isProtectedRoute(route) {
    return PROTECTED_ROUTES.includes(route);
}

export function getPageTitle(route) {
    return PAGE_TITLES[route] || '星途羅盤';
}

// 導航助手函數
export function navigateWithAuth(wixUsers, wixLocation, targetRoute, requireAuth = false) {
    if (requireAuth && !wixUsers.currentUser.loggedIn) {
        // 需要登入但用戶未登入
        return wixUsers.promptLogin().then(() => {
            wixLocation.to(targetRoute);
        }).catch((error) => {
            console.log('登入取消或失敗:', error);
        });
    } else {
        // 直接導航
        wixLocation.to(targetRoute);
    }
}

// 快速設置導航的函數
export function setupQuickNavigation(wixUsers, wixLocation) {
    Object.keys(NAVIGATION_CONFIG).forEach(buttonId => {
        const button = $w(`#${buttonId}`);
        if (button) {
            const targetRoute = NAVIGATION_CONFIG[buttonId];
            const requireAuth = isProtectedRoute(targetRoute);
            
            button.onClick(() => {
                navigateWithAuth(wixUsers, wixLocation, targetRoute, requireAuth);
            });
        }
    });
}

// 用戶狀態管理
export const USER_ELEMENTS = {
    // 登入狀態顯示的元素
    LOGGED_IN: [
        'memberButton',
        'memberAreaButton', 
        'logoutButton',
        'userInfo'
    ],
    // 未登入狀態顯示的元素
    LOGGED_OUT: [
        'loginButton',
        'signUpButton'
    ]
};

export function updateUserInterface(isLoggedIn) {
    try {
        if (isLoggedIn) {
            // 顯示已登入元素
            USER_ELEMENTS.LOGGED_IN.forEach(elementId => {
                const element = $w(`#${elementId}`);
                if (element && element.show) element.show();
            });
            
            // 隱藏未登入元素
            USER_ELEMENTS.LOGGED_OUT.forEach(elementId => {
                const element = $w(`#${elementId}`);
                if (element && element.hide) element.hide();
            });
            
        } else {
            // 隱藏已登入元素
            USER_ELEMENTS.LOGGED_IN.forEach(elementId => {
                const element = $w(`#${elementId}`);
                if (element && element.hide) element.hide();
            });
            
            // 顯示未登入元素
            USER_ELEMENTS.LOGGED_OUT.forEach(elementId => {
                const element = $w(`#${elementId}`);
                if (element && element.show) element.show();
            });
        }
    } catch (error) {
        console.error('更新用戶界面失敗:', error);
    }
} 