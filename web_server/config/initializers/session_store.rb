# Rails.application.config.session_store :redis_store, servers: ["redis://localhost:6379/1/session"]
Rails.application.config.session_store :cookie_store, key: '_my_key'
