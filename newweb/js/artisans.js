// 传承人物页面 - 专用JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // 传承人筛选功能
    const filterButtons = document.querySelectorAll('.filter-btn');
    const artisanCards = document.querySelectorAll('.artisan-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 移除所有按钮的active类
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // 为当前点击的按钮添加active类
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // 显示/隐藏传承人卡片
            artisanCards.forEach(card => {
                if (filterValue === 'all') {
                    card.style.display = 'flex';
                } else {
                    const cardCategories = card.getAttribute('data-category');
                    if (cardCategories.includes(filterValue)) {
                        card.style.display = 'flex';
                    } else {
                        card.style.display = 'none';
                    }
                }
                
                // 添加淡入动画
                if (card.style.display === 'flex') {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                    }, 100);
                }
            });
        });
    });
    
    // 传承人详情模态框
    const modal = document.getElementById('artisanModal');
    const viewDetailButtons = document.querySelectorAll('.view-detail');
    const closeModalButton = document.querySelector('.close-modal');
    
    // 传承人数据
    const artisansData = {
        1: {
            name: '李建国',
            level: '国家级非遗传承人',
            years: '68年',
            birth: '1955年',
            hometown: '四川成都',
            master: '祖父李老先生',
            achievements: [
                '1978年被认定为国家级非物质文化遗产代表性传承人',
                '作品《百鸟朝凤》获全国民间工艺美术金奖',
                '培养糖画传承人二十余名',
                '出版《糖画技艺大全》专著',
                '多次代表中国参加国际文化交流活动'
            ],
            style: '李建国师傅的糖画作品以线条流畅、造型生动著称，尤其擅长绘制龙凤、花鸟等传统题材。他的作品既保留了传统糖画的精髓，又在细节表现上有所创新，形成了独特的艺术风格。',
            philosophy: '"糖画不仅是技艺，更是文化。我们不仅要传承技法，更要传承糖画背后的文化内涵和精神价值。我希望通过教学，让更多年轻人了解并爱上这门传统艺术。"'
        },
        2: {
            name: '王秀英',
            level: '省级非遗传承人',
            years: '42年',
            birth: '1963年',
            hometown: '江苏南京',
            master: '父亲王师傅',
            achievements: [
                '开创"彩糖画"新形式，将糖画与国画、油画技法结合',
                '作品《花开富贵》获省级工艺美术大奖',
                '举办个人糖画艺术展10余场',
                '开发糖画文创产品系列',
                '建立"秀英糖画工作室"培养年轻传承人'
            ],
            style: '王秀英师傅在传统糖画基础上创新，将天然植物色素融入糖浆，创作出色彩丰富的"彩糖画"。她的作品既有传统糖画的灵动，又有现代艺术的审美，深受年轻人喜爱。',
            philosophy: '"传统不是一成不变的，它需要与时代对话。我的使命是让糖画这门古老技艺穿上时代的新衣，让更多人看到它的美。"'
        },
        3: {
            name: '张明华',
            level: '地方级非遗传承人',
            years: '35年',
            birth: '1968年',
            hometown: '陕西西安',
            master: '民间艺人张师傅',
            achievements: [
                '编写《糖画基础教程》被多所中小学列为美术选修教材',
                '在200多所学校开展糖画教学',
                '出版糖画相关著作15部',
                '建立糖画教学视频库，线上学员超过5万人',
                '发起"糖画进校园"公益项目'
            ],
            style: '张明华师傅的糖画作品注重教育性和普及性，擅长将复杂的图案简化，便于初学者学习。他的作品风格朴实自然，强调糖画的趣味性和可学性。',
            philosophy: '"糖画教育要从娃娃抓起。我的目标是让每个孩子都有机会接触这门传统艺术，让糖画成为他们童年甜蜜的记忆。"'
        },
        4: {
            name: '陈晓峰',
            level: '家族第五代传人',
            years: '12年',
            birth: '1992年',
            hometown: '广东广州',
            master: '父亲陈师傅',
            achievements: [
                '通过社交媒体平台传播糖画文化，粉丝超过500万',
                '制作糖画教学短视频50余部，累计播放量超10亿',
                '与多个知名品牌合作推出联名糖画作品',
                '将糖画与AR技术结合，开发"数字糖画"体验',
                '举办线上糖画直播教学，单场观众超100万人'
            ],
            style: '陈晓峰师傅将传统糖画与数字媒体结合，创作出符合当代审美的糖画作品。他擅长将流行文化元素融入传统糖画，让古老技艺焕发青春活力。',
            philosophy: '"传统技艺需要拥抱新时代。我用年轻人喜欢的方式讲述糖画故事，让非遗'活'在当下，'火'在线上。"'
        },
        5: {
            name: '刘爱珍',
            level: '省级非遗传承人',
            years: '48年',
            birth: '1960年',
            hometown: '浙江杭州',
            master: '母亲刘师傅',
            achievements: [
                '发表糖画技艺研究论文30余篇',
                '获得糖画制作相关专利8项',
                '建立糖画技艺数据库，收录500多种传统图案',
                '主持省级非遗研究课题3项',
                '编著《中国糖画技艺流变史》'
            ],
            style: '刘爱珍师傅的糖画作品注重学术性和系统性，她擅长复原古代糖画技法，并对传统图案进行系统性整理。她的作品具有历史研究价值。',
            philosophy: '"糖画不仅是艺术创作，更是学术研究对象。我们需要用科学的方法记录、研究和保护这门技艺，为后人留下完整的糖画档案。"'
        },
        6: {
            name: '赵国庆',
            level: '地方级非遗传承人',
            years: '43年',
            birth: '1962年',
            hometown: '河南开封',
            master: '街头艺人赵师傅',
            achievements: [
                '坚持街头糖画艺术40余年，参与庙会超过1000场',
                '现场制作糖画作品超过6万件',
                '被媒体称为"活着的糖画记忆"',
                '培养民间糖画艺人30余名',
                '获"民间艺术守护者"荣誉称号'
            ],
            style: '赵国庆师傅的糖画作品充满生活气息和民间趣味，他擅长根据顾客要求即兴创作，作品生动自然，反映了普通民众的审美趣味和生活智慧。',
            philosophy: '"糖画的生命力在民间，在街头。我的舞台就是庙会、集市，我的观众就是普通百姓。只要百姓还喜欢，糖画就不会消失。"'
        }
    };
    
    // 打开传承人详情模态框
    viewDetailButtons.forEach(button => {
        button.addEventListener('click', function() {
            const artisanId = this.getAttribute('data-artisan');
            const artisanData = artisansData[artisanId];
            
            if (artisanData) {
                // 更新模态框内容
                document.getElementById('modalArtisanName').textContent = artisanData.name;
                document.getElementById('modalLevel').textContent = artisanData.level;
                document.getElementById('modalYears').textContent = artisanData.years;
                document.getElementById('modalBirth').textContent = artisanData.birth;
                document.getElementById('modalHometown').textContent = artisanData.hometown;
                document.getElementById('modalMaster').textContent = artisanData.master;
                
                // 更新成就列表
                const achievementsList = document.getElementById('modalAchievements');
                achievementsList.innerHTML = '';
                artisanData.achievements.forEach(achievement => {
                    const li = document.createElement('li');
                    li.textContent = achievement;
                    achievementsList.appendChild(li);
                });
                
                document.getElementById('modalStyle').textContent = artisanData.style;
                document.getElementById('modalPhilosophy').textContent = artisanData.philosophy;
                
                // 更新传承人头像
                const modalImage = document.querySelector('.modal-artisan-image .img-placeholder');
                modalImage.className = `img-placeholder artisan${artisanId}-large`;
                modalImage.querySelector('span').textContent = artisanData.name.substring(0, 3);
                
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
    
    // 模态框按钮功能
    document.getElementById('viewWorksBtn').addEventListener('click', function() {
        const artisanName = document.getElementById('modalArtisanName').textContent;
        alert(`在实际网站中，这里将跳转到${artisanName}师傅的作品页面。`);
    });
    
    document.getElementById('contactBtn').addEventListener('click', function() {
        const artisanName = document.getElementById('modalArtisanName').textContent;
        alert(`在实际网站中，这里将打开联系${artisanName}师傅的表单。`);
    });
    
    // 视频播放功能
    const videoPlayBtn = document.querySelector('.interview-video-placeholder .play-btn');
    const videoPlaceholder = document.querySelector('.interview-video-placeholder');
    
    if (videoPlayBtn) {
        videoPlayBtn.addEventListener('click', function() {
            videoPlaceholder.innerHTML = '<div class="loading-spinner"></div><p>视频加载中...在实际网站中这里将嵌入传承人专访视频</p>';
            videoPlaceholder.style.display = 'flex';
            videoPlaceholder.style.flexDirection = 'column';
            videoPlaceholder.style.alignItems = 'center';
            videoPlaceholder.style.justifyContent = 'center';
            
            // 模拟视频加载完成
            setTimeout(() => {
                videoPlaceholder.innerHTML = '<p>传承人专访视频播放中...</p><p class="video-hint">实际网站中这里将嵌入糖画传承人专访视频</p>';
                videoPlaceholder.style.fontSize = '1.2rem';
            }, 2000);
        });
    }
    
    // 音频播放控制
    const audioPlayBtn = document.querySelector('.interview-audio .play-audio');
    const audioPauseBtn = document.querySelector('.interview-audio .pause-audio');
    const audioProgress = document.querySelector('.interview-audio .audio-progress');
    const currentTimeEl = document.querySelector('.interview-audio .current-time');
    
    if (audioPlayBtn) {
        audioPlayBtn.addEventListener('click', function() {
            this.style.display = 'none';
            if (audioPauseBtn) audioPauseBtn.style.display = 'inline-block';
            
            // 模拟音频播放
            let progressValue = 0;
            const progressInterval = setInterval(() => {
                progressValue += 0.333; // 15分钟 = 900秒，100% / 900 ≈ 0.111%/秒，这里每3秒增加1%
                if (progressValue > 100) progressValue = 100;
                audioProgress.style.width = progressValue + '%';
                
                // 更新时间
                if (currentTimeEl) {
                    const totalSeconds = 15 * 60; // 15分钟
                    const currentSeconds = Math.floor(totalSeconds * progressValue / 100);
                    const minutes = Math.floor(currentSeconds / 60);
                    const seconds = currentSeconds % 60;
                    currentTimeEl.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
                }
                
                if (progressValue >= 100) {
                    clearInterval(progressInterval);
                    audioPlayBtn.style.display = 'inline-block';
                    audioPauseBtn.style.display = 'none';
                }
            }, 100);
            
            // 存储interval ID以便暂停
            audioPlayBtn.dataset.intervalId = progressInterval;
        });
    }
    
    if (audioPauseBtn) {
        audioPauseBtn.addEventListener('click', function() {
            this.style.display = 'none';
            if (audioPlayBtn) audioPlayBtn.style.display = 'inline-block';
            
            // 清除进度更新interval
            if (audioPlayBtn.dataset.intervalId) {
                clearInterval(parseInt(audioPlayBtn.dataset.intervalId));
            }
        });
    }
    
    // 传承谱系交互
    const lineageArtisans = document.querySelectorAll('.lineage-artisan');
    
    lineageArtisans.forEach(artisan => {
        artisan.addEventListener('click', function() {
            const artisanName = this.textContent;
            
            // 在传承人卡片中查找匹配的传承人
            let found = false;
            artisanCards.forEach(card => {
                const cardName = card.querySelector('h3').textContent;
                if (cardName === artisanName) {
                    // 滚动到该传承人卡片
                    card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    
                    // 添加高亮效果
                    card.style.boxShadow = '0 0 0 3px var(--primary-amber)';
                    card.style.transition = 'box-shadow 0.3s ease';
                    
                    setTimeout(() => {
                        card.style.boxShadow = '';
                    }, 3000);
                    
                    found = true;
                }
            });
            
            if (!found) {
                alert(`在实际网站中，这里将显示${artisanName}的详细信息。`);
            }
        });
    });
    
    console.log('传承人物页面已加载完成');
});