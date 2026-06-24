// js/library.js

// 全局变量：存储当前激活的筛选条件
let currentActiveFilters = {
    type: 'all',
    difficulty: 'all',
    size: 'all'
};

// 全局变量：存储当前搜索关键词
let currentSearchKeyword = '';

// 渲染图纸卡片函数
function renderPatternCard(pattern) {
    // 计算尺寸分类
    const beadsCount = pattern.beadsCount || 150; // 默认值
    let sizeText = '';
    if (beadsCount <= 150) {
        sizeText = '小型';
    } else if (beadsCount <= 400) {
        sizeText = '中型';
    } else {
        sizeText = '大型';
    }
    
    // 类型映射：仅做显示文本转换，不影响筛选逻辑
    const categoryMap = {
        'cartoon': '卡通动漫',
        'game': '游戏角色',
        'idol': '明星爱豆',
        'animal': '动物植物',
        'plant': '植物花卉',
        'festival': '节日主题',
        'text': '文字数字', // 修复：原来是 'tect'，应该是 'text'
        'abstract': '抽象图案'
    };
    
    // 难度映射
    const difficultyMap = {
        'beginner': '初级',
        'intermediate': '中级',
        'advanced': '高级'
    };
    
    const categoryText = categoryMap[pattern.category] || pattern.category;
    const difficultyText = difficultyMap[pattern.difficulty] || pattern.difficulty;
    
    return `
        <div class="pattern-card" data-id="${pattern.id}" data-category="${pattern.category}" 
             data-difficulty="${pattern.difficulty}" data-size="${beadsCount <= 150 ? 'small' : beadsCount <= 400 ? 'medium' : 'large'}"
             data-image="${pattern.image}"> <!-- 添加data-image属性存储图片地址 -->
            <div class="pattern-image">
                <img src="${pattern.image}" alt="${pattern.title}" 
                     onerror="this.src='https://via.placeholder.com/300x200/F8C8DC/333333?text=${encodeURIComponent(pattern.title)}';">
            </div>
            <div class="pattern-info">
                <h3 class="pattern-title">${pattern.title}</h3>
                
                <!-- 类型、难度、尺寸信息 -->
                <div class="pattern-details">
                    <div class="pattern-detail-item">
                        <i class="fas fa-tag"></i>
                        <span>${categoryText}</span>
                    </div>
                    <div class="pattern-detail-item">
                        <i class="fas fa-chart-line"></i>
                        <span>${difficultyText}</span>
                    </div>
                    <div class="pattern-detail-item">
                        <i class="fas fa-ruler"></i>
                        <span>${sizeText} (${beadsCount}颗)</span>
                    </div>
                </div>
                
                <div class="pattern-stats">
                    <span><i class="far fa-eye"></i> ${pattern.views}</span>
                    <span><i class="fas fa-download"></i> ${pattern.downloads}</span>
                </div>
                <div class="pattern-actions">
                    <button class="btn-like ${pattern.liked ? 'liked' : ''}" data-id="${pattern.id}">
                        <i class="far fa-heart"></i>
                        <i class="fas fa-heart"></i>
                    </button>
                    <button class="btn-favorite ${pattern.favorited ? 'favorited' : ''}" data-id="${pattern.id}">
                        <i class="far fa-star"></i>
                        <i class="fas fa-star"></i>
                    </button>
                    <button class="btn-download" data-id="${pattern.id}">
                        <i class="fas fa-download"></i> 下载图纸
                    </button>
                </div>
            </div>
        </div>
    `;
}

