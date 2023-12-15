# README


This application is called Lighthouse. 
It is a tourism app where you can book any tour you want with just one click.

Things you may want to cover:

* Ruby 7

* System dependencies
    package.json
    npm install
    npm install jwt-decode


* Configuration
    in terminal: bundle exec rake secret
    this will gave you a secret key

    EDITOR='code --wait' rails credentials:edit
    the put: devise_jwt_secret_key: (secret key)
    save ad exit


* Database creation
  rails new Lighthouse --api -d mysql



* Database initialization
    sudo /etc/init.d/mysql start

* How to run the test suite
  rspec in rails terminal

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions
    React is in server  http://localhost:3000
    Rails is in server  http://localhost:3001

