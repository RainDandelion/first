import request from '@/utils/request'

export default{
    /**
     * 查询课程和名师
     */
    getIndex(){
        return request({ 
            url:`/eduservice/IndexFront/index`,
            method: 'get',           
          })
    }
}