// URL参数解析函数（供外部调用）
function getUrlParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// 从URL参数设置筛选条件（精准版）
function setFiltersFromUrl() {
    const category = getUrlParam('category');
    if (!category) return true; // 返回true表示无URL参数
    
    // 仅做导航栏参数到筛选值的精准映射
    const categoryToFilterMap = {
        'anime': 'cartoon',    // 导航栏"动漫角色" → 筛选cartoon
        'game': 'game',        // 导航栏"游戏像素" → 筛选game
        'animal': 'animal',    // 导航栏"可爱动物" → 筛选animal
        'holiday': 'festival'  // 导航栏"节日主题" → 筛选festival
    };
    
    const filterValue = categoryToFilterMap[category];
    if (!filterValue) return true;
    
    // 强制更新全局筛选条件
    currentActiveFilters.type = filterValue;
    
    // 强制更新UI选中状态
    const typeTags = document.querySelectorAll(`.filter-tag[data-filter="type"]`);
    typeTags.forEach(tag => {
        tag.classList.remove('active');
        if (tag.getAttribute('data-value') === filterValue) {
            tag.classList.add('active');
        }
    });
    
    // 强制更新筛选结果提示
    const filterResultsText = document.getElementById('filterResultsText');
    if (filterResultsText) {
        const typeText = document.querySelector(`.filter-tag[data-filter="type"][data-value="${filterValue}"]`)?.textContent || filterValue;
        filterResultsText.textContent = `显示: ${typeText} | 全部难度 | 全部尺寸`;
    }
    
    console.log(`导航栏筛选：${category} → 精准筛选${filterValue}类图纸`);
    return false; // 返回false表示有URL参数，已处理
}

// 搜索功能
function searchPatterns(keyword) {
    currentSearchKeyword = keyword ? keyword.trim() : '';
    
    // 如果没有搜索关键词，恢复到筛选状态
    if (!currentSearchKeyword) {
        filterPatterns();
        return;
    }
    
    const patternsContainer = document.getElementById('libraryPatterns');
    const filterResultsText = document.getElementById('filterResultsText');
    const searchTerm = currentSearchKeyword.toLowerCase();
    
    // 获取当前筛选条件下的图纸
    let patternsToSearch = beadPatterns;
    
    // 如果当前有筛选条件，先应用筛选
    if (currentActiveFilters.type !== 'all' || currentActiveFilters.difficulty !== 'all' || currentActiveFilters.size !== 'all') {
        patternsToSearch = beadPatterns.filter(pattern => {
            // 应用当前筛选条件
            if (currentActiveFilters.type !== 'all' && pattern.category !== currentActiveFilters.type) {
                return false;
            }
            
            if (currentActiveFilters.difficulty !== 'all' && pattern.difficulty !== currentActiveFilters.difficulty) {
                return false;
            }
            
            if (currentActiveFilters.size !== 'all') {
                const beadsCount = pattern.beadsCount || 150;
                let size;
                if (beadsCount <= 150) size = 'small';
                else if (beadsCount <= 400) size = 'medium';
                else size = 'large';
                
                if (size !== currentActiveFilters.size) return false;
            }
            
            return true;
        });
    }
    
    // 在筛选后的图纸中搜索
    const searchResults = patternsToSearch.filter(pattern => {
        // 搜索标题
        if (pattern.title.toLowerCase().includes(searchTerm)) {
            return true;
        }
        
        // 搜索描述（如果有）
        if (pattern.description && pattern.description.toLowerCase().includes(searchTerm)) {
            return true;
        }
        
        // 搜索关键词（如果有）
        if (pattern.keywords) {
            const keywords = Array.isArray(pattern.keywords) ? 
                pattern.keywords : 
                pattern.keywords.split(',').map(k => k.trim());
            
            if (keywords.some(keyword => keyword.toLowerCase().includes(searchTerm))) {
                return true;
            }
        }
        
        // 搜索分类名称
        const categoryMap = {
            'cartoon': ['卡通', '动漫', '动画'],
            'game': ['游戏', '像素', '角色'],
            'idol': ['明星', '爱豆', '偶像'],
            'animal': ['动物', '植物', '宠物'],
            'plant': ['植物', '花卉', '花朵'],
            'festival': ['节日', '圣诞', '春节', '万圣'],
            'text': ['文字', '数字', '字母'],
            'abstract': ['抽象', '图案', '几何']
        };
        
        if (categoryMap[pattern.category]) {
            if (categoryMap[pattern.category].some(word => word.includes(searchTerm))) {
                return true;
            }
        }
        
        return false;
    });
    
    // 渲染搜索结果
    let html = '';
    if (searchResults.length > 0) {
        searchResults.forEach(pattern => {
            html += renderPatternCard(pattern);
        });
    } else {
        html = `
            <div class="no-search-results">
                <i class="fas fa-search"></i>
                <h3>没有找到相关图纸</h3>
                <p>未找到包含"${currentSearchKeyword}"的图纸</p>
                <button id="clearSearchAndFilters" class="btn btn-primary">
                    清除搜索和筛选
                </button>
            </div>
        `;
    }
    
    patternsContainer.innerHTML = html;
    
    // 更新结果提示
    if (filterResultsText) {
        const totalText = searchResults.length > 0 ? 
            `搜索"${currentSearchKeyword}"找到 ${searchResults.length} 个结果` :
            `搜索"${currentSearchKeyword}"没有找到结果`;
        filterResultsText.textContent = totalText;
    }
    
    // 重新初始化动画和预览
    initPatternCardsAnimation();
    initPatternPreview();
    
    // 如果有清除搜索按钮，显示它
    const clearSearchBtn = document.getElementById('clearSearch');
    if (clearSearchBtn) {
        clearSearchBtn.style.display = currentSearchKeyword ? 'inline-block' : 'none';
    }
    
    // 绑定清除搜索和筛选按钮事件
    const clearSearchAndFiltersBtn = document.getElementById('clearSearchAndFilters');
    if (clearSearchAndFiltersBtn) {
        clearSearchAndFiltersBtn.addEventListener('click', function() {
            clearSearch();
            // 同时清除所有筛选
            document.querySelectorAll('.filter-tag').forEach(tag => {
                tag.classList.toggle('active', tag.getAttribute('data-value') === 'all');
            });
            currentActiveFilters = { type: 'all', difficulty: 'all', size: 'all' };
            filterPatterns();
        });
    }
    
    return searchResults;
}

