import request from '@/utils/request'

export default{
    /**
     * 分页
     */
    PageTeacherInfo(page,limit){
        return request({ 
            url:`/eduservice/TeacherFront/getTeacherFront/${page}/${limit}`,
            method: 'post',
        
          })
    },
    /**
     * 根据id查询
     * @param {*} teacherId 
     */
    getTeacherInfo(teacherId){
        return request({ 
            url:`/eduservice/TeacherFront/getTeacherInfo/${teacherId}`,
            method: 'get',
          })
    }
}