# Full recovery pipeline for the JPD course PDFs.
#
#   1. undo the bidi-embedding runs pdftotext emits in visual order
#   2. map leaked Adobe-Japan1 CIDs back to Unicode (fixes the Japanese)
#   3. context-sensitive fix for the Vietnamese glyphs, which live in the same
#      broken font and therefore decode to unrelated CJK codepoints
#
# Step 3 must be context-sensitive: several of the wrong codepoints are also
# legitimate kana (U+30FC prolonged mark, U+3063 small tsu, ...), so a glyph is
# only rewritten when it actually sits inside a Latin-script word.
#
# This file is deliberately pure ASCII - PowerShell 5.1 decodes .ps1 with the
# ANSI codepage unless there is a BOM, which would mangle any literal here.
# All non-ASCII data lives in the two side files, read as explicit UTF-8.
param(
    [Parameter(Mandatory=$true)][string]$In,
    [Parameter(Mandatory=$true)][string]$Out,
    [string]$CidTable  = "$PSScriptRoot\Adobe-Japan1-cidToUnicode.txt",
    [string]$VietTable = "$PSScriptRoot\viet-subs.tsv"
)

# ---- CID -> Unicode -------------------------------------------------------
$lines = [System.IO.File]::ReadAllLines($CidTable)
$cid = New-Object 'int[]' $lines.Length
for ($i = 0; $i -lt $lines.Length; $i++) {
    $h = $lines[$i].Trim()
    if ($h -match '^[0-9a-fA-F]+$') { $cid[$i] = [Convert]::ToInt32($h, 16) } else { $cid[$i] = 0 }
}

# ---- broken glyph -> Vietnamese letter ------------------------------------
$viet = @{}
foreach ($row in [System.IO.File]::ReadAllLines($VietTable, [System.Text.Encoding]::UTF8)) {
    if ($row.Trim().Length -eq 0) { continue }
    $parts = $row -split "`t"
    if ($parts.Count -lt 2) { continue }
    $viet[[Convert]::ToInt32($parts[0].Trim(), 16)] = $parts[1]
}

$text = [System.IO.File]::ReadAllText($In, [System.Text.Encoding]::UTF8)

# ---- 1. bidi ---------------------------------------------------------------
$RLE = [char]0x202B
$POP = [char]0x202C
$evaluator = {
    param($m)
    $inner = $m.Groups[1].Value.ToCharArray()
    [array]::Reverse($inner)
    -join $inner
}
$text = [regex]::Replace($text, "$RLE([^$RLE$POP]*)$POP", $evaluator)
$strip = @(0x200B,0x200E,0x200F,0x202A,0x202B,0x202C,0x202D,0x202E,0x2066,0x2067,0x2068,0x2069,0x061C) |
         ForEach-Object { [char]$_ }
$text = $text -replace ("[" + (-join $strip) + "]"), ""

# ---- 2. Japanese -----------------------------------------------------------
$sb = New-Object System.Text.StringBuilder
foreach ($ch in $text.ToCharArray()) {
    $cp = [int]$ch
    if ($cp -ge 0x100 -and $cp -lt 0x3000 -and $cp -lt $cid.Length -and $cid[$cp] -ne 0) {
        [void]$sb.Append([char]::ConvertFromUtf32($cid[$cp]))
    } else {
        [void]$sb.Append($ch)
    }
}
$chars = $sb.ToString().ToCharArray()

# ---- 3. Vietnamese ---------------------------------------------------------
# Classify every position once, then decide each substitution from its nearest
# non-space neighbours. Doing it with lookup arrays keeps this linear; a
# per-character function call is far too slow over a whole book.
$n = $chars.Length
$isLatin = New-Object 'bool[]' $n     # ASCII letter, good Vietnamese, or a pending glyph
$isSpace = New-Object 'bool[]' $n
for ($i = 0; $i -lt $n; $i++) {
    $c = $chars[$i]
    $o = [int]$c
    $isSpace[$i] = ($c -eq ' ' -or $c -eq "`t")
    $isLatin[$i] = (($o -ge 97 -and $o -le 122) -or ($o -ge 65 -and $o -le 90) -or
                    ($o -ge 0xC0 -and $o -le 0x1EF9) -or $viet.ContainsKey($o))
}

$result = New-Object System.Text.StringBuilder
for ($i = 0; $i -lt $n; $i++) {
    $c = $chars[$i]
    $cp = [int]$c
    if (-not $viet.ContainsKey($cp)) { [void]$result.Append($c); continue }

    $ctx = $false
    $j = $i - 1
    while ($j -ge 0 -and $isSpace[$j]) { $j-- }
    if ($j -ge 0 -and $isLatin[$j]) { $ctx = $true }
    if (-not $ctx) {
        $j = $i + 1
        while ($j -lt $n -and $isSpace[$j]) { $j++ }
        if ($j -lt $n -and $isLatin[$j]) { $ctx = $true }
    }

    if ($ctx) { [void]$result.Append($viet[$cp]) } else { [void]$result.Append($c) }
}

[System.IO.File]::WriteAllText($Out, $result.ToString(), (New-Object System.Text.UTF8Encoding $false))
Write-Output "decoded -> $Out"
