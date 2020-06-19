<template>
  <div class="index">
    <Nav></Nav>
    <div class="main">
      <div class="tag_menu">
        <div class="switch">
          <div :class="[{active:isactive},'item']" @click="search(0,'全部')">最新</div>
          <div :class="[{active:!isactive},'item']" @click="search(1,'全部')">最热</div>
        </div>
        <div class="tag_list">
          <div :class="[{active:actindex==tag},'item']" v-for="tag in tags" :key="tag" @click="search(0,tag)">{{ tag }}</div>
        </div>
      </div>
      <waterfall :imgsArr="dataArr" @scrollReachBottom="getData" @click="jumpTo" class="waterfall" :imgWidth="236" :gap="15" :maxCols="6">
        <div class="info" slot-scope="props">
          <p class="title">{{props.value.name}}</p>
          <p class="description">{{props.value.description}}</p>
          <div class="author_info">
            <el-avatar :src="props.value.author.user_url" class="author_avatar"></el-avatar>
            <div class="info">
              <div class="item">
                {{props.value.author.user_name}}
                <span class="gray">采集到</span>
              </div>
              <div class="item"><span v-for="tag in props.value.type" :key="tag">{{tag}} </span></div>
            </div>
            <div class="right hot">
              <i class="el-icon-star-on"></i>{{props.value.hot}}
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
export default {
  name: "index",
  data() {
    return {
      dataArr: [],
      isactive: true,
      actindex: '全部',
      tags:[
        '全部',
        '平面',
        'UI/UX',
        '插画',
        '动漫',
        '游戏',
        '摄影',
        '工业设计',
        '建筑设计',
        '家居/家装',
        '手工/布艺',
        '服装设计'
      ]
    };
  },
  methods: {
    search(a,name) {
      if (a) {
        this.isactive = false;
      } else this.isactive = true;
      this.actindex = name;
      this.$axios.post("/api/works",{
        type: a,
        name: name,
      }).then(res => {
        console.log(res)
        this.dataArr = res.data;
      })
      .catch(err=> {
        console.log(err)
      });
    },
    jumpTo(event, { index, value }) {
      // 阻止a跳转
      event.preventDefault();
      let routeUrl = this.$router.resolve({
        path: "/detail",
        query: { id: value._id }
      });
      window.open(routeUrl.href, "_blank");
    },
    getData() {}
  },
  created() {
    this.search(0,'全部');
  },
  components: {
    waterfall,
    Nav
  }
};
</script>

<style lang="scss" scoped>
.index /deep/ .nav {
  min-width: 95%;
}
.index /deep/ .com {
  width: 1490px;
}
.main {
  margin: 20px auto;
  height: 2000px; // 父元素必须要有高度
  .tag_menu {
    padding: 20px;
    margin: 20px auto;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.02), 0 4px 8px 0 rgba(0, 0, 0, 0.02);
    border-radius: 2px;
    background: #fff;
    width: 1490px;
    vertical-align: middle;
    .switch {
      display: inline-block;
      border: 1px solid #ededed;
      border-radius: 3px;
      background-color: #f5f5f5;
      width: 94px;
      .item {
        display: inline-block;
        padding: 0 8px;
        height: 28px;
        width: 44px;
        line-height: 28px;
        text-align: center;
        color: #444;
        cursor: pointer;
      }
      .active {
        background-color: #fff;
        color: #fedf01;
        font-weight: 500;
        border-radius: 3px;
      }
    }
    .tag_list {
      display: inline-block;
      .item {
        display: inline-block;
        margin-left: 30px;
        cursor: pointer;
      }
      .active {
        color: #fedf01;
      }
    }
  }
}
</style>