// 社区页面功能
document.addEventListener('DOMContentLoaded', function() {
    // 初始化社区数据
    initializeCommunityData();
    
    // 初始化发帖功能
    initializePostCreation();
    
    // 初始化加载更多
    initializeLoadMore();
    
    // 初始化社区数据
    function initializeCommunityData() {
        // 加载活跃用户
        loadActiveUsers();
        
        // 加载帖子列表
        loadPosts();
    }
    
    // 加载活跃用户
    function loadActiveUsers() {
        const activeUsersList = document.getElementById('activeUsersList');
        activeUsersList.innerHTML = '';
        
        const activeUsers = [
            { name: '拼豆达人', avatar: 'images/users/ai.jpg', posts: 42 },
            { name: '创意无限', avatar: 'images/users/chuan.jpg', posts: 35 },
            { name: '手工爱好者', avatar: 'images/users/gong.jpg', posts: 28 },
            { name: '熨烫专家', avatar: 'images/users/se.jpg', posts: 31 },
            { name: '色彩大师', avatar: 'images/users/wei.jpg', posts: 26 },
            { name: '图案设计师', avatar: 'images/users/yun.jpg', posts: 39 }
        ];
        
        activeUsers.forEach(user => {
            const userElement = document.createElement('li');
            const defaultAvatar = 'images/users/default.jpg';
            
            userElement.innerHTML = `
                <img src="${user.avatar}" alt="${user.name}" 
                     style="width: 40px; height: 40px; border-radius: 50%; object-fit: cover; object-position: center; border: 2px solid #F8C8DC;"
                     onerror="this.src='${defaultAvatar}'; this.onerror=null;">
                <div>
                    <h4>${user.name}</h4>
                    <span>${user.posts} 个作品</span>
                </div>
            `;
            activeUsersList.appendChild(userElement);
        });
    }
    
    // 加载帖子列表
    function loadPosts() {
        const postsList = document.getElementById('postsList');
        
        // 模拟帖子数据
        const postsData = [
            {
                id: 1,
                author: '拼豆爱好者',
                avatar: 'images/users/tan.jpg',
                date: '2023-10-20',
                content: '今天完成了我的第一个立体拼豆作品！是一个小房子，虽然花了很长时间，但是看到成品真的好有成就感！',
                image: '',
                likes: 24,
                comments: 8
            },
            {
                id: 2,
                author: '手工达人',
                avatar: 'images/users/zhang.jpg',
                date: '2023-10-18',
                content: '分享一个拼豆色彩搭配的小技巧：使用相邻色系的拼豆可以营造和谐感，对比色则能让图案更突出。',
                image: '',
                likes: 31,
                comments: 12
            },
            {
                id: 3,
                author: '熨烫专家',
                avatar: 'images/users/xin.jpg',
                date: '2023-10-15',
                content: '我发现使用蒸汽熨斗比普通熨斗更适合拼豆熨烫，温度更均匀，不容易烫坏拼豆。大家有试过吗？',
                image: '',
                likes: 18,
                comments: 15
            },
            {
                id: 4,
                author: '图案设计师',
                avatar: 'images/users/wang.jpg',
                date: '2023-10-12',
                content: '最近设计了一组十二生肖的拼豆图案，已经上传到图纸库了，欢迎大家下载制作！',
                image: '',
                likes: 42,
                comments: 22
            },
            {
                id: 5,
                author: '拼豆新手',
                avatar: 'images/users/shou.jpg',
                date: '2023-10-10',
                content: '第一次尝试拼豆，做了一个简单的爱心图案。虽然有点歪，但是自己做的还是很开心！',
                image: '',
                likes: 15,
                comments: 5
            },
            {
                id: 6,
                author: '色彩大师',
                avatar: 'images/users/qian.jpg',
                date: '2023-10-08',
                content: '推荐几个适合拼豆的配色方案：蓝粉搭配（少女心）、绿黄搭配（清新）、黑白灰（简约）。',
                image: '',
                likes: 29,
                comments: 9
            }
        ];
        
        postsData.forEach(post => {
            const postElement = document.createElement('div');
            postElement.className = 'post-item';
            const defaultAvatar = 'images/users/default.jpg';
            
            postElement.innerHTML = `
                <div class="post-header">
                    <img src="${post.avatar}" alt="${post.author}" 
                         style="width: 50px; height: 50px; border-radius: 50%; object-fit: cover; object-position: center; border: 2px solid #F8C8DC;"
                         onerror="this.src='${defaultAvatar}'; this.onerror=null;">
                    <div class="post-author-info">
                        <h4>${post.author}</h4>
                        <span class="post-date">${post.date}</span>
                    </div>
                </div>
                <div class="post-content">
                    <p>${post.content}</p>
                </div>
                ${post.image ? `<div class="post-image"><img src="${post.image}" alt="作品图片"></div>` : ''}
                <div class="post-stats">
                    <span><i class="fas fa-heart"></i> ${post.likes} 喜欢</span>
                    <span><i class="fas fa-comment"></i> ${post.comments} 评论</span>
                    <span><i class="fas fa-share"></i> 分享</span>
                </div>
            `;
            postsList.appendChild(postElement);
        });
    }
    
    // 初始化发帖功能
    function initializePostCreation() {
        const postTextarea = document.querySelector('.post-input textarea');
        const postBtn = document.querySelector('.post-input .btn-primary');
        const addImageBtn = document.querySelector('.post-input .btn-outline');
        
        // 添加图片按钮点击
        addImageBtn.addEventListener('click', function() {
            // 创建文件输入
            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.accept = 'image/*';
            fileInput.style.display = 'none';
            
            fileInput.addEventListener('change', function() {
                if (this.files.length > 0) {
                    const file = this.files[0];
                    const reader = new FileReader();
                    
                    reader.onload = function(e) {
                        // 显示图片预览
                        const postInput = document.querySelector('.post-input');
                        let imagePreview = document.querySelector('.image-preview');
                        
                        if (!imagePreview) {
                            imagePreview = document.createElement('div');
                            imagePreview.className = 'image-preview';
                            postInput.appendChild(imagePreview);
                        }
                        
                        imagePreview.innerHTML = `
                            <img src="${e.target.result}" alt="预览图片" style="max-width: 200px; border-radius: 8px; margin-top: 10px;">
                            <button type="button" class="remove-image" style="background: #ff4444; color: white; border: none; border-radius: 50%; width: 24px; height: 24px; margin-left: 10px; cursor: pointer;">×</button>
                        `;
                        
                        // 移除图片按钮
                        const removeBtn = imagePreview.querySelector('.remove-image');
                        removeBtn.addEventListener('click', function() {
                            imagePreview.remove();
                        });
                    };
                    
                    reader.readAsDataURL(file);
                }
            });
            
            document.body.appendChild(fileInput);
            fileInput.click();
            document.body.removeChild(fileInput);
        });
        
        // 发帖按钮点击
        postBtn.addEventListener('click', function() {
            const content = postTextarea.value.trim();
            
            if (!content) {
                alert('请输入帖子内容！');
                postTextarea.focus();
                return;
            }
            
            // 创建新帖子
            const postsList = document.getElementById('postsList');
            const newPost = document.createElement('div');
            newPost.className = 'post-item';
            
            // 获取图片预览
            const imagePreview = document.querySelector('.image-preview img');
            const imageSrc = imagePreview ? imagePreview.src : '';
            
            newPost.innerHTML = `
                <div class="post-header">
                    <img src="images/users/default.jpg" alt="用户" style="width: 50px; height: 50px; border-radius: 50%; object-fit: cover; object-position: center; border: 2px solid #F8C8DC;">
                    <div class="post-author-info">
                        <h4>用户</h4>
                        <span class="post-date">刚刚</span>
                    </div>
                </div>
                <div class="post-content">
                    <p>${content}</p>
                </div>
                ${imageSrc ? `<div class="post-image"><img src="${imageSrc}" alt="作品图片"></div>` : ''}
                <div class="post-stats">
                    <span><i class="far fa-heart"></i> 0 喜欢</span>
                    <span><i class="far fa-comment"></i> 0 评论</span>
                    <span><i class="fas fa-share"></i> 分享</span>
                </div>
            `;
            
            // 添加到帖子列表顶部
            postsList.insertBefore(newPost, postsList.firstChild);
            
            // 清空输入
            postTextarea.value = '';
            
            // 移除图片预览
            const imagePreviewContainer = document.querySelector('.image-preview');
            if (imagePreviewContainer) {
                imagePreviewContainer.remove();
            }
            
            // 更新社区统计
            updateCommunityStats();
            
            alert('帖子发布成功！');
        });
    }
    
    // 初始化加载更多
    function initializeLoadMore() {
        const loadMoreBtn = document.getElementById('loadMorePosts');
        
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', function() {
                // 显示加载中
                const originalText = this.textContent;
                this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 加载中...';
                this.disabled = true;
                
                // 模拟加载更多数据
                setTimeout(() => {
                    // 添加更多帖子
                    const postsList = document.getElementById('postsList');
                    
                    const morePosts = [
                        {
                            id: 7,
                            author: '拼豆教师',
                            avatar: 'images/users/tu.jpg',
                            date: '2023-10-05',
                            content: '在课堂上教学生们制作拼豆，孩子们都非常喜欢。拼豆不仅能培养耐心，还能锻炼手眼协调能力。',
                            image: '',
                            likes: 19,
                            comments: 7
                        },
                        {
                            id: 8,
                            author: '节日主题',
                            avatar: 'images/users/sun.jpg',
                            date: '2023-10-03',
                            content: '万圣节快到了，我做了一组南瓜和鬼魂的拼豆图案，准备装饰房间。',
                            image: '',
                            likes: 27,
                            comments: 11
                        }
                    ];
                    
                    morePosts.forEach(post => {
                        const postElement = document.createElement('div');
                        postElement.className = 'post-item';
                        const defaultAvatar = 'images/users/default.jpg';
                        
                        postElement.innerHTML = `
                            <div class="post-header">
                                <img src="${post.avatar}" alt="${post.author}" 
                                     style="width: 50px; height: 50px; border-radius: 50%; object-fit: cover; object-position: center; border: 2px solid #F8C8DC;"
                                     onerror="this.src='${defaultAvatar}'; this.onerror=null;">
                                <div class="post-author-info">
                                    <h4>${post.author}</h4>
                                    <span class="post-date">${post.date}</span>
                                </div>
                            </div>
                            <div class="post-content">
                                <p>${post.content}</p>
                            </div>
                            <div class="post-stats">
                                <span><i class="fas fa-heart"></i> ${post.likes} 喜欢</span>
                                <span><i class="fas fa-comment"></i> ${post.comments} 评论</span>
                                <span><i class="fas fa-share"></i> 分享</span>
                            </div>
                        `;
                        postsList.appendChild(postElement);
                    });
                    
                    // 恢复按钮状态
                    this.innerHTML = originalText;
                    this.disabled = false;
                    
                    alert('已加载更多帖子！');
                }, 1000);
            });
        }
    }
    
    // 更新社区统计
    function updateCommunityStats() {
        const totalMembers = document.getElementById('totalMembers');
        const totalPosts = document.getElementById('totalPosts');
        const totalComments = document.getElementById('totalComments');
        
        if (totalPosts) {
            const currentCount = parseInt(totalPosts.textContent.replace(',', ''));
            totalPosts.textContent = (currentCount + 1).toLocaleString();
        }
    }
    
    // 添加点赞功能到新帖子
    document.addEventListener('click', function(e) {
        if (e.target.closest('.fa-heart')) {
            const heartIcon = e.target.closest('.fa-heart');
            const statSpan = heartIcon.closest('span');
            
            if (heartIcon.classList.contains('far')) {
                // 未点赞 -> 点赞
                heartIcon.classList.remove('far');
                heartIcon.classList.add('fas');
                heartIcon.style.color = '#ff4444';
                
                // 更新计数
                const currentText = statSpan.textContent;
                const count = parseInt(currentText.match(/\d+/)[0]) || 0;
                statSpan.innerHTML = `<i class="fas fa-heart"></i> ${count + 1} 喜欢`;
            } else {
                // 已点赞 -> 取消点赞
                heartIcon.classList.remove('fas');
                heartIcon.classList.add('far');
                heartIcon.style.color = '';
                
                // 更新计数
                const currentText = statSpan.textContent;
                const count = parseInt(currentText.match(/\d+/)[0]) || 0;
                const newCount = Math.max(0, count - 1);
                statSpan.innerHTML = `<i class="far fa-heart"></i> ${newCount} 喜欢`;
            }
        }
    });
});