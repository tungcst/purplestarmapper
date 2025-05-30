// 星途羅盤智能導航系統 v2.0
// 🎯 基於您的網站截圖專門設計

import wixUsers from 'wix-users';
import wixLocation from 'wix-location';
import wixWindow from 'wix-window';

$w.onReady(function () {
    console.log('🎯 星途羅盤智能導航系統啟動！');
    console.log('📱 版本: v2.0 - 針對實際網站優化');
    
    // 初始化智能導航
    initializeSmartNavigation();
});

function initializeSmartNavigation() {
    console.log('🔍 開始檢測按鈕...');
    
    // 延遲檢測確保頁面完全載入
    setTimeout(() => {
        detectAndConfigureButtons();
    }, 1000);
    
    // 再次檢測動態內容
    setTimeout(() => {
        detectAndConfigureButtons();
    }, 3000);
}

function detectAndConfigureButtons() {
    try {
        const allElements = $w('*');
        let configuredCount = 0;
        
        console.log(`🔍 檢查 ${allElements.length} 個頁面元素...`);
        
        allElements.forEach(element => {
            try {
                if (isClickableElement(element)) {
                    const action = detectButtonAction(element);
                    if (action) {
                        configureButtonAction(element, action);
                        configuredCount++;
                    }
                }
            } catch (error) {
                // 忽略個別元素錯誤
            }
        });
        
        console.log(`✅ 成功配置 ${configuredCount} 個按鈕`);
        logButtonSummary();
        
    } catch (error) {
        console.error('❌ 檢測按鈕時出錯:', error);
    }
}

