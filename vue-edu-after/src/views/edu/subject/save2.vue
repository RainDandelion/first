
<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="信息描述">
        <el-tag type="info">excel模版说明</el-tag>
        <el-tag>
          <i class="el-icon-download"/>
          <a :href="OSS_PATH + '/subject/%E8%AF%BE%E7%A8%8B%E5%88%86%E7%B1%BB.xlsx'">点击下载模版</a>
        </el-tag>
      </el-form-item>
      <el-form>
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
            @click="submitUpload">上传到服务器</el-button>
        </el-upload>
      </el-form>
    </el-form>
  </div>
</template>
<script>
import host from '@/api/globleHost'
export default {
  name: 'saveExcel',

  data() {
    return {
    
      BASE_API: host.baseURL, // 接口API地址
      OSS_PATH: host.OSSURL, // 阿里云OSS地址
    
      importBtnDisabled: false, // 按钮是否禁用,
      loading: false
    }
  },
  methods: {

    //:http-request="importWordConfirm"
    // importWordConfirm (item) {
    //     const fileObj = item.file
    //     const formData = new FormData()
    //     formData.append('file', fileObj)
        
    //     this.$axios.post(this.BASE_API+'/eduservice/edusubject/addSubject', formData, {
    //         headers: {
    //         'Content-Type': 'multipart/form-data'
    //         }
    //     }).then(res => {
    //         // do something
    //     })
    //     },

        submitUpload() {
        
        this.importBtnDisabled = true
        this.loading = true
        this.$refs.upload.submit()
        },
        fileUploadSuccess() {
                this.loading = false
                this.$message({
                    type: 'success',
                    message: 导入成功
                })
        },
        fileUploadError(response) {
            this.loading = false
            this.$message({
            type: 'error',
            message: '导入失败' 
            })
        }


  }
}
</script>