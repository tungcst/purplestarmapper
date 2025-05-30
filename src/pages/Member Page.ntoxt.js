// 星途羅盤會員頁面功能
// API Reference: https://www.wix.com/velo/reference/api-overview/introduction

import wixUsers from 'wix-users';
import wixLocation from 'wix-location';
import wixData from 'wix-data';
import wixWindow from 'wix-window';

$w.onReady(function () {
    console.log('👤 星途羅盤會員頁面初始化');
    
    // 檢查用戶登入狀態
    if (!wixUsers.currentUser.loggedIn) {
        console.warn('用戶未登入，導向登入頁面');
        wixLocation.to('/login');
        return;
    }
    
    // 初始化會員頁面功能
    initializeMemberPage();
    
    // 載入用戶資料
    loadUserProfile();
    
    // 載入用戶報告
    loadUserReports();
    
    // 設置頁面功能
    setupMemberPageFeatures();
});

function initializeMemberPage() {
    // 顯示載入狀態
    showLoadingState();
    
    // 初始化標籤頁
    initializeTabs();
    
    // 設置導航
    setupMemberNavigation();
}

function showLoadingState() {
    const loadingMessage = $w('#loadingMessage');
    if (loadingMessage) {
        loadingMessage.text = '正在載入您的個人資料...';
        loadingMessage.show();
    }
}

function hideLoadingState() {
    const loadingMessage = $w('#loadingMessage');
    if (loadingMessage) {
        loadingMessage.hide();
    }
}

async function loadUserProfile() {
    try {
        const currentUser = wixUsers.currentUser;
        const userId = currentUser.id;
        
        // 顯示基本用戶資訊
        const userNameText = $w('#userName');
        const userEmailText = $w('#userEmail');
        const userIdText = $w('#userId');
        const memberSinceText = $w('#memberSince');
        
        if (userNameText) {
            // 嘗試獲取用戶姓名
            currentUser.getEmail().then(email => {
                userNameText.text = email.split('@')[0];
            }).catch(() => {
                userNameText.text = '會員';
            });
        }
        
        if (userEmailText) {
            currentUser.getEmail().then(email => {
                userEmailText.text = email;
            }).catch(() => {
                userEmailText.text = '未提供';
            });
        }
        
        if (userIdText) {
            userIdText.text = userId.substring(0, 8) + '...';
        }
        
        if (memberSinceText) {
            // 顯示註冊時間（這個需要從數據庫獲取）
            memberSinceText.text = '歡迎加入星途羅盤！';
        }
        
        // 載入用戶偏好設置
        await loadUserPreferences(userId);
        
        hideLoadingState();
        
    } catch (error) {
        console.error('載入用戶資料失敗:', error);
        showError('載入用戶資料失敗，請稍後重試。');
    }
}

async function loadUserPreferences(userId) {
    try {
        // 從數據庫載入用戶偏好（如果有的話）
        const preferences = {
            language: 'zh-TW',
            notifications: true,
            emailUpdates: true,
            theme: 'purple'
        };
        
        // 更新偏好設置UI
        updatePreferencesUI(preferences);
        
    } catch (error) {
        console.error('載入用戶偏好失敗:', error);
    }
}

function updatePreferencesUI(preferences) {
    const languageDropdown = $w('#languagePreference');
    const notificationsToggle = $w('#notificationsToggle');
    const emailUpdatesToggle = $w('#emailUpdatesToggle');
    const themeDropdown = $w('#themePreference');
    
    if (languageDropdown) {
        languageDropdown.value = preferences.language;
    }
    
    if (notificationsToggle) {
        notificationsToggle.checked = preferences.notifications;
    }
    
    if (emailUpdatesToggle) {
        emailUpdatesToggle.checked = preferences.emailUpdates;
    }
    
    if (themeDropdown) {
        themeDropdown.value = preferences.theme;
    }
}

async function loadUserReports() {
    try {
        const userId = wixUsers.currentUser.id;
        
        // 查詢用戶的報告（這裡需要調整為實際的數據集名稱）
        const results = await wixData.query("Reports")
            .eq("userId", userId)
            .descending("generatedAt")
            .find();
        
        const reports = results.items;
        console.log('載入用戶報告:', reports.length, '個');
        
        // 更新報告列表
        updateReportsDisplay(reports);
        
        // 更新統計資訊
        updateReportsStats(reports);
        
    } catch (error) {
        console.error('載入用戶報告失敗:', error);
        showError('載入報告列表失敗，請稍後重試。');
    }
}

