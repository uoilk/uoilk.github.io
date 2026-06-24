// 熨烫教程详情页功能
document.addEventListener('DOMContentLoaded', function() {
    // 获取URL中的教程ID
    const urlParams = new URLSearchParams(window.location.search);
    const tutorialId = urlParams.get('id') || 1;
    
    // 完整的教程数据
    const allTutorials = [
        { 
            id: 1, 
            title: '基础熨烫技巧', 
            duration: '15分钟', 
            level: '初级', 
            views: 543,
            author: '张老师',
            description: '适合新手的入门熨烫技巧，讲解拼豆熨烫的基本方法和注意事项。'
        },
        { 
            id: 2, 
            title: '多层拼豆熨烫', 
            duration: '25分钟', 
            level: '中级', 
            views: 321,
            author: '李老师',
            description: '学习多层拼豆作品的熨烫技巧，确保每一层都能完美融合。'
        },
        { 
            id: 3, 
            title: '避免熨烫过度', 
            duration: '12分钟', 
            level: '初级', 
            views: 289,
            author: '王老师',
            description: '如何避免熨烫过度导致拼豆变形，保持作品的美观度。'
        },
        { 
            id: 4, 
            title: '专业级熨烫方法', 
            duration: '30分钟', 
            level: '高级', 
            views: 198,
            author: '赵老师',
            description: '专业级熨烫技巧，适合复杂图案和大尺寸作品的制作。'
        },
        { 
            id: 5, 
            title: '拼豆熨烫温度控制', 
            duration: '18分钟', 
            level: '初级', 
            views: 156,
            author: '陈老师',
            description: '学习如何控制熨烫温度，根据不同拼豆材料调整最佳温度。'
        },
        { 
            id: 6, 
            title: '大尺寸作品熨烫', 
            duration: '35分钟', 
            level: '高级', 
            views: 89,
            author: '刘老师',
            description: '大尺寸拼豆作品的熨烫方法和技巧，确保作品平整无气泡。'
        }
    ];
    
    // 查找当前教程
    const currentTutorial = allTutorials.find(tutorial => tutorial.id == tutorialId) || allTutorials[0];
    
    // 更新页面内容
    document.getElementById('tutorialTitle').textContent = currentTutorial.title;
    document.getElementById('tutorialDuration').textContent = currentTutorial.duration;
    document.getElementById('tutorialLevel').textContent = currentTutorial.level;
    document.getElementById('tutorialViews').textContent = currentTutorial.views;
    document.getElementById('tutorialAuthor').textContent = currentTutorial.author;
    
    // 生成教程步骤
    generateTutorialSteps(tutorialId);
    
    // 生成工具和材料列表
    generateshopsAndMaterials(tutorialId);
    
    // 生成注意事项
    generateTips(tutorialId);
    
    // 加载评论
    loadComments();
    
    // 评论表单提交
    document.querySelector('.add-comment button').addEventListener('click', function() {
        const textarea = document.querySelector('.add-comment textarea');
        if (textarea.value.trim()) {
            addNewComment(textarea.value);
            textarea.value = '';
            alert('评论已提交！');
        } else {
            alert('请输入评论内容！');
        }
    });
    
    // 生成教程步骤
    function generateTutorialSteps(tutorialId) {
        const stepsContainer = document.getElementById('tutorialSteps');
        stepsContainer.innerHTML = '';
        
        let steps = [];
        
        // 根据不同教程ID生成不同的步骤
        switch(tutorialId) {
            case '1': // 基础熨烫技巧
                steps = [
                    {
                        title: '准备工作',
                        description: '准备好拼豆作品、熨斗、熨烫纸和隔热垫。确保熨斗已预热到适当温度。'
                    },
                    {
                        title: '放置熨烫纸',
                        description: '将熨烫纸平整地覆盖在拼豆作品上，确保完全覆盖，没有褶皱。'
                    },
                    {
                        title: '开始熨烫',
                        description: '用熨斗以画小圆圈的方式轻轻熨烫，从中心开始向外移动。'
                    },
                    {
                        title: '检查融合程度',
                        description: '轻轻掀起熨烫纸一角，检查拼豆是否已融合。如未完全融合，继续熨烫。'
                    },
                    {
                        title: '冷却定型',
                        description: '等待作品完全冷却后，再轻轻取下，确保拼豆完全固定。'
                    }
                ];
                break;
            case '2': // 多层拼豆熨烫
                steps = [
                    {
                        title: '分层熨烫',
                        description: '先熨烫底层拼豆，确保完全融合后冷却，再放置第二层。'
                    },
                    {
                        title: '层间固定',
                        description: '在两层之间使用少量拼豆胶水固定，确保位置准确。'
                    },
                    {
                        title: '整体熨烫',
                        description: '多层放置完成后，进行整体轻熨烫，使各层完美结合。'
                    }
                ];
                break;
            default:
                steps = [
                    {
                        title: '准备工作',
                        description: '准备好所有材料和工具，确保工作区域整洁安全。'
                    },
                    {
                        title: '按照步骤操作',
                        description: '仔细遵循教程步骤，注意每个细节。'
                    },
                    {
                        title: '耐心操作',
                        description: '熨烫需要耐心，不要急于求成，确保每一步都做到位。'
                    },
                    {
                        title: '安全第一',
                        description: '使用熨斗时注意安全，避免烫伤，完成后及时关闭电源。'
                    }
                ];
        }
        
        steps.forEach((step, index) => {
            const stepElement = document.createElement('div');
            stepElement.className = 'step-item';
            stepElement.innerHTML = `
                <div class="step-number">${index + 1}</div>
                <div class="step-content">
                    <h3>${step.title}</h3>
                    <p>${step.description}</p>
                </div>
            `;
            stepsContainer.appendChild(stepElement);
        });
    }
    
    // 生成工具和材料列表
    function generateshopsAndMaterials(tutorialId) {
        const shopsList = document.getElementById('shopsList');
        const materialsList = document.getElementById('materialsList');
        
        shopsList.innerHTML = '';
        materialsList.innerHTML = '';
        
        let shops = [];
        let materials = [];
        
        // 根据不同教程ID生成不同的工具和材料
        switch(tutorialId) {
            case '1': // 基础熨烫技巧
                shops = ['家用熨斗', '熨烫纸', '隔热垫', '镊子'];
                materials = ['拼豆作品', '拼豆板'];
                break;
            case '2': // 多层拼豆熨烫
                shops = ['家用熨斗', '熨烫纸', '隔热垫', '镊子', '小刷子'];
                materials = ['多层拼豆作品', '拼豆胶水', '拼豆板'];
                break;
            case '3': // 避免熨烫过度
                shops = ['可调温熨斗', '熨烫纸', '隔热垫', '温度计'];
                materials = ['拼豆作品', '测试用拼豆'];
                break;
            default:
                shops = ['家用熨斗', '熨烫纸', '隔热垫'];
                materials = ['拼豆作品', '拼豆板'];
        }
        
        shops.forEach(tool => {
            const li = document.createElement('li');
            li.textContent = tool;
            shopsList.appendChild(li);
        });
        
        materials.forEach(material => {
            const li = document.createElement('li');
            li.textContent = material;
            materialsList.appendChild(li);
        });
    }
    
    // 生成注意事项
    function generateTips(tutorialId) {
        const tipsContent = document.getElementById('tipsContent');
        tipsContent.innerHTML = '';
        
        let tips = [];
        
        // 根据不同教程ID生成不同的注意事项
        switch(tutorialId) {
            case '1': // 基础熨烫技巧
                tips = [
                    '熨斗温度不宜过高，中温即可，避免烫坏拼豆。',
                    '熨烫时要保持熨斗移动，不要停留在同一位置太久。',
                    '使用熨烫纸可以防止拼豆粘在熨斗上。',
                    '熨烫完成后要让作品完全冷却再移动，否则容易变形。'
                ];
                break;
            case '2': // 多层拼豆熨烫
                tips = [
                    '每层熨烫后都要完全冷却再叠加下一层。',
                    '层间使用少量胶水可以增强结合强度。',
                    '整体熨烫时力度要轻，时间要短，避免底层过度融化。',
                    '大尺寸多层作品可能需要分段熨烫。'
                ];
                break;
            case '3': // 避免熨烫过度
                tips = [
                    '先在不重要的拼豆上测试温度。',
                    '观察拼豆边缘，开始融化时即可停止。',
                    '过度熨烫会导致拼豆变形，无法补救。',
                    '不同品牌的拼豆融化温度可能不同，需要测试。'
                ];
                break;
            default:
                tips = [
                    '使用熨斗时注意安全，避免烫伤。',
                    '在通风良好的地方进行操作。',
                    '按照教程步骤耐心操作。',
                    '如有疑问，可以在社区提问寻求帮助。'
                ];
        }
        
        const ul = document.createElement('ul');
        tips.forEach(tip => {
            const li = document.createElement('li');
            li.textContent = tip;
            ul.appendChild(li);
        });
        
        tipsContent.appendChild(ul);
    }
    
    // 加载评论
    function loadComments() {
        const commentsList = document.getElementById('commentsList');
        commentsList.innerHTML = '';
        
        const comments = [
            {
                author: '拼豆爱好者',
                date: '2023-10-15',
                content: '这个教程非常实用，讲解得很详细，我按照步骤操作一次就成功了！'
            },
            {
                author: '手工达人',
                date: '2023-10-10',
                content: '老师的讲解很清晰，特别是温度控制的部分，对我帮助很大。'
            },
            {
                author: '新手小白',
                date: '2023-10-05',
                content: '第一次尝试熨烫，按照教程做得很顺利，谢谢老师！'
            }
        ];
        
        comments.forEach(comment => {
            const commentElement = document.createElement('div');
            commentElement.className = 'comment-item';
            commentElement.innerHTML = `
                <div class="comment-header">
                    <img src="https://ui-avatars.com/api/?name=${comment.author}&background=F8C8DC&color=333" alt="${comment.author}" class="comment-avatar">
                    <div class="comment-author">
                        <h4>${comment.author}</h4>
                        <span class="comment-date">${comment.date}</span>
                    </div>
                </div>
                <div class="comment-content">
                    <p>${comment.content}</p>
                </div>
            `;
            commentsList.appendChild(commentElement);
        });
    }
    
    // 添加新评论
    function addNewComment(content) {
        const commentsList = document.getElementById('commentsList');
        
        const commentElement = document.createElement('div');
        commentElement.className = 'comment-item';
        commentElement.innerHTML = `
            <div class="comment-header">
                <img src="https://ui-avatars.com/api/?name=新用户&background=C8E6F5&color=333" alt="新用户" class="comment-avatar">
                <div class="comment-author">
                    <h4>新用户</h4>
                    <span class="comment-date">刚刚</span>
                </div>
            </div>
            <div class="comment-content">
                <p>${content}</p>
            </div>
        `;
        
        // 将新评论添加到列表顶部
        commentsList.insertBefore(commentElement, commentsList.firstChild);
    }
});