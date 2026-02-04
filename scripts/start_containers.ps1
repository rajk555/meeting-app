# Auto-start Meeting Notes App containers on user logon
# Wait for Docker daemon to be ready, then run docker compose up

# Auto-start Meeting Notes App containers on user logon
# Wait for Docker daemon to be ready, then run docker compose up

# Paths
$workspace = "$env:USERPROFILE\.openclaw\workspace"
$dockerExe = "${env:ProgramFiles}\Docker\Docker\resources\bin\docker.exe"

Write-Output "Waiting for Docker daemon to be available..."
while ($true) {
    try {
        & "$dockerExe" info | Out-Null
        break
    } catch {
        Start-Sleep -Seconds 5
    }
}

Write-Output "Starting Meeting Notes App containers..."
Push-Location $workspace
& "$dockerExe" compose up --build -d
Pop-Location
