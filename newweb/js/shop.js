// 糖画商城页面 - 专用JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // 商品筛选功能
    const categoryButtons = document.querySelectorAll('.category-btn');
    const productCards = document.querySelectorAll('.product-card');
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 如果点击的是分页按钮，不执行筛选
            const btnText = this.textContent;
            if (btnText === '1' || btnText === '2' || btnText === '3' || btnText === '下一页') {
                return;
            }
            
            // 移除所有按钮的active类
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            // 为当前按钮添加active类
            this.classList.add('active');
            
            const categoryValue = this.getAttribute('data-category');
            
            // 筛选商品
            productCards.forEach(card => {
                if (categoryValue === 'all' || card.getAttribute('data-category') === categoryValue) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // 购物车功能
    const cartIcon = document.getElementById('cartIcon');
    const cartSidebar = document.getElementById('cartSidebar');
    const cartOverlay = document.getElementById('cartOverlay');
    const cartClose = document.getElementById('cartClose');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartItemsContainer = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const cartCount = document.getElementById('cartCount');
    const checkoutButton = document.getElementById('checkoutButton');
    
    // 初始化购物车
    let cart = JSON.parse(localStorage.getItem('sugarPaintingCart')) || [];
    updateCartDisplay();
    
    // 打开购物车
    cartIcon.addEventListener('click', function() {
        cartSidebar.classList.add('active');
        cartOverlay.classList.add('active');
    });
    
    // 关闭购物车
    cartClose.addEventListener('click', function() {
        cartSidebar.classList.remove('active');
        cartOverlay.classList.remove('active');
    });
    
    // 点击遮罩层关闭购物车
    cartOverlay.addEventListener('click', function() {
        cartSidebar.classList.remove('active');
        cartOverlay.classList.remove('active');
    });
    
    // 添加商品到购物车
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-product');
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            const productPrice = parseFloat(productCard.querySelector('.price').textContent.replace('¥', ''));
            const productImage = productCard.querySelector('.product-img').style.backgroundImage;
            
            // 检查商品是否已在购物车中
            const existingItemIndex = cart.findIndex(item => item.id === productId);
            
            if (existingItemIndex !== -1) {
                cart[existingItemIndex].quantity += 1;
            } else {
                cart.push({
                    id: productId,
                    name: productName,
                    price: productPrice,
                    quantity: 1,
                    image: productImage
                });
            }
            
            // 保存到本地存储
            localStorage.setItem('sugarPaintingCart', JSON.stringify(cart));
            
            updateCartDisplay();
            
            // 显示添加成功反馈
            showNotification('商品已成功添加到购物车！', 'success');
            
            // 按钮反馈动画
            const originalText = this.textContent;
            this.textContent = '已添加';
            this.classList.add('added');
            
            setTimeout(() => {
                this.textContent = originalText;
                this.classList.remove('added');
            }, 1000);
        });
    });
    
    // 更新购物车显示
    function updateCartDisplay() {
        // 更新购物车数量
        let totalCount = 0;
        cart.forEach(item => {
            totalCount += item.quantity;
        });
        cartCount.textContent = totalCount;
        
        // 更新购物车内容
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = `
                <div class="empty-cart">
                    <i class="fas fa-shopping-cart"></i>
                    <p>购物车还是空的</p>
                    <a href="shop.html" class="btn btn-primary" style="margin-top: 15px;">去逛逛</a>
                </div>
            `;
            cartTotal.textContent = '¥0';
            if (checkoutButton) checkoutButton.disabled = true;
            return;
        }
        
        let cartHTML = '';
        let totalPrice = 0;
        
        cart.forEach((item, index) => {
            const itemTotal = item.price * item.quantity;
            totalPrice += itemTotal;
            
            cartHTML += `
                <div class="cart-item">
                    <div class="cart-item-img" style="background-image: ${item.image};"></div>
                    <div class="cart-item-info">
                        <h4>${item.name}</h4>
                        <div class="cart-item-details">
                            <div class="cart-item-price">¥${item.price.toFixed(2)}</div>
                            <div class="cart-item-quantity">
                                <button class="quantity-btn decrease" data-index="${index}">-</button>
                                <span class="quantity">${item.quantity}</span>
                                <button class="quantity-btn increase" data-index="${index}">+</button>
                            </div>
                            <div class="cart-item-total">¥${itemTotal.toFixed(2)}</div>
                        </div>
                        <button class="remove-item" data-index="${index}">删除</button>
                    </div>
                </div>
            `;
        });
        
        cartItemsContainer.innerHTML = cartHTML;
        cartTotal.textContent = `¥${totalPrice.toFixed(2)}`;
        
        if (checkoutButton) checkoutButton.disabled = false;
        
        // 为购物车项按钮添加事件
        document.querySelectorAll('.quantity-btn.decrease').forEach(btn => {
            btn.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                if (cart[index].quantity > 1) {
                    cart[index].quantity -= 1;
                } else {
                    cart.splice(index, 1);
                }
                saveAndUpdateCart();
            });
        });
        
        document.querySelectorAll('.quantity-btn.increase').forEach(btn => {
            btn.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                cart[index].quantity += 1;
                saveAndUpdateCart();
            });
        });
        
        document.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                cart.splice(index, 1);
                saveAndUpdateCart();
                showNotification('商品已从购物车移除', 'info');
            });
        });
    }
    
    // 保存购物车并更新显示
    function saveAndUpdateCart() {
        localStorage.setItem('sugarPaintingCart', JSON.stringify(cart));
        updateCartDisplay();
    }
    
    // 结账功能
    if (checkoutButton) {
        checkoutButton.addEventListener('click', function() {
            if (cart.length === 0) {
                showNotification('购物车为空，无法结账', 'warning');
                return;
            }
            
            // 在实际网站中，这里会跳转到结账页面
            showNotification('跳转到结账页面...', 'info');
            
            // 模拟结账过程
            setTimeout(() => {
                cart = [];
                saveAndUpdateCart();
                showNotification('订单提交成功！感谢您的购买。', 'success');
                cartSidebar.classList.remove('active');
                cartOverlay.classList.remove('active');
            }, 1000);
        });
    }
    
    // 显示通知
    function showNotification(message, type) {
        // 检查是否已有通知
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // 创建通知元素
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
                <span>${message}</span>
            </div>
        `;
        
        // 样式
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#F44336' : '#2196F3'};
            color: white;
            padding: 15px 20px;
            border-radius: 5px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10000;
            animation: slideIn 0.3s ease, fadeOut 0.3s ease 2.7s forwards;
            max-width: 300px;
        `;
        
        document.body.appendChild(notification);
        
        // 3秒后自动移除
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 3000);
    }
    
    // 分页功能
    const pageButtons = document.querySelectorAll('.page-btn');
    const productsPerPage = 6;
    let currentPage = 1;
    
    function updateShopPagination() {
        const filteredProducts = Array.from(productCards).filter(card => {
            const category = document.querySelector('.category-btn.active').getAttribute('data-category');
            return category === 'all' || card.getAttribute('data-category') === category;
        });
        
        const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
        
        // 显示当前页的商品
        filteredProducts.forEach((product, index) => {
            const productPage = Math.floor(index / productsPerPage) + 1;
            if (productPage === currentPage) {
                product.style.display = 'block';
                setTimeout(() => {
                    product.style.opacity = '1';
                    product.style.transform = 'translateY(0)';
                }, 100);
            } else {
                product.style.opacity = '0';
                product.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    product.style.display = 'none';
                }, 300);
            }
        });
        
        // 更新分页按钮状态
        pageButtons.forEach(btn => {
            if (btn.classList.contains('page-number')) {
                const pageNum = parseInt(btn.textContent);
                btn.style.display = pageNum <= totalPages ? 'inline-block' : 'none';
                
                if (pageNum === currentPage) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            }
        });
        
        // 更新上一页/下一页按钮状态
        document.querySelector('.page-btn.prev').disabled = currentPage === 1;
        document.querySelector('.page-btn.next').disabled = currentPage === totalPages;
    }
    
    pageButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.classList.contains('prev')) {
                if (currentPage > 1) {
                    currentPage--;
                    updateShopPagination();
                }
            } else if (this.classList.contains('next')) {
                const filteredProducts = Array.from(productCards).filter(card => {
                    const category = document.querySelector('.category-btn.active').getAttribute('data-category');
                    return category === 'all' || card.getAttribute('data-category') === category;
                });
                
                const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
                if (currentPage < totalPages) {
                    currentPage++;
                    updateShopPagination();
                }
            } else if (this.classList.contains('page-number')) {
                currentPage = parseInt(this.textContent);
                updateShopPagination();
            }
        });
    });
    
    // 初始化分页
    updateShopPagination();
    
    console.log('糖画商城页面已加载完成');
});