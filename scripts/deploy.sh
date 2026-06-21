#!/bin/bash
echo "==================================="
echo "  VoiceForge Deployment Script"
echo "==================================="
echo ""

echo "[1/4] Deploying Frontend to Vercel..."
cd frontend
vercel --prod
cd ..

echo ""
echo "[2/4] Deploying Backend to Railway..."
cd backend
railway up
cd ..

echo ""
echo "[3/4] Deploying Video Service to Railway..."
cd video-service
railway up
cd ..

echo ""
echo "==================================="
echo "  Deployment Complete!"
echo "==================================="
echo ""
echo "Frontend: Check Vercel dashboard"
echo "Backend:  Check Railway dashboard"
echo "Video:    Check Railway dashboard"
echo ""
echo "Don't forget to set environment variables!"
