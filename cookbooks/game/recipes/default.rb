#
# Cookbook Name:: game
# Recipe:: default
#
# Copyright (C) 2013 YOUR_NAME
# 
# All rights reserved - Do Not Redistribute
#
include_recipe 'npm'

gem_package "compass" do
  action :install
end

npm_package "yo"
npm_package "grunt-cli"
npm_package "bower"
npm_package "generator-webapp"

# All npm modules do not install on windows otherwise because of super long file names
execute "create_node_modules_directory" do
  command "mkdir /node_modules; chown vagrant:vagrant /node_modules; chmod 777 /node_modules; ln -s /node_modules /vagrant/client/node_modules"
  action :run
  not_if { ::File.exists?("/node_modules")}
end

execute "npm_install" do
  command 'sudo su - vagrant -c "cd /vagrant/client && npm install"'
  action :run
end

execute "bower_install" do
  command 'sudo su - vagrant -c "cd /vagrant/client && bower install"'
  action :run
end