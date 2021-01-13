import request from '@/utils/request'

export default{
    /**  
     * 讲师列表（条件查询分页）
     * @param {*} current 当前页
     * @param {*} limit  每页记录数
     * @param {*} teacherQuery 条件对象
     */
    getTeacherListPage(current,limit,teacherQuery){
        //格式是固定的
        return request({
            //url: '/eduService/edu-teacher/PageTeacherCondition/' + current + '/' + limit,
            url:`/eduservice/edu-teacher/PageTeacherCondition/${current}/${limit}`,
            method: 'post',
            //条件对象 后端适用@RequestBody获得数据
            //data表示把对象转换为json进行传递
            data: teacherQuery
          })
    },
    /**
     * 删除讲师
     * @param {*} id  删除的id
     */
    deleteTeacher(id){
        return request({
            url: `/eduservice/edu-teacher/${id}`,
            method:"delete",
        })
    },
    
    /**
     * 添加讲师
     * @param {} teacher 添加的讲师对象 
     */

    addTeacher(teacher){
        return request({
    
            url:`/eduservice/edu-teacher/insertTeacher`,
            method: 'post',
        
            data: teacher
          })
    },

    /**
     *  按照id查询讲师 
     * @param {*} id  讲师id
     *
     */
    findTeacgerById(id){
        return request({
            url:`/eduservice/edu-teacher/getTeacher/${id}`,

            method: 'get',
          })

    },
    /**
     * 更新讲师  
     * @param {*} teacher 
     */ 
    updateTeacher(teacher) {
        return request({
            url:`/eduservice/edu-teacher/updateTeacher`,
            method: 'post',
            data: teacher
          })
    },
    /**
     * 查询所有讲师
     */
    getListTeacher(){
        return request({ 
            url:`/eduservice/edu-teacher/findAll`,
            method: 'get',
            
          })
    }
}