define([], function() {

    var imageLoader = function( el ) {
        el.style.opacity = 0;
        el.style.transition = 'opacity 0.5s';
        var img = new Image();
        var src = el.getAttribute('data-src');
        img.onload = function() {
            el.src = src;
            el.style.opacity = 1;
        };
        img.src = src;
    };

    var loadImages = function( target ) {
            var images = Array.prototype.slice.call( target.querySelectorAll('img.lazy') );
            images.forEach(function(image) {
                imageLoader(image);
            });
    }

    var loadContained = function( event ) {
        if (event.target) {
            loadImages( event.target );
            require(['jquery'], function($) {
                $(event.target).off('.lazy'); // Removes target listeners with jquery event namespace .lazy
            });
        }
    };

    var loadAll = function( event ) {
        loadImages( document );
    };

    var deferAllToLoadEvent = function() {
        var onResourcesLoaded = function( event ) {
            loadImages( document );
            window.removeEventListener('load', onResourcesLoaded);
        };
        window.addEventListener('load', onResourcesLoaded);
    }

    return {
        loadContained: loadContained,
        loadAll: loadAll,
        deferAllToLoadEvent: deferAllToLoadEvent
    };
});
