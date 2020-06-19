<template>
<div class="userinfo">
    <Nav></Nav>
    <div class="main">
        <div class="user_info">
            <div class="avatar">
                <img :src="author.userinfo.user_url">
            </div>
            <div class="name">{{ author.userinfo.user_name }}</div>
            <div class="intro">pineaID: {{ author.userinfo.account }}</div>
            <div class="intro">简介: {{ author.userinfo.intro }}</div>
            <div class="edit" @click="$router.push('/editinfo')" v-if="author.userinfo._id==user_id"><i class="el-icon-edit-outline"></i></div>
        </div>
        <div class="list">
            <div :class="[{active:isactive},'item']"  @click="turn(0)">{{author.own_num}} 发布</div>
            <div :class="[{active:!isactive},'item']" @click="turn(1)">{{author.collection_num}} 采集</div>
        </div>
        <div class="content">
          <waterfall :imgsArr="list" @scrollReachBottom="getData"  @click="jumpTo" class="waterfall" :imgWidth="236" :gap="15" :maxCols="6">
            <div class="info" slot-scope="props">
              <p class="title">{{props.value.name}}</p>
              <p class="description">{{props.value.description}}</p>
              <div class="author_info">
                <el-avatar :src=props.value.author.user_url class="author_avatar"></el-avatar>
                <div class="info">
                    <div class="item">
                      {{props.value.author.user_name}}
                      <span class="gray">采集到</span>
                    </div>
                    <div class="item"><span v-for="tag in props.value.type" :key="tag">{{tag}} </span></div>
                </div>
                <div class="right hot">
                  <!-- <i class="el-icon-star-on"></i>{{props.value.hot}} -->
                  <el-button plain icon="el-icon-delete" v-if="isactive" @click.stop="del(props.value._id)">删除</el-button>
                  <el-button plain v-else @click.stop="notcollected(props.value.collection_id)">取消收藏</el-button>
                </div>
              </div>
            </div>
          </waterfall>
        </div>
    </div>
</div>
</template>

<script>
import Nav from '../components/nav';
import waterfall from 'vue-waterfall-easy'
import {getLocalStorage} from "../utils/auth";
export default {
  name: "userinfo",
  data() {
    return {
      author: {},
      list: [],
      user_id:'',
			isactive: true,
    };
  },
  methods: {
		turn(a) {
			if(a) { // 采集
        this.$axios.post("/api/collectedworks",{ 
          id: this.author.userinfo._id
        }).then(res => {
          this.list = res.data
        })
        .catch(err=> {
          console.log(err)
        });
				this.isactive = false;
      } else { // 发布
        this.$axios.post("/api/ownworks",{ 
          id: this.author.userinfo._id
        }).then(res => {
          this.list = res.data
        })
        .catch(err=> {
          console.log(err)
        });
				this.isactive = true;
			}
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
    del(id){
      this.$confirm('确认删除该作品?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.post("/api/delpic",{ 
          id: id
        }).then(res => {
          this.$message({
              message: '删除成功',
              type: 'success'
          });
          this.author.own_num--;
          this.turn(0)
        })
        .catch(err=> {
          console.log(err)
        });
      }).catch(() => {        
      });
    },
    notcollected(id){
      this.$axios.post("/api/collect",{ // 取消收藏
        id: id,
        user_id: getLocalStorage('user_id'),
        work_id: this.$route.query.id
      }).then(res => {
        this.$message({
              message: '取消收藏成功',
              type: 'success'
          });
          this.author.collection_num--;
          this.turn(1)
      })
      .catch(err=> {
        console.log(err)
      });
    },
		getData() {

    }
  },
  created() {
    var id;
    this.user_id = getLocalStorage('user_id')
    if(this.$route.query.id) {
      id = this.$route.query.id
    } else id = getLocalStorage('user_id')

    this.$axios.post("/api/userinfo",{ 
      id: id
    }).then(res => {
      this.author = res.data
      this.turn(0)
    })
    .catch(err=> {
      console.log(err)
    });
  },
  components: {
			Nav,
			waterfall
  }
};
</script>

<style lang="scss" scoped>
.userinfo /deep/ .nav {
  min-width: 95%;
}
.userinfo /deep/ .com{
  width:1490px;
}
.main {
  //width: 1200px;
  margin: 20px auto;
  .user_info {
    width: 1490px;
    margin: 0px auto;
    background: #fff;
    margin-top: 66px;
    position: relative;
    box-shadow: 0 1px 3px 0 rgba(0,0,0,.02), 0 4px 8px 0 rgba(0,0,0,.02);
    height: 130px;
    position: relative;
    padding-left: 180px;
    .avatar {
        width: 150px;
        height: 150px;
        background: #fff;
        border-radius: 4px;
        box-shadow: 0 1px 3px 0 rgba(0,0,0,.02), 0 4px 8px 0 rgba(0,0,0,.02);
        position: absolute;
        left: 15px;
        top: -40px;
        padding: 5px;
        img{
            width: 100%;
            height: 100%;
        }
    }
    .name {
        margin-top: 20px;
        font-size: 24px;
        font-weight: 700;
        color: #444;
        display: inline-block;
    }
    .intro {
      color: #999;
      font-size: 12px;
    }
    .edit {
        position: absolute;
        right: 20px;
        top: 20px;
        border-radius: 2px;
        font-size: 16px;
        padding: 0 8px;
        height: 34px;
        line-height: 34px;
        background: #ededed;
        border: 1px solid #ededed;
        cursor: pointer;
        color: #444;
        text-align: center;
        box-shadow: 0 0 0 transparent;
        transition: background-color .12s ease-in-out;
        i {
            width: 16px;
            height: 16px;

        }
    }
    .edit:hover {
        border: 1px solid #d9d9d9;
        background: #d9d9d9;
        color: #444;
        text-decoration: none;
        box-shadow: none;
    }
  }
  .list {
    background: #fff;
    border-top: 1px solid #ededed;
    height: 50px;
    margin: 0px auto;
    width: 1490px;
    .item {
        font-size: 14px;
        height: 48px;
        line-height: 48px;
        padding: 0 20px;
        color: #777;
        display: inline-block;
        cursor: pointer;
    }
    .item:hover {
        color: #FEDF01;
    }
    .active {
        color: #FEDF01;
    }
  }
	.content {
		padding: 20px 0px;
 		height: 2000px; // 父元素必须要有高度
	}
}
</style>