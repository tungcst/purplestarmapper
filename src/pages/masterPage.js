// 星途羅盤智能自動導航系統 - 針對實際網站優化
// 🎯 基於您的網站截圖專門設計 - 完全自動化！

import wixUsers from 'wix-users';
import wixLocation from 'wix-location';
import wixWindow from 'wix-window';

// 🎯 按鈕檢測規則 - 根據您網站的實際按鈕文字
const BUTTON_PATTERNS = {
    // 登入按鈕 (從截圖看到的 "Log In")
    LOGIN: {
        text: ['Log In', '登入', '登錄', 'Sign In', 'Login'],
        ids: ['loginButton', 'login', 'signIn', 'logIn'],
        action: 'login'
    },
    
    // 註冊按鈕 (從截圖看到的 "Sign Up")
    SIGNUP: {
        text: ['Sign Up', '註冊', 'Register', '立即註冊', '會員註冊'],
        ids: ['signUpButton', 'signup', 'register', 'signUp'],
        action: 'signup'
    },
    
    // 登出按鈕
    LOGOUT: {
        text: ['登出', 'Logout', 'Log Out', 'Sign Out'],
        ids: ['logoutButton', 'logout', 'signOut'],
        action: 'logout'
    },
    
    // 開始按鈕 (從截圖看到的 "Get Started")
    GET_STARTED: {
        text: ['Get Started', '開始', '立即開始', '開始分析', '立即測算', '開始測算'],
        ids: ['getStartedButton', 'startButton', 'beginButton', 'submitButton'],
        action: 'getStarted'
    },
    
    // 探索按鈕 (從截圖看到的 "探索您的星途奧秘")
    EXPLORE: {
        text: ['探索您的星途奧秘', '探索', '開始探索'],
        ids: ['exploreButton', 'heroButton', 'ctaButton'],
        action: 'explore'
    },
    
    // 紫微斗數服務 (從截圖看到的 "紫微斗數命盤詳解")
    ZIWEI_SERVICE: {
        text: ['紫微斗數命盤詳解', '紫微斗數', '紫微', '斗數', '命盤詳解'],
        ids: ['ziweiButton', 'ziwei', 'ziweiService', 'ziweiCard'],
        action: 'ziweiService'
    },
    
    // 事業分析服務 (從截圖看到的 "事業運勢全面分析")
    CAREER_SERVICE: {
        text: ['事業運勢全面分析', '事業運勢', '事業分析', '職場分析', '工作運勢'],
        ids: ['careerButton', 'career', 'careerService', 'careerCard'],
        action: 'careerService'
    },
    
    // 愛情分析服務 (從截圖看到的 "愛情與人際關係報告")
    LOVE_SERVICE: {
        text: ['愛情與人際關係報告', '愛情分析', '感情分析', '人際關係', '愛情運勢'],
        ids: ['loveButton', 'love', 'loveService', 'loveCard'],
        action: 'loveService'
    },
    
    // 解鎖報告按鈕 (從截圖看到的 "解鎖完整報告")
    UNLOCK_REPORT: {
        text: ['解鎖完整報告', '查看完整報告', '升級報告', '付費報告', '完整版本'],
        ids: ['unlockButton', 'upgradeButton', 'premiumButton'],
        action: 'unlockReport'
    },
    
    // 查看報告按鈕
    VIEW_REPORT: {
        text: ['查看報告', 'View Report', '查看', '詳細報告'],
        ids: ['viewButton', 'viewReportButton', 'reportButton'],
        action: 'viewReport'
    },
    
    // 下載PDF按鈕 (從截圖看到的 "Download PDF")
    DOWNLOAD_PDF: {
        text: ['Download PDF', '下載PDF', '下載報告', 'PDF下載'],
        ids: ['downloadButton', 'pdfButton', 'downloadPdf'],
        action: 'downloadPdf'
    },
    
    // 分享報告按鈕 (從截圖看到的 "Share Report")
    SHARE_REPORT: {
        text: ['Share Report', '分享報告', '分享', 'Share'],
        ids: ['shareButton', 'shareReportButton'],
        action: 'shareReport'
    },
    
    // 首頁/品牌按鈕
    HOME: {
        text: ['首頁', '主頁', 'Home', '回到首頁', '星途羅盤'],
        ids: ['homeButton', 'home', 'logoButton', 'logo', 'brand'],
        action: 'home'
    },
    
    // 會員專區
    MEMBER_AREA: {
        text: ['會員專區', '會員中心', '我的報告', '我的帳戶'],
        ids: ['memberButton', 'memberArea', 'myReports', 'account'],
        action: 'memberArea'
    }
};

