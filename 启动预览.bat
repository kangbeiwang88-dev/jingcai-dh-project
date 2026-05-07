@echo off
chcp 65001 >nul
title 京彩 - 北京文化生活入口
echo ========================================
echo   京彩 - 北京文化生活入口
echo ========================================
echo.
echo 正在启动预览服务器...
echo.
cd /d "%~dp0"
start http://127.0.0.1:5310
npm run dev
pause
