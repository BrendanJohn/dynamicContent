/* $Workfile: contentLoader.js $           */
/* $Author: Bmurphy $                     */
/* $Date: 9/18/15 3:55p $                  */
/* $Revision: 16 $                          */
/* $Header: /WebSites/library/javascript/general/contentLoader.js 16    9/18/15 3:55p Bmurphy $           */
'use strict';

//load play the homepage carousel
$(document).ready(function() {
    SLIDES.update();
    SLIDES.play();
});


//execute this routine only for site that support content toggle
if (($('#dest_tabBlock1').length) && ($('#dest_tabBlock2').length)) {

    //loads up cruise grid etc
    $(document).ready(function() {
        loadContent('cruiselines', 'wthGridDiv');
        loadContent('destinations', 'wthLinksDiv');
        loadContent('departure-ports', 'wthLinksDivPort');
    });

    //click event to tab 1 (show, hide, load)
    $('#dest_tabBlock1').click(function() {
        resetTabs(1, 2);
        $('#dest_tabBlock1').show();
        loadContent('destinations', 'wthLinksDiv');
    });

    //same for tab 2
    $('#dest_tabBlock2').click(function() {
        resetTabs(2, 1);
        $('#dest_tabBlock2').show();
        loadContent('themes', 'wthLinksDiv');
    });

} else {

    //loads content for sites that do not toggle content
    $(document).ready(function() {
        loadContent('cruiselines', 'wthGridDiv');
        loadContent('destinations', 'destinations');
        loadContent('themes', 'themes');
        loadContent('departure-ports', 'departure-ports');
    });
}

//toggles css class 
function resetTabs(on, off) {
    $(('#dest_tabBlock' + off)).attr('class', 'dest_tabBlockoff');
    $(('#dest_tabBlock' + on)).attr('class', 'dest_tabBlockon');
}


// ajax call to load content from Magnolia
function loadContent(pageName, target) {
    //verifies target element exists
    if (($('#' + target)).length) {
        $.ajax({
            url: 'sharedwidgets/' + pageName + '.do?pageType=sharedwidgets',
            dataType: 'html',
        })
        .done(function(html) {
                //keep pure javascript here jquery hurts performance
                document.getElementById(target).innerHTML = html;
        });
   
    }
}
