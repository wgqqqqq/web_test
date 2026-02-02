---
title: 安装
slug: installation
description: 安装 VCoder
category: 快速开始
order: 2
---

# 安装

## 系统要求

| 要求 | 最低 | 推荐 |
|------|-----|------|
| 系统 | Windows 10 / macOS 10.15 / Ubuntu 20.04 | 最新版本 |
| 内存 | 8 GB | 16 GB |
| Node.js | v18 | v20 LTS |

## Windows

下载 [VCoder-Setup-x64.exe](https://vcoder.dev/download/windows)，运行安装程序。

或使用便携版：

```powershell
Invoke-WebRequest -Uri "https://vcoder.dev/download/windows-portable" -OutFile "vcoder.zip"
Expand-Archive -Path "vcoder.zip" -DestinationPath "C:\Tools\VCoder"
```

## macOS

下载 [VCoder.dmg](https://vcoder.dev/download/macos)，拖入 Applications。

或使用 Homebrew：

```bash
brew tap vcoder/tap && brew install --cask vcoder
```

## Linux

**Debian/Ubuntu**

```bash
curl -fsSL https://vcoder.dev/gpg | sudo gpg --dearmor -o /usr/share/keyrings/vcoder.gpg
echo "deb [signed-by=/usr/share/keyrings/vcoder.gpg] https://vcoder.dev/apt stable main" | sudo tee /etc/apt/sources.list.d/vcoder.list
sudo apt update && sudo apt install vcoder
```

**Arch Linux**

```bash
yay -S vcoder-bin
```

**AppImage（通用）**

```bash
wget https://vcoder.dev/download/linux-appimage -O VCoder.AppImage
chmod +x VCoder.AppImage && ./VCoder.AppImage
```

## 验证

```bash
vcoder --version
```

## 常见问题

**macOS "无法验证开发者"**

```bash
xattr -cr /Applications/VCoder.app
```

**Linux 缺少依赖**

```bash
sudo apt install libgtk-3-0 libnotify4 libnss3 libxss1
```

## 下一步

- [快速上手](/docs/quickstart) - 3 分钟入门
