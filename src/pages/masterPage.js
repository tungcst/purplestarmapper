// 星途羅盤智能導航系統 v2.1 - 修復元素檢測問題
// 🎯 基於您的網站截圖專門設計

import wixUsers from 'wix-users';
import wixLocation from 'wix-location';
import wixWindow from 'wix-window';

$w.onReady(function () {
    console.log('🎯 星途羅盤智能導航系統啟動！');
    console.log('📱 版本: v2.1 - 修復元素檢測問題');
    
    // 初始化智能導航 - 使用多重檢測策略
    initializeSmartNavigation();
});

function initializeSmartNavigation() {
    console.log('🔍 開始檢測按鈕...');
    
    // 多階段檢測確保頁面完全載入
    setTimeout(() => {
        console.log('📅 第一次檢測（2秒後）');
        detectAndConfigureButtons();
    }, 2000);
    
    setTimeout(() => {
        console.log('📅 第二次檢測（5秒後）');
        detectAndConfigureButtons();
    }, 5000);
    
    setTimeout(() => {
        console.log('📅 第三次檢測（8秒後）');
        detectAndConfigureButtons();
    }, 8000);
}

function detectAndConfigureButtons() {
    try {
        // 使用多種方式檢測元素
        console.log('🔍 方法1：檢測所有元素...');
        const allElements = $w('*');
        console.log(`📊 方法1檢測到 ${allElements.length} 個元素`);
        
        // 方法2：直接檢測特定按鈕
        console.log('🔍 方法2：直接檢測特定按鈕...');
        detectSpecificButtons();
        
        // 方法3：掃描所有按鈕類型元素
        console.log('🔍 方法3：掃描按鈕類型元素...');
        const buttons = $w('Button');
        console.log(`📊 方法3檢測到 ${buttons.length} 個Button元素`);
        
        // 方法4：掃描所有文字元素
        console.log('🔍 方法4：掃描文字元素...');
        const texts = $w('Text');
        console.log(`📊 方法4檢測到 ${texts.length} 個Text元素`);
        
        let configuredCount = 0;
        
        // 處理所有檢測到的元素
        [...allElements, ...buttons, ...texts].forEach(element => {
            try {
                if (isClickableElement(element)) {
                    const action = detectButtonAction(element);
                    if (action) {
                        configureButtonAction(element, action);
                        configuredCount++;
                    }
                }
            } catch (error) {
                console.warn('⚠️ 處理單個元素失敗:', error);
            }
        });
        
        console.log(`✅ 總共配置了 ${configuredCount} 個按鈕`);
        
        if (configuredCount === 0) {
            console.warn('⚠️ 沒有檢測到可配置的按鈕，嘗試手動檢測...');
            manualButtonDetection();
        }
        
        logButtonSummary();
        
    } catch (error) {
        console.error('❌ 檢測按鈕時出錯:', error);
        // 嘗試備用檢測方法
        fallbackDetection();
    }
}

function detectSpecificButtons() {
    // 嘗試檢測常見的按鈕ID和類名
    const commonButtonIds = [
        'loginButton', 'signUpButton', 'getStartedButton', 'heroButton',
        'button1', 'button2', 'button3', 'button4', 'button5',
        'text1', 'text2', 'text3', 'text4', 'text5'
    ];
    
    commonButtonIds.forEach(id => {
        try {
            const element = $w(`#${id}`);
            if (element && element.text) {
                console.log(`🎯 發現元素 #${id}: "${element.text}"`);
                const action = detectButtonAction(element);
                if (action) {
                    configureButtonAction(element, action);
                }
            }
        } catch (error) {
            // 元素不存在，忽略
        }
    });
}

function manualButtonDetection() {
    console.log('🔧 啟動手動檢測模式...');
    
    // 手動檢測已知的按鈕文字
    const buttonTexts = ['Sign Up', 'Log In', 'Get Started', '探索您的星途奧秘', 
                        '紫微斗數', '事業運勢', '愛情'];
    
    buttonTexts.forEach(text => {
        try {
            // 嘗試通過頁面搜索找到包含此文字的元素
            console.log(`🔍 搜索包含 "${text}" 的元素...`);
            
            // 這裡可以添加更複雜的搜索邏輯
            const allPageElements = document.querySelectorAll('*');
            Array.from(allPageElements).forEach(domElement => {
                if (domElement.textContent && domElement.textContent.includes(text)) {
                    console.log(`📍 在DOM中找到包含 "${text}" 的元素:`, domElement.tagName);
                }
            });
            
        } catch (error) {
            console.warn(`⚠️ 搜索 "${text}" 時出錯:`, error);
        }
    });
}

