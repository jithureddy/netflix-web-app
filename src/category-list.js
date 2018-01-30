/**
 * category-list.js
 * 
 *  This module trigger the loading of categories data 
 *  and invoke rendering on the web page at specified location.
 */
NETFLIX.loadCategories(function (categories) {
    NETFLIX.renderCategoryList(categories);
});