// 清除搜索
function clearSearch() {
    const searchInput = document.getElementById('searchInput');
    const clearSearchBtn = document.getElementById('clearSearch');
    
    if (searchInput) {
        searchInput.value = '';
    }
    
    if (clearSearchBtn) {
        clearSearchBtn.style.display = 'none';
    }
    
    currentSearchKeyword = '';
    
    // 恢复到筛选状态
    filterPatterns();
}

// 初始化搜索功能
function initSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const clearSearchBtn = document.getElementById('clearSearch');
    
    if (!searchInput || !searchBtn) {
        console.warn('搜索元素未找到，跳过搜索初始化');
        return;
    }
    
    // 搜索按钮点击事件
    searchBtn.addEventListener('click', function() {
        const keyword = searchInput.value.trim();
        searchPatterns(keyword);
    });
    
    // 输入框回车事件
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const keyword = this.value.trim();
            searchPatterns(keyword);
        }
    });
    
    // 输入变化时更新清除按钮
    searchInput.addEventListener('input', function() {
        const keyword = this.value.trim();
        if (clearSearchBtn) {
            clearSearchBtn.style.display = keyword ? 'inline-block' : 'none';
        }
    });
    
    // 清除搜索按钮事件
    if (clearSearchBtn) {
        clearSearchBtn.addEventListener('click', function() {
            clearSearch();
        });
    }
    
    console.log('搜索功能初始化完成');
}

