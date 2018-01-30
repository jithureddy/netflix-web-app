/**
 * app.js
 * This script file will be loaded and define the main window object 
 * and also attaches below function to it.
 * 1. loadCategories 
 * 2. renderCategoryList
 * 3. filterCategoryList
 */
(function () {
    'use strict';
    var TYPE_GENRE = 'genre';
    var TYPE_CATEGORY = 'category';
    var LIST = 'list';
    var CARD_CSS_CLASS = 'card';

    /**
     * @name loadCategories
     * @description This function loads the categories from node end point and parses the
     * response to store categories into window global object
     * @param {function} callback 
     */
    function loadCategories(callback) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var htmlObject = document.createElement('div');
                htmlObject.innerHTML = this.responseText;
                var count = 0;
                var genersList = [];
                var genre = {};
                htmlObject.querySelectorAll('.wpb_wrapper p').forEach(function (data) {
                    if (data.innerHTML.indexOf(' = ') != -1) {
                        var cats = data.innerText.split(' = ');
                        //Here I have hardcoded the codes for genre so that I can form proper object to render the UI
                        if (NETFLIX.GENRE_CODES.indexOf(cats[0]) > -1) {
                            count = 0;
                            genre = {};
                            genre = constructGenre(genersList, cats);
                            count++;
                        }
                        else if (count > 0) {
                            constructCategories(genre, cats);
                            count++;
                        }
                    }
                });
                if (callback && typeof callback === 'function') {
                    hideLoadingBar();
                    NETFLIX.categories = genersList;
                    callback(genersList);
                }
            }
        };
        xhttp.open("GET", "https://netflix-web-app.herokuapp.com/api/getCategories", true);
        xhttp.send();
    }

    /**
     * @name constructGenre
     * @description This function creates a object for genre with empty categories list
     * @param {array} genersList 
     * @param {array} categories 
     */
    function constructGenre(genersList, categories) {
        var genre = {
            'name': categories[1],
            'id': categories[0],
            'categories': []
        }
        genersList.push(genre);
        return genre;
    }

    /**
     * @name constructCategories
     * @description This function forms categories for each genre
     * @param {object} genre 
     * @param {*} categories 
     */
    function constructCategories(genre, categories) {
        var category = {
            'name': categories[1],
            'id': categories[0]
        }
        genre.categories.push(category);
    }

    /**
     * @name renderCategoryList
     * @description This function create the DOM elements dynamically for each category and
     * render them at specified node element on the page.
     * Also constructs URL for each category so that user can navigate to netflix website in new tab
     * @param {array} categories 
     */
    function renderCategoryList(categories) {
        var categoryListContainer = getElementById('appCategoriesList');
        if (categories && categories.length > 0) {
            categoryListContainer.classList.remove('show-no-categories-message');
            var listNode = getCategoriesListNode([TYPE_GENRE + LIST]);
            categories.forEach(function (category) {
                var listItemNode = getLisItemNode(category, TYPE_GENRE);
                listNode.appendChild(listItemNode);
            });
            categoryListContainer.appendChild(listNode);
        }
        else {
            categoryListContainer.classList.add('show-no-categories-message');
        }
    }

    /**
     * @name filterCategoryList
     * @description This funciton is going to take filter text as your types in to filter the categories
     * @param {string} filterText 
     */
    function filterCategoryList(filterText) {
        //put validation for filter text and type 
        //call the app utils filter to get the results and re render the categoryList
        //Also consider clearing the category if the previous filter search happens
        //var filteredCategories = NETFLIX.filterList(filterText, filterType);
        //renderCategoryList(filteredCategories);
        //TODO
    }

    /**
     * @name getElementById
     * @description This function takes input id and returns DOM node.
     * @param {string} elementId 
     */
    function getElementById(elementId) {
        return document.getElementById(elementId);
    }

    /**
     * @name getCategoriesListNode
     * @description This function adds specified list of css classes to a categories parent list node and returns the same.
     * @param {array} classes 
     * @returns {DOM element} ulNode
     */
    function getCategoriesListNode(classes) {
        var ulNode = document.createElement('DIV');
        if (classes && classes.length) {
            classes.forEach(function (cssClass) {
                ulNode.classList.add(cssClass);
            });
        }
        return ulNode;
    }

    /**
     * @name getLisItemNode
     * @description This function gives the DOM node for either genre or category
     * If genre has categories then it will be self invoked to create the child nodes
     * @param {*} category 
     * @param {*} type 
     */
    function getLisItemNode(category, type) {
        var liNode = document.createElement('DIV');
        liNode.classList.add(type);
        var listItemContentNode = document.createElement('DIV');
        listItemContentNode.classList.add('list-item-content');
        listItemContentNode.classList.add('row');

        var nestedList = null;
        if (category.categories && category.categories.length > 0) {
            nestedList = getCategoriesListNode([TYPE_CATEGORY + LIST, CARD_CSS_CLASS, 'row', 'layout-wrap', 'space-between']);
            category.categories.forEach(function (category) {
                var listItemNode = getLisItemNode(category, TYPE_CATEGORY);
                addClassesToNode(listItemNode, ['row', 'align-center-start', 'color-box']);
                nestedList.appendChild(listItemNode);
            });
        }

        var linkNode = getGenreCategoryLink(category);
        listItemContentNode.appendChild(linkNode);

        liNode.appendChild(listItemContentNode);

        if (nestedList) {
            liNode.appendChild(nestedList);
        }

        return liNode;
    }

    /**
     * @name addClassesToNode
     * @description This function adds specified list of css classes to a particular DOM element node
     * @param {DOM element} node 
     * @param {array} classes 
     */
    
    function addClassesToNode(node, classes) {
        if (classes && classes.length > 0) {
            classes.forEach(function (cssClass) {
                node.classList.add(cssClass);
            });
        }
    }

    /**
     * @name getGenreCategoryLink
     * @description This function create anchor tag to be able to browse by genre or category in netflix
     * @param {object} category 
     */
    function getGenreCategoryLink(category) {
        var linkNode = document.createElement('A');
        var linkText = document.createTextNode(category.name);
        linkNode.setAttribute('target', '_blank');
        linkNode.setAttribute('href', NETFLIX.CATEGORY_BROWSE_URL + category.id);
        linkNode.classList.add('category-genre-link');
        linkNode.appendChild(linkText);
        return linkNode;
    }   

    /**
     * @name hideLoadingBar
     * @description This function will be triggered to remove the dummy loading category boxe after the data is loaded
     */
    function hideLoadingBar() {
        var loadingBarNode = getElementById('appLoadBar');
        loadingBarNode.classList.add('hide-loading-bar');
    }

    /**
     * @name showLoadingBar
     * @description This function is used to show the dummy category boxes while page is rendering
     */
    function showLoadingBar() {
        var loadingBarNode = getElementById('appLoadBar');
        loadingBarNode.classList.remove('hide-loading-bar');
    }

    /**
     * @name registerFilterEvent
     * @description This function register the keyup event for search box to filter the categories
     */
    function registerFilterEvent() {
        var searchInputNode = getElementById('searchInput');
        searchInputNode.onkeyup = function (event) {
            console.log(searchInputNode.value);
            filterCategoryList(searchInputNode.value);
        };
    }

    registerFilterEvent();

    // Create the global object that all shared data goes on
    window.NETFLIX = {
        loadCategories: loadCategories,
        renderCategoryList: renderCategoryList,
        filterCategoryList: filterCategoryList,
    };
})();