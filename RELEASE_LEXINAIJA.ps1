$ErrorActionPreference = 'Stop'
Set-Location $PSScriptRoot

Write-Host 'LexiNaija: validating the 8,000-entry release...' -ForegroundColor Cyan

$required = @(
  'src\data\dictionary\yo.json',
  'src\data\dictionary\ha.json',
  'src\data\dictionary\ig.json',
  'src\data\dictionary\pcm.json',
  'package.json',
  'netlify.toml'
)

foreach ($file in $required) {
  if (-not (Test-Path $file)) {
    throw "Missing required release file: $file"
  }
}

if (-not (Test-Path 'node_modules')) {
  Write-Host 'Installing packages because node_modules is not present...' -ForegroundColor Cyan
  npm.cmd install
  if ($LASTEXITCODE -ne 0) { throw 'npm install failed.' }
}

npm.cmd run data:validate
if ($LASTEXITCODE -ne 0) { throw 'Dataset validation failed.' }

npm.cmd run typecheck
if ($LASTEXITCODE -ne 0) { throw 'TypeScript validation failed.' }

Remove-Item -Recurse -Force '.\dist' -ErrorAction SilentlyContinue
npm.cmd run build
if ($LASTEXITCODE -ne 0) { throw 'Production build failed.' }

if (-not (Test-Path '.\dist\index.html')) { throw 'dist\index.html was not produced.' }
if (-not (Test-Path '.\dist\assets\app.js')) { throw 'dist\assets\app.js was not produced.' }
if (-not (Test-Path '.\dist\assets\app.css')) { throw 'dist\assets\app.css was not produced.' }
if (-not (Test-Path '.\dist\sw.js')) { throw 'dist\sw.js was not produced.' }

Write-Host ''
Write-Host 'LEXINAIJA RELEASE READY' -ForegroundColor Green
Write-Host '8,000 dictionary entries validated.' -ForegroundColor Green
Write-Host 'TypeScript validation passed.' -ForegroundColor Green
Write-Host 'Production build created in dist\.' -ForegroundColor Green
Write-Host 'Netlify SPA routing and PWA assets are included.' -ForegroundColor Green
