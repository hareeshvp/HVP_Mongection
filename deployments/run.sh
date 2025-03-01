#!/bin/sh
# Deploy the Seeker Node.js Agent

if [ ! -z "${SEEKER_SERVER_URL}" ];
then
    # Download the Agent package
    curl -k -o /tmp/seeker-agent.zip "${SEEKER_SERVER_URL}/rest/api/latest/installers/agents/binaries/NODEJS"
    
    # Unzip the Agent package
    unzip -d /tmp/seeker /tmp/seeker-agent.zip

    # Install the Agent (needed for fetching Agent dependencies)
    npm install /tmp/seeker/seeker-agent.tgz --prefix seeker --save

    # Start the application with the Agent automatically 
    node -r './seeker/node_modules/@seeker/agent' src/app.js
else
    node src/app.js
fi
