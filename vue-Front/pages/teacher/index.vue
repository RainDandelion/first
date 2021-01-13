<template>
  <div id="aCoursesList" class="bg-fa of">
    <!-- 讲师列表 开始 -->
    <section class="container">
      <header class="comm-title all-teacher-title">
        <h2 class="fl tac">
          <span class="c-333">全部讲师</span>
        </h2>
        <section class="c-tab-title">
          <a id="subjectAll" title="全部" href="#">全部</a>
          <!-- <c:forEach var="subject" items="${subjectList }">
                            <a id="${subject.subjectId}" title="${subject.subjectName }" href="javascript:void(0)" onclick="submitForm(${subject.subjectId})">${subject.subjectName }</a>
          </c:forEach>-->
        </section>
      </header>
      <section class="c-sort-box unBr">
        <div>
          <!-- /无数据提示 开始-->
          <section class="no-data-wrap" v-if="total == 0">
            <em class="icon30 no-data-ico">&nbsp;</em>
            <span class="c-666 fsize14 ml10 vam">没有相关数据，小编正在努力整理中...</span>
          </section>
          <!-- /无数据提示 结束-->
          <article class="i-teacher-list" v-if="total > 0">
            <ul class="of">
              <li v-for="item in list" :key=item.id>
                <section class="i-teach-wrap">
                  <div class="i-teach-pic">
                    <a :href="'/teacher/'+item.id" :title="item.name" target="_blank">
                      <img :src="item.avatar" :alt="item.name">
                    </a>
                  </div>
                  <div class="mt10 hLh30 txtOf tac">
                    <a :href="'/teacher/'+item.id" :title="item.name" target="_blank" class="fsize18 c-666">{{item.name}}</a>
                  </div>
                  <div class="hLh30 txtOf tac">
                    <span class="fsize14 c-999">{{item.intro}}</span>
                  </div>
                  <div class="mt15 i-q-txt">
                    <p class="c-999 f-fA">{{item.career}}</p>
                  </div>
                </section>
              </li>
            </ul>
            <div class="clear"></div>
          </article>
        </div>
        <!-- 公共分页 开始 -->
         <el-pagination
          layout="total,prev, pager, next,jumper"
          :total="total" 
          :current-page.sync="page" 
          :page-size="limit" 
          style="padding: 30px 0; text-align: center"
          @current-change="gotoPage" 
          >
        </el-pagination>
        <!-- 公共分页 结束 -->
      </section>
    </section>
    <!-- /讲师列表 结束 -->
  </div>
</template>
<script>
import TeacherApi from '@/api/teacher/teacher'
export default {
  data(){
        return {
            total: 0, //总记录数
            page: 1, //当前页
            limit: 8,//每页记录数
            list: null //查询后接口返回集合
        }
    },
  //异步调用，只会调用一次
  /**
   * params：相当于 this.$route.param.参数   === params.参数
   * error 错误信息
   */
  // asyncData({params, error}) {
  //   //查询第一页 8条记录
  //   return TeacherApi.PageTeacherInfo(1,8)
  //                 .then(Response=>{
  //                   //this.data = Response.data.data//获得map集合
  //                   return {data: Response.data.data} //等价于上面
  //                 })
  // },
  //上面的方法只会执行一次，需要写一个方法
  created() {
    this.gotoPage()
  },
  methods: {
    //分页的切换
    gotoPage(page = 1){
      this.page = page;

      TeacherApi.PageTeacherInfo(this.page,this.limit).then(response =>{
                        this.list = response.data.data.items
                        this.total = response.data.data.total    
      })
    }
  },
};
</script>