## Vuejs-Parcel-Express Boilerplate

This boilerplate is for users want to combine __Vuejs__ and __Parcel__<br>
login, register is provided using __Sequelize(sqlite3)__<br>
web session is provided by __JWT__ and __SessionStorage__<br>
__vuex__, __vue-router__ implemented<br>

_This is SPA(Single Page Application)_

## Quick Start

_Download Boilerplate_

* `git clone https://github.com/jgtonys/vuejs-parcel-express-boilerplate`

_Configure Front End_

1. `cd parcel-vuejs-boilerplate`
2. `cd client`
3. `npm install`
4. `npm run build`
  * build(using parcel)
  * output files will be in ../public folder

_Configure Back End_
1. `cd parcel-vuejs-boilerplate`
2. `npm install`

_Run Server!_

* `npm run server`
* you can see output http://localhost:8080


## Features
* This is SPA(Single Page Application)
* Vue components divided (sass imported)
* Vuerify example theme
* Using vuex to track vue instances, functions, etc..
* Using scss
* Using vue-router
* parcel building `npm run build`
  * this runs `parcel build index.html --no-minify --out-dir ../public --public-url ./`
* Using sessionStorage(in vuex)
* Token authentication(JWT) password bcrypt
* User model is defined by Sequelize, Sqlite3
* ES6 code

## Sample

main page before login

![main_page](https://github.com/jgtonys/vuejs-parcel-express-boilerplate/sample/main.png)

test sign up

![sign_up](https://github.com/jgtonys/vuejs-parcel-express-boilerplate//sample/register.png)

test database confirm

![database_show](https://github.com/jgtonys/vuejs-parcel-express-boilerplate//sample/database.png)

login session

![show_session](https://github.com/jgtonys/vuejs-parcel-express-boilerplate//sample/session.png)

after login

![after_login](https://github.com/jgtonys/vuejs-parcel-express-boilerplate//sample/afterlogin.png)


## License

The code is available under the MIT license.
