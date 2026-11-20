@echo off
echo ========================================================
echo Deploying Tarun Kumar Mylipilli's Portfolio to Vercel
echo ========================================================
echo.
echo If this is your first time, Vercel will ask you to log in via browser.
echo Press Enter to begin deployment:
pause
npx vercel
echo.
echo Deploying to Production...
npx vercel --prod
pause