// 初始化筛选功能
function initFilters() {
    const filterTags = document.querySelectorAll('.filter-tag');
    const clearFiltersBtn = document.getElementById('clearFilters');
    const filterResultsText = document.getElementById('filterResultsText');
    const patternsContainer = document.getElementById('libraryPatterns');
    
    if (!filterTags.length || !clearFiltersBtn || !patternsContainer) {
        console.warn('筛选元素未找到，跳过筛选初始化');
        return;
    }

    // 筛选逻辑（纯严格匹配）
    function filterPatterns() {
        // 获取当前激活的筛选条件（优先UI）
        const activeFilters = { type: 'all', difficulty: 'all', size: 'all' };
        document.querySelectorAll('.filter-tag.active').forEach(tag => {
            const filterType = tag.getAttribute('data-filter');
            const filterValue = tag.getAttribute('data-value');
            if (filterType && filterValue) {
                activeFilters[filterType] = filterValue;
            }
        });
        
        // 更新全局筛选条件
        currentActiveFilters = activeFilters;
        
        // 如果有搜索关键词，执行搜索
        if (currentSearchKeyword) {
            searchPatterns(currentSearchKeyword);
            return;
        }
        
        // 严格筛选：只匹配完全一致的分类/难度/尺寸
        const filteredPatterns = beadPatterns.filter(pattern => {
            // 1. 类型筛选：严格匹配（不做任何转换）
            if (activeFilters.type !== 'all' && pattern.category !== activeFilters.type) {
                return false;
            }
            
            // 2. 难度筛选：严格匹配
            if (activeFilters.difficulty !== 'all' && pattern.difficulty !== activeFilters.difficulty) {
                return false;
            }
            
            // 3. 尺寸筛选：严格按珠子数量判断
            if (activeFilters.size !== 'all') {
                const beadsCount = pattern.beadsCount || 150;
                let size;
                if (beadsCount <= 150) size = 'small';
                else if (beadsCount <= 400) size = 'medium';
                else size = 'large';
                
                if (size !== activeFilters.size) return false;
            }
            
            return true;
        });
        
        // 调试：打印筛选结果（方便你验证）
        console.log(`筛选条件：`, activeFilters);
        console.log(`筛选结果：共${filteredPatterns.length}个图纸`);
        filteredPatterns.forEach(p => console.log(`- ${p.id}: ${p.title} (category: ${p.category})`));
        
        // 渲染筛选结果
        let html = '';
        filteredPatterns.forEach(pattern => {
            html += renderPatternCard(pattern);
        });
        
        patternsContainer.innerHTML = html || '<p class="no-results">没有找到符合条件的图纸</p>';
        
        // 重新初始化动画和预览
        initPatternCardsAnimation();
        initPatternPreview();
        
        // 更新筛选结果文本
        if (filterResultsText) {
            const getText = (type, value) => {
                if (value === 'all') return `全部${type.replace('type', '类型').replace('difficulty', '难度').replace('size', '尺寸')}`;
                return document.querySelector(`.filter-tag[data-filter="${type}"][data-value="${value}"]`)?.textContent || value;
            };
            
            filterResultsText.textContent = `显示: ${getText('type', activeFilters.type)} | ${getText('difficulty', activeFilters.difficulty)} | ${getText('size', activeFilters.size)} (共${filteredPatterns.length}个图纸)`;
        }
        
        return filteredPatterns;
    }
    
    // 第一步：处理URL参数
    const noUrlParam = setFiltersFromUrl();
    
    // 第二步：默认激活"全部"标签（仅当无URL参数时）
    if (noUrlParam && currentActiveFilters.type === 'all') {
        document.querySelectorAll('.filter-tag[data-value="all"]').forEach(tag => {
            tag.classList.add('active');
        });
    }
    
    // 第三步：执行首次筛选（核心！确保URL参数生效）
    filterPatterns();
    
    // 添加筛选标签点击事件
    filterTags.forEach(tag => {
        tag.addEventListener('click', function() {
            const filterType = this.getAttribute('data-filter');
            const filterValue = this.getAttribute('data-value');
            
            // 移除同类型的所有active
            document.querySelectorAll(`.filter-tag[data-filter="${filterType}"]`).forEach(t => t.classList.remove('active'));
            
            // 激活当前标签
            this.classList.add('active');
            
            // 执行筛选
            filterPatterns();
            triggerCardAnimations();
        });
    });
    
    // 清除筛选
    clearFiltersBtn.addEventListener('click', function() {
        // 重置所有筛选标签
        document.querySelectorAll('.filter-tag').forEach(tag => {
            tag.classList.toggle('active', tag.getAttribute('data-value') === 'all');
        });
        
        // 重置全局筛选条件
        currentActiveFilters = { type: 'all', difficulty: 'all', size: 'all' };
        
        // 清除搜索
        clearSearch();
        
        // 执行筛选（而非renderAllPatterns）
        filterPatterns();
        
        // 重置提示文本
        if (filterResultsText) {
            filterResultsText.textContent = `显示全部图纸 (共${beadPatterns.length}个)`;
        }
        triggerCardAnimations();
    });
    
    // 初始化页面动画
    initLibraryAnimations();
}

