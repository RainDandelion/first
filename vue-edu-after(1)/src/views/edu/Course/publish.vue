<template>
  <div class="app-container">
    <el-steps :active="3" process-status="wait" align-center style="margin-bottom: 40px;">
        <el-step title="填写课程基本信息"/>
        <el-step title="创建课程大纲"/>
        <el-step title="最终发布"/>
    </el-steps>
    
    <div class="ccInfo">
      <img :src="coursePublish.cover">
      <div class="main">
        <h2>{{ coursePublish.title }}</h2>
        <p class="gray"><span>共{{ coursePublish.lessonNum }}课时</span></p>
        <p><span>所属分类：{{ coursePublish.subjectLevelOne }} — {{ coursePublish.subjectLevelTwo }}</span></p>
        <p>课程讲师：{{ coursePublish.teacherName }}</p>
        <h3 class="red">￥{{ coursePublish.price }}</h3>
      </div>
    </div>
    
    <div>
      <el-button @click="previous">返回修改</el-button>
      <el-button :disabled="saveBtnDisabled" type="primary" @click="publish">发布课程</el-button>
    </div>
    
  </div>
</template>

<script>
import Course from "@/api/Course/Course"
export default {
  data() {
    return {
      saveBtnDisabled: false, // 保存按钮是否禁用
      courseId:'', //课程id
      coursePublish:{ //封装对象

      }
    }
  },
  created() {
    //获取路由课程id值
    if(this.$route.params && this.$route.params.id) {
      this.courseId = this.$route.params.id
      //调用接口方法根据课程id查询
      this.getCoursePublishId()
    }
  },
  methods: {
    getCoursePublishId(){
        Course.getCourseblishInfo(this.courseId)
              .then(Response=>{
                 this.coursePublish  =  Response.data.CoursePublishVo
              })
    },

    previous(){
        //跳转第二步
      this.$router.push({ path:'/Course/chapter/' + this.$route.params.id})
    },
    publish() {
            //用户体验，提示是否删除
            this.$confirm('是否发布课程, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                //调用方法
                Course.publishCourse(this.courseId).
                       then(response =>{ //成功
                            //提示信息
                            this.$message({ //点击确认
                            type: 'success',
                            message: '发布成功!'
                            }); 
                            //跳转页面
                            this.$router.push({path:'/Course/list' })
                          
                    })
            }).catch(() => {
                this.$message({ //点击取消
                    type: 'info',
                    message: '已取消发布'
                });          
            });
      

      
    }
  }
}
</script>


<style scoped>
  .ccInfo {
      background: #f5f5f5;
      padding: 20px;
      overflow: hidden;
      border: 1px dashed #DDD;
      margin-bottom: 40px;
      position: relative;
  }
  .ccInfo img {
      background: #d6d6d6;
      width: 500px;
      height: 278px;
      display: block;
      float: left;
      border: none;
  }

  .ccInfo .main {
      margin-left: 520px;
  }
  .ccInfo .main h2 {
      font-size: 28px;
      margin-bottom: 30px;
      line-height: 1;
      font-weight: normal;
  }
  .ccInfo .main p {
      margin-bottom: 10px;
      word-wrap: break-word;
      line-height: 24px;
      max-height: 48px;
      overflow: hidden;
  }
  .ccInfo .main p {
      margin-bottom: 10px;
      word-wrap: break-word;
      line-height: 24px;
      max-height: 48px;
      overflow: hidden;
  }
  .ccInfo .main h3 {
      left: 540px;
      bottom: 20px;
      line-height: 1;
      font-size: 28px;
      color: #d32f24;
      font-weight: normal;
      position: absolute;
  }
</style>