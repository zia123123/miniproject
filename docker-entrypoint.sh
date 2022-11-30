#!/bin/sh
git checkout $1
git pull origin $1
docker compose -f docker-compose-$1.yml -p backendaccount-$1 down
docker compose -f docker-compose-$1.yml -p backendaccount-$1 rm -f
docker system prune -a -f
rm -rf .env

docker compose -f docker-compose-$1.yml -p backendaccount-$1 build \
                    --build-arg NODE_ENV=$2 \
                    --build-arg PORT=$3 \
                    --no-cache

docker compose -f docker-compose-$1.yml -p backendaccount-$1 up --force-recreate -d
echo "Deploy Success"