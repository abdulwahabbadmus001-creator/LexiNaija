$ErrorActionPreference = 'Stop'
Set-Location $PSScriptRoot
& powershell -ExecutionPolicy Bypass -File .\BUILD_LINGUANAIJA_8000.ps1
exit $LASTEXITCODE
