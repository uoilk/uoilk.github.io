// pattern-detail.js - 修改版
document.addEventListener('DOMContentLoaded', function() {
    console.log('图案详情页加载完成');
    
    // 获取URL参数
    const urlParams = new URLSearchParams(window.location.search);
    const patternId = urlParams.get('id');
    
    if (patternId) {
        // 加载对应图纸的详细信息
        loadPatternDetails(patternId);
    } else {
        console.warn('未提供图纸ID');
        document.getElementById('patternTitle').textContent = '请选择一张图纸';
    }
    
    // 绑定按钮事件
    setupEventListeners();
});

function loadPatternDetails(patternId) {
    // 从数据中找到对应的图纸
    const pattern = beadPatterns.find(p => p.id == patternId);
    
    if (pattern) {
        // 更新页面标题
        document.title = `${pattern.title} - 豆趣工坊`;
        
        // 更新基本信息
        document.getElementById('patternTitle').textContent = pattern.title;
        document.getElementById('patternCategory').textContent = getCategoryName(pattern.category);
        document.getElementById('patternDifficulty').textContent = getDifficultyName(pattern.difficulty);
        document.getElementById('patternColors').textContent = pattern.colors || pattern.colors?.length || 0;
        document.getElementById('patternBeads').textContent = pattern.beadsCount;
        
        // 渲染图案图片
        renderPatternImage(pattern);
        
        // 渲染材料列表
        renderMaterialsList(pattern);
        
        // 更新收藏按钮状态
        updateFavoriteButton(pattern);
    } else {
        // 如果找不到图纸
        document.getElementById('patternTitle').textContent = '图纸未找到';
        document.getElementById('patternGrid').innerHTML = 
            '<div style="text-align: center; padding: 50px; color: #666;">未找到对应的图纸</div>';
    }
}

function renderPatternImage(pattern) {
    const grid = document.getElementById('patternGrid');
    
    if (pattern.image) {
        // 如果有图片，显示图片
        grid.innerHTML = `
            <div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;">
                <img src="${pattern.image}" 
                     alt="${pattern.title}" 
                     style="max-width: 100%; max-height: 100%; object-fit: contain; border-radius: 8px;"
                     onerror="this.onerror=null; this.src='images/patterns/default.jpg';">
            </div>
        `;
    } else {
        // 如果没有图片，显示占位符
        grid.innerHTML = `
            <div style="text-align: center; padding: 50px; color: #666;">
                <i class="fas fa-image" style="font-size: 60px; margin-bottom: 20px; color: #C8E6F5;"></i>
                <h3>${pattern.title}</h3>
                <p>暂无图片</p>
            </div>
        `;
    }
}

function renderMaterialsList(pattern) {
    const materialsList = document.getElementById('materialsList');
    materialsList.innerHTML = '';
    
    // 使用图纸中的材料列表，或使用默认列表
    const materials = pattern.materials || [
        '拼豆板 (1个)',
        '各色拼豆豆子',
        '熨烫纸 (1-2张)',
        '熨斗',
        '镊子 (可选)'
    ];
    
    materials.forEach(material => {
        const li = document.createElement('li');
        li.textContent = material;
        materialsList.appendChild(li);
    });
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

function updateFavoriteButton(pattern) {
    const saveButton = document.getElementById('savePattern');
    const icon = saveButton.querySelector('i');
    
    if (pattern.favorited) {
        icon.className = 'fas fa-heart';
        icon.style.color = '#ff4444';
        saveButton.classList.add('active');
    } else {
        icon.className = 'far fa-heart';
        icon.style.color = '';
        saveButton.classList.remove('active');
    }
}

function setupEventListeners() {
    // 下载按钮
    document.getElementById('downloadPattern').addEventListener('click', function() {
        const urlParams = new URLSearchParams(window.location.search);
        const patternId = urlParams.get('id');
        const pattern = beadPatterns.find(p => p.id == patternId);
        
        if (pattern) {
            // 更新下载次数
            pattern.downloads = (pattern.downloads || 0) + 1;
            
            // 显示下载提示
            showToast(`开始下载：${pattern.title}`, '#C8E6F5');
            
            // 模拟下载 - 在实际项目中这里应该是真实文件下载
            setTimeout(() => {
                showToast('下载完成！', '#F8C8DC');
            }, 1000);
        }
    });
    
    // 收藏按钮
    document.getElementById('savePattern').addEventListener('click', function() {
        const urlParams = new URLSearchParams(window.location.search);
        const patternId = urlParams.get('id');
        const pattern = beadPatterns.find(p => p.id == patternId);
        
        if (pattern) {
            pattern.favorited = !pattern.favorited;
            updateFavoriteButton(pattern);
            
            // 显示提示
            const message = pattern.favorited ? `已收藏：${pattern.title}` : `已取消收藏：${pattern.title}`;
            const color = pattern.favorited ? '#F8C8DC' : '#C8E6F5';
            showToast(message, color);
        }
    });
}

// 显示提示消息
function showToast(message, color) {
    // 创建一个小提示
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${color};
        color: #333;
        padding: 12px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        z-index: 1000;
        animation: slideIn 0.3s ease;
        font-size: 14px;
    `;
    
    document.body.appendChild(toast);
    
    // 2秒后自动移除提示
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 2000);
}

// 添加动画样式
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);