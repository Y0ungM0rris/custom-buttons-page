(function() {
    var customLinksPlugin = function(hook, vm) {
        hook.afterEach(function(html, next) {
            var tempDiv = document.createElement('div');
            tempDiv.innerHTML = html;

            var links = tempDiv.querySelectorAll('a[href$="button=true"]');
                        
            links.forEach(function(link) {
                var customLink = document.createElement('a');
                customLink.className = 'custom-link';

                var originalHref = link.getAttribute('href');
                var newHref = originalHref.replace('/?button=true', '');

                customLink.href = newHref;

                var imgArrow = document.createElement('img');
                imgArrow.src = './assets/arrow.svg';
                imgArrow.style.width = '10px';

                customLink.style.textDecoration = 'none';

                var img = link.querySelector('img');
                if (img) {
                    var altText = img.getAttribute('alt');

                    var altSpan = document.createElement('span');
                    altSpan.textContent = altText;

                    customLink.appendChild(img);
                    customLink.appendChild(altSpan);
                    customLink.appendChild(imgArrow);
                } else {
                    while (link.firstChild) {
                        customLink.appendChild(link.firstChild);
                    }
                    customLink.appendChild(imgArrow);
                }

                link.parentNode.insertBefore(customLink, link);
                link.remove();
            });

            next(tempDiv.innerHTML);
        });
    };

    $docsify = $docsify || {};
    $docsify.plugins = [].concat(customLinksPlugin, $docsify.plugins || []);
})();
