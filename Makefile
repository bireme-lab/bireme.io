dev:
	bun next dev

storybook:
	bun storybook dev -p 6006

storybook-build:
	bun build-storybook

test:
	bun test

test-watch:
	bun --watch test

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
