// 星途羅盤首頁功能
// API Reference: https://www.wix.com/velo/reference/api-overview/introduction
// “Hello, World!” Example: https://learn-code.wix.com/en/article/hello-world

import wixUsers from 'wix-users';
import wixLocation from 'wix-location';
import wixWindow from 'wix-window';

$w.onReady(function () {
    console.log('🌟 星途羅盤首頁初始化');
    
    // 初始化首頁功能
    initializeHomePage();
    
    // 設置服務按鈕
    setupServiceButtons();
    
    // 設置CTA按鈕
    setupCTAButtons();
    
    // 檢查用戶狀態
    checkUserStatus();
});

function initializeHomePage() {
    // 設置歡迎訊息動畫或其他首頁特效
    animateWelcomeMessage();
    
    // 設置服務介紹
    setupServiceIntroduction();
}

function animateWelcomeMessage() {
    // 歡迎訊息的動畫效果
    const welcomeText = $w('#welcomeText');
    const heroTitle = $w('#heroTitle');
    const heroSubtitle = $w('#heroSubtitle');
    
    if (welcomeText) {
        // 漸入效果
        welcomeText.show("fade", { duration: 1000 });
    }
    
    if (heroTitle) {
        setTimeout(() => {
            heroTitle.show("slide", { direction: "left", duration: 800 });
        }, 300);
    }
    
    if (heroSubtitle) {
        setTimeout(() => {
            heroSubtitle.show("slide", { direction: "right", duration: 800 });
        }, 600);
    }
}

function setupServiceIntroduction() {
    // 服務介紹區域
    const services = [
        {
            id: 'ziweiService',
            title: '紫微斗數全面分析',
            description: '深度解析您的命運軌跡',
            action: () => wixLocation.to('/input?service=ziwei')
        },
        {
            id: 'careerService', 
            title: '事業運勢分析',
            description: '洞察職場發展機會',
            action: () => wixLocation.to('/input?service=career')
        },
        {
            id: 'loveService',
            title: '愛情關係分析', 
            description: '探索感情世界奧秘',
            action: () => wixLocation.to('/input?service=love')
        }
    ];
    
    services.forEach(service => {
        const serviceElement = $w(`#${service.id}`);
        const serviceButton = $w(`#${service.id}Button`);
        const serviceCard = $w(`#${service.id}Card`);
        
        // 設置按鈕點擊事件
        if (serviceButton) {
            serviceButton.onClick(service.action);
        }
        
        // 設置卡片點擊事件
        if (serviceCard) {
            serviceCard.onClick(service.action);
        }
        
        // 設置懸停效果
        if (serviceElement) {
            serviceElement.onMouseIn(() => {
                serviceElement.style.backgroundColor = '#f8f4ff';
            });
            
            serviceElement.onMouseOut(() => {
                serviceElement.style.backgroundColor = 'transparent';
            });
        }
    });
}

function setupServiceButtons() {
    // 主要服務按鈕
    const startAnalysisButton = $w('#startAnalysisButton');
    const getStartedButton = $w('#getStartedButton');
    const beginButton = $w('#beginButton');
    const tryNowButton = $w('#tryNowButton');
    
    // 開始分析按鈕
    if (startAnalysisButton) {
        startAnalysisButton.onClick(() => {
            wixLocation.to('/input');
        });
    }
    
    // 立即開始按鈕
    if (getStartedButton) {
        getStartedButton.onClick(() => {
            // 如果用戶已登入，直接進入輸入頁面
            if (wixUsers.currentUser.loggedIn) {
                wixLocation.to('/input');
            } else {
                // 未登入用戶，提示註冊
                showRegistrationPrompt();
            }
        });
    }
    
    // 開始測試按鈕  
    if (beginButton) {
        beginButton.onClick(() => {
            wixLocation.to('/input?demo=true');
        });
    }
    
    // 立即試用按鈕
    if (tryNowButton) {
        tryNowButton.onClick(() => {
            wixLocation.to('/input?trial=true');
        });
    }
    
    // 特定服務按鈕
    setupSpecificServiceButtons();
}

function setupSpecificServiceButtons() {
    // 紫微斗數按鈕
    const ziweiButton = $w('#ziweiButton');
    const ziweiLearnMore = $w('#ziweiLearnMore');
    
    if (ziweiButton) {
        ziweiButton.onClick(() => {
            wixLocation.to('/input?service=ziwei');
        });
    }
    
    if (ziweiLearnMore) {
        ziweiLearnMore.onClick(() => {
            // 顯示更多資訊或跳轉到詳細頁面
            wixLocation.to('/about?section=ziwei');
        });
    }
    
    // 事業運勢按鈕
    const careerButton = $w('#careerButton');
    const careerLearnMore = $w('#careerLearnMore');
    
    if (careerButton) {
        careerButton.onClick(() => {
            wixLocation.to('/input?service=career');
        });
    }
    
    if (careerLearnMore) {
        careerLearnMore.onClick(() => {
            wixLocation.to('/about?section=career');
        });
    }
    
    // 愛情分析按鈕
    const loveButton = $w('#loveButton');
    const loveLearnMore = $w('#loveLearnMore');
    
    if (loveButton) {
        loveButton.onClick(() => {
            wixLocation.to('/input?service=love');
        });
    }
    
    if (loveLearnMore) {
        loveLearnMore.onClick(() => {
            wixLocation.to('/about?section=love');
        });
    }
}

