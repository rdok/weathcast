dev-start: .env
	npm run start:dev
start:
	npm run start

.env:
	cp .env.example .env
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
prettier-fix:
	yarn prettier:fix

update-all:
	yarn upgrade-interactive --latest
