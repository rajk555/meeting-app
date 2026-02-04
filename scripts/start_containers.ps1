# Auto-start Meeting Notes App containers on user logon
# Wait for Docker daemon to be ready, then run docker compose up

# Define workspace path
$workspace = "$env:USERPROFILE\.openclaw\workspace"

Write-Output "Waiting for Docker daemon to be available..."
while ($true) {
    try {
        docker info | Out-Null
        break
    } catch {
        Start-Sleep -Seconds 5
    }
}

Write-Output "Starting Meeting Notes App containers..."
Push-Location $workspace
docker compose up --build -d
Pop-Location
