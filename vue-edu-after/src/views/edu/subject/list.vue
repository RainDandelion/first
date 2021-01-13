<template>
  <div class="app-container">
      <!--检索输入框-->
    <el-input v-model="filterText" placeholder="Filter keyword" style="margin-bottom:30px;" />

    <el-tree
      ref="tree2"
      :data="data2"
      :props="defaultProps"
      :filter-node-method="filterNode"
      class="filter-tree"
      default-expand-all
    />

  </div>
</template>

<script>
import subject from "@/api/subject/subject"
export default {

  data() {
    return {
      filterText: '',
      data2: [],
      defaultProps: {
        children: 'children',
        label: 'title'
      }
    }
  },
  created() {
      this.getAllList()
  },
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val)
    }
  },

  methods: {
    filterNode(value, data) {
      if (!value) return true
      return data.title.toLowerCase().indexOf(value.toLowerCase()) !== -1 //不区分大小写，都转化为答大写或小写
    },
    /**
     * 获得所有
     */
    getAllList(){
        subject.getSubjectList().then(Response=>{
            this.data2 = Response.data.list
        })
    },
    


  }
}
</script>

