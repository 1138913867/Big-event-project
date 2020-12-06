
$(function () {
  $("#Reg").on('click', function () {
    $(".login").hide();
    $(".reg").show();
  });
  $("#login").on('click', function () {
    $(".login").show();
    $(".reg").hide();
  });

  var form = layui.form;

  form.verify({
    pass: [
      /^[\S]{6,12}$/
      , '密码必须6到12位，且不能出现空格'
    ],
    repass: function (value) { //value：表单的值、item：表单的DOM对象
      var password = $(".reg [name='password']").val();
      if (password !== value) {
        return '两次密码不一致';
      }
    }
  });
  // require('jQuery');
  $("#formReg").on('submit', function (e) {
    e.preventDefault();
    $.ajax({
      method: 'POST',
      url: '/api/reguser',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message);
        }
        layer.msg(res.message);
        $("#login").click();
      }
    })
  });

  $("#formLog").on('submit', function (e) {
    e.preventDefault();
    $.ajax({
      method: 'POST',
      url: '/api/login',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message);
        }
        layer.msg(res.message);
        localStorage.setItem('token', res.token);
        location.href = "index.html";
      }
    })
  })
})