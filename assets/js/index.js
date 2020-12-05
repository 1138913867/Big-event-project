$(function () {
  //获取用户的基本信息
  $.ajax({
    method: 'GET',
    url: '/my/userinfo',
    headers: {
      Authorization: localStorage.getItem('token')
    },
    success: function (res) {
      if (res.status !== 0) {
        return layer.msg('获取信息出错')
      }
      console.log(res);
      var name = res.data.username || res.data.nickname;
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


    }
  })
})  