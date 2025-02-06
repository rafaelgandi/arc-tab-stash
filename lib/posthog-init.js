import posthog from './posthog-js/dist/module.full.no-external.js';
posthog.init(
    "phc_geEdShsaocJ06aukEGr2JhgQ0MRdiu51ZW4P6sRVJev", 
    { 
        api_host: "https://us.i.posthog.com", 
        persistence: "localStorage",
        // See: https://posthog.com/docs/product-analytics/autocapture
        autocapture: false,
        capture_pageview: false,
        capture_pageleave: false 
    }
);