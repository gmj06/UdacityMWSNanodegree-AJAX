(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;

        const imgRequest = new XMLHttpRequest();
        imgRequest.open('GET', `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`);
        imgRequest.onload = addImage;
        imgRequest.onerror = function (err) {
            requestError(err, 'image');
        };
        imgRequest.setRequestHeader('Authorization', 'Client-ID 3642d03c95d50462fd0f99bc3f0ba6228412a9c9b43407e0da51e4e79fff489e')
        imgRequest.send();

        const articleRequest = new XMLHttpRequest();
        articleRequest.onload = addArticles;
        articleRequest.onerror = function(err){
            requestError(err, 'article');
        };
        articleRequest.open('GET', `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=18dd1e313c5a4964a8e39da338b15ce7`);
        articleRequest.send();
    });

    function addImage() {
        let htmlContent = '';
        const data = JSON.parse(this.responseText);
        const firstImage = data.results[0];

        if (data && data.results && data.results[0]) {
            htmlContent = `<figure>
            <image src="${firstImage.urls.regular}" alt="${searchedForText}" />
            <figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>        
        </figure>`;
        } else {
            htmlContent = "<div class='error-no-image'>No Images Available</div>";
        }

        responseContainer.insertAdjacentHTML('afterbegin', htmlContent);
        
    }

    function addArticles() {
        let htmlContent = '';
        const data = JSON.parse(this.responseText);

        if (data.response && data.response.docs && data.response.docs.length > 1) {
            htmlContent = '<ul>' +
                data.response.docs.map(article => `<li class="article">
                <h2><a href="${article.web_url}">${article.headline.main}</a></h2>
                <p>${article.snippet}</p>
            </li>`).join('') + '</ul>';
        } else {
            htmlContent = "<div class='error-no-articles'>No Articles Available</div>";
        }

        responseContainer.insertAdjacentHTML('beforeend', htmlContent);



    }


})();
