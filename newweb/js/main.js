// 非遗糖画网站 - 主JavaScript文件

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    
    // 初始化页面
    initPage();
    
    // 初始化导航
    initNavigation();
    
    // 初始化滚动动画
    initScrollAnimations();
    
    // 初始化视频音频组件
    initMediaPlayers();
    
    // 初始化表单
    initForms();
    
    // 初始化糖画动画
    initSugarAnimation();
    
    // 初始化其他组件
    initComponents();
    
    console.log('非遗糖画网站已加载完成');
});

// 初始化页面
function initPage() {
    // 添加页面加载类
    document.body.classList.add('page-loaded');
    
    // 创建回到顶部按钮
    createBackToTopButton();
    
    // 添加当前页面高亮
    highlightCurrentPage();
}

// 初始化导航
function initNavigation() {
    // 移动菜单切换
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            this.classList.toggle('active');
            
            // 切换图标
            const icon = this.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // 关闭移动菜单当点击菜单项
    const navLinks = document.querySelectorAll('.main-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                mainNav.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                
                // 重置图标
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    });
}

// 初始化滚动动画
function initScrollAnimations() {
    // 滚动时的高亮导航
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos <= sectionTop + sectionHeight) {
                document.querySelector('.main-nav a[href*="' + sectionId + '"]')?.classList.add('active');
            } else {
                document.querySelector('.main-nav a[href*="' + sectionId + '"]')?.classList.remove('active');
            }
        });
    });
    
    // 滚动显示动画
    const revealElements = document.querySelectorAll('.reveal');
    
    function revealOnScroll() {
        const windowHeight = window.innerHeight;
        const revealPoint = 150;
        
        revealElements.forEach(element => {
            const revealTop = element.getBoundingClientRect().top;
            
            if (revealTop < windowHeight - revealPoint) {
                element.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // 初始检查
}

// 初始化视频音频组件
function initMediaPlayers() {
    // 视频播放控制
    const videoPlayers = document.querySelectorAll('.video-player');
    
    videoPlayers.forEach(player => {
        const placeholder = player.querySelector('.video-placeholder');
        const playBtn = player.querySelector('.play-btn');
        
        if (playBtn && placeholder) {
            playBtn.addEventListener('click', function() {
                placeholder.style.display = 'none';
                
                // 在实际网站中，这里会加载真实的视频元素
                const videoContainer = document.createElement('div');
                videoContainer.className = 'video-container';
                videoContainer.innerHTML = `
                    <div class="video-wrapper">
                        <div class="video-loading">
                            <div class="loading-spinner"></div>
                            <p>视频加载中...</p>
                        </div>
                        <p class="video-hint">实际网站中这里将嵌入糖画制作视频</p>
                    </div>
                `;
                
                player.appendChild(videoContainer);
                
                // 模拟视频加载完成
                setTimeout(() => {
                    const loading = videoContainer.querySelector('.video-loading');
                    if (loading) {
                        loading.style.display = 'none';
                    }
                }, 1500);
            });
        }
    });
    
    // 音频播放控制
    const audioPlayers = document.querySelectorAll('.audio-player');
    
    audioPlayers.forEach(player => {
        const playBtn = player.querySelector('.play-audio');
        const pauseBtn = player.querySelector('.pause-audio');
        const progress = player.querySelector('.audio-progress');
        const currentTimeEl = player.querySelector('.current-time');
        const durationEl = player.querySelector('.duration');
        
        if (playBtn) {
            playBtn.addEventListener('click', function() {
                this.style.display = 'none';
                if (pauseBtn) pauseBtn.style.display = 'inline-block';
                
                // 模拟音频播放
                if (progress) {
                    let progressValue = 0;
                    const progressInterval = setInterval(() => {
                        progressValue += 1;
                        progress.style.width = progressValue + '%';
                        
                        if (currentTimeEl) {
                            const minutes = Math.floor(progressValue / 3.33);
                            const seconds = Math.floor((progressValue / 3.33 - minutes) * 60);
                            currentTimeEl.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
                        }
                        
                        if (progressValue >= 100) {
                            clearInterval(progressInterval);
                            if (playBtn) playBtn.style.display = 'inline-block';
                            if (pauseBtn) pauseBtn.style.display = 'none';
                        }
                    }, 100);
                    
                    // 存储interval ID以便暂停
                    player.dataset.intervalId = progressInterval;
                }
            });
        }
        
        if (pauseBtn) {
            pauseBtn.addEventListener('click', function() {
                this.style.display = 'none';
                if (playBtn) playBtn.style.display = 'inline-block';
                
                // 清除进度更新interval
                if (player.dataset.intervalId) {
                    clearInterval(parseInt(player.dataset.intervalId));
                }
            });
        }
        
        // 设置音频总时长（模拟）
        if (durationEl) {
            durationEl.textContent = '3:00';
        }
    });
}

// 初始化表单
function initForms() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const inputs = this.querySelectorAll('input[required], textarea[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.classList.add('error');
                    
                    // 添加错误提示
                    if (!input.nextElementSibling || !input.nextElementSibling.classList.contains('error-message')) {
                        const errorMsg = document.createElement('span');
                        errorMsg.className = 'error-message';
                        errorMsg.textContent = '此字段为必填项';
                        errorMsg.style.cssText = 'color: var(--chinese-red); font-size: 0.9rem; margin-top: 5px; display: block;';
                        input.parentNode.appendChild(errorMsg);
                    }
                } else {
                    input.classList.remove('error');
                    
                    // 移除错误提示
                    const errorMsg = input.nextElementSibling;
                    if (errorMsg && errorMsg.classList.contains('error-message')) {
                        errorMsg.remove();
                    }
                }
            });
            
            if (isValid) {
                // 在实际网站中，这里会提交表单数据
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                
                submitBtn.textContent = '提交中...';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    alert('表单提交成功！在实际网站中，数据将被发送到服务器。');
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    form.reset();
                }, 1500);
            }
        });
        
        // 实时验证
        const formInputs = form.querySelectorAll('input, textarea');
        formInputs.forEach(input => {
            input.addEventListener('input', function() {
                this.classList.remove('error');
                
                const errorMsg = this.nextElementSibling;
                if (errorMsg && errorMsg.classList.contains('error-message')) {
                    errorMsg.remove();
                }
            });
        });
    });
}

