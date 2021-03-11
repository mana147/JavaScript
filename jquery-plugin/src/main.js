$(document).ready(function () {
    let config = {
        text: 'pham trung hieu',
        color: 'red',
        fontStyle: 'italic',
        complete: function () {
            console.log('>>>>> complete');
        }
    }

    $('a').setColorPlugin(config);

});