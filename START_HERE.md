# LexiNaija — 8,000-entry text-first release

This is the complete project. Do not merge it with an older LexiNaija folder.

## One command

Open this folder in VS Code, open PowerShell in the project root and run:

```powershell
powershell -ExecutionPolicy Bypass -File .\BUILD_LEXINAIJA_8000.ps1
```

The script builds and validates exactly:

- 2,000 Yorùbá entries
- 2,000 Hausa entries
- 2,000 Igbo entries
- 2,000 Nigerian Pidgin entries
- 8,000 entries total

No dictionary word or translation is AI-generated. The build hard-fails if verified/open source material cannot meet the required count.

After it prints `BUILD COMPLETE`, run:

```powershell
npm.cmd run dev
```

Audio/pronunciation has been removed from this release and is reserved for future development.
