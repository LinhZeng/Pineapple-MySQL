<template>
<div>
  <Nav></Nav>
  <div class="main">
    <div class="right_box">
      <div class="list" v-for="tag in taglist" :key="taglist.id"> 
        <div class="type_name"># {{ tag.name }}</div>
        <div class="waterfall-container">
          <div class="waterfall-item" v-for="(list,i) in tag.list" :key="i"><img :src="list.src"></div>
        </div>
      </div>
    </div>
    <div class="left_box">
      <div class="pic">
        <el-button type="primary" icon="el-icon-star-on"  v-if="isCollected" class="collected_btn"  @click="collect(0)">取消收藏</el-button>
        <el-button type="primary" icon="el-icon-star-off" v-else @click="collect(1)">收藏</el-button>
        <el-button plain icon="el-icon-zoom-in" class="right"></el-button>
        <div class="pic_title">{{data.name}}</div>
        <img :src="data.src">
        <el-tag v-for="tag in data.types" :key="tag.id">{{ tag.name }}</el-tag>
        <el-button type="primary" icon="el-icon-star-on" class="collected_btn right" v-if="isCollected" @click="collect(0)">{{data.hot}}</el-button>
        <el-button type="primary" icon="el-icon-star-off" class="right" v-else @click="collect(1)">{{data.hot}}</el-button>
      </div>
      <div class="author">
        <img :src="data.user.user_url" class="author_avatar">
        <div class="user_info">
          <div class="name">{{ data.user.user_name }}</div>
          <div>发布于 {{ data.createDate }}</div>
        </div>
        <div class="description">{{ data.description }}</div>
        <div class="line"></div>
        <div class="my-comment" v-if="unlisted">
          请先登录，才可评论！
        </div>
        <div class="my-comment" v-else>
          <img :src="user.user_url">
          <textarea v-model="mycomment" maxlength="100" placeholder="要不说点什么？"></textarea>
          <div class="corr">
              <em class="arrline">◆</em>
              <span class="arrclr">◆</span>
          </div>
          <el-button class="comment-btn" type="primary" @click="comment(1,0)">评论</el-button>
        </div>
        <div class="comments" v-if="data.comments">
          <div class="comment-item" v-for="item in data.comments" :key="item.id">
              <img :src="item.user.user_url" >
              <div class="comment-content">
                  <span class="content-username">{{ item.user.user_name }}</span>
                  <span>: {{ item.content }}</span>
              </div>
              <div class="comment-time">{{ item.createDate }}</div>
              <i class="el-icon-delete" @click="comment(0,item.id)" v-if="item.user.id == user.user_id">删除</i>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import Nav from '../components/nav'
import img_url from "../assets/logo.png";
import {getLocalStorage} from "../utils/auth";
export default {
  name: "detail",
  data() {
    return {
      data: {},
      user: {},
      taglist:[],
      mycomment:'',
      unlisted: false,
      // collection:{},
      isCollected:0
    };
  },
  methods: {
    getDetail() {
      this.$axios.post("/work/detail",{ // 获取详情
            id: this.$route.query.id
          }).then(res => {
            //console.log(res)
            this.data = res.result.work;
          })
          .catch(err=> {
            console.log(err)
          });
    },
    collect(type) {
      if(type) {
        this.$axios.post("/collection/collect",{ // 收藏
          user_id: this.user.user_id,
          work_id: this.$route.query.id
        }).then(res => {
          console.log(res)
          this.isCollected = res.result.isCollected
        })
        .catch(err=> {
          console.log(err)
        });
      } else {
        this.$axios.post("/collection/cancel",{ // 取消收藏
          user_id: this.user.user_id,
          work_id: this.$route.query.id
        }).then(res => {
          console.log(res)
          this.isCollected = res.result.isCollected
        })
        .catch(err=> {
          console.log(err)
        });
      }
    },
    comment(opt,index) {
      if(opt){
        this.$axios.post("/work/addcomment",{
          work_id: this.data.id,
          user_id: this.user.user_id,
          content: this.mycomment
        }).then(res => {
          console.log(res)
          this.getDetail()
        })
        .catch(err=> {
          console.log(err)
        });
      } else {
        this.$axios.post("/work/delcomment",{
          id:index
        }).then(res => {
          console.log(res)
          this.getDetail()
        })
        .catch(err=> {
          console.log(err)
        });
      }
      console.log(this.data.comments)
      this.$axios.post("/editwork",{
        id: this.data._id,
        comments: this.data.comments
      }).then(res => {
        console.log(res)
      })
      .catch(err=> {
        console.log(err)
      });
    }
  },
  created() {
    this.$axios.post("/work/detail",{ // 获取详情
      id: this.$route.query.id
    }).then(res => {
      //console.log(res)
      this.data = res.result.work;
      // console.log(this.data)
      this.data.types.forEach(e => {
        this.$axios.post("/work/tagworklist",{ // 标签列表
          type: e.id
        }).then(ress => {
          console.log(ress)
          this.taglist.push({
            id:e.id,
            name: e.name,
            list: ress.result.list,  
          });
        })
        .catch(errr=> {
          console.log(errr)
        });
      })
    })
    .catch(err=> {
      console.log(err)
    });
    if(getLocalStorage('user_id') == null) {
      this.unlisted = true;
    } else {
      this.user = {
        user_id: getLocalStorage('user_id'),
        user_name: getLocalStorage('user_name'),
        user_url: getLocalStorage('user_url'),
      }
      console.log(this.user)
    }
    this.$axios.post("/collection/iscollected",{ // 是否收藏
      user_id: this.user.user_id,
      work_id: this.$route.query.id
    }).then(res => {
      // console.log(res)
      this.isCollected = res.result.isCollected
    })
    .catch(err=> {
      console.log(err)
    });
  },
  components: {
    Nav,
  }
};
</script>

