class StaticPagesController < ApplicationController
  def root
    p current_user
  end
end