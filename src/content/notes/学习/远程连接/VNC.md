## 1. 什么是 VNC？🖥️

- 一种远程桌面协议，把整台远程机器的“屏幕”实时传输到本地。
    
- 支持跨平台：Linux ↔ macOS ↔ Windows 都能互通。
    

---

## 2. 核心特点🌟

- **整桌面共享**：不仅是单个窗口，所有应用都可见；
    
- **画质清晰**：比 X11 转发抗压缩，Retina 也能友好呈现；
    
- **易用稳定**：一次配置后，只要网络联通就能秒连；
    
- **端口简单**：默认 5900 起，映射就能直连。
    

---

## 3. 使用场景🎯

- 需要远程调试 GUI 全家桶（浏览器、IDE、仿真器）；
    
- 远程教学/演示，观众看“整机状态”；
    
- 家庭/办公室跨网段远程控制。
    

---

## 4. 快速示例代码📌

**Ubuntu 端（安装 + 启动）**

```bash
sudo apt update
sudo apt install tightvncserver
vncserver      # 首次设置访问密码，开启 :1（5901）
```

**配置自启动（可选）**  
编辑 `~/.vnc/xstartup` ：

```sh
#!/bin/sh
exec startxfce4 &
```

```bash
chmod +x ~/.vnc/xstartup
vncserver -kill :1 && vncserver :1
```

**Mac 端（原生连接）**

```text
在 Finder → ⌘+K → 输入 vnc://your-server-ip:5901
```

---

## 5. 优缺点对比🛠️

|优势|劣势|
|---|---|
|画质高清|网络带宽需求较高|
|操作流畅|单会话无法共享同一桌面|
|跨平台通用|安全性需配合 SSH 隧道等|

---

🚀 **小贴士**：

- 若担心安全，可在 SSH 隧道内使用 VNC：
    
    ```bash
    ssh -L 5901:localhost:5901 user@remote
    open vnc://localhost:5901
    ```
    
- 想要多人同时看不同桌面，推荐使用 X2Go 或 RDP。
    
