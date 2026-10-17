<#
    Nord Werk — gallery builder
    ---------------------------------------------------------------
    Drop photos into Asset/service/ and run this (or double-click
    "Update Gallery.cmd" in the project root). For each photo it:

      1. backs the original up to Asset/service/_originals/  (never
         committed - that folder is gitignored, it is your safety net)
      2. fixes phone-camera rotation using the EXIF orientation flag
      3. writes a web-sized version (max 1600px, JPEG q82) in place
      4. writes a grid thumbnail (max 600px, JPEG q80) to thumbs/
      5. regenerates data/service-gallery.json, which the website reads

    The browser cannot list a folder on its own, which is why the
    manifest exists: it is the bridge between your folder and the page.

    Captions are optional. Create Asset/service/captions.txt with lines:
        svc-01.jpg = Full service on an F30 330e | เช็กระยะ F30 330e
    (English before the pipe, Thai after. Either side may be left empty.)
#>

[CmdletBinding()]
param(
    [string] $SourceFolder = "Asset/service",
    [string] $Manifest     = "data/service-gallery.json",
    [int]    $MaxEdge      = 1600,
    [int]    $ThumbEdge    = 600,
    [int]    $Quality      = 82,
    [int]    $ThumbQuality = 80
)

$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing

# Resolve everything against the project root (this script lives in tools/)
$Root = Split-Path -Parent $PSScriptRoot
$Src        = Join-Path $Root $SourceFolder
$ThumbDir   = Join-Path $Src  'thumbs'
$BackupDir  = Join-Path $Src  '_originals'
$ManifestFp = Join-Path $Root $Manifest
$CaptionsFp = Join-Path $Src  'captions.txt'

Write-Host ""
Write-Host "  Nord Werk - gallery builder" -ForegroundColor Cyan
Write-Host "  source: $Src"
Write-Host ""

if (-not (Test-Path $Src)) {
    New-Item -ItemType Directory -Path $Src -Force | Out-Null
    Write-Host "  Created $SourceFolder - put your photos there and run this again." -ForegroundColor Yellow
    Write-Host ""
    return
}
foreach ($d in @($ThumbDir, $BackupDir, (Split-Path -Parent $ManifestFp))) {
    if (-not (Test-Path $d)) { New-Item -ItemType Directory -Path $d -Force | Out-Null }
}

# ---------- helpers ----------

$JpegEncoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() |
               Where-Object { $_.MimeType -eq 'image/jpeg' }

function New-EncoderParams([int]$q) {
    $p = New-Object System.Drawing.Imaging.EncoderParameters 1
    $p.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter(
        [System.Drawing.Imaging.Encoder]::Quality, [long]$q)
    return $p
}

# Phones record rotation as an EXIF flag rather than rotating the pixels,
# so without this portrait shots land sideways on the page.
function Invoke-ExifRotate($image) {
    $ORIENTATION = 274
    if ($image.PropertyIdList -notcontains $ORIENTATION) { return }
    $v = $image.GetPropertyItem($ORIENTATION).Value[0]
    switch ($v) {
        3 { $image.RotateFlip([System.Drawing.RotateFlipType]::Rotate180FlipNone) }
        6 { $image.RotateFlip([System.Drawing.RotateFlipType]::Rotate90FlipNone) }
        8 { $image.RotateFlip([System.Drawing.RotateFlipType]::Rotate270FlipNone) }
    }
    if ($v -ne 1) { $image.RemovePropertyItem($ORIENTATION) }
}

function Write-Resized($image, [string]$destPath, [int]$maxEdge, [int]$q) {
    $longest = [Math]::Max($image.Width, $image.Height)
    $scale   = [Math]::Min(1.0, $maxEdge / [double]$longest)
    $nw = [int][Math]::Round($image.Width  * $scale)
    $nh = [int][Math]::Round($image.Height * $scale)
    if ($nw -lt 1) { $nw = 1 }
    if ($nh -lt 1) { $nh = 1 }

    $bmp = New-Object System.Drawing.Bitmap $nw, $nh
    try {
        $g = [System.Drawing.Graphics]::FromImage($bmp)
        try {
            $g.InterpolationMode  = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
            $g.PixelOffsetMode    = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
            $g.SmoothingMode      = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
            $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
            $g.DrawImage($image, 0, 0, $nw, $nh)
        } finally { $g.Dispose() }

        $ep = New-EncoderParams $q
        try { $bmp.Save($destPath, $JpegEncoder, $ep) } finally { $ep.Dispose() }
    } finally { $bmp.Dispose() }

    return @{ w = $nw; h = $nh }
}

# Web-safe, predictable filenames. Returns e.g. "img-2031.jpg".
function ConvertTo-SafeName([string]$name) {
    $base = [IO.Path]::GetFileNameWithoutExtension($name).ToLowerInvariant()
    $base = $base -replace '[^a-z0-9]+', '-'
    $base = $base.Trim('-')
    if ([string]::IsNullOrWhiteSpace($base)) { $base = 'photo' }
    return "$base.jpg"
}

# ---------- captions ----------

