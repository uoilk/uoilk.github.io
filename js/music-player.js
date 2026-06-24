// music-player.js - 简化版音乐控制
document.addEventListener('DOMContentLoaded', function() {
    // 获取元素
    const musicControl = document.getElementById('musicControl');
    const musicNote = document.getElementById('musicNote');
    const bgMusic = document.getElementById('globalBgMusic');
    const musicTooltip = document.querySelector('.music-tooltip');
    
    // 检查元素
    if (!musicControl || !bgMusic) {
        console.log('音乐控制元素未找到');
        return;
    }
    
    // 更新按钮状态
    function updateMusicButton() {
        const isPlaying = !bgMusic.paused;
        
        if (isPlaying) {
            musicNote.classList.add('playing');
            musicTooltip.textContent = '暂停音乐';
        } else {
            musicNote.classList.remove('playing');
            musicTooltip.textContent = '播放音乐';
        }
    }
    
    // 切换音乐
    function toggleMusic() {
        if (bgMusic.paused) {
            bgMusic.play().then(() => {
                console.log('音乐开始播放');
                updateMusicButton();
            }).catch(error => {
                console.log('播放失败:', error);
                if (error.name === 'NotAllowedError') {
                    // 浏览器阻止自动播放，显示提示
                    musicTooltip.textContent = '点击播放';
                    musicTooltip.style.background = '#FF6B6B';
                    setTimeout(() => {
                        musicTooltip.textContent = '播放音乐';
                        musicTooltip.style.background = '';
                    }, 2000);
                }
            });
        } else {
            bgMusic.pause();
            console.log('音乐已暂停');
            updateMusicButton();
        }
    }
    
    // 保存状态
    function saveMusicState() {
        try {
            const state = {
                isPlaying: !bgMusic.paused,
                time: bgMusic.currentTime,
                timeSaved: Date.now()
            };
            localStorage.setItem('musicState', JSON.stringify(state));
        } catch (error) {
            console.log('保存音乐状态失败');
        }
    }
    
    // 恢复状态
    function restoreMusicState() {
        try {
            const saved = localStorage.getItem('musicState');
            if (saved) {
                const state = JSON.parse(saved);
                
                // 恢复播放进度（如果5分钟内保存的）
                if (state.time && Date.now() - state.timeSaved < 300000) {
                    bgMusic.currentTime = state.time;
                }
                
                // 恢复播放状态
                if (state.isPlaying) {
                    setTimeout(() => {
                        bgMusic.play().catch(() => {
                            // 静默失败
                        });
                    }, 500);
                }
            }
        } catch (error) {
            console.log('恢复音乐状态失败');
        }
    }
    
    // 绑定点击事件
    musicControl.addEventListener('click', function(e) {
        e.preventDefault();
        toggleMusic();
    });
    
    // 监听音乐状态
    bgMusic.addEventListener('play', updateMusicButton);
    bgMusic.addEventListener('pause', updateMusicButton);
    
    // 定期保存状态
    setInterval(saveMusicState, 5000);
    
    // 页面关闭前保存
    window.addEventListener('beforeunload', saveMusicState);
    
    // 初始化
    setTimeout(() => {
        updateMusicButton();
        restoreMusicState();
    }, 1000);
    
    console.log('红色音符音乐按钮初始化完成');
});
// 简化版滑入效果
function initSimpleSlideInEffect() {
    // 延迟显示
    setTimeout(() => {
        musicControl.style.opacity = '0';
        musicControl.style.transform = 'translateY(50px)';
        musicControl.style.transition = 'all 0.6s ease-out';
        
        // 强制重绘
        musicControl.offsetHeight;
        
        // 滑入
        musicControl.style.opacity = '1';
        musicControl.style.transform = 'translateY(0)';
        
        // 添加浮动效果
        setInterval(() => {
            if (!bgMusic.paused) {
                musicNote.style.transform = 'translateY(-5px)';
                setTimeout(() => {
                    musicNote.style.transform = 'translateY(0)';
                }, 750);
            }
        }, 1500);
        
    }, 1000);
}