#!/bin/bash

if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

echo "Starting development server..."
npx http-server . -p 8080

if which xdg-open > /dev/null; then
  xdg-open http://localhost:8080
elif which open > /dev/null; then
  open http://localhost:8080
else
  echo "Please open http://localhost:8080 in your browser."
fi
