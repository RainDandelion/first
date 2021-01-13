<template>
    <!--讲师列表-->
    <div class="app-container">
    
    <!--查询表单-->
    <h2>讲师列表</h2>
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="teacherQuery.name" placeholder="讲师名"/>
      </el-form-item>
      <el-form-item>
        <el-select v-model="teacherQuery.level" clearable placeholder="讲师头衔">
          <el-option :value="1" label="高级讲师"/>
          <el-option :value="2" label="首席讲师"/>
        </el-select>
      </el-form-item>
      <el-form-item label="添加时间">
          <!--时间选择框-->
        <el-date-picker
          v-model="teacherQuery.begin"
          type="datetime"
          placeholder="选择开始时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="teacherQuery.end"
          type="datetime"
          placeholder="选择截止时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
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
      <el-table-column prop="name" label="名称" width="80" />
      <el-table-column label="头衔" width="80">
        <template slot-scope="scope">
          {{ scope.row.level===1?'高级讲师':'首席讲师' }}
        </template>
      </el-table-column>
      <el-table-column prop="intro" label="资历" />
      <el-table-column prop="gmtCreate" label="添加时间" width="160"/>
      <el-table-column prop="sort" label="排序" width="60" />
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <router-link :to="'/teacher/update/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
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
import teacher from '@/api/teacher/teacher'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
export default {
    components:{Pagination},
    data(){
        return {
            total: 0, //总记录数
            page: 1, //当前页
            limit: 10,//每页记录数
            teacherQuery:{ //条件封装对象

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
            teacher.getTeacherListPage(this.page,this.limit,this.teacherQuery)
                    .then(response =>{ //请求成功
                        this.list = response.data.rows
                        this.total = response.data.total               
                    })
                    // .catch(error =>{ //请求失败
                    //     console.log(error)
     
                    // })
                
        },
        //条件清空
        resetData() {
            this.teacherQuery = {}
            this.getlist()

        },
        //删除
        removeDataById(id){
            //用户体验，提示是否删除
            this.$confirm('此操作将删除讲师信息, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                //调用删除方法
                teacher.deleteTeacher(id)
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

            // teacher.deleteTeacher(id)
            //         .then(response =>{ //成功
            //             //提示信息
            //             alert("删除成功")

            //             //回到列表页面
            //             this.getlist()

            //         })
            //         .catch(error => { //失败
            //             alert("删除失败")
            //         })
        }
    }
}
</script>

<style>

</style>