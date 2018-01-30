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
        if (callback && typeof callback === 'function') {
            callback(NETFLIX.categories);
        }
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
                addClassesToNode(listItemNode, ['row', 'align-center-center', 'color-'+randomNumber]);
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