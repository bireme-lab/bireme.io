BUILD_ICONS_SPRITE_SCRIPT = scripts/build-svg-sprite.ts

install:
	bun install

prepare:
	bun husky

dev: build-icons-sprite
	bun next dev

storybook:
	bun storybook dev -p 6006

test:
	bun test

test-watch:
	bun --watch test

lint:
	bun next lint

typecheck:
	bun tsc --noEmit

lint-staged:
	bun lint-staged

storybook-build:
	bun build-storybook

build-icons-sprite:
	bun tsx ${BUILD_ICONS_SPRITE_SCRIPT}

build: build-icons-sprite
	bun next build

start:
	bun next start

clean:
	rm -rf .next
