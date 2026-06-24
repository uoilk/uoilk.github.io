/**
 * 豆趣工坊 - 上传图纸页面 JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    // 元素引用
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('fileInput');
    const previewGrid = document.getElementById('previewGrid');
    const uploadForm = document.getElementById('uploadForm');
    const submitBtn = document.getElementById('submitBtn');
    const resetBtn = document.getElementById('resetBtn');
    const menuToggle = document.getElementById('menuToggle');
    
    // 存储上传的图片
    let uploadedImages = [];
    const MAX_IMAGES = 5;
    const MAX_SIZE = 10 * 1024 * 1024; // 10MB
    
    // ========================================
    // 图片上传功能
    // ========================================
    
    // 点击上传区域触发文件选择
    uploadArea.addEventListener('click', function() {
        fileInput.click();
    });
    
    // 拖拽上传
    uploadArea.addEventListener('dragover', function(e) {
        e.preventDefault();
        uploadArea.classList.add('dragover');
    });
    
    uploadArea.addEventListener('dragleave', function(e) {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
    });
    
    uploadArea.addEventListener('drop', function(e) {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        
        const files = Array.from(e.dataTransfer.files);
        handleFiles(files);
    });
    
    // 文件选择处理
    fileInput.addEventListener('change', function(e) {
        const files = Array.from(e.target.files);
        handleFiles(files);
        // 重置 input 以便可以再次选择相同文件
        fileInput.value = '';
    });
    
    // 处理文件
    function handleFiles(files) {
        // 检查数量限制
        if (uploadedImages.length + files.length > MAX_IMAGES) {
            showToast(`最多只能上传${MAX_IMAGES}张图片`, 'warning');
            return;
        }
        
        files.forEach(file => {
            // 检查文件类型
            if (!file.type.startsWith('image/')) {
                showToast('请上传图片文件', 'error');
                return;
            }
            
            // 检查文件大小
            if (file.size > MAX_SIZE) {
                showToast('图片大小不能超过10MB', 'error');
                return;
            }
            
            // 读取并预览文件
            const reader = new FileReader();
            reader.onload = function(e) {
                const imageData = {
                    id: Date.now() + Math.random(),
                    src: e.target.result,
                    file: file,
                    name: file.name
                };
                uploadedImages.push(imageData);
                renderPreviews();
            };
            reader.readAsDataURL(file);
        });
    }
    
    // 渲染预览图片
    function renderPreviews() {
        previewGrid.innerHTML = '';
        
        uploadedImages.forEach((image, index) => {
            const previewItem = document.createElement('div');
            previewItem.className = 'preview-item';
            previewItem.innerHTML = `
                <img src="${image.src}" alt="预览图 ${index + 1}">
                <button type="button" class="remove-btn" data-id="${image.id}" title="删除">
                    <i class="fas fa-times"></i>
                </button>
                ${index === 0 ? '<span class="cover-badge">封面</span>' : ''}
            `;
            previewGrid.appendChild(previewItem);
        });
        
        // 绑定删除事件
        document.querySelectorAll('.remove-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = parseFloat(this.dataset.id);
                removeImage(id);
            });
        });
    }
    
    // 删除图片
    function removeImage(id) {
        uploadedImages = uploadedImages.filter(img => img.id !== id);
        renderPreviews();
    }
    
    // ========================================
    // 表单提交
    // ========================================
    
    uploadForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // 表单验证
        const title = document.getElementById('title').value.trim();
        const category = document.getElementById('category').value;
        const difficulty = document.getElementById('difficulty').value;
        
        if (!title) {
            showToast('请输入图纸标题', 'error');
            document.getElementById('title').focus();
            return;
        }
        
        if (!category) {
            showToast('请选择图纸分类', 'error');
            document.getElementById('category').focus();
            return;
        }
        
        if (!difficulty) {
            showToast('请选择难度级别', 'error');
            document.getElementById('difficulty').focus();
            return;
        }
        
        if (uploadedImages.length === 0) {
            showToast('请至少上传一张图纸', 'error');
            return;
        }
        
        // 显示加载状态
        setSubmitLoading(true);
        
        try {
            // 模拟上传请求
            await simulateUpload();
            
            showToast('图纸上传成功！等待审核中...', 'success');
            
            // 重置表单
            resetForm();
            
        } catch (error) {
            showToast('上传失败，请重试', 'error');
        } finally {
            setSubmitLoading(false);
        }
    });
    
    // 模拟上传
    function simulateUpload() {
        return new Promise((resolve) => {
            setTimeout(resolve, 2000);
        });
    }
    
    // 设置提交按钮加载状态
    function setSubmitLoading(loading) {
        if (loading) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="spinner"></span> 上传中...';
        } else {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="fas fa-sparkles"></i> 提交图纸';
        }
    }
    
    // 重置表单
    function resetForm() {
        uploadForm.reset();
        uploadedImages = [];
        renderPreviews();
    }
    
    // 重置按钮
    resetBtn.addEventListener('click', function() {
        resetForm();
        showToast('表单已重置', 'success');
    });
    
    // ========================================
    // Toast 提示
    // ========================================
    
    function showToast(message, type = 'success') {
        const toast = document.getElementById('toast');
        const toastMessage = toast.querySelector('.toast-message');
        
        // 移除旧的类型类
        toast.classList.remove('success', 'error', 'warning');
        toast.classList.add(type);
        
        toastMessage.textContent = message;
        toast.classList.add('show');
        
        // 3秒后隐藏
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
    
    // ========================================
    // 移动端菜单
    // ========================================
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            const navMenu = document.querySelector('.nav-menu');
            if (navMenu) {
                navMenu.classList.toggle('active');
            }
        });
    }
    
    // ========================================
    // 表单输入验证提示
    // ========================================
    
    // 标题字数限制
    const titleInput = document.getElementById('title');
    if (titleInput) {
        titleInput.addEventListener('input', function() {
            if (this.value.length > 50) {
                this.value = this.value.slice(0, 50);
                showToast('标题最多50个字符', 'warning');
            }
        });
    }
    
    // 描述字数限制
    const descriptionInput = document.getElementById('description');
    if (descriptionInput) {
        descriptionInput.addEventListener('input', function() {
            if (this.value.length > 500) {
                this.value = this.value.slice(0, 500);
                showToast('描述最多500个字符', 'warning');
            }
        });
    }
    
    console.log('豆趣工坊 - 上传图纸页面已加载 ✨');
});
