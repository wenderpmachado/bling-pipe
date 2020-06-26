
# BlingPipe - A RESTFul API

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
  <a href="https://www.mongodb.com/" target="blank"><img src="https://bognarjunior.files.wordpress.com/2015/05/thumb.png?w=120" width="120" alt="MongoDB Logo" /></a>
</p>

<p align="center">A High Standard RESTFul API</p>

<hr>

The main objective was to integrate with Pipedrive and Bling platforms.

The project is hosted on Heroku, you can check it at the link below:

- https://linkapi-test.herokuapp.com/v1
  - [/v1 - First version](https://linkapi-test.herokuapp.com/v1/)
  - [/docs - OpenAPI](https://linkapi-test.herokuapp.com/docs/)

## :wrench: Prerequisite

To bring up the RESTFul API in your environment, you **MUST** first:

* [x] Have an account with [Pipedrive](https://www.pipedrive.com/)
* [x] Have an account at [Bling](https://bling.com.br/)
* [x] Clone the repository
   - `git clone git@github.com:wenderpmachado/linkapi-test.git`
* [x] Install the dependencies
   - `yarn install` or` npm install`
* [x] Set the environment variables
   - Renaming the `.env.example` file to` .env`
   - Fill in the secret information

## :rocket: Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## :heavy_check_mark: Test

The project has implemented unit tests:

```bash
# unit tests
$ yarn test
```

In addition, we can see the test coverage:

```bash
# test coverage
$ yarn test:cov
```

## :wave: Stay in touch

- Author - [Wender Machado](https://www.linkedin.com/in/wenderpmachado)

## :memo: License

This project is under the MIT license. See the archive [LICENSE](LICENSE.md) for more details.
