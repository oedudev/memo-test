clear:
	clear

migrate: clear
	php artisan migrate

migrate-reset: clear
	php artisan db:wipe
	php artisan migrate:refresh
	php artisan db:seed

serve: clear
	php artisan serve

db-seed: clear
	php artisan db:seed

up: clear
	docker-compose build app
	docker-compose up -d
	docker-compose exec app rm -rf vendor composer.lock
	docker-compose exec app composer install
	docker-compose exec app php artisan key:generate
	docker-compose exec app php artisan db:wipe
	docker-compose exec app php artisan migrate:refresh
	docker-compose exec app php artisan db:seed
