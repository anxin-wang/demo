/**Horizontal and vertical centering with jQuery*/
/**
 * Created by Administrator on 2015/12/10.
 */
$(window).resize(function () {
    $('.className').css({
        position: 'absolute',
        left: ($(window).width() - $('.className').outerWidth()) / 2,
        top: ($(window).height() - $('.className').outerHeight()) / 2
    });
}); // To initially run the function: $(window).resize();