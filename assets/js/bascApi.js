$(function() {
    $.ajaxPrefilter(function(options, originalOptions, jqXHR) {
        // Modify options, control originalOptions, store jqXHR, etc 
        options.url = 'http://ajax.frontend.itheima.net' + options.url;
        if (options.url.indexOf !== -1) {
            options.headers = {
                Authorization: localStorage.getItem('token')
            }
        }

    });
})