<style lang="scss" scoped>
.main {
  width: 1200px;
  margin: 20px auto;
  .pic {
    background-color: #ffffff;
    width: 800px;
    padding: 20px;
    padding-bottom: 30px;
    display: inline-block;
    .pic_title {
      font-size: 20px;
      margin-top: 20px;
    }
    img {
      width: 760px;
      margin: 10px 0px 10px 0px;
    }
    .right {
      float: right;
    } 
    .el-tag {
      margin-right: 10px;
    }
    .collected_btn {
      background-color: #FEC200;
    }
    .collected_btn:hover {
      background-color: #FEDF01;
    }
  }
  .author {
    background-color: #ffffff;
    width: 800px;
    margin-top: 20px;
    padding: 20px;
    display: inline-block;
    .author_avatar {
      width: 60px;
      height: 60px;
      margin-right: 10px;
      //border: 1px solid #e6e6e6;
    }
    .user_info {
      display: inline-block;
      color: #999;
      vertical-align: super;
      .name {
        color: #000000;
        font-size: 20px;
      }
    }
    .description {
      line-height: 1.2;
      color: #444;
      background-color: #fafafa;
      padding: 15px;
      margin: 20px 0px;
      word-wrap: break-word;
    }
    .line {
      margin: 0px -20px;
      margin-bottom: 20px; 
      border: 1px solid #f5f2f2;
    }
    .my-comment {
        position: relative;
        margin:20px 0px;
        margin-bottom: 50px;
        img {
            float: left;
            width: 60px;
            height: 60px;
        }
        textarea {
            height: 75px;
            width: 90.2%;
            display: block;
            margin-left: 75px;
            padding: 5px 6px 6px;
            border: 1px solid #cdcdcd;
            border-radius: 3px;
            line-height: 19px;
            resize: none;
            overflow: auto;
            outline: none;
        }
        .corr {
            position: absolute;
            left: 68px;
            top: 23px;
            width: 13px;
            height: 14px;
            overflow: hidden;
        }
        .arrline {
            color: #cdcdcd;
            display: block;
            font-family: "SimSun";
            font-size: 15px;
            font-style: normal;
            font-weight: normal;
            height: 10px;
            line-height: normal;
            text-align: left;
        }
        .arrclr {
            margin: -10px 0 0 1px;
            color: #fff;
            display: block;
            font-family: "SimSun";
            font-size: 15px;
            font-style: normal;
            font-weight: normal;
            height: 10px;
            line-height: normal;
        }
        .comment-btn {
            float: right;
            right: 0px;
            margin-top: 10px;
        }
    }
    .comments {
      padding: 10px 0px;
      .comment-item {
        margin-top: 20px;
        border-top: 1px solid #f6f6f6;
        padding-top: 20px;
        position: relative;
        height: 60px;
        img {
          float: left;
          width: 50px;
          height: 50px;
          margin-right: 10px;
        }
        .content-username {
          color: #FEDF01;
          cursor: pointer;
        }
        .content-username:hover {
          color: #FEC200;
          text-decoration: underline;
        }
        .comment-time {
          color: #999;
          position: absolute;
          right: 0px;
          bottom: -15px;
          font-size: 12px;
        }
        .el-icon-delete{
          float: right;
          top: 0px;
          margin-top: -20px;
          color: #999;
          cursor: pointer;
        }
      }
    }
    
  }
  .right_box {
    float: right;
    .list {
      margin-bottom: 20px;
      width: 360px;
      background-color: #fff;
      padding: 15px;
      .type_name {
        font-size: 20px;
        color:#FEDF01;
        cursor: pointer;
        margin-bottom: 10px;
      }
      .type_name:hover {
        color:#FEC200;
      } 
      .waterfall-container {
        /* 分几列 */
        column-count: 3;
        width: 100%;
        /* 列间距 */
        column-gap: 5px;
        overflow: hidden;
        height: 400px;
        .waterfall-item {
          break-inside: avoid;
          width: 100%;
          text-align: center;
          overflow: hidden;
          transition: all .15s ease-in-out;
          cursor: pointer;
          img {
            width: 100%;
          }
        }
        .waterfall-item:hover {
          transform: scale(1.08);
        }
      }
    }
  }
}
</style>