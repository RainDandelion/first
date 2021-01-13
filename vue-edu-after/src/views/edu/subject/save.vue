<template>
  <div class="app-container">
    <el-form>
      <el-form-item label= '信息描述'>
        <el-tag type="info">excel模版说明</el-tag>
        <el-tag>
          <i class="el-icon-download"/>
          <a :href="OSS_PATH + '/subject/%E8%AF%BE%E7%A8%8B%E5%88%86%E7%B1%BB.xlsx'">点击下载模版</a>
        </el-tag>
         <el-tag @click="dialogTableVisible = true">可查看excel表格的信息</el-tag>
        <el-dialog title="excel信息" :visible.sync="dialogTableVisible">
          <upload-excel-component 
          ref="fileExcel"
          :disabled="importBtnDisabled" 
          :on-success="handleSuccess" 
          :before-upload="beforeUpload"
          :limit="1"
          />
        <el-table :data="tableData" border highlight-current-row style="width: 100%;margin-top:20px;">
        <el-table-column v-for="item of tableHeader" :key="item" :prop="item" :label="item" />
        </el-table>
        </el-dialog>
      </el-form-item>
    
    <el-form-item label= '上传excel'>
      <el-upload
          ref="upload"
          :auto-upload="false"
          :on-success="fileUploadSuccess"
          :on-error="fileUploadError"
          :disabled="importBtnDisabled"
          :limit="1"
          :action="BASE_API+'/eduservice/edusubject/addSubject'"
          name="file"
           accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel">
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <el-button
            :loading="loading"
            style="margin-left: 10px;"
            size="small"
            type="success"
            @click="submitUpload">上传文件</el-button>
        </el-upload>
          
         
        
    </el-form-item>
 
         
    </el-form>
    


  </div>
</template>

<script>
import UploadExcelComponent from '@/components/UploadExcel/index.vue'
import host from '@/api/globleHost'
export default {
  name: 'UploadExcel',
  components: { UploadExcelComponent },
  data() {
    return {
      dialogTableVisible: false,
        dialogFormVisible: false,
      tableData: [],
      tableHeader: [],
      BASE_API: host.baseURL, // 接口API地址
      OSS_PATH: host.OSSURL, // 阿里云OSS地址
    
      importBtnDisabled: false, // 按钮是否禁用,
      loading: false
    }
  },
  methods: {
    //点击上传可以将文件上传到接口里面
    submitUpload(){
      this.importBtnDisabled= true,
      this.loading= true,
      //js:document.getElementById("upload").submit();
      this.$refs.upload.submit();
   
   
    },


    beforeUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 1

      if (isLt1M) {
        return true
      }

      this.$message({
        message: 'Please do not upload files larger than 1m in size.',
        type: 'warning'
      })
      return false
    },
    
    handleSuccess({ results, header }) {
      this.tableData = results
      this.tableHeader = header
    },
    //上传成功
    fileUploadSuccess(){
        this.loading = false
        this.$message({
          type:"success",
          message:"上传成功"
        })
        this.$router.push({path:'/subject/list'})
      
    },
    //上传失败
    fileUploadError(){
        this.loading = false
        this.$message({
          type:"error",
          message:"上传失败"
        })
      
    }
  }
}
</script>