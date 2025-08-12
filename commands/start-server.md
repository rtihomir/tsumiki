# Development Server Startup and Management

Command for starting and managing development environment servers.

## Server Startup Verification and Management

Check server status before starting development and start if necessary:

```bash
# Check existing Vite server
ps aux | grep -E "vite.*--port 3000" | grep -v grep

# Start new server if not running
if ! ps aux | grep -E "vite.*--port 3000" | grep -v grep > /dev/null; then
  echo "Server is not running. Starting development server..."
  npm run dev &
  echo "Server starting... waiting 5 seconds"
  sleep 5
else
  echo "Existing server found. Using it as is."
  ps aux | grep -E "vite.*--port 3000" | grep -v grep | awk '{print "PID: " $2 " - Vite server already running"}'
fi

# Server operation verification
echo "Verifying server operation..."
curl -s http://localhost:3000 > /dev/null && echo "✅ Server is operating normally" || echo "⚠️ Cannot connect to server"
```

## Server Management Commands

### Server Status Verification

```bash
# Check currently running server processes
ps aux | grep -E "vite.*--port 3000" | grep -v grep

# Check port usage
lsof -i :3000
```

### Server Stop

```bash
# Stop Vite server
pkill -f "vite.*--port 3000"

# Force stop (if above doesn't work)
ps aux | grep -E "vite.*--port 3000" | grep -v grep | awk '{print $2}' | xargs kill -9
```

### Server Restart

```bash
# Stop server
pkill -f "vite.*--port 3000"

# Wait a bit
sleep 2

# Restart server
npm run dev &

# Verify startup
sleep 5
curl -s http://localhost:3000 > /dev/null && echo "✅ Server is operating normally" || echo "⚠️ Cannot connect to server"
```

## Usage Scenarios

- Environment preparation before starting TDD development
- Recovery when server is stopped
- When server status verification is needed
- During development environment setup

## Notes

- If port 3000 is used by other processes, terminate the relevant process
- After server startup, you can verify operation by accessing http://localhost:3000 in browser
- It is recommended to properly stop background servers when work is finished