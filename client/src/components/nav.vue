<template>
  <div style="z-index: 99;position: sticky;top: 0">
    <div class="nav">
      <div class="com">
        <div class="nav_logo" @click="$router.push('/index')">
          <img src="../assets/logo.png" class="nav_logo_pic" />
        </div>
        <div class="nav_menu">
          <el-menu :default-active="$route.path" class="el-menu-demo" mode="horizontal" router>
            <el-menu-item index="/index">首页</el-menu-item>
            <el-menu-item index="/userinfo">我的</el-menu-item>
            <!-- <div class="nav_message">
                                <router-link to="/message"><i class="el-icon-chat-dot-round"></i></router-link>
            </div>-->
          </el-menu>
        </div>
        <el-input class="search" v-model="keyword"
          placeholder="请输入内容"
          @select="handleSelect"
          @keyup.enter.native="search">
          <el-select v-model="preSearch" slot="prepend">
            <el-option label="采集" value="1"></el-option>
            <el-option label="用户" value="2"></el-option>
          </el-select>
          <el-button slot="append" icon="el-icon-search"  @click="search"></el-button>
        </el-input>
        <div class="login_btn" v-if="unlisted" @click="panel_open=true">登录</div>
        <div class="nav_user"  v-if="unlisted==false">
          <img class="user_avatar" :src="userData.userinfo.user_url"/>
          <div class="user_panel">
            <p class="user_name">
              {{userData.userinfo.user_name}}
              <!-- <span :class="[userInfo.gender > 0 ?'el-icon-male':'el-icon-female']"></span> -->
            </p>
						<div class="get_user_nums">
              <div class="nums_item">
                <p>发布</p>
                <span>{{userData.own_num}}</span>
              </div>
              <div class="nums_item">
                <p>采集</p>
                <span>{{userData.collection_num}}</span>
              </div>
            </div>
						<div class="user_item">
              <span>pineaID：{{userData.userinfo.account}}</span>
            </div>
            <div class="user_item">
              <span>简介：{{userData.userinfo.intro}}</span>
            </div>
						 <router-link class="use_info" to="/userinfo" tag="div">
              <span class="iconfont iconyonghu"></span>我的主页
            </router-link>
            <div class="use_info"  @click="out">
              <span class="iconfont icontuichu2"></span>退出
            </div>
          </div>
        </div>
				<div class="nav_add">
					<el-button type="primary" @click="$router.push('/addpic')"><i class="el-icon-plus"></i></el-button>
				</div>
        <div class="login_panel" v-if="panel_open">
          <div class="panel">
            <el-tabs v-model="activeName" @tab-click="resetForm()">
              <el-tab-pane label="登录" name="登录"></el-tab-pane>
              <el-tab-pane label="注册" name="注册"></el-tab-pane>
            </el-tabs>
            <el-form ref="form" :model="form" label-width="40px">
              <el-form-item label="账号">
                <el-input v-model="form.account"></el-input>
              </el-form-item>
              <el-form-item label="密码">
                <el-input v-model="form.password" type="password"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">{{ activeName }}</el-button>
                <el-button  @click="resetForm();panel_open=false">取消</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div class="panel_bg" v-if="panel_open"></div>
      </div>
    </div>
  </div>
</template>

<script>
import img_url from "../assets/logo.png";
import {setLocalStorage} from "../utils/auth";
import {getLocalStorage} from "../utils/auth";

export default {
  name: "nav",
  data() {
    return {
      activeIndex: "/index",
      userData: {},
      isActived: true,
      keyword: "",
      preSearch: '1',
      unlisted: false,
      form:{
        account:'',
        password: ''
      },
      activeName:'登录',
      panel_open: false,
    };
  },
  created() {
    //localStorage.clear();
    console.log(getLocalStorage('user_id'))
    if(getLocalStorage('user_id') == null) {
      this.unlisted = true;
    } else {
      this.$axios.post("/api/userinfo",{
        id: getLocalStorage('user_id')
      }).then(res => {
        console.log(res)
        this.userData = res.data;
        this.unlisted = false;
        console.log(this.userData)
      })
      .catch(err=> {
        console.log(err)
      });
    }
  },
  methods: {
    out(){
      localStorage.clear();
      this.unlisted = true;
    },
    handleSelect(item) {
      console.log(item);
    },
    onSubmit(){
      var req_url; 
      if(this.activeName='登录') req_url = '/api/login';
      else req_url = '/api/register';
      this.$axios.post(req_url,{
        account: this.form.account,
        password: this.form.password,
      }).then(res => {
        console.log(res)
        if(res.data.status<0) {
          this.$message.error(res.data.message);
        } else {
          this.$message({
            message: this.activeName + '成功',
            type: 'success'
          });
          this.resetForm();
          this.panel_open=false;
          setLocalStorage('account',res.data[0].account);
          setLocalStorage('user_id',res.data[0]._id);
          setLocalStorage('user_name',res.data[0].user_name);
          setLocalStorage('intro',res.data[0].intro);
          setLocalStorage('user_url',res.data[0].user_url);
          this.unlisted = false;
        }
      })
      .catch(err=> {
        console.log(err)
      });
    },
    resetForm() { // 重置
      this.form.account='',
      this.form.password = ''
    },
    search(){
      // var route = this.$router.resolve({
      //     path:'/searchResult',
      //     query:{
      //         q:this.state
      //     }
      // })
      // window.open(route.href,'_blank')
    },
  }
};
</script>

