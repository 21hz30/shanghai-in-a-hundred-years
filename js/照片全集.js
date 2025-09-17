// 瀑布流布局实现
class WaterfallLayout {
    constructor(container, options = {}) {
        this.container = container;
        this.columnWidth = options.columnWidth || 200;
        this.gap = options.gap || 10;
        this.scale = options.scale || 1.3; // 等比例放大倍数，默认1.3倍
        this.columns = [];
        this.columnHeights = [];
        this.init();
    }

    init() {
        // 计算列数（考虑图片放大后的实际宽度）
        const containerWidth = this.container.offsetWidth - 40; // 减去padding
        const actualColumnWidth = this.columnWidth * this.scale; // 实际列宽
        this.columnCount = Math.floor((containerWidth + this.gap) / (actualColumnWidth + this.gap));
        
        // 确保至少有2列
        if (this.columnCount < 2) {
            this.columnCount = 2;
            this.columnWidth = (containerWidth - (this.columnCount - 1) * this.gap) / this.columnCount;
        }
        
        // 初始化列高度数组
        this.columnHeights = new Array(this.columnCount).fill(0);
        
        // 设置容器样式
        this.container.style.position = 'relative';
        this.container.style.height = 'auto';
        
        this.layoutImages();
    }

    layoutImages() {
        const images = this.container.querySelectorAll('img');
        let loadedCount = 0;
        
        images.forEach((img, index) => {
            if (img.complete) {
                this.positionImage(img, index);
                loadedCount++;
                if (loadedCount === images.length) {
                    this.updateContainerHeight();
                }
            } else {
                img.onload = () => {
                    this.positionImage(img, index);
                    loadedCount++;
                    if (loadedCount === images.length) {
                        this.updateContainerHeight();
                    }
                };
            }
        });
    }

    positionImage(img, index) {
        // 找到最短的列
        const shortestColumnIndex = this.columnHeights.indexOf(Math.min(...this.columnHeights));
        
        // 计算图片的实际显示尺寸（等比例放大，保持边距）
        const imgAspectRatio = img.naturalHeight / img.naturalWidth;
        const displayWidth = this.columnWidth * this.scale; // 放大倍数取自配置
        const displayHeight = displayWidth * imgAspectRatio;
        const stepX = displayWidth + this.gap; // 每列的水平步长=实际显示宽度+间距
        
        // 设置图片样式
        img.style.position = 'absolute';
        img.style.width = displayWidth + 'px';
        img.style.height = displayHeight + 'px';
        img.style.left = (shortestColumnIndex * stepX) + 'px';
        img.style.top = this.columnHeights[shortestColumnIndex] + 'px';
        img.style.objectFit = 'cover';
        img.style.borderRadius = '8px';
        img.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
        img.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
        
        // 更新该列的高度
        this.columnHeights[shortestColumnIndex] += displayHeight + this.gap;
    }

    updateContainerHeight() {
        const maxHeight = Math.max(...this.columnHeights);
        this.container.style.height = maxHeight + 'px';
        
        // 根据列数和显示宽度更新容器宽度，避免横向截断或重叠
        const displayWidth = this.columnWidth * this.scale;
        const totalWidth = this.columnCount * displayWidth + (this.columnCount - 1) * this.gap;
        this.container.style.minWidth = totalWidth + 'px';
    }

    // 重新布局（窗口大小改变时调用）
    relayout() {
        // 重新初始化列数与列宽以适配新的容器宽度
        this.init();
        // 重置列高并重新布局
        this.columnHeights = new Array(this.columnCount).fill(0);
        this.layoutImages();
    }
}

// 页面加载完成后初始化瀑布流
document.addEventListener('DOMContentLoaded', function() {
    const photoContainers = document.querySelectorAll('.photo');
    
    photoContainers.forEach(container => {
        new WaterfallLayout(container, {
            columnWidth: 200,
            gap: 10,
            scale: 1.5 // 再次等比例放大
        });
    });
    
    // 窗口大小改变时重新布局
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            photoContainers.forEach(container => {
                const layout = new WaterfallLayout(container, {
                    columnWidth: 200,
                    gap: 10,
                    scale: 1.3
                });
            });
        }, 250);
    });
});

// 图片懒加载优化
function optimizeImageLoading() {
    const images = document.querySelectorAll('.photo img');
    
    images.forEach(img => {
        // 添加加载状态
        img.style.opacity = '0';
        img.style.transform = 'scale(0.8)';
        
        img.onload = function() {
            this.style.opacity = '1';
            this.style.transform = 'scale(1)';
        };
    });
}

// 调用图片优化
optimizeImageLoading();

// 导航栏功能
function initNavigation() {
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

// 页面加载时初始化导航栏
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
});