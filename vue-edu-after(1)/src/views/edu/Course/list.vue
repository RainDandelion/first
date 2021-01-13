<template>
    <!--课程列表-->
    <div class="app-container">
    
    <!--查询表单-->
    <h2>课程列表</h2>
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="CoursePublishVo.title" placeholder="课程名称"/>
      </el-form-item>
      <el-form-item>
        <el-select v-model="CoursePublishVo.status" clearable placeholder="课程状态">
          <el-option value="Normal" label="已发布"/>
          <el-option value="Draft" label="未发布"/>
        </el-select>
      </el-form-item>
      <el-button type="primary" icon="el-icon-search" @click="getlist()">查询</el-button>
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>

    <!-- 表格 -->
    <el-table
      :data="list"
      border
      fit
      highlight-current-row>
      <el-table-column
        label="序号"
        width="70"
        align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column prop="title" label="名称" width="80" />
      <el-table-column label="状态" width="80">
        <template slot-scope="scope">
          {{ scope.row.status==='Normal'?'已发布':'未发布' }}
        </template>
      </el-table-column>
      <el-table-column prop="lessonNum" label="总课时数" width="80" />
      <el-table-column label="操作" width="500" align="center">
        <template slot-scope="scope">
          <router-link :to="'/teacher/update/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">编辑课程基本信息</el-button>
          </router-link>
          <router-link :to="'/teacher/update/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">编辑课程大纲信息</el-button>
          </router-link>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination style="padding: 30px 0; text-align: center;"
        v-show="total>0" 
        :total="total" 
        :page.sync="page" 
        :limit.sync="limit" 
        @pagination="getlist" />
    </div>
</template>

<script>
import course from '@/api/Course/Course'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
export default {
components:{Pagination},
    data(){
        return {
            total: 0, //总记录数
            page: 1, //当前页
            limit: 10,//每页记录数
            CoursePublishVo:{ //条件封装对象

            },
            list: null //查询后接口返回集合
        }
    },
    created(){
        this.getlist()
    },
     methods:{
        //讲师列表的方法
        getlist(){
           // this.page = page //查页数，标签方法不需要加参数，标签已封装了页数
            course.publishCourseList(this.page,this.limit,this.CoursePublishVo)
                    .then(response =>{ //请求成功
                        this.list = response.data.row
                        this.total = response.data.total               
                    })
                
        },
        //条件清空
        resetData() {
            this.CoursePublishVo = {}
            this.getlist()

        },
        //删除
        removeDataById(id){
            //用户体验，提示是否删除
            this.$confirm('此操作将删除课程信息, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                //调用删除方法
                course.DeletecourseByid(id)
                       .then(response =>{ //成功
                            //提示信息
                            this.$message({ //点击确认
                            type: 'success',
                            message: '删除成功!'
                            }); 
                            //回到列表页面
                            this.getlist()
                    })
            }).catch(() => {
                this.$message({ //点击取消
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        }
    }
}
</script>

<style>

</style>