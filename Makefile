run-dev:
	docker-compose -f ./docker-compose.yml up --build

stop-dev:
	docker-compose -f ./docker-compose.yml down

run-prod:
	docker-compose -f ./docker-compose-production.yml up --build -d

stop-prod:
	docker-compose -f ./docker-compose-production.yml down
