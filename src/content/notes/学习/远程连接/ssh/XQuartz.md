---
tags:
  - ssh
  - ubuntu
  - mac
  - linux
  - ip
  - X11
  - XQuartz
---
**📋 X11 转发快速笔记（让远程 GUI 在本地 Mac 显示）**

---

1. **Mac 安装 XQuartz**
    
    ```bash
    brew install --cask xquartz
    ```
    
    安装后登出/重启，让它常驻后台。🛠️
    
2. **Ubuntu 端开启 X11 转发**  
    编辑 `/etc/ssh/sshd_config`，确保：
    
    ```
    AllowTcpForwarding yes
    X11Forwarding yes
    X11DisplayOffset 10
    X11UseLocalhost yes
    ```
    
    安装 `xauth`：
    
    ```bash
    sudo apt install xauth
    ```
    
    重启 SSH 服务：
    
    ```bash
    sudo systemctl restart sshd
    ```
    
3. **Mac SSH 客户端配置**  
    在 `~/.ssh/config` 对应 Host 中加：
    
    ```text
    ForwardX11 yes
    ForwardX11Trusted yes
    ```
    
4. **使用 SSH 启动转发**
    
    ```bash
    ssh -X ubuntuhome   # 或者 ssh -Y ubuntuhome
    ```
    
    验证：
    
    ```bash
    echo $DISPLAY     # 应输出类似 localhost:10.0
    ```
    
5. **运行 GUI 程序**
    
    ```bash
    python3 hog_gui.py
    ```
    
    XQuartz 会弹窗显示图形界面🎉！
    

---

### ⚡️ 进阶小贴士

- 若报 “untrusted X11 forwarding” 换 `ssh -Y`
    
- 用 `ssh -v -X` 查看转发日志
    
- 自动化：写个脚本一键 `ssh -X` + 启动程序
    
- 性能：大界面略有延迟，可考虑 VNC/RDP 转发