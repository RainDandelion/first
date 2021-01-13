import request from '@/utils/request'

export default{
    /**
     * 登录
     */
    GetPlayAuth(id){
        return request({ 
            url:`/eduVod/video/GetPlayAuth/${id}`,
            method: 'get',
                     
          })
    },

}