// 图片悬浮预览功能（仅图片区域触发）
function initPatternPreview() {
    // 创建预览层元素（只创建一次）
    let previewLayer = document.getElementById('patternPreviewLayer');
    if (!previewLayer) {
        previewLayer = document.createElement('div');
        previewLayer.id = 'patternPreviewLayer';
        previewLayer.className = 'pattern-preview';
        previewLayer.innerHTML = '<img src="" alt="图纸预览">';
        document.body.appendChild(previewLayer);
    }
    
    const previewImg = previewLayer.querySelector('img');
    // 只选择图片区域，而非整个卡片
    const patternImages = document.querySelectorAll('.pattern-image');
    
    // 为每个图片区域绑定事件
    patternImages.forEach(imageContainer => {
        const card = imageContainer.closest('.pattern-card');
        if (!card) return;
        
        // 鼠标进入图片区域
        imageContainer.addEventListener('mouseenter', function(e) {
            const imgSrc = card.getAttribute('data-image');
            if (!imgSrc) return;
            
            previewImg.src = imgSrc;
            previewImg.onerror = function() {
                this.src = `https://via.placeholder.com/600x400/F8C8DC/333333?text=${encodeURIComponent(card.querySelector('.pattern-title').textContent)}`;
            };
            
            previewLayer.classList.add('show');
            updatePreviewPosition(e, previewLayer);
        });
        
        // 鼠标移动跟随
        imageContainer.addEventListener('mousemove', function(e) {
            if (previewLayer.classList.contains('show')) {
                updatePreviewPosition(e, previewLayer);
            }
        });
        
        // 鼠标离开隐藏
        imageContainer.addEventListener('mouseleave', function() {
            previewLayer.classList.remove('show');
            setTimeout(() => previewImg.src = '', 200);
        });
    });
    
    // 更新预览层位置（避免超出屏幕）
    function updatePreviewPosition(e, layer) {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        const layerWidth = layer.offsetWidth;
        const layerHeight = layer.offsetHeight;
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        
        let left = mouseX + 10;
        let top = mouseY + 10;
        
        // 右侧超出则显示在左侧
        if (left + layerWidth > windowWidth) left = mouseX - layerWidth - 10;
        // 底部超出则向上调整
        if (top + layerHeight > windowHeight) top = mouseY - layerHeight - 10;
        
        // 确保不超出边界
        left = Math.max(10, left);
        top = Math.max(10, top);
        
        layer.style.left = `${left}px`;
        layer.style.top = `${top}px`;
    }
}

// 渲染所有图纸（仅作为备用）
function renderAllPatterns() {
    const patternsContainer = document.getElementById('libraryPatterns');
    
    if (!patternsContainer) {
        console.error('找不到图纸容器');
        return;
    }
    
    console.log('开始渲染所有图纸，数量:', beadPatterns.length);
    
    if (!beadPatterns || beadPatterns.length === 0) {
        patternsContainer.innerHTML = '<p class="no-results">暂无图纸数据</p>';
        return;
    }
    
    let html = '';
    beadPatterns.forEach(pattern => {
        html += renderPatternCard(pattern);
    });
    
    patternsContainer.innerHTML = html;
    initPatternCardsAnimation();
    initPatternPreview();
    console.log('所有图纸渲染完成');
}

// 初始化图纸页动画
function initLibraryAnimations() {
    // 筛选区域动画
    const filterCategories = document.querySelectorAll('.filter-category, .filter-difficulty, .filter-size, .filter-results');
    filterCategories.forEach((el, index) => {
        setTimeout(() => el.classList.add('animate-in'), 600 + index * 150);
    });

    // 搜索框动画
    const searchBox = document.querySelector('.search-box');
    if (searchBox) setTimeout(() => searchBox.classList.add('animate-in'), 400);

    // 筛选标签依次动画
    const filterTags = document.querySelectorAll('.filter-tag');
    filterTags.forEach((tag, index) => {
        setTimeout(() => tag.classList.add('animate-in'), 800 + index * 50);
    });

    // 图纸卡片和分页动画
    initPatternCardsAnimation();
    initPaginationAnimation();
}

// 图纸卡片滚动触发动画
function initPatternCardsAnimation() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const patternObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                patternObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // 观察所有卡片
    document.querySelectorAll('.pattern-card').forEach(card => {
        card.classList.remove('animate-in');
        patternObserver.observe(card);
    });
}

// 分页按钮动画
function initPaginationAnimation() {
    const paginationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const pageLinks = entry.target.querySelectorAll('.page-link');
                pageLinks.forEach((link, index) => {
                    setTimeout(() => link.classList.add('animate-in'), index * 80);
                });
                paginationObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    const pagination = document.querySelector('.pagination');
    if (pagination) paginationObserver.observe(pagination);
}

// 页面切换时重新触发卡片动画
function triggerCardAnimations() {
    const cards = document.querySelectorAll('.pattern-card');
    cards.forEach(card => card.classList.remove('animate-in'));
    
    setTimeout(() => {
        cards.forEach((card, index) => {
            setTimeout(() => card.classList.add('animate-in'), index * 50);
        });
    }, 100);
    
    // 重新触发分页动画
    const pageLinks = document.querySelectorAll('.page-link');
    pageLinks.forEach(link => link.classList.remove('animate-in'));
    setTimeout(() => {
        pageLinks.forEach((link, index) => {
            setTimeout(() => link.classList.add('animate-in'), index * 80);
        });
    }, 200);
}

