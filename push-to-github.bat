@echo off
echo ========================================================
echo Pushing Portfolio to GitHub (Tarunkumar-Mylipilli)
echo ========================================================
echo.
git branch -M main
echo Make sure you have created the repository 'portfolio' on your GitHub:
echo https://github.com/new (Name: portfolio)
echo.
git remote remove origin >nul 2>&1
git remote add origin https://github.com/Tarunkumar-Mylipilli/portfolio.git
git push -u origin main
pause
