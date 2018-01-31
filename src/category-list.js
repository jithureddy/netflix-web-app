/**
 * category-list.js
 * 
 *  This module trigger the loading of categories data 
 *  and invoke rendering on the web page at specified location.
 * This is entry point for the application to start render.
 */
NETFLIX.loadCategories(function (categories) {
    NETFLIX.renderCategoryList(categories);
});