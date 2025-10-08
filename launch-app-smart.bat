@echo off
REM -------------------------------------------
REM Launch React app and LocalTunnel after detecting readiness
REM -------------------------------------------

REM Navigate to project directory
cd /d C:\Users\donba\square-dance-directory

REM Start React app in a new terminal
start cmd /k "echo Starting React App... & npm start"

REM Wait until React is ready by checking for port listening
echo Waiting for React to start...
:check_port
for /f "tokens=2 delims=:" %%a in ('netstat -ano ^| findstr LISTENING ^| findstr 127.0.0.1') do set REACT_PORT=%%a
set REACT_PORT=%REACT_PORT:~1%
if "%REACT_PORT%"=="" (
    timeout /t 2 >nul
    goto check_port
)

echo React app is now listening on port %REACT_PORT%

REM Start LocalTunnel in a new terminal with your chosen subdomain
start cmd /k "echo Starting LocalTunnel on port %REACT_PORT%... & lt --port %REACT_PORT% --subdomain square-dance-directory-1"

echo.
echo ✅ React app and LocalTunnel should now be running.
pause