// 核心下载函数
function downloadPatternImage(pattern) {
    return new Promise((resolve, reject) => {
        // 自定义下载文件名
        const fileName = `${pattern.title}-拼豆图纸${getImageExtension(pattern.image)}`;
        
        // 创建图片对象，处理跨域
        const img = new Image();
        img.crossOrigin = 'Anonymous';
        img.src = pattern.image;
        
        // 图片加载完成
        img.onload = function() {
            try {
                // 转为Base64下载
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0);
                
                const link = document.createElement('a');
                link.href = canvas.toDataURL('image/png');
                link.download = fileName;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                
                resolve();
            } catch (error) {
                // 备用方案：直接下载
                try {
                    const link = document.createElement('a');
                    link.href = pattern.image;
                    link.download = fileName;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    resolve();
                } catch (err) {
                    reject(err);
                }
            }
        };
        
        // 图片加载失败
        img.onerror = function(error) {
            reject(new Error(`图片加载失败：${pattern.image}`));
        };
    });
}

// 辅助函数 - 获取图片扩展名
function getImageExtension(imageUrl) {
    const ext = imageUrl.split('.').pop().toLowerCase();
    if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext)) {
        return `.${ext}`;
    }
    return '.jpg';
}

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    console.log('library.js 已加载');
    
    // 检查数据是否加载
    if (typeof beadPatterns === 'undefined') {
        console.error('图纸数据未加载，请检查 data.js 是否正确加载');
        return;
    }
    
    // 初始化筛选功能
    initFilters();
    
    // 初始化搜索功能
    initSearch();

    // 点赞、收藏、下载功能
    document.addEventListener('click', function(e) {
        // 点赞
        if (e.target.closest('.btn-like')) {
            const btn = e.target.closest('.btn-like');
            const id = btn.getAttribute('data-id');
            const pattern = beadPatterns.find(p => p.id == id);
            
            if (pattern) {
                pattern.liked = !pattern.liked;
                btn.classList.toggle('liked');
                console.log(`${pattern.title} ${pattern.liked ? '已点赞' : '取消点赞'}`);
            }
        }
        
        // 收藏
        if (e.target.closest('.btn-favorite')) {
            const btn = e.target.closest('.btn-favorite');
            const id = btn.getAttribute('data-id');
            const pattern = beadPatterns.find(p => p.id == id);
            
            if (pattern) {
                pattern.favorited = !pattern.favorited;
                btn.classList.toggle('favorited');
                console.log(`${pattern.title} ${pattern.favorited ? '已收藏' : '取消收藏'}`);
            }
        }
        
        // 下载
        if (e.target.closest('.btn-download')) {
            const btn = e.target.closest('.btn-download');
            const id = btn.getAttribute('data-id');
            const pattern = beadPatterns.find(p => p.id == id);
            
            if (pattern) {
                btn.disabled = true;
                btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 下载中...';
                
                downloadPatternImage(pattern)
                    .then(() => {
                        pattern.downloads++;
                        btn.innerHTML = `<i class="fas fa-check"></i> 已下载 (${pattern.downloads})`;
                        
                        // 更新页面下载数
                        const statsElement = btn.closest('.pattern-actions').previousElementSibling;
                        if (statsElement && statsElement.classList.contains('pattern-stats')) {
                            const downloadSpan = statsElement.querySelector('span:nth-child(2)');
                            if (downloadSpan) {
                                downloadSpan.innerHTML = `<i class="fas fa-download"></i> ${pattern.downloads}`;
                            }
                        }
                        
                        setTimeout(() => {
                            btn.innerHTML = `<i class="fas fa-download"></i> 下载图纸`;
                            btn.disabled = false;
                        }, 2000);
                    })
                    .catch((error) => {
                        btn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> 下载失败';
                        console.error('图纸下载失败:', error);
                        
                        setTimeout(() => {
                            btn.innerHTML = `<i class="fas fa-download"></i> 下载图纸`;
                            btn.disabled = false;
                        }, 2000);
                    });
            }
        }
    });
});