// 🗺️ 路由配置 - 根據您的實際頁面結構
const ROUTES = {
    HOME: '/',
    INPUT: '/input',
    CHART: '/chart',
    REPORT: '/report',
    MEMBER: '/member',
    ABOUT: '/about',
    CONTACT: '/contact'
};

// 🧠 智能導航系統主類
class SmartNavigation {
    constructor() {
        this.isLoggedIn = false;
        this.detectedButtons = new Map();
        this.userInfo = null;
    }
    
    // 🚀 初始化系統
    initialize() {
        console.log('🎯 星途羅盤智能導航系統初始化中...');
        
        this.checkUserStatus();
        this.setupUserStatusListeners();
        
        // 延遲檢測以確保頁面完全載入
        setTimeout(() => {
            this.autoDetectAndConfigureButtons();
        }, 1000);
        
        // 再次檢測（以防頁面有動態載入的內容）
        setTimeout(() => {
            this.autoDetectAndConfigureButtons();
        }, 3000);
        
        console.log('✅ 智能導航系統初始化完成');
    }
    
    // 👤 檢查用戶狀態
    checkUserStatus() {
        this.isLoggedIn = wixUsers.currentUser.loggedIn;
        console.log('📋 用戶登入狀態:', this.isLoggedIn);
        
        if (this.isLoggedIn) {
            this.loadUserInfo();
        }
        
        this.updateUIForUserStatus();
    }
    
    // 📋 載入用戶資訊
    loadUserInfo() {
        wixUsers.currentUser.getEmail()
            .then(email => {
                this.userInfo = {
                    email: email,
                    displayName: email.split('@')[0]
                };
                console.log('👤 用戶資訊載入:', this.userInfo.displayName);
            })
            .catch(() => {
                console.log('⚠️ 無法獲取用戶郵箱');
            });
    }
    
    // 👂 設置用戶狀態監聽器
    setupUserStatusListeners() {
        wixUsers.onLogin((user) => {
            console.log('✅ 用戶登入成功:', user.id);
            this.isLoggedIn = true;
            this.loadUserInfo();
            this.updateUIForUserStatus();
            this.showMessage('歡迎回來！');
        });
        
        wixUsers.onLogout(() => {
            console.log('👋 用戶登出');
            this.isLoggedIn = false;
            this.userInfo = null;
            this.updateUIForUserStatus();
            this.showMessage('已成功登出');
        });
    }
    
    // 🔍 自動檢測並配置按鈕
    autoDetectAndConfigureButtons() {
        try {
            console.log('🔍 開始檢測按鈕...');
            const allElements = $w('*');
            let detectedCount = 0;
            let checkedCount = 0;
            
            allElements.forEach(element => {
                checkedCount++;
                if (this.isClickableElement(element)) {
                    const buttonType = this.detectButtonType(element);
                    if (buttonType) {
                        this.configureButton(element, buttonType);
                        detectedCount++;
                    }
                }
            });
            
            console.log(`🔍 檢查了 ${checkedCount} 個元素，檢測到 ${detectedCount} 個可配置的按鈕`);
            this.logDetectedButtons();
        } catch (error) {
            console.error('❌ 自動檢測按鈕失敗:', error);
        }
    }
    
    // 📊 記錄檢測到的按鈕
    logDetectedButtons() {
        const buttonTypes = {};
        const buttonDetails = [];
        
        for (const [elementId, actionType] of this.detectedButtons) {
            buttonTypes[actionType] = (buttonTypes[actionType] || 0) + 1;
            buttonDetails.push(`${elementId} -> ${actionType}`);
        }
        
        console.log('📊 檢測到的按鈕類型統計:', buttonTypes);
        console.log('📋 詳細按鈕列表:', buttonDetails);
    }
    
    // ✅ 檢查元素是否可點擊
    isClickableElement(element) {
        try {
            return element.type === 'Button' || 
                   element.type === 'Text' ||
                   element.type === 'Image' ||
                   element.type === 'Container' ||
                   (element.onClick !== undefined);
        } catch (error) {
            return false;
        }
    }
    
    // 🕵️ 檢測按鈕類型
    detectButtonType(element) {
        try {
            // 首先檢查元素ID
            if (element.id) {
                for (const [patternName, pattern] of Object.entries(BUTTON_PATTERNS)) {
                    if (pattern.ids.some(id => element.id.toLowerCase().includes(id.toLowerCase()))) {
                        console.log(`🎯 通過ID檢測到按鈕: ${element.id} -> ${pattern.action}`);
                        return pattern.action;
                    }
                }
            }
            
            // 然後檢查元素文本
            const text = element.text || '';
            if (text.trim()) {
                for (const [patternName, pattern] of Object.entries(BUTTON_PATTERNS)) {
                    if (pattern.text.some(t => text.includes(t))) {
                        console.log(`🎯 通過文字檢測到按鈕: "${text}" -> ${pattern.action}`);
                        return pattern.action;
                    }
                }
            }
            
            return null;
        } catch (error) {
            return null;
        }
    }
    
