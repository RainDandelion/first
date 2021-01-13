import request from '@/utils/request'

export default{

    /**
     * 添加小结
     * @param {*} Video 
     */
    addVideo(Video){
        //格式是固定的
        return request({
            
            url:`/eduservice/edu-video/addVideo`,
            method: 'post',
            data: Video
          })
    },
    /**
     * 删除小结
     * @param {*} id  删除的id
     */
    deleteVideo(id){
        return request({
            url: `/eduservice/edu-video/deleteVideo/${id}`,
            method:"delete",
        })
    },
    /**
     *  按照id查询小结
     * @param {*} id  讲师id
     *
     */
    findVideoById(videoId){
        return request({
            url:`/eduservice/edu-video/getVideo/${videoId}`,
            method: 'get',
          })

    },
    /**
     * 更新小结  
     * @param {*} video
     */ 
    updateTeacher(video) {
        return request({
            url:`/eduservice/edu-video/updateVideo`,
            method: 'post',
            data: video
          })
    },

     /**
     * 删除小结视频
     * @param {*} id  删除的id
     */
    deleteAliyunVideo(VideoId){
        return request({
            url: `/eduVod/video/deleteVideo/${VideoId}`,
            method:"delete",
        })
    },

}