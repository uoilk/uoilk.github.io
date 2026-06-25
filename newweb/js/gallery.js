// 作品鉴赏页面 - 专用JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // 作品筛选功能
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 移除所有按钮的active类
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // 为当前点击的按钮添加active类
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // 显示/隐藏作品卡片
            galleryItems.forEach(item => {
                if (filterValue === 'all') {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    const itemCategories = item.getAttribute('data-category');
                    if (itemCategories.includes(filterValue)) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, 100);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                }
            });
        });
    });
    
    // 作品详情模态框
    const modal = document.getElementById('galleryModal');
    const viewDetailButtons = document.querySelectorAll('.view-detail');
    const closeModalButton = document.querySelector('.modal-close');
    
    // 作品数据
    const artworksData = {
        1: {
            title: '祥龙献瑞',
            artist: '李建国',
            level: '国家级非遗传承人',
            year: '2022',
            size: '45×60cm',
            description: '此作品以传统龙形为主题，线条流畅有力，龙鳞细节精致，展现了糖画技艺的高超水平。龙身蜿蜒盘旋，龙爪锋利有力，整体气势磅礴，寓意吉祥如意、国泰民安。',
            technique: '采用传统熬糖技法，糖温控制在170°C左右，使用特制铜勺一气呵成绘制完成。龙须部分采用细糖丝拉丝技法，展现了极高的工艺难度。',
            materials: '纯天然蔗糖、麦芽糖',
            category: '十二生肖',
            tags: ['传统', '大型作品', '生肖主题']
        },
        2: {
            title: '凤凰于飞',
            artist: '王秀英',
            level: '省级非遗传承人',
            year: '2021',
            size: '40×50cm',
            description: '凤凰是中国传统文化中的吉祥神鸟，象征着美好与和平。此作品凤凰展翅高飞，羽毛层次分明，色彩过渡自然，体现了作者对传统题材的创新表现。',
            technique: '采用彩色糖画技法，在传统糖浆中添加天然植物色素，通过温度控制实现色彩的自然过渡。',
            materials: '蔗糖、天然植物色素',
            category: '神话传说',
            tags: ['彩色糖画', '创新', '神话主题']
        },
        3: {
            title: '锦鲤戏水',
            artist: '陈晓峰',
            level: '家族第五代传人',
            year: '2023',
            size: '30×40cm',
            description: '锦鲤象征好运与财富，是传统吉祥图案。此作品两条锦鲤在水中嬉戏，动态感强，水波纹理自然，展现了糖画的灵动之美。',
            technique: '采用多层叠加技法，先绘制鱼身主体，再逐层添加鱼鳞和水波细节，最后用细糖丝勾勒水花。',
            materials: '纯天然蔗糖',
            category: '花鸟鱼虫',
            tags: ['吉祥图案', '多层技法', '灵动']
        },
        4: {
            title: '花开富贵',
            artist: '刘爱珍',
            level: '省级非遗传承人',
            year: '2020',
            size: '50×70cm',
            description: '牡丹花被誉为花中之王，象征富贵吉祥。此作品采用全景式构图，牡丹花朵层次丰富，花瓣娇艳欲滴，枝叶舒展自然，展现了糖画的艺术表现力。',
            technique: '采用写实风格，通过糖浆的厚薄控制表现花瓣的透明质感，叶片采用渐变色技法。',
            materials: '蔗糖、麦芽糖',
            category: '花鸟鱼虫',
            tags: ['写实风格', '大型作品', '植物主题']
        },
        5: {
            title: '骏马奔腾',
            artist: '赵国庆',
            level: '地方级非遗传承人',
            year: '2019',
            size: '35×45cm',
            description: '骏马象征力量与速度，此作品三匹骏马奔腾向前，动态十足，肌肉线条流畅，鬃毛随风飘扬，展现了糖画对动态场景的捕捉能力。',
            technique: '采用速写式技法，快速勾勒马匹轮廓，强调动态线条，鬃毛部分采用甩糖技法表现飘逸感。',
            materials: '纯天然蔗糖',
            category: '十二生肖',
            tags: ['动态表现', '速写技法', '动物主题']
        },
        6: {
            title: '京剧脸谱',
            artist: '张明华',
            level: '地方级非遗传承人',
            year: '2022',
            size: '25×30cm',
            description: '将传统京剧脸谱艺术与糖画结合，选取经典关羽脸谱，红黑色彩对比鲜明，线条刚劲有力，展现了糖画对不同艺术形式的融合能力。',
            technique: '采用分区绘制技法，先绘制脸谱轮廓，再分区填充不同颜色糖浆，最后勾勒线条细节。',
            materials: '蔗糖、天然植物色素',
            category: '现代创意',
            tags: ['文化融合', '彩色糖画', '创新']
        }
    };
    
    // 打开作品详情模态框
    viewDetailButtons.forEach(button => {
        button.addEventListener('click', function() {
            const artworkId = this.getAttribute('data-artwork');
            const artworkData = artworksData[artworkId];
            
            if (artworkData) {
                // 更新模态框内容
                document.getElementById('modalTitle').textContent = artworkData.title;
                document.getElementById('modalArtist').textContent = artworkData.artist;
                document.getElementById('modalLevel').textContent = artworkData.level;
                document.getElementById('modalYear').textContent = artworkData.year;
                document.getElementById('modalSize').textContent = artworkData.size;
                document.getElementById('modalDescription').textContent = artworkData.description;
                document.getElementById('modalTechnique').textContent = artworkData.technique;
                document.getElementById('modalMaterials').textContent = artworkData.materials;
                document.getElementById('modalCategory').textContent = artworkData.category;
                
                // 更新标签
                const tagsContainer = document.getElementById('modalTags');
                tagsContainer.innerHTML = '';
                artworkData.tags.forEach(tag => {
                    const tagSpan = document.createElement('span');
                    tagSpan.className = 'tag';
                    tagSpan.textContent = tag;
                    tagsContainer.appendChild(tagSpan);
                });
                
                // 显示模态框
                modal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    // 关闭模态框
    closeModalButton.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    // 点击模态框外部关闭
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // 分页功能
    const pageButtons = document.querySelectorAll('.page-btn');
    const itemsPerPage = 6;
    let currentPage = 1;
    
    function updatePagination() {
        const totalItems = galleryItems.length;
        const totalPages = Math.ceil(totalItems / itemsPerPage);
        
        // 显示当前页的作品
        galleryItems.forEach((item, index) => {
            const itemPage = Math.floor(index / itemsPerPage) + 1;
            if (itemPage === currentPage) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 100);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
        
        // 更新分页按钮状态
        pageButtons.forEach(btn => {
            btn.classList.remove('active');
            if (parseInt(btn.textContent) === currentPage) {
                btn.classList.add('active');
            }
        });
    }
    
    pageButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.classList.contains('prev')) {
                if (currentPage > 1) {
                    currentPage--;
                    updatePagination();
                }
            } else if (this.classList.contains('next')) {
                const totalItems = galleryItems.length;
                const totalPages = Math.ceil(totalItems / itemsPerPage);
                if (currentPage < totalPages) {
                    currentPage++;
                    updatePagination();
                }
            } else {
                currentPage = parseInt(this.textContent);
                updatePagination();
            }
        });
    });
    
    // 初始化分页
    updatePagination();
    
    console.log('作品鉴赏页面已加载完成');
});