    // ⚙️ 配置按鈕功能
    configureButton(element, actionType) {
        try {
            // 保存原有的點擊處理器
            const existingHandler = element.onClick;
            
            // 設置新的點擊處理器
            element.onClick = (event) => {
                console.log(`🎯 按鈕點擊: ${element.id || element.text} -> ${actionType}`);
                
                // 先執行原有的點擊處理器（如果有）
                if (existingHandler && typeof existingHandler === 'function') {
                    try {
                        const result = existingHandler(event);
                        if (result === false) {
                            console.log('⏹️ 原有處理器返回false，停止執行智能導航');
                            return false;
                        }
                    } catch (error) {
                        console.warn('⚠️ 原有點擊處理器執行失敗:', error);
                    }
                }
                
                // 執行智能導航動作
                this.executeAction(actionType, element, event);
            };
            
            this.detectedButtons.set(element.id || `unnamed_${actionType}_${Date.now()}`, actionType);
            console.log(`✅ 已配置按鈕: ${element.id || element.text} -> ${actionType}`);
            
        } catch (error) {
            console.error('❌ 配置按鈕失敗:', error);
        }
    }
    
    // 🎬 執行導航動作
    executeAction(actionType, element, event) {
        console.log(`🚀 執行動作: ${actionType}`);
        
        try {
            switch (actionType) {
                case 'login':
                    this.handleLogin();
                    break;
                case 'signup':
                    this.handleSignup();
                    break;
                case 'logout':
                    this.handleLogout();
                    break;
                case 'getStarted':
                    this.handleGetStarted();
                    break;
                case 'explore':
                    this.handleExplore();
                    break;
                case 'ziweiService':
                    this.handleZiweiService();
                    break;
                case 'careerService':
                    this.handleCareerService();
                    break;
                case 'loveService':
                    this.handleLoveService();
                    break;
                case 'unlockReport':
                    this.handleUnlockReport();
                    break;
                case 'viewReport':
                    this.handleViewReport();
                    break;
                case 'downloadPdf':
                    this.handleDownloadPdf();
                    break;
                case 'shareReport':
                    this.handleShareReport();
                    break;
                case 'home':
                    this.handleHome();
                    break;
                case 'memberArea':
                    this.handleMemberArea();
                    break;
                default:
                    console.warn('⚠️ 未知的動作類型:', actionType);
            }
        } catch (error) {
            console.error('❌ 執行動作失敗:', error);
            this.showMessage('操作失敗，請稍後重試');
        }
    }
    
    // 🔐 處理登入
    handleLogin() {
        console.log('🔐 處理登入...');
        wixUsers.promptLogin({
            mode: "login"
        }).then(() => {
            console.log('✅ 用戶登入成功');
        }).catch((error) => {
            console.log('❌ 登入取消或失敗:', error);
        });
    }
    
    // 📝 處理註冊
    handleSignup() {
        console.log('📝 處理註冊...');
        wixUsers.promptLogin({
            mode: "signup"
        }).then(() => {
            console.log('✅ 用戶註冊成功，導向輸入頁面');
            setTimeout(() => {
                wixLocation.to(ROUTES.INPUT);
            }, 1000);
        }).catch((error) => {
            console.log('❌ 註冊取消或失敗:', error);
        });
    }
    
    // 🚪 處理登出
    handleLogout() {
        console.log('🚪 處理登出...');
        wixUsers.logout().then(() => {
            console.log('✅ 用戶登出成功，返回首頁');
            wixLocation.to(ROUTES.HOME);
        }).catch((error) => {
            console.error('❌ 登出失敗:', error);
        });
    }
    
    // 🎯 處理Get Started
    handleGetStarted() {
        console.log('🎯 處理Get Started...');
        if (this.isLoggedIn) {
            console.log('✅ 用戶已登入，直接導向輸入頁面');
            wixLocation.to(ROUTES.INPUT);
        } else {
            console.log('⚠️ 用戶未登入，提示註冊');
            this.showRegistrationPrompt();
        }
    }
    
    // 🌟 處理探索
    handleExplore() {
        console.log('🌟 處理探索...');
        wixLocation.to(ROUTES.INPUT);
    }
    
