class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true
  PRELOADER = ActiveRecord::Associations::Preloader.new

  def self.preload!(*args)
    PRELOADER.preload(*args)
  end
end
