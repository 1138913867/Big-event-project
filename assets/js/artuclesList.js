$(function () {

  var form = layui.form;
  var laypage = layui.laypage;
  getList();
  function getList() {
    $.ajax({
      method: 'GET',
      url: '/my/article/cates',
      success: function (res) {
        var htmlStr = template('tplAll', res);
        $('#allCategories').html(htmlStr);
        form.render();
      }
    })
  }



  var data = {
    pagenum: 1,
    pagesize: 2,
    cate_id: '',
    state: ''
  }


  list();

  function list() {
    $.ajax({
      method: 'GET',
      url: '/my/article/list',
      data: data,
      success: function (res) {
        var htmlStr = template('tbody', res);
        $('tbody').html(htmlStr);
        page(res.total);
      }
    })
  }

  $('#form').on('submit', function (e) {
    e.preventDefault();
    var cate_id = $('#allCategories').val();
    var state = $('#selected').val();
    data.cate_id = cate_id;
    data.state = state;
    list();
  })

  function page(num) {

    laypage.render({
      elem: 'pages',
      count: num,
      limit: data.pagesize,
      limits: [2, 3, 5, 10],
      curr: data.pagenum,
      layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
      jump: function (obj, first) {
        //obj包含了当前分页的所有参数，比如：
        data.pagesize = obj.limit;//得到每页显示的条数

        data.pagenum = obj.curr;//得到当前页，以便向服务端请求对应页的数据。 
        //首次不执行
        if (!first) {
          //do something
          list();
        }
      }
    });


  }

  $('body').on('click', '#del', function () {
    var id = $(this).attr('data-id');
    console.log(id);

    layer.confirm('确定删除?', { icon: 3, title: '提示' }, function (index) {
      $.ajax({
        method: 'GET',
        url: '/my/article/delete/' + id,
        success: function (res) {
          console.log(res);
          if (res.status !== 0) {
            return layer.msg('删除失败');
          }
          layer.msg('删除成功');


          var len = $('.del').length;
          if (len <= 1) {
            data.pagenum = data.pagenum === 1 ? 1 : data.pagenum - 1;
          }
          list();
        }
      })
      layer.close(index);
    });
  })

  $('body').on('click', '#revise', function () {
    var id = $(this).attr('data-id');
    sessionStorage.setItem('id', id)
    var fm = window.parent.document.querySelector("[name='fm']");
    $(fm).prop('src', './list/modifyList.html');
  })


})