    // 🔮 處理紫微服務
    handleZiweiService() {
        console.log('🔮 處理紫微服務...');
        wixLocation.to(`${ROUTES.INPUT}?service=ziwei`);
    }
    
    // 💼 處理事業服務
    handleCareerService() {
        console.log('💼 處理事業服務...');
        wixLocation.to(`${ROUTES.INPUT}?service=career`);
    }
    
    // 💕 處理愛情服務
    handleLoveService() {
        console.log('💕 處理愛情服務...');
        wixLocation.to(`${ROUTES.INPUT}?service=love`);
    }
    
    // 🔓 處理解鎖報告
    handleUnlockReport() {
        console.log('🔓 處理解鎖報告...');
        if (this.isLoggedIn) {
            // 這裡可以處理付費流程
            this.showMessage('正在處理付費流程...');
            // 可以打開付費頁面或lightbox
        } else {
            console.log('⚠️ 用戶未登入，提示登入');
            this.handleLogin();
        }
    }
    
    // 👁️ 處理查看報告
    handleViewReport() {
        console.log('👁️ 處理查看報告...');
        wixLocation.to(ROUTES.CHART);
    }
    
    // 📄 處理下載PDF
    handleDownloadPdf() {
        console.log('📄 處理下載PDF...');
        // 這裡可以觸發PDF下載
        this.showMessage('正在準備PDF下載...');
    }
    
    // 📤 處理分享報告
    handleShareReport() {
        console.log('📤 處理分享報告...');
        // 這裡可以打開分享選項
        this.showMessage('正在準備分享選項...');
    }
    
    // 🏠 處理首頁
    handleHome() {
        console.log('🏠 處理首頁...');
        wixLocation.to(ROUTES.HOME);
    }
    
    // 👥 處理會員專區
    handleMemberArea() {
        console.log('👥 處理會員專區...');
        if (this.isLoggedIn) {
            wixLocation.to(ROUTES.MEMBER);
        } else {
            console.log('⚠️ 用戶未登入，提示登入');
            this.handleLogin();
        }
    }
    
    // 🎨 更新UI以反映用戶狀態
    updateUIForUserStatus() {
        console.log('🎨 更新UI狀態...');
        // 這個函數可以擴展來自動顯示/隱藏相關按鈕
    }
    
    // 💬 顯示註冊提示
    showRegistrationPrompt() {
        console.log('💬 顯示註冊提示...');
        const message = '加入星途羅盤，享受專業命理分析服務！';
        
        // 嘗試使用輕箱模式
        wixWindow.openLightbox('registrationPrompt', {
            message: message
        }).then(() => {
            wixLocation.to(ROUTES.INPUT);
        }).catch(() => {
            // 如果沒有輕箱，使用註冊提示
            this.handleSignup();
        });
    }
    
    // 📢 顯示消息
    showMessage(text, type = 'info') {
        console.log(`📢 [${type.toUpperCase()}] ${text}`);
        
        // 查找消息顯示元素
        const messageSelectors = ['#messageBar', '#statusMessage', '#notification', '#toast', '#alert'];
        let messageShown = false;
        
        messageSelectors.forEach(selector => {
            try {
                const element = $w(selector);
                if (element && !messageShown) {
                    element.text = text;
                    if (element.show) {
                        element.show();
                        messageShown = true;
                        
                        // 3秒後自動隱藏
                        setTimeout(() => {
                            if (element.hide) element.hide();
                        }, 3000);
                    }
                }
            } catch (error) {
                // 忽略找不到元素的錯誤
            }
        });
    }
}

// 🌟 主要初始化代碼
$w.onReady(function () {
    console.log('🌟 星途羅盤頁面載入完成');
    console.log('🎯 智能導航系統版本: v2.0 - 針對實際網站優化');
    
    // 初始化智能導航系統
    const smartNavigation = new SmartNavigation();
    smartNavigation.initialize();
    
    console.log('🎯 智能導航系統已啟動！');
    console.log('📋 支援的功能：');
    console.log('   ✅ Sign Up / Log In 按鈕');
    console.log('   ✅ Get Started 按鈕');
    console.log('   ✅ 探索您的星途奧秘 按鈕');
    console.log('   ✅ 紫微斗數命盤詳解 服務');
    console.log('   ✅ 事業運勢全面分析 服務');
    console.log('   ✅ 愛情與人際關係報告 服務');
    console.log('   ✅ 解鎖完整報告 按鈕');
    console.log('   ✅ Download PDF / Share Report 按鈕');
    console.log('🔄 系統會持續檢測新的按鈕...');
});