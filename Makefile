.ONESHELL: # Applies to every targets in the file!

clear:
	clear

up-frontend: clear
	cd frontend
	yarn install
	yarn dev

up-backend: clear
	cd backend
	docker-compose build app
	docker-compose up -d
	docker-compose exec app rm -rf vendor composer.lock
	docker-compose exec app composer install
	docker-compose exec app php artisan key:generate
	docker-compose exec app php artisan db:wipe
	docker-compose exec app php artisan migrate:refresh
	docker-compose exec app php artisan db:seed