$captions = @{}
if (Test-Path $CaptionsFp) {
    foreach ($line in (Get-Content $CaptionsFp -Encoding UTF8)) {
        $t = $line.Trim()
        if ($t -eq '' -or $t.StartsWith('#')) { continue }
        $eq = $t.IndexOf('=')
        if ($eq -lt 1) { continue }
        $key = $t.Substring(0, $eq).Trim().ToLowerInvariant()
        $val = $t.Substring($eq + 1).Trim()
        $en = $val; $th = ''
        if ($val.Contains('|')) {
            $parts = $val.Split([char]'|', 2)
            $en = $parts[0].Trim(); $th = $parts[1].Trim()
        }
        $captions[$key] = @{ en = $en; th = $th }
    }
    Write-Host ("  captions.txt: {0} entr{1} loaded" -f $captions.Count, $(if($captions.Count -eq 1){'y'}else{'ies'}))
}

# ---------- process ----------

$exts  = @('.jpg', '.jpeg', '.png', '.webp', '.bmp')
$files = Get-ChildItem -LiteralPath $Src -File |
         Where-Object { $exts -contains $_.Extension.ToLowerInvariant() } |
         Sort-Object Name

if ($files.Count -eq 0) {
    Write-Host "  No photos found in $SourceFolder." -ForegroundColor Yellow
    Write-Host "  Drop some .jpg/.png files there and run this again."
    Write-Host ""
}

$items     = New-Object System.Collections.ArrayList
$processed = 0
$skipped   = 0
$savedKb   = 0

foreach ($f in $files) {
    $safe      = ConvertTo-SafeName $f.Name
    $finalPath = Join-Path $Src      $safe
    $thumbPath = Join-Path $ThumbDir $safe
    $backupFp  = Join-Path $BackupDir $f.Name

    $alreadyOptimised = $false
    if ((Test-Path $thumbPath) -and ($f.Name -eq $safe)) {
        # Re-running should be cheap: if a thumb exists and is newer than the
        # source, this photo has already been through the mill.
        $alreadyOptimised = (Get-Item $thumbPath).LastWriteTime -ge $f.LastWriteTime
    }

    $img = [System.Drawing.Image]::FromFile($f.FullName)
    try {
        Invoke-ExifRotate $img

        if ($alreadyOptimised) {
            $dims = @{ w = $img.Width; h = $img.Height }
            $skipped++
        } else {
            if (-not (Test-Path $backupFp)) {
                Copy-Item -LiteralPath $f.FullName -Destination $backupFp -Force
            }
            $beforeKb = [int]($f.Length / 1KB)

            $tmpFull  = Join-Path $env:TEMP ("nw-full-"  + [Guid]::NewGuid().ToString('N') + ".jpg")
            $tmpThumb = Join-Path $env:TEMP ("nw-thumb-" + [Guid]::NewGuid().ToString('N') + ".jpg")

            $dims = Write-Resized $img $tmpFull  $MaxEdge   $Quality
            $null = Write-Resized $img $tmpThumb $ThumbEdge $ThumbQuality

            $img.Dispose(); $img = $null      # release the lock before replacing

            Move-Item -LiteralPath $tmpFull  -Destination $finalPath -Force
            Move-Item -LiteralPath $tmpThumb -Destination $thumbPath -Force
            if ($f.Name -ne $safe) { Remove-Item -LiteralPath $f.FullName -Force }

            $afterKb = [int]((Get-Item $finalPath).Length / 1KB)
            $savedKb += ($beforeKb - $afterKb)
            $processed++
            Write-Host ("    {0,-28} {1,5} KB -> {2,4} KB   {3}x{4}" -f $safe, $beforeKb, $afterKb, $dims.w, $dims.h)
        }
    } finally {
        if ($img -ne $null) { $img.Dispose() }
    }

    $cap = $captions[$safe.ToLowerInvariant()]
    $entry = [ordered]@{
        src   = "$SourceFolder/$safe"
        thumb = "$SourceFolder/thumbs/$safe"
        w     = $dims.w
        h     = $dims.h
    }
    if ($cap) {
        if ($cap.en) { $entry.caption   = $cap.en }
        if ($cap.th) { $entry.captionTh = $cap.th }
    }
    [void]$items.Add($entry)
}

# ---------- manifest ----------

$payload = [ordered]@{
    generated = (Get-Date).ToString("yyyy-MM-ddTHH:mm:ssK")
    count     = $items.Count
    items     = @($items)
}

# -Depth matters: without it PowerShell flattens the nested item objects.
$json = $payload | ConvertTo-Json -Depth 5
[IO.File]::WriteAllText($ManifestFp, $json, (New-Object Text.UTF8Encoding $false))

Write-Host ""
Write-Host ("  {0} photo(s) in the gallery" -f $items.Count) -ForegroundColor Green
if ($processed -gt 0) {
    Write-Host ("  {0} optimised, {1} already done, ~{2} KB saved" -f $processed, $skipped, $savedKb)
} elseif ($skipped -gt 0) {
    Write-Host ("  nothing new - {0} already optimised" -f $skipped)
}
Write-Host ("  manifest: {0}" -f $Manifest)
Write-Host ""
