# Deploy script - push static site to GitHub Pages
$deployDir = "D:\WEBSITE\tmp-deploy"
$remoteUrl = (git -C "D:\WEBSITE\site" config --get remote.origin.url)

Write-Host "=== Step 1: Git init ==="
git init $deployDir

Write-Host "=== Step 2: Add all files ==="
git -C $deployDir add -A

Write-Host "=== Step 3: Commit ==="
git -C $deployDir commit -m "deploy: static site"

Write-Host "=== Step 4: Set remote ==="
git -C $deployDir remote add origin $remoteUrl

Write-Host "=== Step 5: Force push to main ==="
git -C $deployDir branch -M main
git -C $deployDir push -u origin main --force

Write-Host "=== Done! ==="
