import algoliasearch from "algoliasearch";
import algoliasearchHelper from "algoliasearch-helper";
import $ from 'jquery';

// Algolia secrets 
// TODO: Ensure that secrets like Application ID and API Key are stored safely, e.g., using environment letiables or a secrets manager
const APPLICATION_ID = "JW4AVMKP5I";
const API_KEY = "91bdec7b7633114454d1f9d31a3b34c6";
const INDEX_NAME = "restaurants";

// Initialize Algolia client and helper
const client = algoliasearch(APPLICATION_ID, API_KEY);
const helper = algoliasearchHelper(client, INDEX_NAME, {
    disjunctiveFacets: ['food_type', 'payment_options'],
    hitsPerPage: 5,
    maxValuesPerFacet: 7,
    getRankingInfo: true
  });

// The different parts of the UI that we want to use in this example
let $food_types = $('#food_type');
let $payment_options = $('#payment_options');
let $hits = $('#hits');
let $hits_stats = $('.results__count-text');
let $searchbar = $('.search-bar__input');
let $button = $('.button__link');

// Monitor User Interactions within our UI
$searchbar.on('input', function(e) {
  helper.setQuery($searchbar.val()).search();
});
$food_types.on('click', handleFacetClick);
$payment_options.on('click', handleFacetClick);
$button.on('click', showMoreResults);

// Trigger a first search based on location, so that we have a page with results
// from the start.
navigator.geolocation.getCurrentPosition(positionFound, positionDefered);

function positionFound(position) {
  const crds = position.coords;
  helper.setQueryParameter('aroundLatLng', `${crds.latitude}, ${crds.longitude}`).search();
}

function positionDefered(error) {
  console.log(error);
  helper.setQueryParameter('aroundLatLngViaIP', true).search();
}

// Bind the result event to a function that will update the results
helper.on("result", searchCallback);

// Bind the error event to a function that will handle errors
helper.on("error", function(error) {
  console.warn('AlgoliaSearchHelper encountered an error:', error);
});

// We'll change this to true once the user requests more results
let showMore = false;

// Result event callback
function searchCallback(response) {
  let results = response.results;
  if (results.hits.length === 0) {
    // If there is no result we display a friendly message
    // instead of an empty page.
    $hits.empty().html("No (more) results");
    return;
  }
	// Hits/results rendering
  renderHits($hits, results, showMore);
  renderFacets($food_types, results, 'food_type', 'Cuisine/Food Type');
  renderFacets($payment_options, results, 'payment_options', 'Payment Options');
  // Reset the showMore flag after each search
  showMore = false;
}

function renderFacets($ui_element, results, facetName, displayName) {
  let facets = results.getFacetValues(facetName).map(function(facet) {
    let state = facet.isRefined ? ' filter__label--active' : '';

    return `<div class="filter__label${state}" data-attribute="${facetName}" data-value="${facet.name}">
              <div class="filter__label-text">${facet.name}</div>
              <div class="filter__label-number">${facet.count}</div>
            </div>`;
  }).join('');

  let facetHtml =  `<h2 class="filter__title">${displayName}</h2>` + facets;
  $ui_element.html(facetHtml);
}

function handleFacetClick(e) {
  e.preventDefault();
  let target = e.target;
  let attribute = target.dataset.attribute;
  let value = target.dataset.value;
  // Because we are listening in the parent, the user might click where there is no data
  if(!attribute || !value) return;
  // The toggleFacetRefinement method works for disjunctive facets as well
  helper.toggleFacetRefinement(attribute, value).search();
  console.log(attribute + ' ' + value)
}

function renderHits($hits, results, showMore = false) {
  // Render search stats on top of results
  let num_results = results.nbHits;
  let response_time = results.processingTimeMS/1000;
  $hits_stats.html(num_results + ' results found <span class="results__time-text">in ' + response_time + ' seconds</span>');

  // Render results
  const IMAGE_URL = "https://cdn.otstatic.com/legacy-cw/default2-original.png"; // All images get redirected to this URL anyway
  let hits = results.hits.map(function(hit) {
    // Add star rating
    let roundedStarsCount = Math.round(hit.stars_count);
    let starRatingHtml = '';
    for (let i = 1; i <= 5; i++) {
      starRatingHtml += '<span class="fa fa-star' + (i <= roundedStarsCount ? ' checked' : '') + '"></span>';
    }
  
    return `<div class="results__item">
              <div class="result">
                <div class="result__image-container"><img loading=lazy width="80" height="80" src="${IMAGE_URL}"></div>
                <div class="result__text-container">
                  <h1 class="result__title">${hit.name}</h1>
                  <span class="result__rating">${hit.stars_count}</span>&nbsp;
                  ${starRatingHtml}
                  <span class="result__summary">&nbsp;&nbsp;(${hit.reviews_count})</span>
                  <p class="result__summary">${hit.dining_style} | ${hit.neighborhood} | ${hit.price_range}</p>
                </div>
              </div>
            </div>`;
  }).join('');

  if(showMore) {
    $hits.append(hits);
  } else {
    $hits.html(hits);
  }
}

function showMoreResults() {
  showMore = true;
  helper.nextPage().search();
}