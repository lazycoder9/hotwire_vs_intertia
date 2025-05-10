# syntax=docker/dockerfile:1

####################################################
# 1) Base image (runtime deps only)               #
####################################################
ARG RUBY_VERSION=3.3.5
FROM docker.io/library/ruby:${RUBY_VERSION}-slim AS base

WORKDIR /rails

RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y \
      curl libjemalloc2 libvips sqlite3 && \
    rm -rf /var/lib/apt/lists/* /var/cache/apt/archives

ENV RAILS_ENV="production" \
    BUNDLE_DEPLOYMENT="1" \
    BUNDLE_PATH="/usr/local/bundle" \
    BUNDLE_WITHOUT="development"

####################################################
# 2) Build image (gems + JS + assets)             #
####################################################
FROM base AS build

# install Ruby build deps + Node for Yarn/Vite
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y \
      build-essential git libyaml-dev pkg-config \
      nodejs npm && \
    npm install -g yarn && \
    rm -rf /var/lib/apt/lists/* /var/cache/apt/archives

# 2.1) Ruby gems
COPY Gemfile Gemfile.lock ./
RUN bundle install && \
    rm -rf ~/.bundle/ "${BUNDLE_PATH}"/ruby/*/cache \
           "${BUNDLE_PATH}"/ruby/*/bundler/gems/*/.git && \
    bundle exec bootsnap precompile --gemfile

# 2.2) JS deps (Vite/Ruby + React)
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# 2.3) app code + Bootsnap precompile
COPY . .
RUN bundle exec bootsnap precompile app/ lib/

# 2.4) Rails + Vite asset build
RUN SECRET_KEY_BASE_DUMMY=1 \
    ./bin/rails assets:precompile

####################################################
# 3) Release image (runtime only, no build tools) #
####################################################
FROM base

# copy in gems + compiled app
COPY --from=build "${BUNDLE_PATH}" "${BUNDLE_PATH}"
COPY --from=build /rails /rails

# Run and own only the runtime files as a non-root user for security
RUN groupadd --system --gid 1000 rails && \
    useradd rails --uid 1000 --gid 1000 --create-home --shell /bin/bash && \
    chown -R rails:rails db log storage tmp
USER 1000:1000

ENTRYPOINT ["/rails/bin/docker-entrypoint"]

# Start server via Thruster by default, this can be overwritten at runtime
EXPOSE 80
CMD ["./bin/thrust", "./bin/rails", "server"]
