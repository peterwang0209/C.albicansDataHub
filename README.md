# Candida Albicans Project Guide

## Project Overview
This is a full stack web application built by Vue.js, Express.js and Sqlite3. It is deployed on the loveless server. The domain name is called `https://candidaphenome.org/`
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

!!! You need to 