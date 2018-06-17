/* eslint-env jquery */

(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;

        $.ajax({
            url: `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`,
            headers: {
                authorization: 'Client-ID 3642d03c95d50462fd0f99bc3f0ba6228412a9c9b43407e0da51e4e79fff489e'
            }
        }).done(addImage);

        $.ajax({
            url: `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=18dd1e313c5a4964a8e39da338b15ce7`
        }).done(addArticles);

    });

    function addImage(images) {
        const firstImage = images.results[0];
        responseContainer.insertAdjacentHTML('afterbegin', `<figure>
                <image src="${firstImage.urls.small}" alt="${searchedForText}" />
                <figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>        
            </figure>`
        );

    }

    function addArticles(data) {
        responseContainer.insertAdjacentHTML('beforeend', '<ul>' +
            data.response.docs.map(article => `<li class="article">
            <h2><a href="${article.web_url}">${article.headline.main}</a></h2>
            <p>${article.snippet}</p>
            </li>`).join('') + '</ul>'
        );
    }
})();