// 初始化糖画动画
function initSugarAnimation() {
    const sugarPainting = document.querySelector('.sugar-painting');
    if (sugarPainting) {
        // 创建糖画线条动画
        for (let i = 0; i < 8; i++) {
            const line = document.createElement('div');
            line.className = 'sugar-line';
            line.style.cssText = `
                position: absolute;
                background-color: var(--primary-amber);
                height: 4px;
                border-radius: 2px;
                transform-origin: left center;
                animation: drawLine ${2 + i * 0.2}s ease-in-out forwards;
                top: ${20 + i * 40}px;
                left: ${30 + i * 10}px;
                width: ${200 - i * 15}px;
                transform: rotate(${i * 10}deg);
            `;
            sugarPainting.appendChild(line);
        }
        
        // 创建糖浆滴落效果
        for (let i = 0; i < 5; i++) {
            const drip = document.createElement('div');
            drip.className = 'sugar-drip';
            drip.style.cssText = `
                position: absolute;
                width: 8px;
                height: 8px;
                background-color: var(--primary-amber);
                border-radius: 50%;
                animation: drip ${1.5 + i * 0.2}s infinite;
                animation-delay: ${i * 0.3}s;
                left: ${150 + i * 30}px;
                top: 10px;
            `;
            sugarPainting.appendChild(drip);
        }
    }
}

// 初始化其他组件
function initComponents() {
    // 添加面包屑导航
    addBreadcrumb();
}

// 创建回到顶部按钮
function createBackToTopButton() {
    const backToTopBtn = document.createElement('button');
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background-color: var(--primary-amber);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 1.2rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 999;
        box-shadow: 0 4px 12px rgba(212, 160, 23, 0.3);
    `;
    
    document.body.appendChild(backToTopBtn);
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.visibility = 'visible';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.visibility = 'hidden';
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// 高亮当前页面
function highlightCurrentPage() {
    const currentPath = window.location.pathname;
    const currentPage = currentPath.substring(currentPath.lastIndexOf('/') + 1);
    
    if (currentPage === '' || currentPage === 'index.html') {
        document.querySelector('nav a[href="index.html"]')?.classList.add('active');
    } else {
        document.querySelector(`nav a[href="${currentPage}"]`)?.classList.add('active');
    }
}

// 添加面包屑导航
function addBreadcrumb() {
    // 检查页面是否有面包屑容器
    const breadcrumbContainer = document.querySelector('.breadcrumb-container');
    if (!breadcrumbContainer) return;
    
    const path = window.location.pathname;
    const pageName = getPageName(path);
    
    let breadcrumbHTML = '';
    
    if (pageName === 'index.html' || pageName === '') {
        breadcrumbHTML = `
            <ul>
                <li class="current">首页</li>
            </ul>
        `;
    } else {
        const pageTitle = getPageTitle(pageName);
        breadcrumbHTML = `
            <ul>
                <li><a href="index.html">首页</a></li>
                <li class="current">${pageTitle}</li>
            </ul>
        `;
    }
    
    breadcrumbContainer.innerHTML = breadcrumbHTML;
}

// 获取页面名称
function getPageName(path) {
    return path.substring(path.lastIndexOf('/') + 1);
}

// 获取页面标题
function getPageName(pageName) {
    const pageTitles = {
        'history.html': '糖画历史',
        'craft.html': '制作工艺',
        'gallery.html': '作品鉴赏',
        'experience.html': '在线体验',
        'artisans.html': '传承人物',
        'shop.html': '糖画商城',
        'booking.html': '活动预约'
    };
    
    return pageTitles[pageName] || '页面';
}