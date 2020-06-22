<template>
  <div class="index">
    <Nav></Nav>
    <div class="main">
      <div class="tag_menu">
        <div class="switch">
          <div :class="[{active:isactive},'item']" @click="search(0,actindex)">最新</div>
          <div :class="[{active:!isactive},'item']" @click="search(1,actindex)">最热</div>
        </div>
        <div class="tag_list">
          <div :class="[{active:actindex==tag.id},'item']" v-for="tag in tags" :key="tag.id" @click="search(!isactive,tag.id)">{{ tag.name }}</div>
        </div>
      </div>
      <waterfall :imgsArr="dataArr" @scrollReachBottom="getData" @click="jumpTo" class="waterfall" :imgWidth="236" :gap="15" :maxCols="6">
        <div class="info" slot-scope="props">
          <p class="title">{{props.value.name}}</p>
          <p class="description">{{props.value.description}}</p>
          <div class="author_info">
            <el-avatar :src="props.value.user.user_url" class="author_avatar"></el-avatar>
            <div class="info">
              <div class="item">
                {{props.value.user.user_name}}
                <span class="gray">采集到</span>
              </div>
              <div class="item"><span v-for="tag in props.value.types" :key="tag.id">{{tag.name}} </span></div>
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
      actindex: 1,
      tags:[]
    };
  },
  methods: {
    search(a,typeid) {
      if (a) {
        this.isactive = false;
      } else this.isactive = true;
      this.actindex = typeid;
      this.$axios.post("/work/list",{
        type: typeid,
        order: a,
        limit: 30,
        page: 1
      }).then(res => {
        console.log(res)
        this.dataArr = res.result.list;
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
        query: { id: value.id }
      });
      window.open(routeUrl.href, "_blank");
    },
    getData() {}
  },
  created() {
    this.$axios.post("/work/taglist",{
    }).then(res => {
      this.tags = res.data.result.list;
    })
    .catch(err=> {
      console.log(err)
    });
    this.search(0,1);
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