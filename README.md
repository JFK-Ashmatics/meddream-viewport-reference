# MEDDREAM ViewportsCore Demo Environment

A complete Docker Compose setup for running the MEDDREAM ViewportsCore demonstration with Orthanc PACS integration.

## 🏗️ Architecture

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│  Frontend   │───▶│  MEDDREAM    │───▶│   Orthanc   │
│  (nginx)    │    │  (viewer)    │    │   (PACS)    │
│  Port 80    │    │  Port 8080   │    │ Port 4242/  │
└─────────────┘    └─────────────┘    │    8042     │
                                      └─────────────┘
```

## 🚀 Quick Start

### 1. **Setup**
```bash
# Clone/download this demo
chmod +x setup.sh
./setup.sh

# Set your NPM token
export NPM_TOKEN=your_meddream_npm_token
```

### 2. **Build Frontend**
```bash
docker-compose --profile build up builder
```

### 3. **Start Services**
```bash
docker-compose up -d
```

### 4. **Load Sample Data**
```bash
docker-compose --profile tools up dicom-loader
```

### 5. **Access the Demo**
- **Frontend Application**: http://localhost/
- **MEDDREAM Direct**: http://localhost:8080/
- **Orthanc PACS**: http://localhost:8042/

## 📋 Services

### Core Services (always running)
- **`orthanc`**: DICOM PACS server with Python integration
- **`meddream`**: DICOM viewer application 
- **`frontend`**: nginx serving the ViewportsCore demo app

### Utility Services (run when needed)
- **`builder`**: Builds the frontend application
- **`dicom-loader`**: Loads sample DICOM studies

## 🛠️ Management Commands

### Service Management
```bash
# Start all services
docker-compose up -d

# Stop all services
docker-compose down

# View logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f meddream
```

### Development Workflow
```bash
# Rebuild frontend after code changes
docker-compose --profile build up --build builder

# Restart specific service
docker-compose restart meddream

# Update a single service
docker-compose up -d --no-deps meddream
```

### Data Management
```bash
# Reset all data (including DICOM studies)
docker-compose down -v

# Reload sample DICOM data
docker-compose --profile tools up dicom-loader

# Backup Orthanc database
docker-compose exec orthanc tar czf - /var/lib/orthanc/db > orthanc-backup.tar.gz
```

## 🔧 Configuration

### Environment Variables
Create `.env` file:
```bash
NPM_TOKEN=your_meddream_npm_token
COMPOSE_PROJECT_NAME=meddream-demo
```

### Key Configuration Files
- **`orthanc.json`**: Orthanc PACS configuration
- **`application.properties`**: MEDDREAM viewer settings
- **`nginx.conf`**: Frontend proxy configuration
- **`meddream.py`**: Orthanc-MEDDREAM integration script

### Customizing MEDDREAM
Edit `application.properties`:
```properties
# Change PACS connection
pacs.host=your-pacs-server
pacs.port=11112
pacs.type=dimse

# Adjust logging
logging.level.com.softneta=DEBUG
```

### Customizing nginx
Edit `nginx.conf` to add custom proxy rules or static file handling.

## 🩺 Health Checks

All services include health checks. Check status:
```bash
docker-compose ps
```

Individual health check URLs:
- Frontend: http://localhost/health
- MEDDREAM: http://localhost:8080/actuator/health  
- Orthanc: http://localhost:8042/system

## 🐛 Troubleshooting

### Common Issues

**1. Frontend won't build**
```bash
# Check NPM_TOKEN is set
echo $NPM_TOKEN

# Rebuild with verbose output
docker-compose --profile build up --build builder
```

**2. MEDDREAM can't connect to Orthanc**
```bash
# Check Orthanc is running
docker-compose ps orthanc

# Check network connectivity
docker-compose exec meddream ping orthanc

# Verify Orthanc API
curl http://localhost:8042/system
```

**3. No DICOM studies visible**
```bash
# Check if studies were loaded
curl http://localhost:8042/studies

# Reload sample data
docker-compose --profile tools up dicom-loader
```

**4. ViewportsCore chunk loading errors**
```bash
# Check frontend build exists
ls -la build/

# Verify nginx proxy configuration
docker-compose exec frontend cat /etc/nginx/conf.d/default.conf
```

### Debug Mode
```bash
# Run with debug logging
COMPOSE_LOG_LEVEL=DEBUG docker-compose up

# Access container shells
docker-compose exec meddream bash
docker-compose exec orthanc bash
docker-compose exec frontend sh
```

## 📁 Project Structure

```
meddream-demo/
├── docker-compose.yml      # Main orchestration
├── nginx.conf             # Frontend proxy config
├── setup.sh               # Setup script
├── .env                   # Environment variables
├── orthanc.json           # Orthanc configuration
├── application.properties # MEDDREAM configuration  
├── meddream.py            # Orthanc integration
├── build/                 # Built frontend (created by builder)
├── src/                   # Frontend source code
├── package.json           # Frontend dependencies
└── README.md              # This file
```

## 🔒 Security Notes

- This is a **development/demo environment**
- Default credentials are used (if any)
- No HTTPS/SSL configured  
- Not suitable for production without hardening

## 📚 Further Reading

- [MEDDREAM Documentation](https://www.softneta.com/products/meddream-dicom-viewer/)
- [Orthanc Documentation](https://orthanc-server.readthedocs.io/)
- [ViewportsCore API](https://demo.meddream.com/viewports-api/)

## 🆘 Support

For issues with:
- **MEDDREAM**: Contact Softneta support
- **Orthanc**: Check Orthanc community forums
- **This demo**: Check Docker and configuration logs