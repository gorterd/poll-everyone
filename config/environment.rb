# Load the Rails application.
require_relative 'application'

# Initialize the Rails application.
Rails.application.initialize!

# Customizations
require_relative 'monkey_patch'
Jbuilder.key_format camelize: :lower
Jbuilder.deep_format_keys true

