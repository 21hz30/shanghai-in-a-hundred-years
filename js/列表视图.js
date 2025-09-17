// 列表视图交互功能

// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 初始化卡片悬停效果
    initCardHoverEffect();
    
    // 初始化导航栏点击事件
    initNavigationClick();
    
    // 默认显示和平饭店卡片
    showCard('card-和平饭店');
    // 初始计算高度
    setTimeout(adjustHeights, 0);

    // 默认选中和平饭店导航项
    const navItems = document.querySelectorAll('nav li');
    navItems.forEach(item => {
        if (item.textContent.trim() === 'Peace Hotel') {
            item.classList.add('active');
        }
    });

    // 启动高度自适应监测
    initHeightAutoAdjust();
});

// 卡片悬停效果
function initCardHoverEffect() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        const contentK1 = card.querySelector('.content-k1');
        const contentK2 = card.querySelector('.content-k2');
        const topImageContainer = card.querySelector('.location-image-top');
        const bottomImageContainer = card.querySelector('.location-image-bottom');
        const coffeeImageContainer = card.querySelector('.location-image-coffee');
        
        // 鼠标进入卡片时切换到k2内容和咖啡图片
        card.addEventListener('mouseenter', function() {
            if (contentK1 && contentK2) {
                contentK1.style.display = 'none';
                contentK2.style.display = 'block';
            }
            if (topImageContainer && bottomImageContainer && coffeeImageContainer) {
                topImageContainer.style.opacity = '0';
                bottomImageContainer.style.opacity = '0';
                coffeeImageContainer.style.opacity = '1';
            }
            // 内容变化后调整高度
            setTimeout(adjustHeights, 0);
        });
        
        // 鼠标离开卡片时切换回k1内容和原始图片
        card.addEventListener('mouseleave', function() {
            if (contentK1 && contentK2) {
                contentK1.style.display = 'block';
                contentK2.style.display = 'none';
            }
            if (topImageContainer && bottomImageContainer && coffeeImageContainer) {
                topImageContainer.style.opacity = '1';
                bottomImageContainer.style.opacity = '1';
                coffeeImageContainer.style.opacity = '0';
            }
            // 内容变化后调整高度
            setTimeout(adjustHeights, 0);
        });
    });
}

// 导航栏点击事件
function initNavigationClick() {
    const navItems = document.querySelectorAll('nav li');
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault(); // 阻止默认链接行为
            
            const linkText = this.textContent.trim();
            
            // 移除所有导航项的active类
            navItems.forEach(navItem => {
                navItem.classList.remove('active');
            });
            
            // 为当前点击的导航项添加active类
            this.classList.add('active');
            
            // 隐藏所有卡片
            hideAllCards();
            
            // 根据点击的导航项显示对应卡片
            if (linkText === 'Peace Hotel') {
                showCard('card-和平饭店');} 
				else if (linkText === 'The Majestic Theatre') {
                showCard('card-美琪大剧院');}
				else if (linkText === 'The Si Hang Warehouse') {
				showCard('card-四行仓库');}
				else if (linkText === 'The Moller Villa') {
				showCard('card-马勒别墅');}
				else if (linkText === 'The Statue of Peace') {
				showCard('card-和平女神像');}
				else if (linkText === 'the Gutzlaff Signal Tower') {
				showCard('card-信号台');}
				else if (linkText === 'The Paramount Ballroom') {
				showCard('card-百乐门');}
				else if (linkText === 'The Shanghai Concert Hall') {
				showCard('card-南京大戏院');}
				else if (linkText === 'The Credit Industriel et Commercial (CIC) Bank Building') {
				showCard('card-东方汇理银行');}
				else if (linkText === 'Jinjiang Hotel') {
				showCard('card-锦江饭店');}
				else if (linkText === 'Shanghai Mansion') {
				showCard('card-上海大厦');}
				else if (linkText === 'Cathay Theatre') {
				showCard('card-国泰电影院');}
				else if (linkText === 'the iconic Huaihai Building') {
				showCard('card-淮海大楼');}
				else if (linkText === 'Xujiahui Catholic Church') {
				showCard('card-徐家汇天主教堂');}
				else if (linkText === 'the He Dong Residence') {
				showCard('card-何东旧居');}
				else if (linkText === 'Columbia Country Club') {
				showCard('card-哥伦比亚乡村俱乐部');}
				else if (linkText === 'the Lyceum Theatre') {
				showCard('card-兰心大戏院');}
				else if (linkText === 'Changde Apartments') {
				showCard('card-常德公寓');}
				else if (linkText === 'Denis Apartments') {
				showCard('card-德义大楼');}
				else if (linkText === 'Yates Apartments') {
				showCard('card-同孚大楼');}
				else if (linkText === 'Park Hotel') {
				showCard('card-国际饭店');}
				else if (linkText === 'Grand Cinema') {
				showCard('card-大光明电影院');}
				else if (linkText === 'Trinity Church') {
				showCard('card-圣三一堂');}
				else if (linkText === 'Shanghai Great World') {
				showCard('card-大世界');}
				else if (linkText === 'the Peace cinema') {
				showCard('card-平安电影院');}
				else if (linkText === 'Shanghai Workers’ Cultural Palace') {
				showCard('card-东方饭店上海工人文化宫');}
				else if (linkText === 'Shanghai First Department Store') {
				showCard('card-第一百货商店');}
				else if (linkText === 'Ohel Rachel Synagogue') {
				showCard('card-西摩会堂');}
				else if (linkText === 'Wukang Mansion') {
				showCard('card-武康大楼');}
				else if (linkText === 'The Shanghai Jewish community') {
                showCard('card-上海犹太人总会');}

            // 点击后立即与稍后再调一次高度，覆盖过渡与图片加载
            setTimeout(adjustHeights, 0);
            setTimeout(adjustHeights, 600);
        });
    });
}