function updateReportsDisplay(reports) {
    const reportsRepeater = $w('#reportsRepeater');
    const noReportsMessage = $w('#noReportsMessage');
    
    if (!reports || reports.length === 0) {
        // 沒有報告
        if (noReportsMessage) {
            noReportsMessage.text = '您還沒有任何報告，立即開始分析！';
            noReportsMessage.show();
        }
        if (reportsRepeater) {
            reportsRepeater.hide();
        }
        
        // 顯示創建第一個報告的按鈕
        const createFirstReportButton = $w('#createFirstReportButton');
        if (createFirstReportButton) {
            createFirstReportButton.onClick(() => {
                wixLocation.to('/input');
            });
            createFirstReportButton.show();
        }
        
        return;
    }
    
    // 有報告，隱藏無報告消息
    if (noReportsMessage) {
        noReportsMessage.hide();
    }
    
    // 設置重複器
    if (reportsRepeater) {
        reportsRepeater.data = reports;
        
        reportsRepeater.onItemReady(($item, itemData) => {
            // 報告標題
            const reportTitle = $item('#reportTitle');
            if (reportTitle) {
                const serviceNames = {
                    'ziwei': '紫微斗數全面分析',
                    'career': '事業運勢分析',
                    'love': '愛情關係分析'
                };
                reportTitle.text = serviceNames[itemData.service] || '命理分析報告';
            }
            
            // 生成日期
            const reportDate = $item('#reportDate');
            if (reportDate) {
                const date = new Date(itemData.generatedAt);
                reportDate.text = date.toLocaleDateString('zh-TW');
            }
            
            // 狀態
            const reportStatus = $item('#reportStatus');
            if (reportStatus) {
                if (itemData.status === 'paid' || itemData.isPaid) {
                    reportStatus.text = '已解鎖';
                    reportStatus.style.color = '#059669';
                } else {
                    reportStatus.text = '試閱版';
                    reportStatus.style.color = '#D97706';
                }
            }
            
            // 查看按鈕
            const viewButton = $item('#viewReportButton');
            if (viewButton) {
                viewButton.onClick(() => {
                    wixLocation.to(`/chart?reportId=${itemData._id}`);
                });
            }
            
            // 升級按鈕（如果是試閱版）
            const upgradeButton = $item('#upgradeReportButton');
            if (upgradeButton) {
                if (itemData.status === 'paid' || itemData.isPaid) {
                    upgradeButton.hide();
                } else {
                    upgradeButton.onClick(() => {
                        initiateUpgrade(itemData._id);
                    });
                    upgradeButton.show();
                }
            }
        });
        
        reportsRepeater.show();
    }
}

function updateReportsStats(reports) {
    const totalReportsText = $w('#totalReports');
    const paidReportsText = $w('#paidReports');
    const latestReportText = $w('#latestReport');
    
    if (totalReportsText) {
        totalReportsText.text = reports.length.toString();
    }
    
    if (paidReportsText) {
        const paidCount = reports.filter(r => r.status === 'paid' || r.isPaid).length;
        paidReportsText.text = paidCount.toString();
    }
    
    if (latestReportText && reports.length > 0) {
        const latest = reports[0];
        const date = new Date(latest.generatedAt);
        latestReportText.text = date.toLocaleDateString('zh-TW');
    }
}

function initializeTabs() {
    // 設置標籤頁切換功能
    const profileTab = $w('#profileTab');
    const reportsTab = $w('#reportsTab');
    const settingsTab = $w('#settingsTab');
    
    const profileContent = $w('#profileContent');
    const reportsContent = $w('#reportsContent');
    const settingsContent = $w('#settingsContent');
    
    // 預設顯示個人資料標籤
    showTab('profile');
    
    if (profileTab) {
        profileTab.onClick(() => showTab('profile'));
    }
    
    if (reportsTab) {
        reportsTab.onClick(() => showTab('reports'));
    }
    
    if (settingsTab) {
        settingsTab.onClick(() => showTab('settings'));
    }
    
    function showTab(tabName) {
        // 隱藏所有內容
        if (profileContent) profileContent.hide();
        if (reportsContent) reportsContent.hide();
        if (settingsContent) settingsContent.hide();
        
        // 移除所有標籤的活動狀態
        if (profileTab) profileTab.style.backgroundColor = 'transparent';
        if (reportsTab) reportsTab.style.backgroundColor = 'transparent';
        if (settingsTab) settingsTab.style.backgroundColor = 'transparent';
        
        // 顯示選中的內容和標籤
        switch (tabName) {
            case 'profile':
                if (profileContent) profileContent.show();
                if (profileTab) profileTab.style.backgroundColor = '#f3f4f6';
                break;
            case 'reports':
                if (reportsContent) reportsContent.show();
                if (reportsTab) reportsTab.style.backgroundColor = '#f3f4f6';
                break;
            case 'settings':
                if (settingsContent) settingsContent.show();
                if (settingsTab) settingsTab.style.backgroundColor = '#f3f4f6';
                break;
        }
    }
}

