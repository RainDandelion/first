<template>
  <div id="aCoursesList" class="bg-fa of">
    <!-- /课程列表 开始 -->
    <section class="container">
      <header class="comm-title">
        <h2 class="fl tac">
          <span class="c-333">全部课程</span>
        </h2>
      </header>
      <section class="c-sort-box">
        <section class="c-s-dl">
          <dl>
            <dt>
              <span class="c-999 fsize14">课程类别</span>
            </dt>
            <dd class="c-s-dl-li">
              <ul class="clearfix">
                <li>
                  <a title="全部" href="#">全部</a>
                </li>
                <li v-for="(one,index) in subjectNestedList" :key="index" :class="{active:oneIndex == index}">
                  <a :title="one.title" href="#" @click="searchOne(one.id,index)">{{one.title}}</a>
                </li>               
              </ul>
            </dd>
          </dl>
          <dl>
            <dt>
              <span class="c-999 fsize14"></span>
            </dt>
            <dd class="c-s-dl-li">
              <ul class="clearfix">
                <li v-for="(two,index) in subSubjectList" :key="index" :class="{active:twoIndex==index}">
                  <a :title="two.title" href="#" @click="searchTwo(two.id,index)">{{two.title}}</a>
                </li>
              </ul>
            </dd>
          </dl>
          <div class="clear"></div>
        </section>
        <div class="js-wrap">
          <section class="fr">
            <span class="c-ccc">
              <i class="c-master f-fM">1</i>/
              <i class="c-666 f-fM">1</i>
            </span>
          </section>
          <section class="fl">
            <ol class="js-tap clearfix">
             <li :class="{'current bg-orange':buyCountSort!=''}">
                <a title="销量" href="javascript:void(0);" @click="searchBuyCount()">销量
                <span :class="{hide:buyCountSort==''}">↓</span>
                </a>
              </li>
              <li :class="{'current bg-orange':gmtCreateSort!=''}">
                <a title="最新" href="javascript:void(0);" @click="searchGmtCreate()">最新
                <span :class="{hide:gmtCreateSort==''}">↓</span>
                </a>
              </li>
              <li :class="{'current bg-orange':priceSort!=''}">
                <a title="价格" href="javascript:void(0);" @click="searchPrice()">价格&nbsp;
                  <span :class="{hide:priceSort==''}">↓</span>
                </a>
              </li>
            </ol>
          </section>
        </div>
        <div class="mt40">
          <!-- /无数据提示 开始-->
          <section class="no-data-wrap" v-if="total == 0">
            <em class="icon30 no-data-ico">&nbsp;</em>
            <span class="c-666 fsize14 ml10 vam">没有相关数据，小编正在努力整理中...</span>
          </section>
          <!-- /无数据提示 结束-->
          <article class="comm-course-list" v-if="total > 0">
            <ul class="of" id="bna">
              <li v-for="item in data" :key="item.id">
                <div class="cc-l-wrap">
                  <section class="course-img">
                    <img :src="item.cover" class="img-responsive" :alt="item.title">
                    <div class="cc-mask">
                      <a :href="'/course/'+item.id" title="开始学习" class="comm-btn c-btn-1">开始学习</a>
                    </div>
                  </section>
                  <h3 class="hLh30 txtOf mt10">
                    <a :href="'/course/'+item.id" :title="item.title" class="course-title fsize18 c-333">{{item.title}}</a>
                  </h3>
                  <section class="mt10 hLh20 of">
                    <span class="fr jgTag bg-green" v-if="Number(item.price) == 0">
                      <i class="c-fff fsize12 f-fA">免费</i>
                    </span>
                    <span class="fr jgTag bg-green" v-if="Number(item.price) > 0">
                      <i class="c-fff fsize12 f-fA">{{item.price}}元</i>
                    </span>
                    <span class="fl jgAttr c-ccc f-fA">
                      <i class="c-999 f-fA">9634人学习</i>
                      |
                      <i class="c-999 f-fA">9634评论</i>
                    </span>
                  </section>
                </div>
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
          @current-change="initCourse" 
          >
        </el-pagination>
        <!-- 公共分页 结束 -->
      </section>
    </section>
    <!-- /课程列表 结束 -->
  </div>
