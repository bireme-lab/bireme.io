BUILD_ICONS_SPRITE_SCRIPT = scripts/build-svg-sprite.ts
GENERATE_IMAGES_DATA_SCRIPT = scripts/generate-images-data.ts
PRINT_BUILD_STATS = scripts/print-build-stats.ts

install:
	bun install

prepare:
	bun husky

dev: build-icons-sprite generate-images-data
	bun next dev

storybook: build-icons-sprite generate-images-data
	bun storybook dev -p 6006 --no-open

test:
	bun vitest run

test-dev:
	bun vitest --ui

lint:
	bun next lint

typecheck:
	bun tsc --noEmit

lint-staged:
	bun lint-staged

build-storybook: build-icons-sprite generate-images-data
	bun build-storybook

build-icons-sprite:
	bun ${BUILD_ICONS_SPRITE_SCRIPT}

generate-images-data:
	bun ${GENERATE_IMAGES_DATA_SCRIPT}

print-build-stats:
	bun ${PRINT_BUILD_STATS}

build: print-build-stats build-icons-sprite generate-images-data
	bun next build

start:
	bun next start

clean:
	rm -rf .next
