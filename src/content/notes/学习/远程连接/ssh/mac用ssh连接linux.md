---
tags:
  - ip
  - linux
  - mac
  - ssh
  - ubuntu
---
## ✅ 第一步：确保 Ubuntu 已安装并运行 OpenSSH Server

在 Ubuntu 终端执行以下命令：

```bash
sudo apt update
sudo apt install openssh-server
sudo systemctl enable --now ssh
```

- `openssh-server` 是 Ubuntu 上 SSH 服务端的软件包([Akamai](https://www.linode.com/docs/guides/enable-ssh-ubuntu/?utm_source=chatgpt.com "How to Enable SSH on Ubuntu 20.04 LTS - Linode"), [Medium](https://medium.com/%40sydasif78/getting-started-with-openssh-a-guide-for-network-engineers-1ed524080529?utm_source=chatgpt.com "Getting Started with OpenSSH: A Guide for Network Engineers"))。
    
- 启动并设置为开机自动运行：`sudo systemctl enable --now ssh`([Hostman](https://hostman.com/tutorials/how-to-install-and-configure-ssh-on-ubuntu-22-04/?utm_source=chatgpt.com "How to Install and Configure SSH on Ubuntu 22.04 - Hostman"))。
    

接着，检查是否运行：

```bash
sudo systemctl status ssh
```

如果看到 `active (running)`，说明服务已启动([Akamai](https://www.linode.com/docs/guides/enable-ssh-ubuntu/?utm_source=chatgpt.com "How to Enable SSH on Ubuntu 20.04 LTS - Linode"))。

---

## 🎯 第二步：获取 Ubuntu 的 IP 地址

输入：

```bash
ip a
```

找到类似 `inet 192.168.x.y/24` 的那行，就是本机的内网地址([Medium](https://medium.com/%40tilak559/establishing-an-ssh-remote-connection-from-ubuntu-to-mac-f098cb90c269?utm_source=chatgpt.com "Establishing an SSH Remote Connection from Ubuntu to Mac"))。

---

## 🖥️ 第三步：从 Mac 连接

打开 **Terminal**（在 Finder → Applications → Utilities 中）([ServerMania](https://www.servermania.com/kb/articles/ssh-mac?utm_source=chatgpt.com "How to SSH on a Mac with Terminal | ServerMania"))，执行：

```bash
ssh 用户名@Ubuntu_IP
```

例如：

```bash
ssh zjd@192.168.1.102
```

如果你之前改过端口，比如用 `-p 2222`，则：

```bash
ssh -p 2222 用户名@IP
```

第一次连接时，会提示：

```
The authenticity of host ‘192.168.1.102 (192.168.1.102)’ can’t be established.
Are you sure you want to continue connecting (yes/no)?
```

输入 `yes` 后，它会保存服务器指纹。

输入密码后，就能看到 Ubuntu 的命令行提示符了([Ask Ubuntu](https://askubuntu.com/questions/1187071/how-to-connect-remotely-to-the-ubuntu-cli-from-a-mac?utm_source=chatgpt.com "How to connect remotely to the Ubuntu CLI from a Mac?"))。

---

## 🎉 第四步：结束连接和进阶使用

- **结束方式**：输入 `exit` 或按 `Ctrl-D` 退出。
    
- **直接运行远程命令**：如获取目录列表：
    
    ```bash
    ssh zjd@192.168.1.102 ls -l /home/zjd
    ```
    

---

## 🌟 进阶建议

- **使用 SSH 密钥免密码登录**：
    
    ```bash
    ssh-keygen -t rsa -b 4096
    ssh-copy-id zjd@192.168.1.102
    ```
    
    以后就不必每次输密码了。
    
- **配置 `~/.ssh/config` 简化连接**：
    
    ```
    Host ubuntuhome
      HostName 192.168.1.102
      User zjd
      Port 22
    ```
    
    然后直接 `ssh ubuntuhome` 即可。
    

---

## 🧪 故障排查小贴士

1. **连接失败**：可能是端口未开放、防火墙屏蔽，记得运行：
    
    ```bash
    sudo ufw allow ssh
    ```
    
2. **超时或拒连**：检查 IP、端口、用户名是否正确，命令 `ssh -v 用户@IP` 用于调试([Reddit](https://www.reddit.com/r/ethstaker/comments/xe01ql/ssh_from_macbook_to_ubuntu/?utm_source=chatgpt.com "Ssh from macbook to ubuntu : r/ethstaker - Reddit"), [Medium](https://medium.com/%40sydasif78/getting-started-with-openssh-a-guide-for-network-engineers-1ed524080529?utm_source=chatgpt.com "Getting Started with OpenSSH: A Guide for Network Engineers"))。  
    。
    

---

## 📌 总结要点

1. Ubuntu 安装并启用 SSH 服务
    
2. 获取 Ubuntu IP 地址
    
3. Mac 终端执行 `ssh 用户名@IP`
    
4. 首次确认指纹，输入密码顺利连接
    
5. 可配置密钥免密码登录与快捷主机配置