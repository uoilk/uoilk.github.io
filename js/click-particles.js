// js/click-particles.js
// 鼠标点击粒子效果 - 全站通用

// ========== 鼠标点击粒子效果 ==========

// 创建粒子容器
function createClickParticlesContainer() {
    let container = document.getElementById('clickParticlesContainer');
    if (container) return container;
    
    container = document.createElement('div');
    container.className = 'click-particles-container';
    container.id = 'clickParticlesContainer';
    document.body.appendChild(container);
    return container;
}

// 创建点击粒子效果
function createClickParticles(event) {
    const container = createClickParticlesContainer();
    
    // 获取点击位置
    const x = event.clientX;
    const y = event.clientY;
    
    // 定义丰富的粒子颜色
    const colorSets = {
        primary: ['#F8C8DC', '#FF6B9D', '#FF4D87'],
        secondary: ['#C8E6F5', '#4ECDC4', '#45B7AA'],
        accent: ['#FFE066', '#FFD43B', '#FFCA2B'],
        pastel: ['#98D8AA', '#FFB6C1', '#E8C8F8', '#C5A3FF']
    };
    
    // 所有颜色合并
    const allColors = [
        ...colorSets.primary,
        ...colorSets.secondary,
        ...colorSets.accent,
        ...colorSets.pastel
    ];
    
    // 粒子数量（18-25个）
    const particleCount = 18 + Math.floor(Math.random() * 8);
    
    // 随机选择动画类型
    const animationTypes = ['out', 'spin', 'bounce'];
    const animationType = animationTypes[Math.floor(Math.random() * animationTypes.length)];
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'click-particle';
        
        // 随机粒子尺寸
        const sizeType = Math.random();
        if (sizeType < 0.3) {
            particle.classList.add('small');
        } else if (sizeType < 0.6) {
            particle.classList.add('large');
        }
        
        // 随机颜色
        particle.style.backgroundColor = allColors[Math.floor(Math.random() * allColors.length)];
        
        // 设置位置
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        
        // 随机角度和距离
        const angle = Math.random() * Math.PI * 2;
        const distance = 60 + Math.random() * 100;
        
        // 计算运动轨迹
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;
        const rotate = (Math.random() * 720) + 'deg';
        
        // 设置动画变量
        particle.style.setProperty('--tx', tx + 'px');
        particle.style.setProperty('--ty', ty + 'px');
        particle.style.setProperty('--rotate', rotate);
        
        // 根据动画类型设置动画
        let animationName;
        switch (animationType) {
            case 'spin':
                animationName = 'clickParticleSpin';
                break;
            case 'bounce':
                animationName = 'clickParticleBounce';
                break;
            default:
                animationName = 'clickParticleOut';
        }
        
        // 设置动画
        const duration = 0.8 + Math.random() * 0.4;
        const delay = i * 0.02;
        
        particle.style.animation = `${animationName} ${duration}s ease-out ${delay}s forwards`;
        
        // 添加到容器
        container.appendChild(particle);
        
        // 添加随机形状
        if (Math.random() > 0.7) {
            particle.style.borderRadius = '50%';
        }
        
        // 动画结束后移除粒子
        setTimeout(() => {
            if (particle.parentNode === container) {
                container.removeChild(particle);
            }
        }, (duration + delay) * 1000 + 200);
    }
    
    // 50%几率添加中心爆发效果
    if (Math.random() > 0.5) {
        setTimeout(() => {
            createCenterBurst(x, y, container);
        }, 150);
    }
}

// 创建中心爆发效果
function createCenterBurst(x, y, container) {
    const burstColors = ['#FFFFFF', '#FFE066', '#F8C8DC'];
    
    for (let i = 0; i < 6; i++) {
        const particle = document.createElement('div');
        particle.className = 'click-particle large';
        particle.style.backgroundColor = burstColors[i % burstColors.length];
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        
        const angle = (i * 60) * (Math.PI / 180);
        const distance = 30;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;
        
        particle.style.setProperty('--tx', tx + 'px');
        particle.style.setProperty('--ty', ty + 'px');
        particle.style.setProperty('--rotate', (i * 60) + 'deg');
        
        particle.style.animation = `clickParticleOut 0.6s ease-out ${i * 0.05}s forwards`;
        
        container.appendChild(particle);
        
        setTimeout(() => {
            if (particle.parentNode === container) {
                container.removeChild(particle);
            }
        }, 1000);
    }
}

// 初始化点击粒子效果
function initClickParticles() {
    // 创建粒子容器
    createClickParticlesContainer();
    
    // 为整个文档添加点击事件
    document.addEventListener('click', function(event) {
        // 排除一些不需要特效的元素
        const target = event.target;
        const excludedSelectors = [
            'input',
            'textarea',
            'select',
            '.no-click-effect'
        ];
        
        let shouldExclude = false;
        for (const selector of excludedSelectors) {
            if (target.matches(selector) || target.closest(selector)) {
                shouldExclude = true;
                break;
            }
        }
        
        // 如果不在排除列表中，创建粒子效果
        if (!shouldExclude) {
            createClickParticles(event);
        }
    });
    
    console.log('✨ 全站鼠标点击粒子效果已启用');
}

// 性能优化：清理过多粒子
function cleanupParticles() {
    const container = document.getElementById('clickParticlesContainer');
    if (!container) return;
    
    if (container.children.length > 150) {
        const excess = container.children.length - 100;
        for (let i = 0; i < excess; i++) {
            if (container.firstChild) {
                container.removeChild(container.firstChild);
            }
        }
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    initClickParticles();
    // 定期清理粒子
    setInterval(cleanupParticles, 5000);
});