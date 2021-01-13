import request from '@/utils/request'

export default{
    /**
     * 登录
     */
    submitLogin(member){
        return request({ 
            url:`/Eduucenter/member/Login`,
            method: 'post',
            data:  member          
          })
    },
    /**
     * 根据token获取用户信息
     */
    getLoginUserInfo(){
        return request({ 
            url:`/Eduucenter/member/getUserInfo`,
            method: 'get',
        
          })
    }
}