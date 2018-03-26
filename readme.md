[![CircleCI](https://circleci.com/gh/jdrouet/generator-magic/tree/master.svg?style=svg)](https://circleci.com/gh/jdrouet/generator-magic/tree/master)

# The magic generator !

This is a simple yeoman generator to scaffold web projects

## Installation !

First you need to install [nodejs](https://github.com/creationix/nvm) and then
- install Yeoman `npm install -g yo`
- install the generator by running `npm link` in the repo

## Make your first project

`yo magic:server`

And answer the questions :P

## Todo

- [x] Implement a simple backend
- [x] Integrate sequelize for postgresql
- [x] Integrate rabbitmq to implement workers
- [x] Integrate a circleci template
- [ ] Integrate a sendgrid configuration
- [ ] Implement a magic link templace
- [ ] Add a app.json file for heroku
