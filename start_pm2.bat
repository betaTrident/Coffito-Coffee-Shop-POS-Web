@echo off
cd /d "%~dp0server"
pm2 start index.js --name coffito-server
