import request from '@/utils/request'

export default{
    /**
     * 查询前两条banner信息
     */
    getBannerList(){
        return request({ 
            url:`/educms/BannerFront/getBanner`,
            method: 'get',           
          })
    }
}