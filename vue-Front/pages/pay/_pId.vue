<template>
  <div class="cart py-container">
    <!--主内容-->
    <div class="checkout py-container  pay">
      <div class="checkout-tit">
        <h4 class="fl tit-txt"><span class="success-icon"></span><span class="success-info">订单提交成功，请您及时付款！订单号：{{payObj.out_trade_no}}</span>
        </h4>
        <span class="fr"><em class="sui-lead">应付金额：</em><em class="orange money">￥{{payObj.total_fee}}</em></span>
        <div class="clearfix"></div>
      </div>
      <div class="checkout-steps">
        <div class="fl weixin">微信支付</div>
        <div class="fl sao">
          <p class="red">请使用微信扫一扫。</p>
          <div class="fl code">
            <!-- <img id="qrious" src="~/assets/img/erweima.png" alt=""> -->
            <!-- <qriously value="weixin://wxpay/bizpayurl?pr=R7tnDpZ" :size="338"/> -->
            <qriously :value="payObj.code_url" :size="338"/> <!---插件-->
            <div class="saosao">
              <p>请使用微信扫一扫</p>
              <p>扫描二维码支付</p>
            </div>

          </div>

        </div>
        <div class="clearfix"></div>
        <!-- <p><a href="pay.html" target="_blank">> 其他支付方式</a></p> -->
        
      </div>
    </div>
  </div>
</template>

<script>
import orderApi from '@/api/order/order'
export default {
    asyncData({isDev, route, store, env, params, query, req, res, redirect, error}) {
        return orderApi.createNative(params.pId).then(Response=>{
            return {
                payObj:Response.data.data
            }
            
        })
    },
    data() {
        return {
            timer1: '',

        }
    },
    mounted() {//在页面渲染之后执行
    //定时器的方法
        //每个三秒调用一次查询订单的方法
        this.timer1 = setInterval(()=>{
            this.QueryOrderStatus(this.payObj.out_trade_no)
        },3000)
    },
    methods: {
        QueryOrderStatus(orderNo){
            orderApi.QueryNativeStatus(orderNo).then(Response=>{
                if(Response.data.success){
                  console.log(Response.data.success)
                    //支付成功，清空定时器
                     clearInterval(this.timer1)

                    //提示支付成功
                    this.$message({ //点击确认
                        type: 'success',
                        message: '支付成功!'
                    }); 
                    
                    
                    //跳转回课程详情页面
                    this.$router.push({path: '/course/' + this.payObj.course_id})

                }
            
            })
        }
    },
}
</script>

<style>

</style>