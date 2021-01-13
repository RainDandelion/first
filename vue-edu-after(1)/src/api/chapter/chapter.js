import request from '@/utils/request'

export default{
    /**
     *根据课程id获取章节和小结数据
     * @param {} courseId
     */
    getChapterAndVideo(courseId){
        return request({ 
            url:`/eduservice/edu-chapter/getChapterVideo/${courseId}`,
            method: 'get',
          })
    },
    /**
     * 添加章节
     * @param {*} chapter 
     */
    addChapterAndVideo(chapter){
        return request({ 
            url:`/eduservice/edu-chapter/addChapter`,
            method: 'post',
            data: chapter
          })
    },
    /**
     * 根据id查询
     * @param {*} chapterId
     */
    getChapterAndVideoByid(chapterId){
        return request({ 
            url:`/eduservice/edu-chapter/getChapter/${chapterId}`,
            method: 'get',
          })
    },
    /**
     * 修改章节
     * @param {*} chapter 
     */
    updateChapterAndVideo(chapter){
        return request({ 
            url:`/eduservice/edu-chapter/updateChapter`,
            method: 'post',
            data: chapter
          })
    },
    /**
     * 删除章节
     * @param {*} chapterId 
     */
    deleteChapterAndVideo(chapterId){
        return request({ 
            url:`/eduservice/edu-chapter/deleteChapter/${chapterId}`,
            method: 'delete',
          })
    }

    




}