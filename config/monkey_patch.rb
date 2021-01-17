class Jbuilder
  alias_method :old_method_missing, :method_missing

  def method_missing(name, *args, &blk)
    if args.empty? && ::Kernel.block_given?
      set!(name) { merge!({}) }
      old_method_missing(name, *args, &blk)
    else
      old_method_missing(name, *args, &blk)
    end
  end
end