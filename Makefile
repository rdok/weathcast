dev-start:
	npm run start
start:
	npm run start

weathcast-london:
	yarn app London

check: lint prettier test

lint:
	yarn linter
lint-fix:
	yarn linter:fix

test:
	yarn test
test-watch:
	yarn test:watch

prettier:
	yarn prettier
prettier-write:
	npx prettier --write .
