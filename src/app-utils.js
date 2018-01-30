(function () {
    'use strict';

    NETFLIX.filterList = filterList;
    NETFLIX.CATEGORY_BROWSE_URL = 'https://www.netflix.com/browse/genre/';
    NETFLIX.GENRE_CODES = ['1365', '7424', '783', '31574', '6548', '6839', '5763', '7462', '8711', '1701', '8883', '1492', '4370', '8933', '83'];

    /**
     * @name filterList
     * @description
     * This function is going to take the filter and filter the collection of categories and 
     * returns the matched result
     * @param {string} filterText 
     * @returns {array} filteredCategories
     */
    function filterList(filterText) {
        //write filter logic from es5 to filter object data based on the query
        var filteredCategories = [];

        return filteredCategories;
    }

})();