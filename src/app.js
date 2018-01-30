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

    function loadCategories(callback) {
        //Here need to load the data from localstorage first otherwise need to load 
        //from api then store in local storage
        //after which we need to start render the list of categories 
        //Here construct the category object with label and url + genre code
        //call the callback argument
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
                            console.log(cats[0] + cats[1]);
                        }
                        else if (count > 0) {
                            constructCategories(genre, cats);
                            count++;
                        }
                    }
                });
                if (callback && typeof callback === 'function') {
                    callback(genersList);
                }
            }
        };
        //var url = "http://anyorigin.com/go?url=" + encodeURIComponent("http://whatsonnetflix.com/netflix-hacks/the-netflix-id-bible-every-category-on-netflix/");
        //  xhttp.open("GET", url, true);
        xhttp.open("GET", "http://localhost:3000/api/getCategories", true);
        xhttp.send();

    }

    function constructGenre(genersList, categories) {
        var genre = {
            'name': categories[1],
            'id': categories[0],
            'categories': []
        }
        genersList.push(genre);
        return genre;
    }

    function constructCategories(genre, categories) {
        var category = {
            'name': categories[1],
            'id': categories[0]
        }
        genre.categories.push(category);
    }

    function renderCategoryList(categories) {
        //get the content container id to display list
        //repeat the category list and construct category object 
        //create dynamic nodes for category label and link which opens in new tab with specified url
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

    function filterCategoryList(filterText, filterType) {
        //put validation for filter text and type 
        //call the app utils filter to get the results and re render the categoryList
        //Also consider clearing the category if the previous filter search happens
        //var filteredCategories = NETFLIX.filterList(filterText, filterType);
        //renderCategoryList(filteredCategories);
    }

    function getElementById(elementId) {
        return document.getElementById(elementId);
    }

    function getCategoriesListNode(classes) {
        var ulNode = document.createElement('DIV');
        if (classes && classes.length) {
            classes.forEach(function (cssClass) {
                ulNode.classList.add(cssClass);
            });
        }
        return ulNode;
    }

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
                var randomNumber = NETFLIX.getRandomNumber();
                addClassesToNode(listItemNode, ['row', 'align-center-center', 'color-' + randomNumber]);
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

    function addClassesToNode(node, classes) {
        if (classes && classes.length > 0) {
            classes.forEach(function (cssClass) {
                node.classList.add(cssClass);
            });
        }
    }

    function getGenreCategoryLink(category) {
        var linkNode = document.createElement('A');
        var linkText = document.createTextNode(category.name);
        linkNode.setAttribute('target', '_blank');
        linkNode.setAttribute('href', NETFLIX.CATEGORY_BROWSE_URL + category.id);
        linkNode.classList.add('category-genre-link');
        linkNode.appendChild(linkText);
        return linkNode;
    }

    function getExpandCollapseIcon(isExpandCollapse) {
        var expandCollapseContainer = document.createElement('DIV');
        expandCollapseContainer.classList.add('expand-collapse-container');
        var expandCollapseIcon = document.createElement('I');
        expandCollapseIcon.classList.add('collapsed-icon');
        expandCollapseContainer.appendChild(expandCollapseIcon);
        if (isExpandCollapse) {
            registerClickEventForExpandCollapse(expandCollapseContainer);
        }

        return expandCollapseContainer;
    }

    function registerClickEventForExpandCollapse(expandCollapseNode) {
        expandCollapseNode.addEventListener('click', function () {
            this.parentNode.classList.toggle('active');
            var panel = this.parentNode.nextElementSibling;
            if (panel.style.display === 'block') {
                panel.style.display = 'none';
            } else {
                panel.style.display = 'block';
            }
        });
    }


    // Create the global object that all shared data goes on
    window.NETFLIX = {
        loadCategories: loadCategories,
        renderCategoryList: renderCategoryList,
        filterCategoryList: filterCategoryList,
    };
})();