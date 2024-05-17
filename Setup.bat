@echo off
setlocal

REM Verifica se o Node.js está instalado
node -v >nul 2>&1
IF %ERRORLEVEL% NEQ 0 (
    echo Node.js não está instalado. Instalando Node.js...
    REM Baixar o instalador do Node.js
    powershell -Command "Invoke-WebRequest -Uri https://nodejs.org/dist/v18.16.0/node-v18.16.0-x64.msi -OutFile nodejs.msi"
    msiexec /i nodejs.msi /quiet /norestart
    del nodejs.msi
)

REM Verifica se o npm está instalado
npm -v >nul 2>&1
IF %ERRORLEVEL% NEQ 0 (
    echo npm não está instalado. Ocorreu um problema na instalação do Node.js.
    exit /b 1
)

REM Verifica se o http-server está instalado globalmente
npm list -g http-server >nul 2>&1
IF %ERRORLEVEL% NEQ 0 (
    echo http-server não está instalado. Instalando http-server...
    npm install -g http-server
)

REM Inicia o servidor local
echo Iniciando o servidor local...
http-server

endlocal
pause
