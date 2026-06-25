// 多媒体控制功能
function initMediaControls() {
    // 视频元素和控制
    const video = document.getElementById('sugarVideo');
    const videoWrapper = document.querySelector('.video-wrapper');
    const videoOverlay = document.querySelector('.video-overlay');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const videoProgress = document.getElementById('videoProgress');
    const currentTimeEl = document.getElementById('currentTime');
    const durationEl = document.getElementById('duration');
    const volumeBtn = document.getElementById('volumeBtn');
    const volumeControl = document.getElementById('volumeControl');
    const fullscreenBtn = document.getElementById('fullscreenBtn');
    
    // 音频元素和控制
    const audio = document.getElementById('sugarAudio');
    const audioPlayBtn = document.getElementById('audioPlayBtn');
    const audioPrevBtn = document.getElementById('audioPrevBtn');
    const audioNextBtn = document.getElementById('audioNextBtn');
    const audioProgress = document.getElementById('audioProgress');
    const audioCurrentTimeEl = document.getElementById('audioCurrentTime');
    const audioDurationEl = document.getElementById('audioDuration');
    const audioVolumeBtn = document.getElementById('audioVolumeBtn');
    const audioVolumeControl = document.getElementById('audioVolumeControl');
    
    // 视频控制功能
    if (video) {
        // 设置视频时长
        video.addEventListener('loadedmetadata', function() {
            const duration = video.duration;
            const minutes = Math.floor(duration / 60);
            const seconds = Math.floor(duration % 60);
            durationEl.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
            videoProgress.max = Math.floor(duration);
        });
        
        // 更新视频播放进度
        video.addEventListener('timeupdate', function() {
            const currentTime = video.currentTime;
            const duration = video.duration;
            const progressPercent = (currentTime / duration) * 100;
            videoProgress.value = (currentTime / duration) * 100;
            
            const minutes = Math.floor(currentTime / 60);
            const seconds = Math.floor(currentTime % 60);
            currentTimeEl.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        });
        
        // 点击视频覆盖层播放视频
        videoOverlay.addEventListener('click', function() {
            video.play();
            videoWrapper.classList.add('playing');
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        });
        
        // 播放/暂停按钮
        playPauseBtn.addEventListener('click', function() {
            if (video.paused) {
                video.play();
                videoWrapper.classList.add('playing');
                this.innerHTML = '<i class="fas fa-pause"></i>';
            } else {
                video.pause();
                videoWrapper.classList.remove('playing');
                this.innerHTML = '<i class="fas fa-play"></i>';
            }
        });
        
        // 视频播放状态改变
        video.addEventListener('play', function() {
            videoWrapper.classList.add('playing');
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        });
        
        video.addEventListener('pause', function() {
            videoWrapper.classList.remove('playing');
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        });
        
        // 进度条控制
        videoProgress.addEventListener('input', function() {
            const duration = video.duration;
            const newTime = (this.value / 100) * duration;
            video.currentTime = newTime;
        });
        
        // 音量控制
        volumeControl.addEventListener('input', function() {
            video.volume = this.value / 100;
            
            if (this.value == 0) {
                volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
            } else if (this.value < 50) {
                volumeBtn.innerHTML = '<i class="fas fa-volume-down"></i>';
            } else {
                volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            }
        });
        
        // 音量按钮
        volumeBtn.addEventListener('click', function() {
            if (video.volume > 0) {
                video.volume = 0;
                volumeControl.value = 0;
                this.innerHTML = '<i class="fas fa-volume-mute"></i>';
            } else {
                video.volume = 0.8;
                volumeControl.value = 80;
                this.innerHTML = '<i class="fas fa-volume-up"></i>';
            }
        });
        
        // 全屏按钮
        fullscreenBtn.addEventListener('click', function() {
            if (!document.fullscreenElement) {
                videoWrapper.requestFullscreen().catch(err => {
                    console.log(`全屏请求失败: ${err.message}`);
                });
                this.innerHTML = '<i class="fas fa-compress"></i>';
            } else {
                document.exitFullscreen();
                this.innerHTML = '<i class="fas fa-expand"></i>';
            }
        });
        
        // 全屏状态变化
        document.addEventListener('fullscreenchange', function() {
            if (!document.fullscreenElement) {
                fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
            }
        });
    }
    
    // 音频控制功能
    if (audio) {
        // 设置音频时长
        audio.addEventListener('loadedmetadata', function() {
            const duration = audio.duration;
            const minutes = Math.floor(duration / 60);
            const seconds = Math.floor(duration % 60);
            audioDurationEl.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        });
        
        // 更新音频播放进度
        audio.addEventListener('timeupdate', function() {
            const currentTime = audio.currentTime;
            const duration = audio.duration;
            const progressPercent = (currentTime / duration) * 100;
            audioProgress.style.width = progressPercent + '%';
            
            const minutes = Math.floor(currentTime / 60);
            const seconds = Math.floor(currentTime % 60);
            audioCurrentTimeEl.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        });
        
        // 音频播放/暂停按钮
        audioPlayBtn.addEventListener('click', function() {
            if (audio.paused) {
                audio.play();
                this.innerHTML = '<i class="fas fa-pause-circle"></i>';
            } else {
                audio.pause();
                this.innerHTML = '<i class="fas fa-play-circle"></i>';
            }
        });
        
        // 音频播放状态改变
        audio.addEventListener('play', function() {
            audioPlayBtn.innerHTML = '<i class="fas fa-pause-circle"></i>';
        });
        
        audio.addEventListener('pause', function() {
            audioPlayBtn.innerHTML = '<i class="fas fa-play-circle"></i>';
        });
        
        // 音频播放结束
        audio.addEventListener('ended', function() {
            audioPlayBtn.innerHTML = '<i class="fas fa-play-circle"></i>';
            audioProgress.style.width = '0%';
            audioCurrentTimeEl.textContent = '0:00';
        });
        
        // 上一曲/下一曲按钮（示例功能）
        audioPrevBtn.addEventListener('click', function() {
            audio.currentTime = Math.max(0, audio.currentTime - 10); // 后退10秒
        });
        
        audioNextBtn.addEventListener('click', function() {
            audio.currentTime = Math.min(audio.duration, audio.currentTime + 10); // 前进10秒
        });
        
        // 音频进度条点击跳转
        const audioProgressBar = document.querySelector('.audio-progress-bar');
        audioProgressBar.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const offsetX = e.clientX - rect.left;
            const width = rect.width;
            const percentage = offsetX / width;
            audio.currentTime = percentage * audio.duration;
        });
        
        // 音频音量控制
        audioVolumeControl.addEventListener('input', function() {
            audio.volume = this.value / 100;
            
            if (this.value == 0) {
                audioVolumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
            } else if (this.value < 50) {
                audioVolumeBtn.innerHTML = '<i class="fas fa-volume-down"></i>';
            } else {
                audioVolumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            }
        });
        
        // 音频音量按钮
        audioVolumeBtn.addEventListener('click', function() {
            if (audio.volume > 0) {
                audio.volume = 0;
                audioVolumeControl.value = 0;
                this.innerHTML = '<i class="fas fa-volume-mute"></i>';
            } else {
                audio.volume = 0.8;
                audioVolumeControl.value = 80;
                this.innerHTML = '<i class="fas fa-volume-up"></i>';
            }
        });
    }
}

// 页面加载完成后初始化媒体控制
document.addEventListener('DOMContentLoaded', function() {
    initMediaControls();
});

