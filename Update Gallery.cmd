@echo off
REM ============================================================
REM  Nord Werk - update the Service & Maintenance gallery
REM
REM  1. Put your photos in:  Asset\service\
REM  2. Double-click this file.
REM  3. Say Y when it offers to publish.
REM
REM  Photos are resized and compressed automatically, so you can
REM  drop straight-off-the-phone pictures in without thinking
REM  about file size.
REM ============================================================

cd /d "%~dp0"
title Nord Werk - Update Gallery

powershell -NoProfile -ExecutionPolicy Bypass -File "tools\build-gallery.ps1"
if errorlevel 1 (
    echo.
    echo   Something went wrong above. Nothing was published.
    echo.
    pause
    exit /b 1
)

REM Is there actually anything new to publish?
git status --porcelain >"%TEMP%\nw_gallery_status.txt" 2>nul
for /f %%A in ('find /c /v "" ^< "%TEMP%\nw_gallery_status.txt"') do set CHANGES=%%A
del "%TEMP%\nw_gallery_status.txt" >nul 2>&1

if "%CHANGES%"=="0" (
    echo   Nothing changed - the website is already up to date.
    echo.
    pause
    exit /b 0
)

echo   ------------------------------------------------------
echo   Ready to publish these changes to nordwerkauto.com
echo   ------------------------------------------------------
git status --short
echo.

set /p GO=  Publish now? (Y/N):
if /i not "%GO%"=="Y" (
    echo.
    echo   Left as-is. Your photos are saved but not published yet.
    echo.
    pause
    exit /b 0
)

echo.
git add "Asset/service" "data/service-gallery.json"
git commit -m "Gallery: update Service ^& Maintenance photos"
if errorlevel 1 (
    echo.
    echo   Commit failed - nothing was pushed.
    echo.
    pause
    exit /b 1
)

git push origin main
if errorlevel 1 (
    echo.
    echo   Push failed. The commit is saved locally; check your
    echo   internet connection and run this again.
    echo.
    pause
    exit /b 1
)

echo.
echo   Published. The website updates in about a minute.
echo.
pause
