// 关于我们页面功能
document.addEventListener('DOMContentLoaded', function() {
    // 初始化平台数据
    initializePlatformStats();
    
    // 初始化团队成员交互
    initializeTeamInteractions();
    
    // 初始化订阅表单
    initializeSubscribeForm();
    
    // 初始化平台统计数据
    function initializePlatformStats() {
        // 模拟统计数据增长动画
        const stats = [
            { id: 'patternsCount', target: 1234, duration: 2000 },
            { id: 'tutorialsCount', target: 567, duration: 2000 },
            { id: 'usersCount', target: 12345, duration: 2500 },
            { id: 'downloadsCount', target: 89012, duration: 3000 }
        ];
        
        stats.forEach(stat => {
            const element = document.getElementById(stat.id);
            if (element) {
                animateCount(element, 0, stat.target, stat.duration);
            }
        });
    }
    
    // 数字增长动画
    function animateCount(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            element.textContent = value.toLocaleString();
            
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        
        window.requestAnimationFrame(step);
    }
    
    // 初始化团队成员交互
    function initializeTeamInteractions() {
        const teamMembers = document.querySelectorAll('.team-member');
        
        teamMembers.forEach(member => {
            // 鼠标悬停效果
            member.addEventListener('mouseenter', function() {
                const avatar = this.querySelector('.member-avatar');
                avatar.style.transform = 'scale(1.05)';
                avatar.style.transition = 'transform 0.3s ease';
            });
            
            member.addEventListener('mouseleave', function() {
                const avatar = this.querySelector('.member-avatar');
                avatar.style.transform = 'scale(1)';
            });
            
            // 点击显示更多信息
            member.addEventListener('click', function() {
                const memberName = this.querySelector('h3').textContent;
                const memberRole = this.querySelector('.member-role').textContent;
                const memberBio = this.querySelector('.member-bio').textContent;
                
                // 创建模态框
                showTeamMemberModal(memberName, memberRole, memberBio);
            });
        });
    }
    
    // 显示团队成员模态框
    function showTeamMemberModal(name, role, bio) {
        // 检查是否已存在模态框
        let modal = document.getElementById('teamMemberModal');
        
        if (!modal) {
            // 创建模态框
            modal = document.createElement('div');
            modal.id = 'teamMemberModal';
            modal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.5);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 1000;
                opacity: 0;
                transition: opacity 0.3s ease;
            `;
            
            const modalContent = document.createElement('div');
            modalContent.style.cssText = `
                background-color: white;
                padding: 30px;
                border-radius: 10px;
                max-width: 500px;
                width: 90%;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
                transform: translateY(-20px);
                transition: transform 0.3s ease;
            `;
            
            modalContent.innerHTML = `
                <h2 style="color: #333; margin-bottom: 10px;">${name}</h2>
                <p style="color: #F8C8DC; font-weight: 600; margin-bottom: 20px;">${role}</p>
                <p style="color: #666; line-height: 1.6; margin-bottom: 25px;">${bio}</p>
                <p style="color: #888; font-size: 14px; margin-bottom: 20px;">${getAdditionalInfo(name)}</p>
                <button id="closeModal" style="background-color: #F8C8DC; color: #333; border: none; padding: 10px 20px; border-radius: 30px; font-weight: 600; cursor: pointer;">关闭</button>
            `;
            
            modal.appendChild(modalContent);
            document.body.appendChild(modal);
            
            // 显示模态框动画
            setTimeout(() => {
                modal.style.opacity = '1';
                modalContent.style.transform = 'translateY(0)';
            }, 10);
            
            // 关闭按钮事件
            const closeBtn = document.getElementById('closeModal');
            closeBtn.addEventListener('click', function() {
                modal.style.opacity = '0';
                modalContent.style.transform = 'translateY(-20px)';
                
                setTimeout(() => {
                    document.body.removeChild(modal);
                }, 300);
            });
            
            // 点击模态框背景关闭
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    modal.style.opacity = '0';
                    modalContent.style.transform = 'translateY(-20px)';
                    
                    setTimeout(() => {
                        document.body.removeChild(modal);
                    }, 300);
                }
            });
        }
    }
    
    // 获取团队成员额外信息
    function getAdditionalInfo(name) {
        const additionalInfo = {
            '张设计': '张设计拥有10年拼豆设计经验，曾为多家手工品牌提供设计服务。她擅长将传统图案与现代元素结合，创造出独特的拼豆作品。',
            '李教程': '李教程专注于拼豆教学5年，制作了超过200个熨烫教程视频。她的教程以详细、易懂著称，帮助了无数拼豆新手入门。',
            '王社区': '王社区从事社区运营工作8年，擅长组织线上活动和促进用户交流。她将拼豆爱好者们聚集在一起，形成了一个温暖的创作社区。'
        };
        
        return additionalInfo[name] || '这位团队成员为豆趣工坊的发展做出了重要贡献。';
    }
    
    // 初始化订阅表单
    function initializeSubscribeForm() {
        const subscribeForm = document.querySelector('.subscribe-form');
        
        if (subscribeForm) {
            subscribeForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const emailInput = this.querySelector('input[type="email"]');
                const email = emailInput.value.trim();
                
                if (!email) {
                    alert('请输入邮箱地址！');
                    emailInput.focus();
                    return;
                }
                
                if (!isValidEmail(email)) {
                    alert('请输入有效的邮箱地址！');
                    emailInput.focus();
                    return;
                }
                
                // 显示订阅成功
                const originalText = this.querySelector('button').textContent;
                this.querySelector('button').innerHTML = '<i class="fas fa-spinner fa-spin"></i> 订阅中...';
                
                setTimeout(() => {
                    alert(`感谢您的订阅！我们已将确认邮件发送到 ${email}，请查收。`);
                    emailInput.value = '';
                    this.querySelector('button').innerHTML = originalText;
                }, 1500);
            });
        }
    }
    
    // 验证邮箱格式
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // 添加页面滚动动画
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // 观察页面元素
    document.querySelectorAll('.about-section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
});