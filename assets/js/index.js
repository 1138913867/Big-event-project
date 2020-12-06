//获取用户的基本信息



$(function () {
    function getRenderInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取信息出错')
                }

                var name = res.data.nickname || res.data.username;
                $("#welcome").html('欢迎  ' + name);

                if (res.data.user_pic === null) {
                    $('.layui-nav-img').hide();
                    $('.userPic').show();
                    $('.userPic').html(name[0].toUpperCase());
                } else {
                    $('.userPic').hide();
                    $('.layui-nav-img').show();
                    $('.layui-nav-img').prop('src', res.data.user_pic);
                }
            },

        })
    }
    getRenderInfo();
    window.getRenderInfo = getRenderInfo;




    $("#quit").on('click', function (index) {
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function (index) {
            localStorage.removeItem('token');
            location.href = './login.html';
            layer.close(index);
        });
    })
})