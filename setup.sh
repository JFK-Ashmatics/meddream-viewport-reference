#!/bin/bash

# MEDDREAM Demo Setup Script
# This script sets up all the necessary configuration files for the demo

set -e

echo "🏥 MEDDREAM Demo Setup"
echo "====================="

# Check if NPM_TOKEN is provided
if [ -z "$NPM_TOKEN" ]; then
    echo "⚠️  Warning: NPM_TOKEN not set. You'll need to set it to build the frontend."
    echo "   Export it with: export NPM_TOKEN=your_token_here"
fi

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cat > .env << EOF
# MEDDREAM NPM Token (required for building frontend)
NPM_TOKEN=your_token_here

# Container configuration
COMPOSE_PROJECT_NAME=meddream-demo
EOF
    echo "✅ Created .env file - please update NPM_TOKEN"
fi

# Download and configure Orthanc
echo "📥 Setting up Orthanc configuration..."
if [ ! -f orthanc.json ]; then
    echo "   Downloading default Orthanc configuration..."
    docker run --rm --entrypoint=cat jodogne/orthanc-python /etc/orthanc/orthanc.json > orthanc.json
fi

if [ ! -f meddream.py ]; then
    echo "   Downloading MEDDREAM integration script..."
    curl -o meddream.py www.meddream.com/files/meddreampacs/lite/meddream.py
fi

# Configure Orthanc for MEDDREAM
echo "🔧 Configuring Orthanc for MEDDREAM integration..."
python3 -c "
import json
try:
    with open('orthanc.json', 'r') as f:
        data = json.load(f)
    data['Plugins'] = []
    data['PythonScript'] = '/etc/orthanc/meddream.py'
    with open('orthanc.json', 'w') as f:
        json.dump(data, f, indent=2)
    print('✅ Updated orthanc.json successfully')
except Exception as e:
    print(f'❌ Error updating orthanc.json: {e}')
    exit(1)
"

# Create MEDDREAM application.properties
echo "📋 Creating MEDDREAM configuration..."
cat > application.properties << EOF
# MEDDREAM Configuration for Demo
pacs.host=orthanc
pacs.port=8042
pacs.type=orthanc
server.port=8080

# Logging
logging.level.root=INFO
logging.level.com.softneta=DEBUG

# Optional: Performance tuning
spring.servlet.multipart.max-file-size=100MB
spring.servlet.multipart.max-request-size=100MB
EOF

echo "✅ Created application.properties"

# Create directory structure
echo "📁 Creating directory structure..."
mkdir -p build
mkdir -p logs

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Update .env file with your NPM_TOKEN"
echo "2. Build frontend: docker-compose --profile build up builder"
echo "3. Start services: docker-compose up -d"
echo "4. Load sample data: docker-compose --profile tools up dicom-loader"
echo ""
echo "Access points:"
echo "- Frontend: http://localhost/"
echo "- MEDDREAM: http://localhost:8080/"
echo "- Orthanc: http://localhost:8042/"
echo ""
echo "Useful commands:"
echo "- View logs: docker-compose logs -f"
echo "- Stop all: docker-compose down"
echo "- Rebuild frontend: docker-compose --profile build up --build builder"
echo "- Reset data: docker-compose down -v"