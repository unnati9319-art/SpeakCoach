@echo off
echo ==========================================
echo        Node.js Installation Script
echo ==========================================
echo.

:: Check for Administrative privileges
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo [ERROR] This script needs Administrator permissions to install Node.js.
    echo.
    echo Please right-click on "install_node.bat" and select "Run as Administrator".
    echo.
    pause
    exit /b
)

echo Administrator permissions detected. Installing Node.js...
winget install OpenJS.NodeJS.LTS --accept-package-agreements --accept-source-agreements

echo.
echo ==========================================
echo Installation complete! 
echo Please close this window and double-click "start_app.bat" to start SpeakCoach.
echo ==========================================
pause
