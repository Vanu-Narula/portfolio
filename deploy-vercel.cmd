@echo off
echo ====================================================
echo Preparing Vercel Deployment for Portfolio
echo ====================================================
echo.

echo 1. Building production version...
call npm run build

if %ERRORLEVEL% NEQ 0 (
  echo ERROR: Build failed. Please check the errors above.
  goto :error
)

echo.
echo Build successful! You can now deploy using one of these methods:
echo.
echo OPTION 1: Using Vercel CLI
echo -------------------------
echo 1. Install Vercel CLI: npm install -g vercel
echo 2. Login to Vercel: vercel login
echo 3. Deploy: vercel --prod
echo.
echo OPTION 2: Using Vercel Dashboard
echo -------------------------
echo 1. Push your changes to GitHub
echo 2. Connect your repository in the Vercel dashboard
echo 3. Configure build settings as defined in vercel.json
echo.
echo ====================================================
echo IMPORTANT: 
echo - ESLint and TypeScript errors will be ignored during build
echo - After deployment, you should fix the linting issues
echo ====================================================

goto :end

:error
echo.
echo Build failed! Please fix the errors before deploying.
exit /b 1

:end
