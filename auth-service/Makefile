# Makefile for TypeORM Migration

DATASOURCE=./src/data-source.ts

# Fallback target if nothing is passed
all:
	@echo ""
	@echo "Usage:"
	@echo "  make migrate-<MigrationName>        Generate a new migration"
	@echo "  make up                             Run all pending migrations"
	@echo "  make down                           Revert the last migration"
	@echo 
	
# Pattern rule: make migration-YourName
migrate-%:
	npx typeorm-ts-node-commonjs -d $(DATASOURCE) migration:generate ./src/migration/$*
	
# Run all migrations
migrate-up:
	npx typeorm-ts-node-commonjs -d $(DATASOURCE) migration:run

# Revert last migration
migrate-down:
	npx typeorm-ts-node-commonjs -d $(DATASOURCE) migration:revert
