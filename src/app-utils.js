(function () {
    'use strict';

    function filterList(filterText, filterQuery) {
        //write filter logic from es5 to filter object data based on the query
    }

    function setCategoriesData() {
        //This will save categories data to local storage 
    }

    function getCategotiesData() {
        //This will read categories data from local storage 
    }

    function getRandomNumber(){
        return Math.floor(Math.random() * 20);
    }

    NETFLIX.filterList = filterList;
    NETFLIX.setCategoriesData = setCategoriesData;
    NETFLIX.getCategotiesData = getCategotiesData;
    NETFLIX.getRandomNumber = getRandomNumber;
    NETFLIX.CATEGORY_BROWSE_URL = 'https://www.netflix.com/browse/genre/';

})();