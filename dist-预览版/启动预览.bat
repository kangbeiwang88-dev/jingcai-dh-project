@echo off
chcp 65001 >nul
title 京彩 - 预览版
echo ========================================
echo   京彩 - 北京文化生活入口（预览版）
echo ========================================
echo.
echo 正在启动本地服务器...
echo.
cd /d "%~dp0"
echo 启动 Python HTTP 服务器 (端口 8080)...
echo 请稍候，浏览器将自动打开
start http://127.0.0.1:8080
python -m http.server 8080
pause
