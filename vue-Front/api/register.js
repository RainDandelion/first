import request from '@/utils/request'

export default{
    /**
     * 根据手机号发生验证码
     */
    sendCode(phone){
        return request({ 
            url:`/eduMsm/Msm/send/${phone}`,
            method: 'get',           
          })
    },
    /**
     * 提交注册信息
     */
    registerMember(registerVo){
        return request({ 
            url:`/Eduucenter/member/register`,
            method: 'post',
            data: registerVo
          })
    }
}