// ==================== 首页脚本 ====================
// 功能概述：
// 1. 悬停某一地标时，隐藏其他地标，突出当前元素。
// 2. 根据鼠标移动位置更新聚光灯遮罩位置，提升地图交互感。
// --------------------------------------------------

// 等待DOM内容完全加载后执行
// 获取所有地标元素并绑定 hover 事件，用于隐藏/显示其他地标
document.addEventListener('DOMContentLoaded', () => {
    // 获取所有地标标记元素
    const landmarks = document.querySelectorAll('.landmark-marker');

    // 为每个地标添加鼠标悬停和离开事件监听器
    landmarks.forEach(landmark => {
        // 鼠标进入事件：隐藏其他地标
        landmark.addEventListener('mouseenter', () => {
            landmarks.forEach(otherLandmark => {
                if (otherLandmark !== landmark) {
                    otherLandmark.classList.add('hidden');
                }
            });
        });

        // 鼠标离开事件：显示所有地标
        landmark.addEventListener('mouseleave', () => {
            landmarks.forEach(otherLandmark => {
                otherLandmark.classList.remove('hidden');
            });
        });
    });
});

// 获取聚光灯遮罩元素
const spotlight = document.querySelector('.spotlight-mask');

// 监听鼠标移动事件，实时更新聚光灯位置
document.addEventListener('mousemove', (e) => {
    // 获取鼠标在视窗中的X和Y坐标
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    // 通过CSS自定义属性，将鼠标位置传递给样式表
    spotlight.style.setProperty('--mouse-x', `${mouseX}px`);
    spotlight.style.setProperty('--mouse-y', `${mouseY}px`);
});

// 页面加载完成后，初始化聚光灯位置到屏幕中心
window.addEventListener('load', () => {
    // 计算屏幕中心的X和Y坐标
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    // 设置聚光灯的初始位置
    spotlight.style.setProperty('--mouse-x', `${centerX}px`);
    spotlight.style.setProperty('--mouse-y', `${centerY}px`);
});

// 顶部导航栏功能
function initTopNavigation() {
    const navLinks = document.querySelectorAll('.mui-bar a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // 移除所有链接的active类
            navLinks.forEach(navLink => {
                navLink.classList.remove('active');
            });
            
            // 为当前点击的链接添加active类
            this.classList.add('active');
            
            // 注意：这里不阻止默认行为，让页面正常跳转
            // 页面跳转后，新页面会根据自己的HTML设置正确的active状态
        });
    });
}

// 在DOM加载完成时初始化顶部导航栏
document.addEventListener('DOMContentLoaded', function() {
    initTopNavigation();
});