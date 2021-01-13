<template>
  <div class="player">
      <link rel="stylesheet" href="https://g.alicdn.com/de/prismplayer/2.8.2/skins/default/aliplayer-min.css" />
     <script charset="utf-8" type="text/javascript" src="https://g.alicdn.com/de/prismplayer/2.8.2/aliplayer-min.js"></script>
     <div  class="prism-player" id="J_prismPlayer"></div>
  </div>
</template>

<script>
import vodApi from '@/api/vod/vod'
export default {
    layout: 'video',
    asyncData({isDev, route, store, env, params, query, req, res, redirect, error}) {
        return vodApi.GetPlayAuth(params.vid).then(Response=>{
            return{
               playAuth: Response.data.data.playAuth,
               vid: params.vid
            } 
        })
    },
    //在页面渲染之后执行
    mounted() {
        var player = new Aliplayer({
            id: 'J_prismPlayer',
            height: '900px',
            width: '1000px',
            autoplay: false,
            //播放方式二：点播用户推荐
            vid : this.vid,
            playauth : this.playAuth,
            cover: 'http://liveroom-img.oss-cn-qingdao.aliyuncs.com/logo.png',
            encryptType:1, //当播放私有加密流时需要设置。
            },function(player){
                console.log('播放器创建好了。')
           });

    },
}
</script>

<style scoped>
/* .player {
    height: 900px;
    width: 1000px;
} */
</style>