import request from '@/utils/request'

export default{
    /**
     * 生成订单
     */
    createOrder(CourseId){
        return request({ 
            url:`/ServiceOrder/t-order/createOrder/${CourseId}`,
            method: 'post',
             
          })
    },
    /**
     * 根据id获取订单信息
     */
    GetOrderInfo(id){
        return request({ 
            url:`/ServiceOrder/t-order/GetOrderInfo/${id}`,
            method: 'get',
        
          })
    },
    /**
     * 生成二维码的方法
     */
    createNative(orderNo){
        return request({ 
            url:`/ServiceOrder/t-pay-log/createNative/${orderNo}`,
            method: 'get',
        
          })
    },
    /**
     * 查看订单状态
     */
    QueryNativeStatus(orderNo){
        return request({ 
            url:`/ServiceOrder/t-pay-log/queryPayStatus/${orderNo}`,
            method: 'get',
          })
    }
}