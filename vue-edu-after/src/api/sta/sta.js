import request from '@/utils/request'

export default{
    /**
     * 生成数据
     * @param {} courseInfo 
     */
    createSta(day){
        return request({ 
            url:`/statistics/daily/RegisterCount/${day}`,
            method: 'post',
          })
    },

    getDataSta(searchObj){
        return request({ 
            url:`/statistics/daily/showData/${searchObj.type}/${searchObj.begin}/${searchObj.end}`,
            method: 'get',
          })
    }
}
