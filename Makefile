dev:
	bun next dev

test:
	bun test

test-watch:
	bun --watch test

storybook:
	bun storybook dev -p 6006

build-storybook:
	bun storybook build

install:
	bun install

prepare:
	bun husky

lint-staged:
	bun lint-staged

build:
	bun next build

start:
	bun next start

lint:
	bun next start

typecheck:
	bun tsc --noEmit

clean:
	rm -rf .next
	rm -rf node_modules
	