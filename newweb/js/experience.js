/* 在线体验页面补充样式 */

/* 画布容器 */
.canvas-container {
    position: relative;
    width: 100%;
    height: 400px;
    background-color: var(--cream-white);
    border: 2px dashed rgba(212, 160, 23, 0.3);
    border-radius: 10px;
    margin-bottom: 20px;
    overflow: hidden;
}

#drawingCanvas {
    width: 100%;
    height: 100%;
    cursor: crosshair;
    display: block;
}

.canvas-instructions {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    color: #999;
    pointer-events: none;
    z-index: 1;
}

.canvas-instructions i {
    font-size: 2rem;
    margin-bottom: 10px;
    display: block;
    opacity: 0.5;
}

/* 工具控制区 */
.drawing-controls {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 20px;
    justify-content: center;
}

.control-btn {
    background-color: white;
    color: var(--dark-brown);
    border: 1px solid rgba(212, 160, 23, 0.3);
    padding: 10px 20px;
    border-radius: 30px;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 8px;
}

.control-btn:hover {
    background-color: rgba(212, 160, 23, 0.1);
    transform: translateY(-2px);
}

.control-btn.active {
    background-color: var(--primary-amber);
    color: white;
    border-color: var(--primary-amber);
}

.control-btn.added {
    background-color: #4CAF50;
    color: white;
    border-color: #4CAF50;
}

/* 颜色选择器 */
.color-picker {
    display: flex;
    align-items: center;
    gap: 15px;
    margin-bottom: 20px;
    justify-content: center;
    flex-wrap: wrap;
}

.color-label {
    font-weight: 500;
    color: var(--dark-brown);
}

.color-options {
    display: flex;
    gap: 10px;
}

.color-option {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    cursor: pointer;
    border: 2px solid transparent;
    transition: all 0.3s ease;
}

.color-option:hover {
    transform: scale(1.1);
}

.color-option.active {
    border-color: var(--dark-brown);
    transform: scale(1.2);
}

/* 线宽控制 */
.line-width-control {
    display: flex;
    align-items: center;
    gap: 15px;
    margin-bottom: 20px;
    justify-content: center;
}

.line-width-label {
    font-weight: 500;
    color: var(--dark-brown);
}

.line-width-slider {
    width: 150px;
    height: 5px;
    -webkit-appearance: none;
    appearance: none;
    background: rgba(212, 160, 23, 0.2);
    border-radius: 5px;
    outline: none;
}

.line-width-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: var(--primary-amber);
    cursor: pointer;
}

.line-width-slider::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: var(--primary-amber);
    cursor: pointer;
    border: none;
}

.line-width-value {
    min-width: 40px;
    text-align: center;
    font-weight: 500;
    color: var(--dark-brown);
}

/* 模板选择区 */
.templates-section {
    margin-top: 30px;
}

.templates-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 20px;
    margin-top: 15px;
}

.template-item {
    background-color: white;
    border-radius: 10px;
    padding: 15px;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s ease;
    border: 1px solid rgba(212, 160, 23, 0.1);
}

.template-item:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    border-color: var(--primary-amber);
}

.template-img {
    width: 100%;
    height: 120px;
    background-color: #f0e6d3;
    border-radius: 5px;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #999;
}

.template-name {
    font-weight: 500;
    color: var(--dark-brown);
}

/* 快捷键提示 */
.shortcut-hint {
    margin-top: 30px;
    padding: 15px;
    background-color: rgba(212, 160, 23, 0.05);
    border-radius: 10px;
    border-left: 4px solid var(--primary-amber);
}

.shortcut-hint h4 {
    font-size: 1.1rem;
    margin-bottom: 10px;
    color: var(--dark-brown);
    display: flex;
    align-items: center;
    gap: 10px;
}

.shortcut-hint i {
    color: var(--primary-amber);
}

.shortcut-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 10px;
    font-size: 0.9rem;
}

.shortcut-item {
    display: flex;
    justify-content: space-between;
    padding: 5px 0;
    border-bottom: 1px dashed rgba(212, 160, 23, 0.1);
}

.shortcut-key {
    background-color: rgba(212, 160, 23, 0.1);
    color: var(--primary-amber);
    padding: 2px 8px;
    border-radius: 4px;
    font-family: monospace;
    font-weight: 600;
}

/* 空购物车样式 */
.empty-cart {
    text-align: center;
    padding: 50px 20px;
    color: #999;
}

.empty-cart i {
    font-size: 3rem;
    margin-bottom: 15px;
    opacity: 0.3;
    display: block;
}

/* 响应式调整 */
@media (max-width: 768px) {
    .canvas-container {
        height: 300px;
    }
    
    .templates-grid {
        grid-template-columns: repeat(2, 1fr);
    }
    
    .shortcut-list {
        grid-template-columns: 1fr;
    }
    
    .drawing-controls {
        gap: 8px;
    }
    
    .control-btn {
        padding: 8px 15px;
        font-size: 0.9rem;
    }
}

@media (max-width: 576px) {
    .canvas-container {
        height: 250px;
    }
    
    .templates-grid {
        grid-template-columns: 1fr;
    }
    
    .color-picker,
    .line-width-control {
        flex-direction: column;
        align-items: flex-start;
        gap: 10px;
    }
    
    .color-options {
        width: 100%;
        justify-content: center;
    }
}