$(function () {
  // 点击 注册框
  $('#link_reg').on('click', function () {
    // 显示 登陆框
    $('.reg-box').show()
    // 隐藏注册框
    $('.login-box').hide()
  })

  // 点击登陆框
  $('#link_login').on('click', function () {
    // 显示 注册框
    $('.login-box').show()
    // 隐藏登陆框
    $('.reg-box').hide()
  })

  // 正则 校验
  const form = layui.form
  //   获取 提升 弹框
  let layer = layui.layer

  form.verify({
    // 验证密码
    pass: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],

    repwd: function (value) {
      //   通过形参 拿到 的是确认 密码框中的 内容
      // 还需要 拿到 密码框 中的 内容 然后进行一次 等于的 判断
      // 如果失败， 这    return  一个提升 消息即可
      let pass = $('.reg-box [name=password]').val()
      if (pass !== value) {
        return '两次密码输入不一致'
      }
    }
  })

  // 注册 功能 监听注册  表单提交事件
  $('#form_reg').on('submit', function (e) {
    // 阻止表单 跳转的 默认行为
    e.preventDefault()
    // 发起post 请求
    $.post(
      '/api/reguser',
      {
        username: $('#form_reg [name=username]').val(),
        password: $('#form_reg [name=password]').val()
      },
      function (res) {
        if (res.status !== 0) {
          //   return console.log('注册失败', res.message)
          return layer.msg(res.message)
        }
        //   console.log('注册成功')
        layer.msg('注册成功')
        console.log(res)
        $('#link_login').click()
      }
    )
  })

  // 登陆 功能
  $('#form_login').on('submit', function (e) {
    // 阻止表单 跳转的 默认行为
    e.preventDefault()
    let data = $(this).serialize()
    $.ajax({
      method: 'post',
      url: '/api/login',
      data,
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('登录失败')
        }
        layer.msg('登录成功')
        // 储存到 本地 存储
        localStorage.setItem('token', res.token)
        // 跳转到后台 主页
        location.href = '/index.html'
      }
    })
  })
})

//----------------------//
// $(function () {
//   // 点击去 注册
//   $('#link_reg').on('click', function () {
//     // 注册页面显示
//     $('.reg-box').show()
//     // 登录页面隐藏
//     $('.login-box').hide()
//   })
//   //   点击登录
//   $('#link_login').on('click', function () {
//     // 登录页面显示
//     $('.login-box').show()
//     // 注册页面隐藏
//     $('.reg-box').hide()
//   })

//   //   正则验证
//   //   先用 变量获取
//   const form = layui.form
//   const layer = layui.layer
//   // 注册 事件
//   form.verify({
//     // 密码正则
//     pass: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
//     // 给一个判断 密码与 确定密码 是否一致
//     repwd: function (value) {
//       let pass = $('.reg-box[name=password]').val()
//       if (pass !== value) {
//         layer.msg('两次输入不一致')
//       }
//     }
//   })

//   // 注册 功能 监听注册  表单提交事件
//   $('#form_reg').on('submit', function (e) {
//     // / 阻止表单 跳转的 默认行为
//     e.preventDefault()
//     $.post(
//       'http://ajax.frontend.itheima.net/api/reguser',
//       {
//         username: $('#form_reg [name= username]').val(),
//         password: $('#form_reg [name= password]').val()
//       },
//       function (res) {
//         if (res.status !== 0) return layer.msg('注册失败')
//       },
//       layer.msg('注册成功'),
//       $('#link_login').click()
//     )
//   })

//   // 登录功能
//   // 监听 登录 事件
//   $('#form_login').on('submit', function (e) {
//     e.preventDefault()
//     let data = $(this).serialize()
//     $.post('http://ajax.frontend.itheima.net', data, function (res) {
//       if (res.status === 0) {
//         return layer.msg('登录失败')
//       }
//       layer.msg('登录成功'),
//           //         // 储存到 本地 存储
//           localStorage.setItem('token', res.token),
//           //         // 跳转到后台 主页
//           (location.href = '/index.html')
//     })
//   })
// })