// 隐藏所有卡片
function hideAllCards() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.style.display = 'none';
        // 重置内容显示状态
        const contentK1 = card.querySelector('.content-k1');
        const contentK2 = card.querySelector('.content-k2');
        if (contentK1 && contentK2) {
            contentK1.style.display = 'block';
            contentK2.style.display = 'none';
        }
    });
}

// 显示指定卡片
function showCard(cardId) {
    const card = document.getElementById(cardId);
    if (card) {
        card.style.display = 'flex';
        
        // 添加显示动画
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        // 使用setTimeout确保样式应用后再添加动画
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 10);

        // 显示后调整高度，考虑动画/图片加载
        adjustHeights();
        setTimeout(adjustHeights, 120);
        setTimeout(adjustHeights, 600);
    }
}

// 动态调整 #substance 和 nav 高度
function adjustHeights() {
    const substance = document.getElementById('substance');
    const nav = document.querySelector('#substance nav');
    const container = document.querySelector('.card-container');
    if (!substance || !nav || !container) return;

    let requiredHeight;
    // 计算当前可见卡片（display:flex）
    const visibleCard = container.querySelector('.card[style*="display: flex"]');
    if (visibleCard) {
        const containerRect = container.getBoundingClientRect();
        const cardRect = visibleCard.getBoundingClientRect();
        let delta = cardRect.bottom - containerRect.top; // 不含外边距
        const cs = getComputedStyle(visibleCard);
        const mt = parseFloat(cs.marginTop) || 0;
        const mb = parseFloat(cs.marginBottom) || 0;
        if (mt < 0) delta += Math.abs(mt); // 抵消负外边距导致的低估
        if (mb > 0) delta += mb;           // 加上底部外边距
        requiredHeight = container.offsetTop + Math.ceil(delta) + 20; // 加顶部偏移与余量
    } else {
        // 兜底：使用scrollHeight更可靠反映内容高度
        const contentHeight = container.scrollHeight;
        requiredHeight = container.offsetTop + contentHeight + 20;
    }

    // 设置 #substance 与 nav 的高度（内联样式优先级覆盖CSS固定高度）
    const substanceH = Math.max(requiredHeight, 400);
    const navTop = nav.offsetTop || 0;
    const subCS = getComputedStyle(substance);
    const subPB = parseFloat(subCS.paddingBottom) || 0;
    const navH = Math.max(substanceH - navTop - subPB, 300);
    substance.style.height = substanceH + 'px';
    nav.style.height = navH + 'px';
}

// 初始化高度自适应（窗口改变与容器尺寸变化）
function initHeightAutoAdjust() {
    const container = document.querySelector('.card-container');
    if (!container) return;

    // 页面资源加载完后再调一次，避免图片晚加载导致高度低估
    window.addEventListener('load', adjustHeights);

    // 窗口尺寸变化时
    window.addEventListener('resize', adjustHeights);

    // 监听容器尺寸变化（如图片加载导致高度变更）
    if (window.ResizeObserver) {
        const ro = new ResizeObserver(() => adjustHeights());
        ro.observe(container);
    } else {
        // 兜底：延迟多次测量
        setTimeout(adjustHeights, 800);
        setTimeout(adjustHeights, 1600);
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