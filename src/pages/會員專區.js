import wixUsers from 'wix-users';
import wixData from 'wix-data';
import wixLocation from 'wix-location';

$w.onReady(function () {
    console.log("會員專區 Velo 初始化");

    // 檢查會員登錄
    if (!wixUsers.currentUser.loggedIn) {
        console.warn("用戶未登錄，導向登錄頁面");
        wixLocation.to('/sign-in');
        return;
    }

    const userId = wixUsers.currentUser.id;

    // 載入報告列表
    $w("#reportsRepeater").onItemReady(($item, itemData) => {
        $item("#reportTitle").text = itemData.service === 'ziwei' ? '紫微斗數報告' :
                                    itemData.service === 'career' ? '事業運勢報告' :
                                    '愛情運勢報告';
        $item("#reportDate").text = new Date(itemData.generatedAt).toLocaleDateString();
        $item("#status").text = itemData.isPaid ? '已解鎖' : '試閱';
        $item("#viewButton").onClick(() => {
            wixLocation.to(`/chart?reportId=${itemData._id}`);
        });
    });

    wixData.query("Reports")
        .eq("userId", userId)
        .find()
        .then(results => {
            console.log("載入報告列表:", results.items);
            $w("#reportsRepeater").data = results.items;
        })
        .catch(err => {
            console.error("載入報告列表失敗:", err);
            $w("#errorMessage").text = "無法載入報告列表，請稍後重試";
            $w("#errorMessage").show();
        });
});
