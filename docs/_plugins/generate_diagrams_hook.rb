Jekyll::Hooks.register :site, :post_write do |site|
  puts "Generating diagrams..."
  puts(`./generate_diagrams.sh`)
end