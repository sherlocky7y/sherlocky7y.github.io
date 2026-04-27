// 实时时间
function updateTime() {
    const now = new Date();
    const timeStr = now.toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    const el = document.getElementById('live-time');
    if (el) el.innerHTML = '⏰' + timeStr;
}

setInterval(updateTime, 1000);
updateTime(); shizhong
// 点击搜索菜单触发搜索弹窗
document.addEventListener('DOMContentLoaded', function () {
    var searchBtn = document.querySelector('a[href="javascript:void(0)"]');
    if (searchBtn) {
        searchBtn.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector('#search-button').click();
        });
    }
});