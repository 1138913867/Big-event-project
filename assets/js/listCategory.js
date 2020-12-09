$(function () {
  //获取列表
  function getList() {
    $.ajax({
      method: 'GET',
      url: '/my/article/cates',
      success: function (res) {
        var htmlStr = template('list', res);
        $('tbody').html(htmlStr)
      }
    })
  }
  getList();

  // 添加分类弹出层
  var indexAddListCategory = null;
  $('#add').on('click', function () {
    indexAddListCategory = layer.open({
      type: 1,
      title: '添加文章分页',
      content: $('#addList').html(),
      area: ['500px', '250px']
    });
  })

  //添加分类提交
  $('body').on('submit', '#addListCategory', function (e) {
    e.preventDefault();
    $.ajax({
      method: 'POST',
      url: '/my/article/addcates',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('添加分类失败');
        }
        layer.msg('添加分类成功');
        getList();
        layer.close(indexAddListCategory);
      }
    })
  })

  //编辑
  var reviseId = null;
  var indexRevise = null;
  $('body').on('click', '#revise', function () {
    indexRevise = layer.open({
      type: 1,
      title: '修改文章分页',
      content: $('#reviseList').html(),
      area: ['500px', '250px']
    });
    reviseId = $(this).attr('data-id');
    $.ajax({
      method: 'GET',
      url: '/my/article/cates/' + reviseId,
      success: function (res) {
        $('[name="name"]').val(res.data.name);
        $('[name="alias"]').val(res.data.alias);
      }
    })

  })

  //更新信息
  $('body').on('submit', '#reviseListCategory', function (e) {
    e.preventDefault();
    $.ajax({
      method: 'POST',
      url: '/my/article/updatecate',
      data: {
        Id: reviseId,
        name: $('[name="name"]').val(),
        alias: $('[name="alias"]').val()
      },
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('更新信息失败')
        }
        layer.msg('更新信息成功');
        getList();
        layer.close(indexRevise);
      }
    })

  })

  var delId = null;
  $('body').on('click', '#del', function () {
    delId = $(this).attr('data-id');
    layer.confirm('确定删除?', { icon: 3, title: '提示' }, function (index) {
      $.ajax({
        method: 'GET',
        url: '/my/article/deletecate/' + delId,
        success: function (res) {
          if (res.status !== 0) {
            return layer.msg(res.message)
          }
          layer.msg(res.message);
          getList();
          layer.close(index);
        }
      })
    });

  })

})