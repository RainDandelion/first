<template>
    <!--添加或更新讲师-->
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="讲师名称">
        <el-input v-model="teacher.name"/>
      </el-form-item>
      <el-form-item label="讲师排序">
        <el-input-number v-model="teacher.sort" controls-position="right" :min="0"/>
      </el-form-item>
      <el-form-item label="讲师头衔">
        <el-select v-model="teacher.level" clearable placeholder="请选择">
          <!--
            数据类型一定要和取出的json中的一致，否则没法回填
            因此，这里value使用动态绑定的值，保证其数据类型是number
          -->
          <el-option :value="1" label="高级讲师"/>
          <el-option :value="2" label="首席讲师"/>
        </el-select>
      </el-form-item>
      <el-form-item label="讲师资历">
        <el-input v-model="teacher.career"/>
      </el-form-item>
      <el-form-item label="讲师简介">
        <el-input v-model="teacher.intro" :rows="10" type="textarea"/>
      </el-form-item>
      <!-- 讲师头像：TODO -->
      <el-form-item label="讲师头像">
            <!-- 头衔缩略图 -->
            <pan-thumb :image="String(teacher.avatar)"/>
            <!-- 文件上传按钮 -->
            <el-button type="primary" icon="el-icon-upload" @click="imagecropperShow=true">更换头像
            </el-button>
            <!--
            v-show：是否显示上传组件
            :key：类似于id，如果一个页面多个图片上传控件，可以做区分
            :url：后台上传的url地址
            @close：关闭上传组件
            @crop-upload-success：上传成功后的回调 -->
            <image-cropper
                        v-show="imagecropperShow"
                        :width="300"
                        :height="300"
                        :key="imagecropperKey"
                        :url="BASE_API+'/eduOss/fileUpload/OssUpload'"
                        field="file"
                        @close="close"
                        @crop-upload-success="cropSuccess"/>
      </el-form-item>

      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import teacher from '@/api/teacher/teacher'
import ImageCropper from '@/components/ImageCropper'
import PanThumb from '@/components/PanThumb'
import host from '@/api/globleHost'
export default {
    components:{ImageCropper,PanThumb},
    data() {
        return {
            teacher:{
                avatar:"",
            },
            saveBtnDisabled: false, // 保存按钮是否禁用,
            //上传弹框组件是否显示
            imagecropperShow: false,
            imagecropperKey: 0, //上传组件key值
            //获取默认端口号
            BASE_API:host.baseURL,

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
            if(this.$route.params && this.$route.params.id){
                        let id = this.$route.params.id
                        this.getinfo(id)
                    }else{
                        //路径没有id值，做添加
                        //清空表单
                        this.teacher = {}
            }
        },


        saveOrUpdate(){
            this.saveBtnDisabled = true
            //判断是添加还是修改，根据链接里否有参数
            if(!this.teacher.id){
                this.saveteacher()
            }else{
                this.updateT()
            }    
        },
        //修改讲师
        updateT(){
            teacher.updateTeacher(this.teacher).then(Response=>{
                    //提示信息
                    this.$message({ //点击确认
                                type: 'success',
                                message: '修改成功!'
                                }); 
                    //回到列表 路由跳转
                    this.$router.push({path: "/teacher/list"})
                })
        },

        //添加
        saveteacher(){
            teacher.addTeacher(this.teacher).then(Response =>{
                //提示信息
                this.$message({ //点击确认
                            type: 'success',
                            message: '添加成功!'
                            }); 
                //回到列表 路由跳转
                this.$router.push({path: "/teacher/list"})
            })
            // .catch(() => {
            //     this.$message({ //点击取消
            //         type: 'info',
            //         message: '已取消删除'
            //     });          
            // });
        },

        //根据id查询回显
        getinfo(id){
            teacher.findTeacgerById(id).then(Response=>{
                this.teacher = Response.data.teacher
            })
        },
        close(){ //关闭上传弹框的方法
            this.imagecropperShow = false
             // 上传成功后，重新打开上传组件时初始化组件，否则显示上一次的上传结果
            this.imagecropperKey = this.imagecropperKey + 1
        },
        //上传成功
        cropSuccess(data){
            //上传之后接口返回图片地址
            this.teacher.avatar=data.url,
            //关闭弹窗
            this.imagecropperShow = false
            // 上传成功后，重新打开上传组件时初始化组件，否则显示上一次的上传结果
            this.imagecropperKey = this.imagecropperKey + 1
        }

    },
}
</script>

<style>

</style>
