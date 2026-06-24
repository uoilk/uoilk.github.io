// 全局变量：标记加载页是否完成
let splashCompleted = false;

// 入场动画控制
document.addEventListener('DOMContentLoaded', function() {
  const ballContainer = document.getElementById('ballContainer');
  const mainBall = document.getElementById('mainBall');
  const ballShadow = document.getElementById('ballShadow');
  const logoContainer = document.getElementById('logoContainer');
  const splashContainer = document.querySelector('.splash-container');
  const mainContent = document.getElementById('mainContent');
  
  // 生成装饰小球（全屏分布）
  generateDecorativeBalls();
  
  // 动画时间线（保留原有逻辑，修改跳转为显示首页）
  setTimeout(function() {
    // 停止跳动，开始变大
    mainBall.style.animation = 'none';
    mainBall.classList.add('expand');
    ballShadow.classList.add('fade');
    
    // 显示装饰球
    showDecorativeBalls();
  }, 2000);
  
  setTimeout(function() {
    // 隐藏小球容器，显示Logo
    ballContainer.style.display = 'none';
    logoContainer.classList.add('show');
  }, 2500);
  
  setTimeout(function() {
    // 页面淡出
    splashContainer.classList.add('fade-out');
  }, 4000);
  
  setTimeout(function() {
    // 隐藏加载页，显示首页（取消跳转，改为显示本地内容）
    splashContainer.style.display = 'none';
    mainContent.classList.add('visible');
    splashCompleted = true;
    
    // 触发首页初始化（如果需要）
    if (typeof initHomeContent === 'function') {
      initHomeContent();
    }
  }, 4600);
});

