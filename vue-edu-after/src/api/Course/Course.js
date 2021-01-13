import request from '@/utils/request'

export default{
    /**
     * 添加课程信息
     * @param {} courseInfo 
     */
    addCourseInfo(courseInfo){
        return request({ 
            url:`/eduservice/edu-course/AddCourseInfo`,
            method: 'post',
            data:courseInfo
          })
    },
    /**
     * 根据id获取信息
     * @param {*} courseId 
     */
    getCourseInfo(courseId){
        return request({ 
            url:`/eduservice/edu-course/getCourseInfo/${courseId}`,
            method: 'get',
        })
            
    },

   /**
     * 添加课程信息
     * @param {} courseInfo 
     */
    updateCourseInfo(courseInfo) {
        return request({ 
            url:`/eduservice/edu-course/updateCourseInfo`,
            method: 'post',
            data:courseInfo
          })
    },
    

    /**
     * 根据id获取最终信息
     * @param {*} courseId 
     */
    getCourseblishInfo(courseId){
        return request({ 
            url:`/eduservice/edu-course/getPublishCourseInfo/${courseId}`,
            method: 'get',
        })
            
    },
    /**
     * 课程最终发布
     * @param {*} courseId 
     */
    publishCourse(courseId){
        return request({ 
            url:`/eduservice/edu-course/PublishCourse/${courseId}`,
            method: 'post',
        })
    },
    /**
     * 条件查询带分页
     * @param {*} current 
     * @param {*} limit 
     * @param {*} CoursePublishVo 
     */
    publishCourseList(current,limit,CoursePublishVo){
        return request({ 
            url:`/eduservice/edu-course//PageCourseCondition/${current}/${limit}`,
            method: 'post',
            data: CoursePublishVo
        })
    },

    DeletecourseByid(courseId){
        return request({ 
            url:`/eduservice/edu-course/deleteCourse/${courseId}`,
            method: 'delete',
        })
    }




}