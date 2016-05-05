$(document).ready(function(){
    /* Get iframe src attribute value i.e. YouTube video url
    and store it in a variable */
    var url = $("#cartoonVideo").attr('src');
    
    /* Assign empty url value to the iframe src attribute when
    modal hide, which stop the video playing */
    $("#myModal").on('hide.bs.modal', function(){
        $("#cartoonVideo").attr('src', '');
    });
    
    /* Assign the initially stored url back to the iframe src
    attribute when modal is displayed again */
    $("#myModal").on('show.bs.modal', function(){
        $("#cartoonVideo").attr('src', url);
    });
});






// Set up some options objects: 'single_opts' for when a single area is selected, which will show just a border
// 'all_opts' for when all are highlighted, to use a different effect - shaded white with a white border
// 'initial_opts' for general options that apply to the whole mapster. 'initial_opts' also includes callbacks
// onMouseover and onMouseout, which are fired when an area is entered or left. We will use these to show or
// remove the captions, and also set a flag to let the other code know if we're currently in an area.

var inArea,
    map = $('#dnamodel'),
    captions = {
        helix: ["Double Helix",
            "Paul McCartney's song, Yesterday, recently voted the most popular song "
                + "of the century by a BBC poll, was initially composed without lyrics. "
                + "Paul used the working title 'scrambled eggs' before coming up with the final words."],
        nucleotide: ["Nucleotide",
            "Dear Prudence was written by John and Paul about Mia Farrow's sister, Prudence, "
            + "when she wouldn't come out and play with Mia and the Beatles at a religious retreat "
            + "in India."],
        sugar: ["Deoxyribose Sugar",
            "In 1962, The Beatles won the Mersyside Newspaper's biggest band in Liverpool "
            + "contest principally because they called in posing as different people and voted "
            + "for themselves numerous times."],
        base: ["Nitrogenous Base",
            "The Beatles' last public concert was held in San Francisco's Candlestick "
            + "Park on August 29, 1966."]
    },
    single_opts = {
        fillColor: '000000',
        fillOpacity: 0,
        stroke: true,
        strokeColor: 'ff0000',
        strokeWidth: 2
    },
    all_opts = {
        fillColor: 'ffffff',
        fillOpacity: 0.6,
        stroke: true,
        strokeWidth: 2,
        strokeColor: 'ffffff'
    },
    initial_opts = {
        mapKey: 'data-name',
        isSelectable: false,
        onMouseover: function (data) {
            inArea = true;
            $('#caption-header').text(captions[data.key][0]);
            $('#caption-text').text(captions[data.key][1]);
            $('#explanation').show();
        },
        onMouseout: function (data) {
            inArea = false;
            $('#explanation').hide();
        }
    };
    opts = $.extend({}, all_opts, initial_opts, single_opts);


    // Bind to the image 'mouseover' and 'mouseout' events to activate or deactivate ALL the areas, like the
    // original demo. Check whether an area has been activated with "inArea" - IE<9 fires "onmouseover" 
    // again for the image when entering an area, so all areas would stay highlighted when entering
    // a specific area in those browsers otherwise. It makes no difference for other browsers.

    map.mapster('unbind')
        .mapster(opts)
        .bind('mouseover', function () {
            if (!inArea) {
                map.mapster('set_options', all_opts)
                    .mapster('set', true, 'all')
                    .mapster('set_options', single_opts);
            }
        }).bind('mouseout', function () {
            if (!inArea) {
                map.mapster('set', false, 'all');
            }
        });