// 生成装饰小球（修改为全屏随机分布）
function generateDecorativeBalls() {
  const container = document.getElementById('decorativeBalls');
  const colors = ['#f4a9c8ff', '#98d9a9ff', '#ffd6b3ff', '#a7c6e3ff', '#d07b97ff', '#d5f2d8ff', '#FFB6C1'];
  const ballCount = 40; // 增加数量（从12→40，铺满全屏）
  
  for (let i = 0; i < ballCount; i++) {
    const ball = document.createElement('div');
    ball.className = 'decorative-ball';
    
    // 1. 随机尺寸（更小更柔和，避免遮挡）
    const size = 8 + Math.random() * 20; // 8-28px（原15-50px）
    // 2. 全屏随机位置（替换原圆形环绕逻辑）
    const x = Math.random() * 100; // 0-100% 水平位置
    const y = Math.random() * 100; // 0-100% 垂直位置
    // 3. 随机颜色
    const color = colors[Math.floor(Math.random() * colors.length)];
    // 4. 随机延迟（更自然的出现节奏）
    const delay = Math.random() * 1.5; // 0-1.5秒随机延迟
    
    ball.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${x}%;
      top: ${y}%;
      background: linear-gradient(135deg, ${color} 0%, ${adjustColor(color, 20)} 100%);
      box-shadow: 0 2px 10px ${color}60; // 降低阴影透明度，更柔和
      animation-delay: ${delay}s;
      opacity: 0; // 初始隐藏
    `;
    
    ball.dataset.delay = delay;
    container.appendChild(ball);
  }
}

// 显示装饰球（优化动画逻辑）
function showDecorativeBalls() {
  const balls = document.querySelectorAll('.decorative-ball');
  balls.forEach((ball, index) => {
    setTimeout(() => {
      // 先执行出现动画
      ball.classList.add('animate');
      // 出现后执行漂浮动画
      setTimeout(() => {
        ball.classList.remove('animate');
        ball.classList.add('float');
        ball.style.opacity = '0.3'; // 降低透明度，不抢焦点
        ball.style.animationDelay = `${Math.random() * 2}s`; // 随机漂浮延迟
      }, 600);
    }, index * 30); // 缩短间隔，更快铺满
  });
}

// 调整颜色亮度（保留原有函数）
function adjustColor(hex, percent) {
  const num = parseInt(hex.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);
  const R = Math.min(255, (num >> 16) + amt);
  const G = Math.min(255, ((num >> 8) & 0x00FF) + amt);
  const B = Math.min(255, (num & 0x0000FF) + amt);
  return '#' + (0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1);
}

// 背景音乐逻辑（支持全站连续播放）
function initBgMusic() {
  const bgMusic = document.getElementById('globalBgMusic');
  const MUSIC_KEY = 'bgMusicState'; // 存储完整状态（播放/暂停+进度）
  bgMusic.volume = 0.2;
  bgMusic.loop = true; // 循环播放（可选）

  // 从本地存储恢复音乐状态
  function restoreMusicState() {
	window.saveMusicStateToStorage = function(isPlaying) {
	    const state = {
	        isPlaying: isPlaying,
	        currentTime: bgMusic.currentTime,
	        duration: bgMusic.duration,
	        timestamp: Date.now()
	    };
	    localStorage.setItem('bgMusicState', JSON.stringify(state));
	};
	
	window.restoreMusicStateFromStorage = function() {
	    const savedState = localStorage.getItem('bgMusicState');
	    if (savedState) {
	        const state = JSON.parse(savedState);
	        return state;
	    }
	    return null;
	};
    const savedState = localStorage.getItem(MUSIC_KEY);
    if (savedState) {
      const { isPlaying, currentTime } = JSON.parse(savedState);
      // 恢复播放进度
      if (!isNaN(currentTime) && currentTime > 0) {
        bgMusic.currentTime = currentTime;
      }
      // 恢复播放状态（仅当之前是播放中）
      if (isPlaying) {
        bgMusic.play().catch(err => {
          console.log('自动续播失败，等待用户交互:', err);
          waitForUserClick();
        });
      }
    } else {
      // 首次访问：等待用户点击后播放
      waitForUserClick();
    }
  }

  // 等待用户点击后播放（解决浏览器自动播放限制）
  function waitForUserClick() {
    const clickHandler = () => {
      bgMusic.play().then(() => {
        saveMusicState(true); // 保存“播放中”状态
        console.log('背景音乐开始播放');
      }).catch(err => {
        console.log('用户点击后播放仍失败:', err);
      });
      document.removeEventListener('click', clickHandler);
    };
    document.addEventListener('click', clickHandler, { once: true });
  }

  // 保存音乐状态到本地存储
  function saveMusicState(isPlaying = null) {
    const state = {
      isPlaying: isPlaying !== null ? isPlaying : !bgMusic.paused,
      currentTime: bgMusic.currentTime, // 记录当前播放进度（秒）
      duration: bgMusic.duration // 记录总时长（可选）
    };
    localStorage.setItem(MUSIC_KEY, JSON.stringify(state));
  }

  // 页面切换前：保存当前状态
  window.addEventListener('beforeunload', function() {
    saveMusicState();
  });

  // 音乐播放/暂停时：实时保存状态
  bgMusic.addEventListener('play', () => saveMusicState(true));
  bgMusic.addEventListener('pause', () => saveMusicState(false));
  // 进度变化时：定期保存（避免切换页面时进度丢失）
  let progressTimer = setInterval(() => {
    if (!bgMusic.paused) {
      saveMusicState(true);
    }
  }, 1000); // 每秒保存一次进度

  // 页面卸载时清除定时器
  window.addEventListener('unload', () => {
    clearInterval(progressTimer);
  });

  // 初始化：恢复状态
  restoreMusicState();
}

// 首页初始化函数（供加载完成后调用）
function initHomeContent() {
  console.log("开始初始化首页内容...");
  
  // 立即修复特色板块背景
  const featuresSection = document.querySelector('.features-section');
  if (featuresSection) {
    featuresSection.classList.remove('section-animate');
    featuresSection.classList.remove('visible');
    featuresSection.style.backgroundColor = '#ffffff';
    featuresSection.style.background = '#ffffff';
    featuresSection.style.opacity = '1';
    featuresSection.style.transform = 'translateY(0)';
    
    document.querySelectorAll('.feature-card').forEach(card => {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
      card.style.backgroundColor = '#ffffff';
    });
  }
  
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
          if (entry.target.classList.contains('animate-on-scroll') && 
              !entry.target.closest('.features-section')) {
            entry.target.classList.add('visible');
          }
          
          if (entry.target.classList.contains('section-animate') && 
              !entry.target.classList.contains('features-section')) {
            entry.target.classList.add('visible');
          }
          
          if (entry.target.classList.contains('what-is-content-animate') || 
              entry.target.classList.contains('what-is-feature-animate') ||
              entry.target.classList.contains('what-is-image-animate')) {
            entry.target.classList.add('visible');
          }
        }
      });
    }, observerOptions);
    
    document.querySelectorAll('.feature-card:not(.features-section .feature-card)').forEach(card => {
      observer.observe(card);
    });
    
    document.querySelectorAll('.section-animate:not(.features-section, .what-is-section)').forEach(section => {
      observer.observe(section);
    });
    
    document.querySelectorAll('.what-is-content-animate, .what-is-feature-animate, .what-is-image-animate').forEach(element => {
      observer.observe(element);
    });
  }
  
  // 加载首页图纸
  function loadHomePatterns() {
    const homePatternsContainer = document.getElementById('homePatterns');
    if (homePatternsContainer && typeof beadPatterns !== 'undefined') {
      homePatternsContainer.innerHTML = '';
      const patternsToShow = beadPatterns.slice(0, 4);
      
      patternsToShow.forEach((pattern, index) => {
        const patternCard = document.createElement('div');
        patternCard.className = 'pattern-card animate-on-scroll';
        patternCard.style.animationDelay = `${index * 0.1}s`;
        
        const imageHtml = pattern.image ? 
          `<img src="${pattern.image}" alt="${pattern.title}">` : 
          '';
        
        patternCard.innerHTML = `
          <div class="pattern-image">
            ${imageHtml}
            <span class="difficulty-badge ${getDifficultyClass(pattern.difficulty)}">
              ${getDifficultyName(pattern.difficulty)}
            </span>
          </div>
          <div class="pattern-info">
            <h3>${pattern.title}</h3>
            <span class="pattern-category">${getCategoryName(pattern.category)}</span>
            <div class="pattern-stats">
              <span><i class="far fa-eye"></i> ${pattern.views}</span>
              <span><i class="fas fa-download"></i> ${pattern.downloads}</span>
            </div>
          </div>
        `;
        
        homePatternsContainer.appendChild(patternCard);
        
        patternCard.addEventListener('click', function() {
          window.location.href = 'library.html';
        });
      });
      
      setTimeout(() => {
        document.querySelectorAll('#homePatterns .animate-on-scroll').forEach(el => {
          el.classList.add('visible');
        });
      }, 100);
    }
  }
  
  function getDifficultyClass(difficulty) {
    const map = {
      'beginner': 'difficulty-easy',
      'intermediate': 'difficulty-medium', 
      'advanced': 'difficulty-hard'
    };
    return map[difficulty] || 'difficulty-easy';
  }
  
  function getDifficultyName(difficulty) {
    const difficultyMap = {
      'beginner': '初级',
      'intermediate': '中级',
      'advanced': '高级'
    };
    return difficultyMap[difficulty] || difficulty;
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
  
  // 数字滚动动画
  function animateNumbers() {
    const numberElements = document.querySelectorAll('.stat-number[data-count]');
    
    numberElements.forEach(element => {
      const target = parseInt(element.getAttribute('data-count'));
      const duration = 2000;
      const step = Math.ceil(target / (duration / 16));
      let current = 0;
      
      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        element.textContent = current.toLocaleString();
      }, 16);
    });
  }
  
  // 初始化特色板块数字动画
  function initFeatureNumberAnimation() {
    const statNumbers = document.querySelectorAll('.features-section .stat-number[data-count]');
    
    const animateNumbers = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target;
          const target = parseInt(element.getAttribute('data-count'));
          const duration = 2000;
          const step = Math.ceil(target / (duration / 16));
          let current = 0;
          
          const timer = setInterval(() => {
            current += step;
            if (current >= target) {
              current = target;
              clearInterval(timer);
            }
            element.textContent = current.toLocaleString();
          }, 16);
          
          observer.unobserve(element);
        }
      });
    };
    
    const observer = new IntersectionObserver(animateNumbers, {
      threshold: 0.5,
      rootMargin: '0px 0px -50px 0px'
    });
    
    statNumbers.forEach(number => {
      observer.observe(number);
    });
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
  
  // 修复教程链接跳转
  const tutorialLinks = [
    document.getElementById('nav-tutorial-link'),
    document.getElementById('hero-tutorial-btn'),
    document.getElementById('footer-tutorial-link')
  ];
  
  tutorialLinks.forEach((link) => {
    if (link) {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        window.location.href = 'tutorial.html';
        return false;
      });
    }
  });
  
  // 执行初始化
  createFloatingBeads();
  initScrollAnimations();
  
  if (typeof beadPatterns !== 'undefined') {
    loadHomePatterns();
  }
  
  animateNumbers();
  initFeatureNumberAnimation();
  
  console.log("首页内容初始化完成");
}

// 页面加载完成后初始化音乐
document.addEventListener('DOMContentLoaded', function() {
  initBgMusic();
});

// 定期清理粒子
function cleanupParticles() {
  const particles = document.querySelectorAll('.particle');
  particles.forEach((p, i) => {
    if (i > 100) p.remove();
  });
}
setInterval(cleanupParticles, 5000);