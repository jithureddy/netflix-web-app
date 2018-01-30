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

    function getRandomNumber() {
        return Math.floor(Math.random() * 20);
    }

    NETFLIX.filterList = filterList;
    NETFLIX.setCategoriesData = setCategoriesData;
    NETFLIX.getCategotiesData = getCategotiesData;
    NETFLIX.getRandomNumber = getRandomNumber;
    NETFLIX.CATEGORY_BROWSE_URL = 'https://www.netflix.com/browse/genre/';
    NETFLIX.GENRE_CODES = ['1365', '7424', '783', '31574', '6548', '6839', '5763', '7462', '8711', '1701', '8883', '1492', '4370', '8933', '83']

})();