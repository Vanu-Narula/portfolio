@echo off
echo 🚀 Building production portfolio...

echo ✅ Running type check...
call npm run type-check

echo ✅ Running linting...
call npm run lint

echo ✅ Building production build...
call npm run build

echo ✅ Production build complete!
echo.
echo 🔍 To deploy to Vercel:
echo 1. Install Vercel CLI: npm i -g vercel
echo 2. Login to Vercel: vercel login
echo 3. Deploy: vercel --prod
echo.
echo 📝 Or use the Vercel dashboard to deploy from your GitHub repository.
