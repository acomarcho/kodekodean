run-dev:
	docker-compose -f ./docker-compose.yml up --build -d

stop-dev:
	docker-compose -f ./docker-compose.yml down

run-prod:
	docker-compose -f ./docker-compose.yml.production up --build -d

stop-prod:
	docker-compose -f ./docker-compose.yml.production down
