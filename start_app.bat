@echo off
echo Starting SpeakCoach...
echo.

:: Check for Node.js
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed!
    echo Please download and install it from https://nodejs.org/ (Download the LTS version)
    echo After installing, restart your computer and try again.
    pause
    exit /b
)

:: Install Backend Dependencies if needed
if not exist "backend\node_modules" (
    echo Installing backend dependencies (this only happens once)...
    cd backend
    call npm install
    cd ..
)

:: Install Frontend Dependencies if needed
if not exist "frontend\node_modules" (
    echo Installing frontend dependencies (this only happens once)...
    cd frontend
    call npm install
    cd ..
)

:: Start Backend
echo.
echo Starting the backend server...
start cmd /k "cd backend && echo Starting Backend... && npm start"

:: Start Frontend
echo.
echo Starting the frontend application...
start cmd /k "cd frontend && echo Starting Frontend... && npm run dev"

echo.
echo Everything is starting up!
echo Look for the new black windows that just opened.
echo Once they are ready, open Google Chrome and go to: http://localhost:5173
echo.
pause