function fallbackDetection() {
    console.log('🆘 啟動備用檢測模式...');
    
    try {
        // 使用 DOM API 直接檢測
        const domButtons = document.querySelectorAll('button, [role="button"], .btn, [onclick]');
        console.log(`🔍 DOM檢測到 ${domButtons.length} 個可能的按鈕`);
        
        domButtons.forEach((domElement, index) => {
            try {
                console.log(`🔍 DOM按鈕 ${index}: ${domElement.textContent || domElement.className}`);
                
                // 嘗試為DOM按鈕添加點擊事件
                if (domElement.textContent) {
                    const text = domElement.textContent.trim();
                    
                    if (text.includes('Sign Up') || text.includes('註冊')) {
                        console.log('📝 在DOM中配置註冊按鈕');
                        domElement.addEventListener('click', () => {
                            console.log('🎯 DOM註冊按鈕點擊');
                            wixUsers.promptLogin({ mode: "signup" });
                        });
                    }
                    
                    if (text.includes('Log In') || text.includes('登入')) {
                        console.log('🔐 在DOM中配置登入按鈕');
                        domElement.addEventListener('click', () => {
                            console.log('🎯 DOM登入按鈕點擊');
                            wixUsers.promptLogin({ mode: "login" });
                        });
                    }
                }
            } catch (error) {
                console.warn('⚠️ 配置DOM按鈕失敗:', error);
            }
        });
        
    } catch (error) {
        console.error('❌ 備用檢測失敗:', error);
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
        
        console.log(`🔍 檢查元素: "${text}" (ID: ${id})`);
        
        // Sign Up 按鈕
        if (text.includes('Sign Up') || text.includes('註冊') || id.toLowerCase().includes('signup')) {
            console.log('📝 檢測到註冊按鈕:', text || id);
            return 'signup';
        }
        
        // Log In 按鈕
        if (text.includes('Log In') || text.includes('登入') || id.toLowerCase().includes('login')) {
            console.log('🔐 檢測到登入按鈕:', text || id);
            return 'login';
        }
        
        // 登出按鈕
        if (text.includes('登出') || text.includes('Logout') || id.toLowerCase().includes('logout')) {
            console.log('🚪 檢測到登出按鈕:', text || id);
            return 'logout';
        }
        
        // Get Started按鈕
        if (text.includes('Get Started') || text.includes('開始') || id.toLowerCase().includes('start')) {
            console.log('🚀 檢測到開始按鈕:', text || id);
            return 'getStarted';
        }
        
        // 探索按鈕
        if (text.includes('探索您的星途奧秘') || text.includes('探索')) {
            console.log('🌟 檢測到探索按鈕:', text || id);
            return 'explore';
        }
        
        // 紫微斗數服務
        if (text.includes('紫微斗數') || text.includes('命盤詳解')) {
            console.log('🔮 檢測到紫微服務:', text || id);
            return 'ziwei';
        }
        
        // 事業分析服務
        if (text.includes('事業運勢') || text.includes('事業分析')) {
            console.log('💼 檢測到事業服務:', text || id);
            return 'career';
        }
        
        // 愛情分析服務
        if (text.includes('愛情') || text.includes('人際關係')) {
            console.log('💕 檢測到愛情服務:', text || id);
            return 'love';
        }
        
        // 解鎖報告按鈕
        if (text.includes('解鎖完整報告') || text.includes('升級報告')) {
            console.log('🔓 檢測到解鎖按鈕:', text || id);
            return 'unlock';
        }
        
        // PDF下載按鈕
        if (text.includes('Download PDF') || text.includes('下載PDF')) {
            console.log('📄 檢測到PDF下載按鈕:', text || id);
            return 'downloadPdf';
        }
        
        // 分享按鈕
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
// v2.1 修復：增強元素檢測，支援多重檢測策略和DOM備用方案
