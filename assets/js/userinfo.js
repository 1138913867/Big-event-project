$(function() {
    var form = layui.form;

    function resetInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function(res) {

                if (res.status !== 0) {
                    return layer.msg('信息获取出错')
                }

                $("#hiddenId").val(res.data.id);

                form.val("form", { //formTest 即 class="layui-form" 所在元素属性 lay-filter="" 对应的值
                    "username": res.data.username, // "name": "value"
                    "nickname": res.data.nickname,
                    "email": res.data.email,
                    "id": res.data.id
                });
            }
        })
    }
    resetInfo();


    $('button[type="reset"]').on('click', function(e) {
        e.preventDefault();
        resetInfo();

    })

    $('#form').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('更新信息失败')
                }
                layer.msg('更新信息成功');
                window.parent.getRenderInfo();


            }
        })

    })
})