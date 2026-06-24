// 商家推荐页面交互逻辑

document.addEventListener('DOMContentLoaded', function() {
  // 小球功能现在由 main.js 统一处理
  // 不再需要 generateHeaderBubbles() 调用

  const filterTabs = document.querySelectorAll('.filter-tab');
  const shopCards = document.querySelectorAll('.shop-card');

  // 筛选功能
  filterTabs.forEach(tab => {
    tab.addEventListener('click', function() {
      const category = this.dataset.category;

      // 更新激活状态
      filterTabs.forEach(t => t.classList.remove('active'));
      this.classList.add('active');

      // 筛选商家卡片
      shopCards.forEach(card => {
        const cardCategories = card.dataset.category || '';
        
        if (category === 'all' || cardCategories.includes(category)) {
          card.classList.remove('hidden');
          card.classList.add('fade-in');
        } else {
          card.classList.add('hidden');
          card.classList.remove('fade-in');
        }
      });
    });
  });

  // 商家链接现在直接跳转，不需要额外处理

  // 入驻按钮点击效果
  const joinBtn = document.querySelector('.join-section .btn');
  if (joinBtn) {
    joinBtn.addEventListener('click', function(e) {
      e.preventDefault();
      alert('感谢您的关注！入驻功能正在开发中，敬请期待~');
    });
  }
});

// 注意：generateHeaderBubbles 函数已移动到 main.js
// 这里不再重复定义