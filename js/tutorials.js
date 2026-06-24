// 教程页面功能
document.addEventListener('DOMContentLoaded', function() {
    console.log('tutorials.js 加载完成');
    
    // 如果教程页面有需要动态加载的内容，可以在这里添加
    // 当前 tutorial.html 已经静态写入了教程内容
    
    // 添加事件监听器
    setupTutorialEvents();
});

function setupTutorialEvents() {
    // 教程卡片点击事件
    const tutorialCards = document.querySelectorAll('.tutorial-card');
    tutorialCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // 在实际项目中，这里会跳转到教程详情页
            const tutorialId = this.getAttribute('href').split('id=')[1];
            console.log('查看教程:', tutorialId);
            
            // 从数据中查找教程详情
            const tutorial = ironingTutorials.find(t => t.id == tutorialId);
            if (tutorial) {
                // 增加浏览量
                tutorial.views++;
                
                // 更新页面上的浏览量显示（如果存在）
                const viewElement = this.querySelector('.tutorial-meta span:last-child');
                if (viewElement) {
                    const currentViews = tutorial.views;
                    viewElement.innerHTML = `<i class="fas fa-eye"></i> ${currentViews}次观看`;
                }
            }
        });
    });
    
    // <li><a href="shops.html">商家推荐</a></li>点击事件
    const quickLinks = document.querySelectorAll('.quick-link');
    quickLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const linkText = this.querySelector('span').textContent;
            console.log('<li><a href="shops.html">商家推荐</a></li>:', linkText);
        });
    });
}