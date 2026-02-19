#!/bin/bash

set -e

if [ ! -f ./backend/.env ] || [ ! -f ./frontend/.env ]; then
    echo "Error: .env files missing in /backend or /frontend!!"
    echo "Please create them based on the README instructions."
    exit 1
fi

docker compose build

docker compose up -d

sleep 10 

docker compose exec backend npx prisma migrate dev --name init
docker compose exec backend npx prisma db seed

echo "SUCCESS: Pollie is now live!"
