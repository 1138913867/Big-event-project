$(function () {
    $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
        // Modify options, control originalOptions, store jqXHR, etc 
        options.url = 'http://ajax.frontend.itheima.net' + options.url;
        if (options.url.indexOf !== -1) {
            options.headers = {
                Authorization: localStorage.getItem('token')
            }
        }
        options.complete = function (res) {
            if (res.responseJSON.message === '身份认证失败！' && res.responseJSON.status === 1) {
                localStorage.removeItem('token');
                location.href = './login.html';
            }
        }
    });
})