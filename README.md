# Candida Albicans Project Guide

## Project Overview
This is a full stack web application built by Vue.js, Express.js and Sqlite3. It is deployed on the lovelace server. The domain name is called `https://candidaphenome.org/`
The domain name is owned by Professor Chad, and it is renewing yearly

## Project Structure

- Backend
  - data
    - xlsx and csv files
    - image
      - jpg files
  - db
    - javascript files, use to insert data into database
      - knex.js, it is a query builder, handling sql query
      - database.db, sqlite3 lightweight database
      - other js files are used to insert data into the db file
  - index.js
    - the main entry of the backend folder
- frontend
  - dist
    - static content, when deploy, need to run `npm run build` first
  - src
    - assets
      - devlog.json, logs for developing
      - three universities' logo
    - components
      - `stats` contains `d3.js` code to plot the statistic graph for attribute
      - data_display and remaining `.vue` files are displaying component
    - router
      - routing between every page
    - store
      - auth.js, it provide a simple login feature, it will be removed later, so far the password is `1`
      - searchHistory.js, it provides a historical search feature, it is a simple one. It will generate button for users to click.
      - index.js, it is loading above code into the main program
    - utils
      - mutant_key_mapping.js, this file contain mapping logic.
    - views
      - contain all pages views details. When you are redirecting to a page, it will first load the corresponding code from `views` folder, for example, if the `router` redirect us to the `About` page, it will load the code from here, and `About.vue` using the code from `components` folder
  - .env
    - environment set up, determined by the url
- frontend_ts (discard)

## How to maintain and publish the website

You need to request the access from the lab first.
Once you get the access, you should access to the lab through `ssh`

`ssh yourname@lovelace.cs.umn.edu` and you should enter your password

Once you are logged in, you can find the project root folder by using following steps

```bash
cd /heap
cd C.albicansDataHub
```

Below are workflow I am using
1. clone the repo into your local (done once)
2. deploy and test the code on your end
3. push the code to the github
4. log to the lovelace server
5. get to the project root
6. `sudo git pull` the change
7. go to the frontend
8. run `sudo npm run build` to build the static content
9. go to the backend 
10. run `sudo pm2 restart index` or `sudo pm2 start index`

## Extra notes
1. you have to use the sudo command because the deployment by using pm2 is affected by the role
2. because both backend and frontend are deployed on the same server, reverse proxy is used here. You don't need to worry about it unless you want to introduce other port.
3. you can access apache file by executing following commands
    ```bash
    cd /etc/apache2
    ```
    `/etc/apache2/sites-available/` and `/etc/apache2/sites-enabled/` are files you should pay attention to