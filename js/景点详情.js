// ==================== 咖啡馆信息切换功能 ====================
// 用于记录当前显示状态：false为默认状态，true为咖啡馆信息状态
let showCafeInfo = false;

// 初始化咖啡馆信息切换功能
function initCafeInfoToggle() {
    const viewCafeInfoBtn = document.getElementById('viewCafeInfoBtn');
    
    if (!viewCafeInfoBtn) return; // 若页面无按钮直接返回
    
    // 绑定点击事件
    viewCafeInfoBtn.addEventListener('click', toggleCafeInfo);
    
    // 切换显示状态的函数
    function toggleCafeInfo() {
        showCafeInfo = !showCafeInfo;
        
        // 获取需要控制的元素
         const name1 = document.getElementById('name1');
         const name2 = document.getElementById('name2');
         const k1 = document.querySelector('.k1');
         const z4 = document.getElementById('z4');
         const z5 = document.getElementById('z5');
         const z6 = document.getElementById('z6');
         const z2 = document.getElementById('z2');
         const z7 = document.getElementById('z7');
         const z3 = document.getElementById('z3');
        
        if (showCafeInfo) {
             // 显示咖啡馆信息状态
             if (name1) name1.style.opacity = '0';
             if (name2) name2.style.opacity = '1';
             if (k1) k1.style.opacity = '1';
             if (z4) z4.style.opacity = '0';
             if (z5) z5.style.opacity = '1';
             if (z6) z6.style.opacity = '0';
             if (z2) z2.style.opacity = '0';
             if (z7) z7.style.opacity = '1';
             if (z3) z3.style.opacity = '1';
             
             // 更新按钮文本
             viewCafeInfoBtn.textContent = 'Return original information';
         } else {
             // 显示原始状态
             if (name1) name1.style.opacity = '1';
             if (name2) name2.style.opacity = '0';
             if (k1) k1.style.opacity = '0';
             if (z4) z4.style.opacity = '1';
             if (z5) z5.style.opacity = '0';
             if (z6) z6.style.opacity = '1';
             if (z2) z2.style.opacity = '1';
             if (z7) z7.style.opacity = '0';
             if (z3) z3.style.opacity = '0';
             
             // 更新按钮文本
             viewCafeInfoBtn.textContent = 'Click to view cafe information';
         }
    }
}

// 添加平滑滚动效果（可选）
function smoothScrollTo(element) {
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
    }
}
// 页面加载完成后初始化所有功能
function initAllFeatures() {
    initCafeInfoToggle(); // 初始化咖啡馆信息切换功能
    initCheckIn(); // 初始化打卡功能
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAllFeatures);
} else {
    initAllFeatures();
}