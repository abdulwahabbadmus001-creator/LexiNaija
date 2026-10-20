$ErrorActionPreference = 'Stop'
Set-Location $PSScriptRoot

Write-Host 'LinguaNaija: installing packages...' -ForegroundColor Cyan
npm.cmd install
if ($LASTEXITCODE -ne 0) { throw 'npm install failed.' }

Write-Host 'LinguaNaija: building 8,000 source-backed dictionary entries...' -ForegroundColor Cyan
npm.cmd run data:build
if ($LASTEXITCODE -ne 0) { throw 'Dataset generation failed. No filler was generated.' }

Write-Host 'LinguaNaija: validating counts, uniqueness and provenance...' -ForegroundColor Cyan
npm.cmd run data:validate
if ($LASTEXITCODE -ne 0) { throw 'Dataset validation failed.' }

Write-Host 'LinguaNaija: checking TypeScript...' -ForegroundColor Cyan
npm.cmd run typecheck
if ($LASTEXITCODE -ne 0) { throw 'TypeScript check failed.' }

Write-Host 'LinguaNaija: creating production build...' -ForegroundColor Cyan
npm.cmd run build
if ($LASTEXITCODE -ne 0) { throw 'Production build failed.' }

Write-Host ''
Write-Host 'BUILD COMPLETE: LinguaNaija 8,000-entry release is ready.' -ForegroundColor Green
Write-Host 'Run: npm.cmd run dev' -ForegroundColor Yellow