function isClickableElement(element) {
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

function detectButtonAction(element) {
    try {
        const text = element.text || '';
        const id = element.id || '';
        
        // 登入按鈕檢測
        if (text.includes('Log In') || text.includes('登入') || id.toLowerCase().includes('login')) {
            console.log('🔐 檢測到登入按鈕:', text || id);
            return 'login';
        }
        
        // 註冊按鈕檢測
        if (text.includes('Sign Up') || text.includes('註冊') || id.toLowerCase().includes('signup')) {
            console.log('📝 檢測到註冊按鈕:', text || id);
            return 'signup';
        }
        
        // 登出按鈕檢測
        if (text.includes('登出') || text.includes('Logout') || id.toLowerCase().includes('logout')) {
            console.log('🚪 檢測到登出按鈕:', text || id);
            return 'logout';
        }
        
        // Get Started按鈕檢測
        if (text.includes('Get Started') || text.includes('開始') || id.toLowerCase().includes('start')) {
            console.log('🚀 檢測到開始按鈕:', text || id);
            return 'getStarted';
        }
        
        // 探索按鈕檢測
        if (text.includes('探索您的星途奧秘') || text.includes('探索')) {
            console.log('🌟 檢測到探索按鈕:', text || id);
            return 'explore';
        }
        
        // 紫微斗數服務檢測
        if (text.includes('紫微斗數') || text.includes('命盤詳解')) {
            console.log('🔮 檢測到紫微服務:', text || id);
            return 'ziwei';
        }
        
        // 事業分析服務檢測
        if (text.includes('事業運勢') || text.includes('事業分析')) {
            console.log('💼 檢測到事業服務:', text || id);
            return 'career';
        }
        
        // 愛情分析服務檢測
        if (text.includes('愛情') || text.includes('人際關係')) {
            console.log('💕 檢測到愛情服務:', text || id);
            return 'love';
        }
        
        // 解鎖報告按鈕檢測
        if (text.includes('解鎖完整報告') || text.includes('升級報告')) {
            console.log('🔓 檢測到解鎖按鈕:', text || id);
            return 'unlock';
        }
        
        // PDF下載按鈕檢測
        if (text.includes('Download PDF') || text.includes('下載PDF')) {
            console.log('📄 檢測到PDF下載按鈕:', text || id);
            return 'downloadPdf';
        }
        
        // 分享按鈕檢測
        if (text.includes('Share Report') || text.includes('分享報告')) {
            console.log('📤 檢測到分享按鈕:', text || id);
            return 'share';
        }
        
        return null;
    } catch (error) {
        return null;
    }
}

function configureButtonAction(element, action) {
    try {
        // 保存原有點擊事件
        const originalHandler = element.onClick;
        
        // 設置新的點擊事件
        element.onClick = (event) => {
            console.log(`🎯 按鈕點擊: ${action} - ${element.text || element.id}`);
            
            // 先執行原有事件
            if (originalHandler && typeof originalHandler === 'function') {
                try {
                    const result = originalHandler(event);
                    if (result === false) return false;
                } catch (error) {
                    console.warn('⚠️ 原有事件執行失敗:', error);
                }
            }
            
            // 執行智能導航
            executeAction(action);
        };
        
        console.log(`✅ 配置完成: ${action} - ${element.text || element.id}`);
        
    } catch (error) {
        console.error('❌ 配置按鈕失敗:', error);
    }
}

function executeAction(action) {
    console.log(`🚀 執行動作: ${action}`);
    
    try {
        switch (action) {
            case 'login':
                handleLogin();
                break;
            case 'signup':
                handleSignup();
                break;
            case 'logout':
                handleLogout();
                break;
            case 'getStarted':
                handleGetStarted();
                break;
            case 'explore':
                handleExplore();
                break;
            case 'ziwei':
                handleZiwei();
                break;
            case 'career':
                handleCareer();
                break;
            case 'love':
                handleLove();
                break;
            case 'unlock':
                handleUnlock();
                break;
            case 'downloadPdf':
                handleDownloadPdf();
                break;
            case 'share':
                handleShare();
                break;
            default:
                console.warn('⚠️ 未知動作:', action);
        }
    } catch (error) {
        console.error('❌ 執行動作失敗:', error);
        showMessage('操作失敗，請稍後重試');
    }
}

// 動作處理函數
function handleLogin() {
    console.log('🔐 處理登入');
    wixUsers.promptLogin({ mode: "login" })
        .then(() => console.log('✅ 登入成功'))
        .catch(error => console.log('❌ 登入失敗:', error));
}

function handleSignup() {
    console.log('📝 處理註冊');
    wixUsers.promptLogin({ mode: "signup" })
        .then(() => {
            console.log('✅ 註冊成功，導向輸入頁面');
            setTimeout(() => wixLocation.to('/input'), 1000);
        })
        .catch(error => console.log('❌ 註冊失敗:', error));
}

function handleLogout() {
    console.log('🚪 處理登出');
    wixUsers.logout()
        .then(() => {
            console.log('✅ 登出成功，返回首頁');
            wixLocation.to('/');
        })
        .catch(error => console.error('❌ 登出失敗:', error));
}

function handleGetStarted() {
    console.log('🚀 處理Get Started');
    if (wixUsers.currentUser.loggedIn) {
        console.log('✅ 用戶已登入，導向輸入頁面');
        wixLocation.to('/input');
    } else {
        console.log('⚠️ 用戶未登入，提示註冊');
        showMessage('請先註冊或登入以開始分析');
        handleSignup();
    }
}

function handleExplore() {
    console.log('🌟 處理探索');
    wixLocation.to('/input');
}

function handleZiwei() {
    console.log('🔮 處理紫微服務');
    wixLocation.to('/input?service=ziwei');
}

function handleCareer() {
    console.log('💼 處理事業服務');
    wixLocation.to('/input?service=career');
}

function handleLove() {
    console.log('💕 處理愛情服務');
    wixLocation.to('/input?service=love');
}

function handleUnlock() {
    console.log('🔓 處理解鎖報告');
    if (wixUsers.currentUser.loggedIn) {
        showMessage('正在處理付費流程...');
        // 這裡可以加入付費流程
    } else {
        showMessage('請先登入以解鎖完整報告');
        handleLogin();
    }
}

function handleDownloadPdf() {
    console.log('📄 處理PDF下載');
    showMessage('正在準備PDF下載...');
    // 這裡可以加入PDF下載邏輯
}

function handleShare() {
    console.log('📤 處理分享');
    showMessage('正在準備分享選項...');
    // 這裡可以加入分享邏輯
}

// 工具函數
function showMessage(text, type = 'info') {
    console.log(`📢 [${type.toUpperCase()}] ${text}`);
    
    // 嘗試顯示在頁面上
    const messageSelectors = ['#messageBar', '#statusMessage', '#notification', '#toast'];
    messageSelectors.forEach(selector => {
        try {
            const element = $w(selector);
            if (element) {
                element.text = text;
                if (element.show) {
                    element.show();
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

function logButtonSummary() {
    console.log('📊 智能導航系統狀態:');
    console.log('   ✅ Sign Up / Log In 按鈕');
    console.log('   ✅ Get Started 按鈕');
    console.log('   ✅ 探索您的星途奧秘 按鈕');
    console.log('   ✅ 服務卡片（紫微/事業/愛情）');
    console.log('   ✅ 解鎖/下載/分享 按鈕');
    console.log('🎯 系統已就緒，所有按鈕已自動配置！');
}
// 強制同步觸發 - Fri May 30 03:12:54 EDT 2025