function setupCTAButtons() {
    // Call-to-Action 按鈕
    const ctaButton = $w('#ctaButton');
    const heroButton = $w('#heroButton');
    const mainCTAButton = $w('#mainCTAButton');
    
    if (ctaButton) {
        ctaButton.onClick(() => {
            wixLocation.to('/input');
        });
    }
    
    if (heroButton) {
        heroButton.onClick(() => {
            if (wixUsers.currentUser.loggedIn) {
                wixLocation.to('/input');
            } else {
                showRegistrationPrompt();
            }
        });
    }
    
    if (mainCTAButton) {
        mainCTAButton.onClick(() => {
            wixLocation.to('/input');
        });
    }
    
    // 次要CTA按鈕
    const learnMoreButton = $w('#learnMoreButton');
    const viewExampleButton = $w('#viewExampleButton');
    
    if (learnMoreButton) {
        learnMoreButton.onClick(() => {
            wixLocation.to('/about');
        });
    }
    
    if (viewExampleButton) {
        viewExampleButton.onClick(() => {
            wixLocation.to('/input?demo=true');
        });
    }
}

function checkUserStatus() {
    // 根據用戶狀態調整頁面內容
    if (wixUsers.currentUser.loggedIn) {
        // 已登入用戶
        showPersonalizedContent();
    } else {
        // 未登入用戶  
        showGuestContent();
    }
}

function showPersonalizedContent() {
    const userGreeting = $w('#userGreeting');
    const personalizedCTA = $w('#personalizedCTA');
    
    if (userGreeting) {
        wixUsers.currentUser.getEmail()
            .then(email => {
                userGreeting.text = `歡迎回來，${email.split('@')[0]}！`;
                userGreeting.show();
            })
            .catch(() => {
                userGreeting.text = '歡迎回來！';
                userGreeting.show();
            });
    }
    
    if (personalizedCTA) {
        personalizedCTA.text = '繼續您的命理探索';
        personalizedCTA.show();
    }
    
    // 檢查用戶是否有未完成的報告
    checkUserReports();
}

function showGuestContent() {
    const guestMessage = $w('#guestMessage');
    const signUpPrompt = $w('#signUpPrompt');
    
    if (guestMessage) {
        guestMessage.text = '歡迎來到星途羅盤';
        guestMessage.show();
    }
    
    if (signUpPrompt) {
        signUpPrompt.text = '註冊會員，開始您的命理之旅';
        signUpPrompt.show();
    }
}

function showRegistrationPrompt() {
    // 顯示註冊提示
    const message = '加入星途羅盤，享受專業命理分析服務！';
    
    wixWindow.openLightbox('registrationPrompt', {
        message: message,
        onSuccess: () => {
            wixLocation.to('/input');
        }
    }).catch(() => {
        // 如果沒有 lightbox，使用 prompt login
        wixUsers.promptLogin({
            mode: "signup"
        }).then(() => {
            wixLocation.to('/input');
        });
    });
}

async function checkUserReports() {
    // 檢查用戶是否有現有報告
    if (!wixUsers.currentUser.loggedIn) return;
    
    try {
        const userId = wixUsers.currentUser.id;
        
        // 這裡可以調用後端函數檢查用戶報告
        // const userReports = await wixData.query("Reports").eq("userId", userId).find();
        
        const continueReportButton = $w('#continueReportButton');
        const viewReportsButton = $w('#viewReportsButton');
        
        if (continueReportButton) {
            continueReportButton.text = '查看我的報告';
            continueReportButton.onClick(() => {
                wixLocation.to('/member-area');
            });
            continueReportButton.show();
        }
        
    } catch (error) {
        console.error('檢查用戶報告失敗:', error);
    }
}

// 工具函數：平滑滾動到指定區域
function scrollToSection(sectionId) {
    const section = $w(`#${sectionId}`);
    if (section) {
        section.scrollTo();
    }
}

// 設置頁面滾動事件
function setupScrollEvents() {
    // 滾動到服務區域
    const scrollToServicesButton = $w('#scrollToServices');
    if (scrollToServicesButton) {
        scrollToServicesButton.onClick(() => {
            scrollToSection('servicesSection');
        });
    }
    
    // 滾動到關於我們區域
    const scrollToAboutButton = $w('#scrollToAbout');
    if (scrollToAboutButton) {
        scrollToAboutButton.onClick(() => {
            scrollToSection('aboutSection');
        });
    }
}
