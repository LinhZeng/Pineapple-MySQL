<template>
  <div class="search">
    <Nav></Nav>
    <div class="main">
      <waterfall :imgsArr="dataArr" @scrollReachBottom="getData" @click="jumpTo" class="waterfall" :imgWidth="236" :gap="15" :maxCols="6">
        <div class="info" slot-scope="props">
          <p class="title">{{props.value.name}}</p>
          <p class="description">{{props.value.description}}</p>
          <div class="author_info">
            <el-avatar :src="props.value.user_url" class="author_avatar"></el-avatar>
            <div class="info">
              <div class="item">
                {{props.value.user_name}}
                <span>采集到</span>
              </div>
              <div class="item">{{props.value.type}}</div>
            </div>
            <div class="right">
              <el-button plain icon="el-icon-star-off">{{props.value.hot}}</el-button>
            </div>
          </div>
        </div>
      </waterfall>
    </div>
  </div>
</template>

<script>
import Nav from "../components/nav";
import waterfall from "vue-waterfall-easy";
import img_url from "../assets/logo.png";
export default {
  name: "search",
  data() {
    return {
      dataArr: [
        {
          id: 1,
          name: "头像",
          description: "最近的头像委托|插画|商业插画",
          src:
            "http://hbimg.huabanimg.com/d8cc2a52fe3b31ac24728d868a2aeb736fffbd6e6908f-0WKnt2_/fw/480",
          user_name: "Mcdoll",
          user_url: img_url,
          date: "2020-02-10",
          href: "",
          type: "插画",
          hot: 100
        },
        {
          name: "列车",
          description: "《再次起飞》系列插画重新修改总结|插画|商业插画",
          src:
            "http://hbimg.huabanimg.com/8bf2f5a9b6d7e1558eec150f7b9a98feaff105de1e9487-lgyMGO_/fw/480",
          user_name: "布克舒先生",
          date: "2020-02-10",
          href: "https://huaban.com/pins/2961177875/",
          type: "插画"
        },
        {
          name: "列车",
          description: "最近的头像委托|插画|商业插画",
          src:
            "http://hbimg.huabanimg.com/d8cc2a52fe3b31ac24728d868a2aeb736fffbd6e6908f-0WKnt2_/fw/480",
          user_name: "Mcdoll",
          date: "2020-02-10",
          href: "https://huaban.com/pins/2961177875/",
          type: "插画"
        },
        {
          name: "列车",
          description: "《再次起飞》系列插画重新修改总结|插画|商业插画",
          src:
            "http://hbimg.huabanimg.com/8bf2f5a9b6d7e1558eec150f7b9a98feaff105de1e9487-lgyMGO_/fw/480",
          user_name: "布克舒先生",
          date: "2020-02-10",
          href: "https://huaban.com/pins/2961177875/",
          type: "插画"
        },
        {
          name: "列车",
          description: "《再次起飞》系列插画重新修改总结|插画|商业插画",
          src:
            "http://hbimg.huabanimg.com/8bf2f5a9b6d7e1558eec150f7b9a98feaff105de1e9487-lgyMGO_/fw/480",
          user_name: "布克舒先生",
          date: "2020-02-10",
          href: "https://huaban.com/pins/2961177875/",
          type: "插画"
        },
        {
          name: "列车",
          description: "《再次起飞》系列插画重新修改总结|插画|商业插画",
          src:
            "http://hbimg.huabanimg.com/8bf2f5a9b6d7e1558eec150f7b9a98feaff105de1e9487-lgyMGO_/fw/480",
          user_name: "布克舒先生",
          date: "2020-02-10",
          href: "https://huaban.com/pins/2961177875/",
          type: "插画"
        }
      ],
    };
  },
  methods: {
    jumpTo(event, { index, value }) {
      // 阻止a跳转
      event.preventDefault();
      let routeUrl = this.$router.resolve({
        path: "/detail",
        query: { id: value.id }
      });
      console.log(routeUrl.href);
      window.open(routeUrl.href, "_blank");
    },
    getData() {}
  },
  created() {
    console.log('this is search')
    var url = '/' + this.$route.query.type + '/' + this.$route.query.name;
    this.$axios.post(url, {
      name: this.$route.query.name
    }).then(res => {
      console.log(res)
      this.dataArr = res.result.list;
    }).catch(err => {
      console.log(err)
    })
  },
  components: {
    Nav,
    waterfall
  }
};
</script>

<style lang="scss" scoped>
.search /deep/ .nav {
  min-width: 100%;
}
.search /deep/ .com {
  width: 100%;
}
.main {
  //width: 1200px;
  margin: 20px auto;
	height: 1000px;
}
</style>