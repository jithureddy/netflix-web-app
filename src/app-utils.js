(function () {
    'use strict';

    NETFLIX.filterList = filterList;
    NETFLIX.sortCategories = sortCategories;
    NETFLIX.CATEGORY_BROWSE_URL = 'https://www.netflix.com/browse/genre/';
    NETFLIX.GENRE_CODES = ['1365', '7424', '783', '31574', '6548', '6839', '5763', '7462', '8711', '1701', '8883', '1492', '4370', '8933', '83'];

    /**
     * @name filterList
     * @description
     * This function is going to take the filter and filter the collection of categories and 
     * returns the matched result. This filter will inlcude genre if any one of the category matches.
     * @param {string} filterText 
     * @returns {array} filteredCategories
     */
    function filterList(filterText) {
        //write filter logic from es5 to filter object data based on the query
        var filteredGenres = [];
        filterText = filterText.toLowerCase();
        var categoriesCopy = getDeepCopyOfCategories();
        categoriesCopy.forEach(function (genre) {
            if (genre.categories) {
                var filteredCategories = genre.categories.filter(function (category) {
                    return category.name.toLowerCase().includes(filterText);
                });
                if (filteredCategories && filteredCategories.length > 0) {
                    genre.categories = filteredCategories;
                    filteredGenres.push(genre);
                }
            }
        });

        return filteredGenres;
    }

    /**
     * @name sortCategories
     * @description This function going to sort the array of objects by comparing name key inorder to 
     * return in alphabetical order from A - Z
     * @param {array} categories 
     * @returns {array} categories
     */
    function sortCategories(categories) {
        categories.forEach(function (genre) {
            if (genre.categories) {
                genre.categories.sort(function (a, b) {
                    if (a.name < b.name) {
                        return -1;
                    }
                    if (a.name > b.name) {
                        return 1;
                    }
                    return 0;
                })
            }
        });
        return categories;
    }

    /**
     * @name getDeepCopyOfCategories
     * @description Usually when assign array of objects to another variable and modify that it also 
     * modifies the source. So we need a way to deep copy the entire object so that source can be used afterwards.
     */
    function getDeepCopyOfCategories() {
        if (NETFLIX.categories) {
            return JSON.parse(JSON.stringify(NETFLIX.categories));
        }
        else {
            return [];
        }
    }

})();