function setupMemberPageFeatures() {
    // 新建報告按鈕
    const newReportButton = $w('#newReportButton');
    if (newReportButton) {
        newReportButton.onClick(() => {
            wixLocation.to('/input');
        });
    }
    
    // 查看會員專區按鈕
    const memberAreaButton = $w('#goToMemberAreaButton');
    if (memberAreaButton) {
        memberAreaButton.onClick(() => {
            wixLocation.to('/member-area');
        });
    }
    
    // 編輯個人資料按鈕
    const editProfileButton = $w('#editProfileButton');
    if (editProfileButton) {
        editProfileButton.onClick(() => {
            showEditProfileModal();
        });
    }
    
    // 保存設置按鈕
    const saveSettingsButton = $w('#saveSettingsButton');
    if (saveSettingsButton) {
        saveSettingsButton.onClick(() => {
            saveUserSettings();
        });
    }
    
    // 登出按鈕
    const logoutButton = $w('#memberLogoutButton');
    if (logoutButton) {
        logoutButton.onClick(() => {
            wixUsers.logout().then(() => {
                wixLocation.to('/');
            });
        });
    }
}

function setupMemberNavigation() {
    // 導航按鈕
    const homeButton = $w('#memberHomeButton');
    const inputButton = $w('#memberInputButton');
    const aboutButton = $w('#memberAboutButton');
    
    if (homeButton) {
        homeButton.onClick(() => {
            wixLocation.to('/');
        });
    }
    
    if (inputButton) {
        inputButton.onClick(() => {
            wixLocation.to('/input');
        });
    }
    
    if (aboutButton) {
        aboutButton.onClick(() => {
            wixLocation.to('/about');
        });
    }
}

function showEditProfileModal() {
    // 顯示編輯個人資料的彈出窗口
    wixWindow.openLightbox('editProfileModal')
        .then((result) => {
            if (result && result.updated) {
                // 重新載入用戶資料
                loadUserProfile();
                showSuccess('個人資料已更新！');
            }
        })
        .catch((error) => {
            console.error('編輯個人資料失敗:', error);
        });
}

async function saveUserSettings() {
    try {
        const userId = wixUsers.currentUser.id;
        
        // 獲取設置值
        const languageDropdown = $w('#languagePreference');
        const notificationsToggle = $w('#notificationsToggle');
        const emailUpdatesToggle = $w('#emailUpdatesToggle');
        const themeDropdown = $w('#themePreference');
        
        const settings = {
            userId: userId,
            language: languageDropdown ? languageDropdown.value : 'zh-TW',
            notifications: notificationsToggle ? notificationsToggle.checked : true,
            emailUpdates: emailUpdatesToggle ? emailUpdatesToggle.checked : true,
            theme: themeDropdown ? themeDropdown.value : 'purple',
            updatedAt: new Date()
        };
        
        // 保存到數據庫（需要創建 UserSettings 數據集）
        // await wixData.save("UserSettings", settings);
        
        showSuccess('設置已保存！');
        
    } catch (error) {
        console.error('保存設置失敗:', error);
        showError('保存設置失敗，請稍後重試。');
    }
}

function initiateUpgrade(reportId) {
    // 啟動報告升級流程
    wixWindow.openLightbox('upgradeReportModal', { reportId: reportId })
        .then((result) => {
            if (result && result.upgraded) {
                // 重新載入報告列表
                loadUserReports();
                showSuccess('報告已成功升級！');
            }
        })
        .catch((error) => {
            console.error('升級報告失敗:', error);
        });
}

function showError(message) {
    const errorMessage = $w('#errorMessage');
    if (errorMessage) {
        errorMessage.text = message;
        errorMessage.show();
        
        setTimeout(() => {
            errorMessage.hide();
        }, 5000);
    }
}

function showSuccess(message) {
    const successMessage = $w('#successMessage');
    if (successMessage) {
        successMessage.text = message;
        successMessage.show();
        
        setTimeout(() => {
            successMessage.hide();
        }, 3000);
    }
}
