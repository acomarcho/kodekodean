run-dev:
	docker compose -f ./docker-compose.yml up --build

stop-dev:
	docker compose -f ./docker-compose.yml down

run-prod:
	docker compose -f ./docker-compose.yml.production up --build

stop-prod:
	docker compose -f ./docker-compose.yml.production down