<style lang="scss" scoped>
.nav {
  position: sticky;
  top: 0;
  box-sizing: border-box;
  z-index: 999999;
  min-width: 1200px;
  height: 61px;
  background-color: #fff;
  border-bottom: 1px solid #e6e6e6;
  .searchBtn {
    margin: 0px 10px;
    position: relative;
    top: 12px;
  }
}
.com {
  margin: 0 auto;
  position: relative;
  width: 1200px;
  align-items: center;
  .nav_logo {
    float: left;
    margin: 5px 0px;
  }
  .nav_logo_pic {
    height: 55px;
  }
  .nav_menu {
    margin: 0px 10px;
    display: inline-block;
    font-size: 15px;
    height: 60px;
    font-weight: 600;
  }
  .search {
    top: -25px;
    margin-left: 20px;
    width: 50%;
  }
  .search /deep/ .el-input-group__append {
    background-color: #fff;
  }
  .search /deep/ .el-icon-search:hover {
    color: #FEDF01;
  }
  .search /deep/ .el-input__inner {
    border-right: 0;
  }
  .search /deep/ .el-input-group__prepend {
    background-color: #fff;
    width: 80px;
  }
  .nav_message {
    float: right;
    margin: 11px 10px 11px 249px;
    font-size: 35px;
    color: #8daffc;
  }
  .nav_user {
    float: right;
    position: relative;
    margin: 11px 10px;
    &:hover {
      > img {
        transform: scale(1.5) translateY(7px);
      }
      > div {
        transition: all 0.5s;
        visibility: visible;
        opacity: 1;
      }
    }
  }
  .login_panel {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: center;
    z-index: 2041;
    .panel {
      display: inline-block;
      width: 420px;
      padding: 20px;
      vertical-align: middle;
      background-color: #fff;
      border-radius: 4px;
      border: 1px solid #EBEEF5;
      font-size: 18px;
      box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
      text-align: left;
      color: #0000;
      opacity: 1;
      z-index: 9999;
    }
  }
  .panel_bg {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: .5;
    background: #000;
  }
 
  .login_panel::after {
    content: "";
    display: inline-block;
    height: 100%;
    width: 0;
    vertical-align: middle;
  }
  .login_btn {
    float: right;
    position: relative;
    margin: 11px 10px;
    color:#FEDF01;
    line-height: 40px;
    cursor: pointer;
  }
  .login_btn:hover {
    color: #FDB274;
  }
  .user_avatar {
    width: 40px;
    height: 40px;
    border: 1px solid #99999940;
    border-radius: 50%;
    z-index: 29999;
    transition-duration: 0.5s;
    position: relative;
  }
  .user_panel {
    width: 250px;
    z-index: 0;
    background-color: #fff;
    position: absolute;
    transform: translateX(-85%) translateY(-10%);
    visibility: hidden;
    opacity: 0;
    transition: all 0.3s;
    border-radius: 2px;
    box-shadow: 0 0 4px #bbb;
    .get_user_nums {
      display: flex;
      flex-wrap: nowrap;
      justify-content: center;
      //border-bottom: 1px solid #eee;
      width: 100%;
      .nums_item {
        color: #636363;
        text-align: center;
        font-weight: normal;
				width: 50%;
        padding: 5px 15px;
        border-right: 1px solid #a8a8a8;
        &:last-child {
          border-right: none;
        }
      }
    }
    .user_border {
      border-bottom: 1px solid #eee;
      display: flex;
      justify-content: space-around;
    }
    .user_name {
      margin-top: 33px;
      font-size: 16px;
      font-weight: normal;
      text-align: center;
      margin-bottom: 14px;
    }
    .user_level {
      text-align: center;
      margin-bottom: 8px;
      color: #6fa9ff;
    }
    .use_info {
			margin-top: 10px; 
			text-align: center;
			width: 50%;
			display: inline-block;
      height: 30px;
      line-height: 30px;
      color: #636363;
      font-size: 12px;
      cursor: pointer;
      font-weight: normal;
			border-right: 1px solid #a8a8a8;
			border-top: 1px solid #eee;
			&:last-child {
				border-right: none;
				margin-left: -3.9px;
			}
      &:hover {
        background-color: #eee;
      }
    }
    .user_item {
      color: #999;
      font-size: 14px;
      padding: 2px 20px;
      font-weight: normal;
    }
  }
	.nav_add {
		margin: 14px 10px;
		float: right;
		.el-button {
			padding: 8px 10px;
		}
	}
}
</style>
