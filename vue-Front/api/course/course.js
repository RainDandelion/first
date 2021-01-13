import request from '@/utils/request'

export default{
    /**
     * 分页插叙，带条件
     */
    getCourseList(page,limit,courseFrontVo){
        return request({ 
            url:`/eduservice/CourseFront/getCoursePage/${page}/${limit}`,
            method: 'post',
            data:  courseFrontVo    
          })
    },
    /**
     * 查询所有分类的方法(树形结构)
     */
    getAllSubject(){
        return request({ 
            url:`/eduservice/edusubject/getAllSubject`,
            method: 'get',
           
          })
    },
    /**
     * 课程详情
     */
    getCourseInfo(CourseId){
        return request({ 
            url:`/eduservice/CourseFront/getFrontCourseInfo/${CourseId}`,
            method: 'get',
          
          })
    }

}