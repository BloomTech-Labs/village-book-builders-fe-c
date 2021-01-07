# Village Book Builders TeamB Portal

For steps on how to work with this repository [please see here](https://docs.labs.lambdaschool.com/labs-spa-starter/)

# Village Book Builders

You can find the deployed project at [VBB-Deployment](main.d364h8tamcqe39.amplifyapp.com).

## Contributors

|                                                      [Josh Glanz](https://github.com/)                                                       |                                                       [Manuel Muratalla](https://github.com/)                                                        |                                                      [Tiffany Arellano](https://github.com/)                                                       |                                                       [Joe Idelson](https://github.com/)                                                        |                                                      [Wilma Rodriguez](https://github.com/)                                                       |
| :-----------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------: |
| [<img src="https://ca.slack-edge.com/ESZCHB482-W016ECL84RW-afefea5a0c53-512" width = "200" />](https://github.com/Jahteo) | [<img src="https://ca.slack-edge.com/ESZCHB482-W0123RU151V-ffba83afb622-512" width = "200" />](https://github.com/ferror18) | [<img src="https://ca.slack-edge.com/ESZCHB482-W0138D8CX0Q-a7076291a0cf-512" width = "200" />](https://github.com/yirano) | [<img src="https://ca.slack-edge.com/ESZCHB482-W012QNXUFMJ-92e87d69900d-512" width = "200" />](https://github.com/jidelson) | [<img src="https://ca.slack-edge.com/ESZCHB482-W0123RP3C9M-fff2ba750184-512" width = "200" />](https://github.com/kima-92) |
|                                [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/Jahteo)                                |                            [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/ferror18)                             |                          [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/yirano)                           |                          [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/jidelson)                           |                           [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/kima-92)                            |
|                [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/)                |                 [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/)                 |                [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/)                |                 [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/)                 |                [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/)                |

<br>
<br>

![MIT](https://img.shields.io/packagist/l/doctrine/orm.svg)
![React](https://img.shields.io/badge/react-v16.7.0--alpha.2-blue.svg)
![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)

- Fork and clone the repo to install it as your own remote.
  - **note** please [be sure to set your remote](https://help.github.jp/enterprise/2.11/user/articles/changing-a-remote-s-url/) for this repo to point to your Labs Team Front End Repository.
- run: `npm install` to download all dependencies.
- run: `npm start` to start your local development server.

> When using Okta for authentication, the app will need to run locally on port 3000.

### Key Features

- Is a mobile-first design.
- Private routes protect all resources that are not authenticated.
- Headmaster dashboard and Admin dashboard
- Headmaster profile and edit.
- Admin library view, edit, and delete.
- Headmaster mentee Create, Read, Edit, and Delete.

#### Front end deployed to `AWS-Amplify`

#### [Back end](https://github.com/ferror18/vbb-backend) built using:

#### Node.js

- Json Web Server
- Json Web Token (Authentication)
- Faker.js

#### Fetures

- Mock back-end with realistic data generated by Faker.js.
- Mock back-end with basic JWT authentication.

# APIs

- BASEURL/login
- BASEURL/library
- BASEURL/village
- BASEURL/school
- BASEURL/mentee
- BASEURL/headmaster

# Installation Instructions

1 - `npm install`
2 - `Create .env file with 'REACT_APP_BASE_URL = YourURL' and 'REACT_APP_PORT = 3000`
3 - That is all

## Other Scripts
    * build - creates a build of the application
    * start - starts the production server after a build is created

# Contributing

When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

Please note we have a [code of conduct](./CODE_OF_CONDUCT.md). Please follow it in all your interactions with the project.

## Issue/Bug Request

**If you are having an issue with the existing project code, please submit a bug report under the following guidelines:**

- Check first to see if your issue has already been reported.
- Check to see if the issue has recently been fixed by attempting to reproduce the issue using the latest master branch in the repository.
- Create a live example of the problem.
- Submit a detailed bug report including your environment & browser, steps to reproduce the issue, actual and expected outcomes, where you believe the issue is originating from, and any potential solutions you have considered.

### Feature Requests

We would love to hear from you about new features which would improve this app and further the aims of our project. Please provide as much detail and information as possible to show us why you think your new feature should be implemented.

### Pull Requests

If you have developed a patch, bug fix, or new feature that would improve this app, please submit a pull request. It is best to communicate your ideas with the developers first before investing a great deal of time into a pull request to ensure that it will mesh smoothly with the project.

Remember that this project is licensed under the MIT license, and by submitting a pull request, you agree that your work will be, too.

#### Pull Request Guidelines

- Update the README.md with details of changes to the interface, including new plist variables, exposed ports, useful file locations and container parameters.
- Ensure that your code conforms to our existing code conventions and test coverage.
- Include the relevant issue number, if applicable.
- You may merge the Pull Request in once you have the sign-off of two other developers, or if you do not have permission to do that, you may request the second reviewer to merge it for you.

## Documentation

See [Backend Documentation](https://github.com/ferror18/vbb-backend) for details on the backend of our project.
