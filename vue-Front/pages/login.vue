<template>
  <div class="main">
    <div class="title">
      <a class="active" href="/login">登录</a>
      <span>·</span>
      <a href="/register">注册</a>
    </div>

    <div class="sign-up-container">
      <el-form ref="userForm" :model="user">

        <el-form-item class="input-prepend restyle" prop="mobile" :rules="[{ required: true, message: '请输入手机号码', trigger: 'blur' },{validator: checkPhone, trigger: 'blur'}]">
          <div >
            <el-input type="text" placeholder="手机号" v-model="user.mobile"/>
            <i class="iconfont icon-phone" />
          </div>
        </el-form-item>

        <el-form-item class="input-prepend" prop="password" :rules="[{ required: true, message: '请输入密码', trigger: 'blur' }]">
          <div>
            <el-input type="password" placeholder="密码" v-model="user.password"/>
            <i class="iconfont icon-password"/>
          </div>
        </el-form-item>

        <div class="btn">
          <input type="button" class="sign-in-button" value="登录" @click="submitLogin()">
        </div>
      </el-form>
      <!-- 更多登录方式 -->
      <div class="more-sign">
        <h6>社交帐号登录</h6>
        <ul>
          <li><a id="weixin" class="weixin" target="_blank" href="http://qy.free.idcfengye.com/api/ucenter/weixinLogin/login"><i class="iconfont icon-weixin"/></a></li>
          <li><a id="qq" class="qq" target="_blank" href="#"><i class="iconfont icon-qq"/></a></li>
        </ul>
      </div>
    </div>

  </div>
</template>

<script>
  import '~/assets/css/sign.css'
  import '~/assets/css/iconfont.css'
  import loginApi from '@/api/login'
  import cookie from 'js-cookie'
  export default {
    layout: 'sign',

    data () {
      return {
        user:{ //封装手机号和密码
          mobile:'',
          password:''
        },
        loginInfo:{} //获取用户信息
      }
    },

    methods: {


      //登录用
      submitLogin(){
        //1.调用接口返回token字符串
        loginApi.submitLogin(this.user).then(Response=>{
          //2.获取token字符串，放到cookie中
          /**
           * 参数1：cookie的名字
           * 参数2：值
           * 参数3：作用范围
           */
          cookie.set("User_token",Response.data.data.token,{domain: 'localhost'})
          
          //4.调用接口，根据token获取用户信息
          loginApi.getLoginUserInfo().then(Response=>{
            //获取返回的用户信息，放到cookie中
            cookie.set("UserInfo",Response.data.data.userInfo,{domain: 'localhost'})     

            //5.跳转首页面
            this.$router.push({path: '/'})
          })



        })
      },

      checkPhone (rule, value, callback) {
        //debugger
        if (!(/^1[34578]\d{9}$/.test(value))) {
          return callback(new Error('手机号码格式不正确'))
        }
        return callback()
      }
    }
  }
</script>
<style>
   .el-form-item__error{
    z-index: 9999999;
  }
</style>