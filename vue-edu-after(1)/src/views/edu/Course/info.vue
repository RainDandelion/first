<template>
  <div class="app-container">

    <h2 style="text-align: center;">发布新课程</h2>
    <el-steps :active="1" process-status="wait" align-center style="margin-bottom: 40px;">
        <el-step title="填写课程基本信息"/>
        <el-step title="创建课程大纲"/>
        <el-step title="最终发布"/>
    </el-steps>
    <el-form label-width="120px">
      <el-form-item label="课程标题">
        <el-input v-model="courseInfo.title" placeholder=" 示例：机器学习项目课：从基础到搭建项目视频课程。专业名称注意大小写"/>
      </el-form-item>

      <!-- 所属分类 TODO -->
      <el-form-item label="课程分类">
        <el-select
          v-model="courseInfo.subjectParentId"
          @change="subjetChange"
          placeholder="一级分类">
          <el-option
            v-for="subject in subjectOneList"
            :key="subject.id"
            :label="subject.title"
            :value="subject.id"/>
        </el-select>
        <el-select
          v-model="courseInfo.subjectId"
          placeholder="二级分类">
          <el-option
            v-for="two in subjectTwoList"
            :key="two.id"
            :label="two.title"
            :value="two.id"/>
        </el-select>
      </el-form-item>

      <!-- 课程讲师 -->
      <el-form-item label="课程讲师">
        <el-select
          v-model="courseInfo.teacherId"
          placeholder="请选择">
          <el-option
            v-for="teacher in teacherList"
            :key="teacher.id"
            :label="teacher.name"
            :value="teacher.id"/>
        </el-select>
      </el-form-item>

      <el-form-item label="总课时">
        <el-input-number :min="0" v-model="courseInfo.lessonNum" controls-position="right" placeholder="请填写课程的总课时数"/>
      </el-form-item>
      <!-- 课程简介 TODO -->
      <el-form-item label="课程简介">
        <tinymce :height="300" v-model="courseInfo.description"/>
      </el-form-item>
      <!-- 课程封面 TODO -->

    <el-form-item label="课程封面">
      <el-upload
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
        :action="BASE_API+'/eduOss/fileUpload/OssUpload'"
        class="avatar-uploader"
        >
        <img :src="courseInfo.cover">
        <p>点击图片选择上传文件</p>
      </el-upload>
    </el-form-item>




      <el-form-item label="课程价格">
        <el-input-number :min="0" v-model="courseInfo.price" controls-position="right" placeholder="免费课程请设置为0元"/> 元
      </el-form-item>
      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrupdate">保存并下一步</el-button>
      </el-form-item>
    </el-form>
 
  </div>
</template>

<script>

import Course from "@/api/Course/Course"
import teacher from '@/api/teacher/teacher'
import subject from "@/api/subject/subject"
import host from '@/api/globleHost'
import Tinymce from '@/components/Tinymce'  //引入
export default {
  components: { Tinymce }, //声明
  data() {
    
    return {
      saveBtnDisabled: false, // 保存按钮是否禁用
      courseInfo:{
          title: '',
          subjectParentId:'',//一级分类
          subjectId:'',//二级分类
          teacherId: '',
          lessonNum: 0,
          description: '',
          cover: 'https://edu-1652.oss-cn-beijing.aliyuncs.com/2020/08/09/8e8f6b9fc19a43c19972d33f06e1ecb0file.png',
          price: 0,
         
      },
      
      teacherList:[],
      subjectOneList:[],//一级分类
      subjectTwoList:[], //二级分类

      saveBtnDisabled: false, // 保存按钮是否禁用,
       //获取默认端口号
      BASE_API:host.baseURL,
      courseId:'',//课程id
    }
  },
  created() {
    this.init();
  
  
  },
  watch: {
        //监听
        $route(to,from){  //路由变化的方式，路由发生变化，方法就会执行
            this.init();
        }
    },
  methods: {
    init(){
      //获取路由id值
      if(this.$route.params &&this.$route.params.id){
        this.courseId = this.$route.params.id
        //调用方法
        this.getInfo();
        //初始化所有讲师
        this.getAllTeacher();
      }else{
        //初始化所有讲师
        this.getAllTeacher();
        //初始化一级分类
        this.getOneSub();
      }
    },


    saveOrupdate(){
      if(!this.courseInfo.id){
        //添加
        this.addaddCourseInfo()
      }else{
        //更新
        this.updateCourseInfo()
      }    
    },
    /**
     * 添加课程
     */
    addaddCourseInfo(){
      Course.addCourseInfo(this.courseInfo).then(Response=>{
        //提示信息
        this.$message({
          type:"success",
          message:"添加课程信息成功"
        })
        //跳转页面
        this.$router.push("/Course/chapter/" + Response.data.id)
      })
    },
    /**
     * 修改课程
     */
    updateCourseInfo(){
      Course.updateCourseInfo(this.courseInfo).then(response=>{
        //提示信息
        this.$message({
          type:"success",
          message:"修改课程信息成功"
        })
        //跳转页面
        this.$router.push("/Course/chapter/" + this.courseId)
      })
    },
    /**
     * 查询所有讲师
     */
    getAllTeacher(){
      teacher.getListTeacher().then(response=>{
        this.teacherList = response.data.items
      })
    },
    /**
     * 查询所有一级分类
     */
    getOneSub(){
      subject.getSubjectList().then(response=>{
        this.subjectOneList = response.data.list 
      })
    },
    /**
     * subjetChange 当点击一级分类后会触发 显示对应的二级分类
     */
    subjetChange(value){
        //在前端查找遍历
        //value就是一级分类的id值
        /**
         * 遍历所有的分类，包括一级和二级
         * 如果一级分类的id和点击的一级分类id相同，
         * 从一级分类中获取所以二级分类
         */
       for (let index = 0; index < this.subjectOneList.length; index++) {
         let one = this.subjectOneList[index]
         if(one.id === value){
           this.subjectTwoList = one.children;
            //二级分类的id值情况，否则会有上次的值
            this.courseInfo.subjectId=''
         }
         
       }
      

    },
    //上传成功调用的方法
    handleAvatarSuccess(res){
        this.courseInfo.cover= res.data.url
    },
    //上传之前调用的方法
    beforeAvatarUpload(file){
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },

    /**
     * 根据id获取回显数据
     */
    getInfo(){
      Course. getCourseInfo(this.courseId).then(response =>{
        this.courseInfo = response.data.CourseVo
        //初始化分类列表
        /**
         * 1.查询出所有的分类（一二级）
         */
        subject.getSubjectList().then(response=>{
          //获取一级分类
           this.subjectOneList= response.data.list
           //把所有一级分类的数组进行遍历。比较当前courseinfo里面一级分类id和所有的一级分类id是否一样
           //可以吧二级分类的id取出来
           for(let i = 0; i<this.subjectOneList.length; i++ ){
             //获取每个一级分类
             let one = this.subjectOneList[i]
             if(one.id === this.courseInfo.subjectParentId){
               //获取一级分类下的所有二级分类
                this.subjectTwoList = one.children
             }
           }
        })

      })
    }
   
  },
}
</script>


