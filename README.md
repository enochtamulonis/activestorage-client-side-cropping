##### Prerequisites

The setups steps expect following tools installed on the system.

- Github
- Ruby [3.0.0](https://github.com/yunggindigo/activestorage-client-side-cropping/blob/main/.ruby-version)
- Rails [6.1.1](https://github.com/yunggindigo/activestorage-client-side-cropping/blob/main/Gemfile)

##### 1. Check out the repository

```bash
git clone https://github.com/yunggindigo/activestorage-client-side-cropping.git
```

##### 2. Create and setup the database

Run the following commands to create and setup the database.

```ruby
rails db:create
```
##### 3. Create and setup the database

Install Js dependencies
```ruby
yarn install --check-files
```
##### 4. Start the Rails server

You can start the rails server using the command given below.

```ruby
rails s
```

And now you can visit the site with the URL http://localhost:3000