</template>
<script>
import courseApi from '@/api/course/course'
export default {
  data() {
    return {
        total: 0, //总记录数
        limit: 8,//每页记录数
        page:1, //当前页
        data:{}, //课程类表
        subjectNestedList: [], // 一级分类列表
        subSubjectList: [], // 二级分类列表
        subSubjectoneId:'',
        subSubjectTwoId:'',
        searchObj: {}, // 查询表单对象
        //为了做显示效果
        oneIndex:-1,
        twoIndex:-1,
        buyCountSort:"",
        gmtCreateSort:"",
        priceSort:""
    }
  },
  created() {
    //1.查询第一页数据
    this.initCourse()
    //2.二级联动
    this.InitSubject();
  },
  methods: {
    initCourse(page = 1){
      this.page = page;
      courseApi.getCourseList(this.page,this.limit,this.searchObj).then(Response=>{
        this.data = Response.data.data.CourseList.records
        this.total = Response.data.data.CourseList.total 
        //console.log(Response.data.data)
        //console.log(Response.data.data.CourseList)
      })
    },
    //查询所有分类
    InitSubject(){
      courseApi.getAllSubject().then(Response=>{
        this.subjectNestedList = Response.data.data.list

      })
    },
    /**
     * 点击某个一级分类，显示对应二级分类
     */
    searchOne(SubjectParentId,Index){
        //显示，的用户体验
        //把传递的index，赋值给oneIndex，为了active样式可以生效
        this.oneIndex = Index
        this.twoIndex = -1

        //二级分类清空
        this.searchObj.subjectId = "";
        this.subSubjectTwoId = "";
        this.subSubjectList = [];

        //查询
        this.searchObj.subjectParentId = SubjectParentId;
        this.subSubjectoneId = SubjectParentId;
        this.initCourse();

        //用一级分类id和所有一级分类id进行比较，相同的话，获取二级id
        for (let i = 0; i < this.subjectNestedList.length; i++) {
          let element = this.subjectNestedList[i];
          if(SubjectParentId == element.id){
              this.subSubjectList = element.children
          }
          
        }
    },
    //二级分类，查询
    searchTwo(twoId,index){
      this.twoIndex = index  //显示样式
      this.searchObj.subjectParentId = "";
      //查询
      this.searchObj.subjectId = twoId;
      this.subSubjectTwoId = twoId;
      this.subSubjectoneId = "";
      this.initCourse();
    },
    /**
     * 根据销量做排序
     */
    searchBuyCount(){
      //设置对应变量值，为了样式可以显示,值可以随意
        this.buyCountSort = '1';
        this.gmtCreateSort = "";
        this.priceSort = "";

       //赋值给封装参数
       this.searchObj.buyCountSort = this.buyCountSort;
       this.searchObj.gmtCreateSort = this.gmtCreateSort;
       this.searchObj.priceSort = this.priceSort;
       this.searchObj.subjectId =  this.subSubjectTwoId;
       this.searchObj.subjectParentId = this.subSubjectoneId;
       //调用用方法
       this.initCourse();
    },
    /**
     * 根据时间做排序
     */
    searchGmtCreate(){
      //设置对应变量值，为了样式可以显示,值可以随意
        this.buyCountSort = '';
        this.gmtCreateSort = "1";
        this.priceSort = "";

        
       //赋值给封装参数
       this.searchObj.buyCountSort = this.buyCountSort;
       this.searchObj.gmtCreateSort = this.gmtCreateSort;
       this.searchObj.priceSort = this.priceSort;
       this.searchObj.subjectId =  this.subSubjectTwoId;
       this.searchObj.subjectParentId = this.subSubjectoneId;
       //调用用方法
       this.initCourse();
    },
    searchPrice(){
      //设置对应变量值，为了样式可以显示,值可以随意
        this.buyCountSort = '';
        this.gmtCreateSort = "";
        this.priceSort = "1";

        
       //赋值给封装参数
       this.searchObj.buyCountSort = this.buyCountSort;
       this.searchObj.gmtCreateSort = this.gmtCreateSort;
       this.searchObj.priceSort = this.priceSort;
       this.searchObj.subjectId =  this.subSubjectTwoId;
       this.searchObj.subjectParentId = this.subSubjectoneId;
       //调用用方法
       this.initCourse();
    }

  },
};
</script>
<style scoped>
.active {
  background: #bdbdbd;
}
.hide {
  display: none;
}
.show {
  display: block;
}
</style>