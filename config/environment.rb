# Load the Rails application.
require_relative 'application'

# Initialize the Rails application.
Rails.application.initialize!

# Add monkey patching.
require_relative 'monkey_patch'

