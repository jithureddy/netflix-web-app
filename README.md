# netflix-web-app
This Netflix web app is a simple app which shows the hidden categories on Netflix, and also gives an interface to users to filter for a genre or category and then see the results.

The genres and categories list are fetched from http://whatsonnetflix.com/netflix-hacks/the-netflix-id-bible-every-category-on-netflix/

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

## Technology stack

1. HTML5

2. CSS3

3. JavaScript


### Prerequisites

1. Node Js

### Installing

1. Clone the repo form the above link 

2. After successful installing of node, switch to repo directory to install node_modules

    npm install
    
3. After successful installing of node modules, run the below command 

    npm start 
    
4. Now we can access the local development setup using below URL

    http://localhost//30000
    
Note: This app can also used as static web page but we need to have the hidden category list from another website over the internet. Since we can not get the hidden categories from the above blog, as static website is giving CORS errors. To overcome this, we need light weight server running which then our UI code consume the api to retrieve the website response and parse the categories in UI code.

### Live Website

1. https://jithureddy.github.io/netflix-web-app/

2. http://netflix-web-app.herokuapp.com/


  
