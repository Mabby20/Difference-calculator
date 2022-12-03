install:
	npm ci

publish:
	npm publish --dry-run

lint:
	npx eslint .

test:
	npx jest

test-coverage:
	npx jest --coverage --coverageProvider=v8

start-gendiff:
	gendiff -f json __fixtures__/file1.json __fixtures__/file2.json

.PHONY: test
