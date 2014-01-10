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

# Install Go deps
execute "go_deps" do
  command 'go get github.com/gorilla/websocket && go get github.com/golang/glog'
  action :run
end

# Build WS Go server
execute "go_server" do
  command 'mkdir -p /opt/go/src/github.com/avaus && ln -s /vagrant /opt/go/src/github.com/avaus/GameDemo && go install github.com/avaus/GameDemo'
  action :run
end