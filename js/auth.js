// 登录和注册页面功能
document.addEventListener('DOMContentLoaded', function() {
    // 切换密码显示/隐藏
    initializePasswordToggles();
    
    // 密码强度检测（注册页面）
    initializePasswordStrength();
    
    // 用户类型选择效果
    initializeUserTypeSelection();
    
    // 兴趣标签选择效果
    initializeInterestTags();
    
    // 表单提交处理
    initializeFormSubmissions();
    
    // 第三方登录按钮
    initializeSocialLogins();
    
    // 初始化密码显示/隐藏切换
    function initializePasswordToggles() {
        const toggleButtons = document.querySelectorAll('.toggle-password');
        
        toggleButtons.forEach(button => {
            button.addEventListener('click', function() {
                const input = this.previousElementSibling;
                const icon = this.querySelector('i');
                
                if (input.type === 'password') {
                    input.type = 'text';
                    icon.classList.remove('fa-eye');
                    icon.classList.add('fa-eye-slash');
                } else {
                    input.type = 'password';
                    icon.classList.remove('fa-eye-slash');
                    icon.classList.add('fa-eye');
                }
            });
        });
    }
    
    // 初始化密码强度检测
    function initializePasswordStrength() {
        const passwordInput = document.getElementById('registerPassword');
        
        if (passwordInput) {
            passwordInput.addEventListener('input', function() {
                const password = this.value;
                const strengthBar = document.querySelector('.strength-bar');
                const strengthText = document.querySelector('.strength-text');
                
                if (!strengthBar || !strengthText) return;
                
                // 计算密码强度
                let strength = 0;
                let strengthClass = 'weak';
                let strengthLabel = '弱';
                
                // 长度检查
                if (password.length >= 8) strength += 1;
                if (password.length >= 12) strength += 1;
                
                // 包含小写字母
                if (/[a-z]/.test(password)) strength += 1;
                
                // 包含大写字母
                if (/[A-Z]/.test(password)) strength += 1;
                
                // 包含数字
                if (/[0-9]/.test(password)) strength += 1;
                
                // 包含特殊字符
                if (/[^A-Za-z0-9]/.test(password)) strength += 1;
                
                // 根据强度设置样式和文本
                if (strength <= 2) {
                    strengthClass = 'weak';
                    strengthLabel = '弱';
                } else if (strength <= 4) {
                    strengthClass = 'medium';
                    strengthLabel = '中等';
                } else {
                    strengthClass = 'strong';
                    strengthLabel = '强';
                }
                
                // 更新显示
                strengthBar.className = 'strength-bar ' + strengthClass;
                strengthText.textContent = '密码强度：' + strengthLabel;
            });
        }
    }
    
    // 初始化用户类型选择效果
    function initializeUserTypeSelection() {
        const userTypeOptions = document.querySelectorAll('.user-type-option');
        
        userTypeOptions.forEach(option => {
            const radio = option.querySelector('input[type="radio"]');
            const card = option.querySelector('.user-type-card');
            
            if (radio && card) {
                // 初始选中状态
                if (radio.checked) {
                    card.classList.add('selected');
                }
                
                // 点击卡片选择
                card.addEventListener('click', function() {
                    // 移除其他选项的选中状态
                    userTypeOptions.forEach(opt => {
                        opt.querySelector('.user-type-card').classList.remove('selected');
                    });
                    
                    // 添加当前选项的选中状态
                    this.classList.add('selected');
                    
                    // 选中对应的radio
                    radio.checked = true;
                });
                
                // radio变化时更新卡片状态
                radio.addEventListener('change', function() {
                    if (this.checked) {
                        // 移除其他选项的选中状态
                        userTypeOptions.forEach(opt => {
                            opt.querySelector('.user-type-card').classList.remove('selected');
                        });
                        
                        // 添加当前选项的选中状态
                        card.classList.add('selected');
                    }
                });
            }
        });
    }
    
    // 初始化兴趣标签选择效果
    function initializeInterestTags() {
        const interestTags = document.querySelectorAll('.interest-tag');
        
        interestTags.forEach(tag => {
            const checkbox = tag.querySelector('input[type="checkbox"]');
            const span = tag.querySelector('span');
            
            if (checkbox && span) {
                // 点击标签切换选中状态
                tag.addEventListener('click', function() {
                    checkbox.checked = !checkbox.checked;
                    updateTagSelection(this, checkbox.checked);
                });
                
                // 初始状态
                updateTagSelection(tag, checkbox.checked);
                
                // checkbox变化时更新标签状态
                checkbox.addEventListener('change', function() {
                    updateTagSelection(tag, this.checked);
                });
            }
        });
        
        function updateTagSelection(tag, isChecked) {
            if (isChecked) {
                tag.classList.add('selected');
            } else {
                tag.classList.remove('selected');
            }
        }
    }
    
    // 初始化表单提交
    function initializeFormSubmissions() {
        // 登录表单
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                if (validateLoginForm()) {
                    submitLoginForm();
                }
            });
        }
        
        // 注册表单
        const registerForm = document.getElementById('registerForm');
        if (registerForm) {
            registerForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                if (validateRegisterForm()) {
                    submitRegisterForm();
                }
            });
        }
    }
    
    // 验证登录表单
    function validateLoginForm() {
        const email = document.getElementById('loginEmail');
        const password = document.getElementById('loginPassword');
        
        let isValid = true;
        
        // 验证邮箱
        if (!email.value.trim()) {
            showError(email, '请输入邮箱地址');
            isValid = false;
        } else if (!isValidEmail(email.value)) {
            showError(email, '请输入有效的邮箱地址');
            isValid = false;
        } else {
            clearError(email);
        }
        
        // 验证密码
        if (!password.value.trim()) {
            showError(password, '请输入密码');
            isValid = false;
        } else if (password.value.length < 6) {
            showError(password, '密码长度至少6位');
            isValid = false;
        } else {
            clearError(password);
        }
        
        return isValid;
    }
    
    // 验证注册表单
    function validateRegisterForm() {
        const username = document.getElementById('registerUsername');
        const email = document.getElementById('registerEmail');
        const password = document.getElementById('registerPassword');
        const confirmPassword = document.getElementById('confirmPassword');
        const agreeTerms = document.getElementById('agreeTerms');
        
        let isValid = true;
        
        // 验证用户名
        if (!username.value.trim()) {
            showError(username, '请输入用户名');
            isValid = false;
        } else if (username.value.length < 4 || username.value.length > 20) {
            showError(username, '用户名长度4-20个字符');
            isValid = false;
        } else if (!/^[a-zA-Z0-9_]+$/.test(username.value)) {
            showError(username, '用户名只能包含字母、数字和下划线');
            isValid = false;
        } else {
            clearError(username);
        }
        
        // 验证邮箱
        if (!email.value.trim()) {
            showError(email, '请输入邮箱地址');
            isValid = false;
        } else if (!isValidEmail(email.value)) {
            showError(email, '请输入有效的邮箱地址');
            isValid = false;
        } else {
            clearError(email);
        }
        
        // 验证密码
        if (!password.value.trim()) {
            showError(password, '请输入密码');
            isValid = false;
        } else if (password.value.length < 8) {
            showError(password, '密码长度至少8位');
            isValid = false;
        } else {
            clearError(password);
        }
        
        // 验证确认密码
        if (!confirmPassword.value.trim()) {
            showError(confirmPassword, '请再次输入密码');
            isValid = false;
        } else if (confirmPassword.value !== password.value) {
            showError(confirmPassword, '两次输入的密码不一致');
            isValid = false;
        } else {
            clearError(confirmPassword);
        }
        
        // 验证用户协议
        if (!agreeTerms.checked) {
            const termsGroup = document.querySelector('.terms-group');
            if (termsGroup) {
                termsGroup.classList.add('error');
                setTimeout(() => {
                    termsGroup.classList.remove('error');
                }, 3000);
            }
            alert('请阅读并同意用户协议和隐私政策');
            isValid = false;
        }
        
        return isValid;
    }
    
    // 提交登录表单
    function submitLoginForm() {
        const form = document.getElementById('loginForm');
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // 显示加载状态
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 登录中...';
        submitBtn.disabled = true;
        
        // 模拟API请求
        setTimeout(() => {
            // 恢复按钮状态
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // 模拟登录成功
            alert('登录成功！即将跳转到首页...');
            
            // 跳转到首页
            window.location.href = 'index.html';
        }, 1500);
    }
    
    // 提交注册表单
    function submitRegisterForm() {
        const form = document.getElementById('registerForm');
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // 显示加载状态
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 注册中...';
        submitBtn.disabled = true;
        
        // 模拟API请求
        setTimeout(() => {
            // 恢复按钮状态
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // 模拟注册成功
            alert('注册成功！欢迎加入拼豆网。即将跳转到登录页面...');
            
            // 跳转到登录页面
            window.location.href = 'login.html';
        }, 2000);
    }
    
    // 初始化第三方登录
    function initializeSocialLogins() {
        const socialButtons = document.querySelectorAll('.social-btn');
        
        socialButtons.forEach(button => {
            button.addEventListener('click', function() {
                const platform = this.classList.contains('wechat') ? '微信' :
                               this.classList.contains('weibo') ? '微博' : 'QQ';
                
                alert(`即将跳转到${platform}登录授权页面（模拟）`);
                
                // 模拟第三方登录成功后跳转
                setTimeout(() => {
                    alert(`${platform}登录成功！`);
                    window.location.href = 'index.html';
                }, 1000);
            });
        });
    }
    
    // 显示错误信息
    function showError(input, message) {
        const formGroup = input.closest('.form-group');
        if (formGroup) {
            // 移除之前的错误信息
            const existingError = formGroup.querySelector('.error-message');
            if (existingError) {
                existingError.remove();
            }
            
            // 添加错误样式
            formGroup.classList.add('error');
            
            // 添加错误信息
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.textContent = message;
            formGroup.appendChild(errorDiv);
            
            // 输入框聚焦
            input.focus();
        }
    }
    
    // 清除错误信息
    function clearError(input) {
        const formGroup = input.closest('.form-group');
        if (formGroup) {
            formGroup.classList.remove('error');
            
            // 移除错误信息
            const existingError = formGroup.querySelector('.error-message');
            if (existingError) {
                existingError.remove();
            }
        }
    }
    
    // 验证邮箱格式
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});