PowerCalc — Run & Test Locally
=================================

Prerequisites
- Java 17 installed and on PATH
- Maven (mvn) installed and on PATH

Quick run using VS Code Tasks
1. In VS Code open the Command Palette (Ctrl+Shift+P) -> "Tasks: Run Task".
2. Choose `Build Backend (Maven)` to compile and package the app.
3. Choose `Run Backend (jar)` to start the application (serves frontend at http://localhost:8081/).
4. To stop the running backend, run the `Stop Backend (kill jar)` task.

Manual commands (PowerShell)
Build:
```powershell
mvn -f "powercalc-backend" clean package -DskipTests
```
Run:
```powershell
java -jar "powercalc-backend/target/powercalc-backend-0.0.1-SNAPSHOT.jar"
```
Stop (kill running jar):
```powershell
Get-CimInstance Win32_Process | Where-Object { $_.CommandLine -and $_.CommandLine -like '*powercalc-backend-0.0.1-SNAPSHOT.jar*' } | ForEach-Object { Stop-Process -Id $_.ProcessId -Force }
```

Verify endpoints
- Ping API:
```powershell
Invoke-WebRequest -Uri http://localhost:8081/api/ping -UseBasicParsing
```
- Open UI: http://localhost:8081/

Notes & troubleshooting
- If the build fails because the jar file is locked, stop the running process (see Stop command) and retry.
- The backend serves the frontend static files placed at `src/main/resources/static/`.
