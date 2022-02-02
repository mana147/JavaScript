(function ($) {

    let settings = {
        text: 'nội dung defaults',
        color: null,
        fontStyle: null,
    };


    $.fn.setColorPlugin = function (options) {

        console.log(this); // this ở đây là 3 thẻ <a> 

        console.log(typeof options); // object

        // check options 
        if (typeof options == 'object') {
            // extend 
            $.extend(settings, options);
        }

        var that = this;
        
        function run() {
            that.each(function () {

                $(this).text(settings.text);

                if (settings.color) {
                    $(this).css('color', settings.color);
                }

                if (settings.fontStyle) {
                    $(this).css('font-style', settings.fontStyle);
                }

                if ($.isFunction(settings.complete)) {
                    console.log(this);
                }

            });
        }

        return { run: run };
    

    };

}(jQuery));