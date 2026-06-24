
// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    console.log("main.js 开始执行...");
    // 移动端菜单切换
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            menuToggle.innerHTML = navMenu.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
    }
    
    // 初始化滚动动画
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (entry.target.classList.contains('animate-on-scroll')) {
                        entry.target.classList.add('visible');
                    }
                    
                    if (entry.target.classList.contains('section-animate')) {
                        entry.target.classList.add('visible');
                    }
                }
            });
        }, observerOptions);
        
        // 观察特色卡片
        document.querySelectorAll('.feature-card').forEach(card => {
            observer.observe(card);
        });
        
        // 观察需要淡入的section
        document.querySelectorAll('.section-animate').forEach(section => {
            observer.observe(section);
        });
    }
    
    // 初始化滚动动画
    initScrollAnimations();
    
    // 辅助函数
    function getRandomColor() {
        const colors = ['#F8C8DC', '#C8E6F5', '#D8F8C8', '#F8F0C8', '#E8C8F8', '#C8F8F0'];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    function getCategoryName(category) {
        const categoryMap = {
            'animal': '动物',
            'cartoon': '卡通',
            'festival': '节日',
            'game': '游戏',
            'idol': '明星',
            'plant': '植物',
            'food': '食物',
            'letter': '文字',
            'abstruct': '抽象'
        };
        return categoryMap[category] || category;
    }
    
    function getDifficultyName(difficulty) {
        const difficultyMap = {
            'beginner': '初级',
            'intermediate': '中级',
            'advanced': '高级'
        };
        return difficultyMap[difficulty] || difficulty;
    }
    
    // 订阅表单提交
    const subscribeForms = document.querySelectorAll('.subscribe-form');
    subscribeForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            if (emailInput.value) {
                alert('感谢您的订阅！我们将定期发送最新拼豆图纸和教程到您的邮箱。');
                emailInput.value = '';
            }
        });
    });
    
    // 为所有按钮添加点击效果
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.98)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = '';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    console.log("main.js 执行完成");
});

// 全局调试函数
window.debugPage = function() {
    console.group('🔍 页面调试信息');
    console.log('当前页面:', window.location.href);
    
    // 检查数据
    console.log('beadPatterns 状态:', typeof beadPatterns !== 'undefined' ? `已加载 (${beadPatterns.length} 个)` : '未定义');
    
    if (typeof beadPatterns !== 'undefined') {
        console.log('前3个图纸:', beadPatterns.slice(0, 3));
    }
    
    console.groupEnd();
};

// ========== 入场动画控制 ==========

// 创建飘落的拼豆粒子
function createFloatingBeads() {
    const container = document.getElementById('floatingBeads');
    if (!container) return;
    
    const colors = ['#F8C8DC', '#C8E6F5', '#FFE066', '#98D8AA', '#FFB6C1'];
    
    for (let i = 0; i < 20; i++) {
        const bead = document.createElement('div');
        bead.className = 'bead';
        bead.style.backgroundColor = colors[i % colors.length];
        bead.style.left = Math.random() * 100 + '%';
        bead.style.top = Math.random() * 100 + '%';
        bead.style.animationDelay = (i * 0.15) + 's';
        bead.style.animationDuration = (3 + Math.random() * 2) + 's';
        container.appendChild(bead);
    }
}

// 滚动触发动画
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 给元素添加动画类
                entry.target.classList.add('animate-in');
                
                // 如果是section，添加visible类
                if (entry.target.classList.contains('section-animate')) {
                    entry.target.classList.add('visible');
                }
            }
        });
    }, observerOptions);
    
    // 观察特色卡片
    document.querySelectorAll('.feature-card').forEach(card => {
        observer.observe(card);
    });
    
    // 观察评价卡片
    document.querySelectorAll('.testimonial-card').forEach(card => {
        observer.observe(card);
    });
    
    // 观察需要淡入的section
    document.querySelectorAll('.popular-patterns, .ironing-tips, .testimonials').forEach(section => {
        section.classList.add('section-animate');
        observer.observe(section);
    });
}

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    console.log("🎨 入场动画初始化...");
    
    // 创建飘落拼豆
    createFloatingBeads();
    
    // 初始化滚动动画
    initScrollAnimations();
    
    console.log("✨ 入场动画加载完成！");
});
