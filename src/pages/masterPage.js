// 星途羅盤主頁面導航系統
// API Reference: https://www.wix.com/velo/reference/api-overview/introduction
// “Hello, World!” Example: https://learn-code.wix.com/en/article/hello-world

import wixUsers from 'wix-users';
import wixLocation from 'wix-location';
import wixWindow from 'wix-window';

$w.onReady(function () {
    console.log('🎯 星途羅盤主頁面初始化');
    
    // 初始化導航系統
    initializeNavigation();
    
    // 監聽用戶狀態變化
    wixUsers.onLogin((user) => {
        console.log('用戶登入:', user.id);
        updateNavigationForUser(true);
    });
    
    wixUsers.onLogout(() => {
        console.log('用戶登出');
        updateNavigationForUser(false);
    });
});

function initializeNavigation() {
    // 檢查當前用戶狀態
    const isLoggedIn = wixUsers.currentUser.loggedIn;
    console.log('當前用戶登入狀態:', isLoggedIn);
    
    // 根據用戶狀態更新導航
    updateNavigationForUser(isLoggedIn);
    
    // 設置導航按鈕事件
    setupNavigationButtons();
}

function updateNavigationForUser(isLoggedIn) {
    try {
        if (isLoggedIn) {
            // 已登入狀態 - 顯示會員相關按鈕
            const memberButton = $w('#memberButton');
            const memberAreaButton = $w('#memberAreaButton');
            const logoutButton = $w('#logoutButton');
            const loginButton = $w('#loginButton');
            const signUpButton = $w('#signUpButton');
            
            if (memberButton) memberButton.show();
            if (memberAreaButton) memberAreaButton.show();
            if (logoutButton) logoutButton.show();
            if (loginButton) loginButton.hide();
            if (signUpButton) signUpButton.hide();
            
            // 顯示用戶資訊
            const userInfoText = $w('#userInfo');
            if (userInfoText) {
                wixUsers.currentUser.getEmail()
                    .then(email => {
                        userInfoText.text = `歡迎，${email}`;
                        userInfoText.show();
                    })
                    .catch(() => {
                        userInfoText.text = '歡迎回來';
                        userInfoText.show();
                    });
            }
            
        } else {
            // 未登入狀態 - 隱藏會員相關按鈕
            const memberButton = $w('#memberButton');
            const memberAreaButton = $w('#memberAreaButton');
            const logoutButton = $w('#logoutButton');
            const loginButton = $w('#loginButton');
            const signUpButton = $w('#signUpButton');
            const userInfoText = $w('#userInfo');
            
            if (memberButton) memberButton.hide();
            if (memberAreaButton) memberAreaButton.hide();
            if (logoutButton) logoutButton.hide();
            if (loginButton) loginButton.show();
            if (signUpButton) signUpButton.show();
            if (userInfoText) userInfoText.hide();
        }
    } catch (error) {
        console.error('更新導航狀態失敗:', error);
    }
}

function setupNavigationButtons() {
    // 首頁按鈕
    const homeButton = $w('#homeButton');
    if (homeButton) {
        homeButton.onClick(() => {
            wixLocation.to('/');
        });
    }
    
    // 開始算命按鈕 (導向輸入頁面)
    const startButton = $w('#startButton');
    const chartButton = $w('#chartButton');
    if (startButton) {
        startButton.onClick(() => {
            wixLocation.to('/input');
        });
    }
    if (chartButton) {
        chartButton.onClick(() => {
            wixLocation.to('/input');
        });
    }
    
    // 登入按鈕
    const loginButton = $w('#loginButton');
    if (loginButton) {
        loginButton.onClick(() => {
            wixUsers.promptLogin({
                mode: "login"
            }).then(() => {
                console.log('用戶登入成功');
            }).catch((error) => {
                console.log('登入取消或失敗:', error);
            });
        });
    }
    
    // 註冊按鈕
    const signUpButton = $w('#signUpButton');
    if (signUpButton) {
        signUpButton.onClick(() => {
            wixUsers.promptLogin({
                mode: "signup"
            }).then(() => {
                console.log('用戶註冊成功');
                wixLocation.to('/input');
            }).catch((error) => {
                console.log('註冊取消或失敗:', error);
            });
        });
    }
    
    // 登出按鈕
    const logoutButton = $w('#logoutButton');
    if (logoutButton) {
        logoutButton.onClick(() => {
            wixUsers.logout().then(() => {
                console.log('用戶登出成功');
                wixLocation.to('/');
            });
        });
    }
    
    // 會員專區按鈕
    const memberAreaButton = $w('#memberAreaButton');
    if (memberAreaButton) {
        memberAreaButton.onClick(() => {
            if (wixUsers.currentUser.loggedIn) {
                wixLocation.to('/member-area');
            } else {
                wixUsers.promptLogin().then(() => {
                    wixLocation.to('/member-area');
                });
            }
        });
    }
    
    // 會員頁面按鈕
    const memberButton = $w('#memberButton');
    if (memberButton) {
        memberButton.onClick(() => {
            if (wixUsers.currentUser.loggedIn) {
                wixLocation.to('/member-page');
            } else {
                wixUsers.promptLogin().then(() => {
                    wixLocation.to('/member-page');
                });
            }
        });
    }
    
    // 其他頁面按鈕
    const aboutButton = $w('#aboutButton');
    if (aboutButton) {
        aboutButton.onClick(() => {
            wixLocation.to('/about');
        });
    }
    
    const contactButton = $w('#contactButton');
    if (contactButton) {
        contactButton.onClick(() => {
            wixLocation.to('/contact');
        });
    }
    
    // 設置快速服務連結
    setupQuickServiceLinks();
}

function setupQuickServiceLinks() {
    // 快速服務連結
    const quickLinks = {
        'ziwei-service': '/input?service=ziwei',
        'career-service': '/input?service=career', 
        'love-service': '/input?service=love',
        'trial-demo': '/input?demo=true'
    };
    
    Object.keys(quickLinks).forEach(buttonId => {
        const button = $w(`#${buttonId}`);
        if (button) {
            button.onClick(() => {
                wixLocation.to(quickLinks[buttonId]);
            });
        }
    });
}

// 工具函數：顯示訊息
function showMessage(text, type = 'info') {
    const messageBar = $w('#messageBar');
    if (messageBar) {
        messageBar.text = text;
        messageBar.show();
        
        setTimeout(() => {
            if (messageBar.hide) messageBar.hide();
        }, 3000);
    }
}
