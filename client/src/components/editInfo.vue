<template>
  <div class="editinfo">
    <Nav></Nav>
    <div class="main">
      <div class="user_info">
        <el-upload
          class="avatar-uploader"
          accept="image/jpeg,image/jpg,image/png"
          action="string"
          :auto-upload="false"
          :show-file-list="false"
          :on-change="imgchange"
        >
          <img :src="author.user_url" class="avatar" />
          <i class="el-icon-camera-solid avatar-uploader-icon">
            <span>修改头像</span>
          </i>
        </el-upload>
      </div>
      <div class="info_edit" v-if="!isPsw">
        <el-form class="userinfo-form" ref="author" :model="author" label-width="80px">
					<el-form-item label="账号">
						<span class="unedited">{{author.account}}</span>
          </el-form-item>
          <el-form-item label="昵称">
            <el-input v-model="author.user_name"></el-input>
          </el-form-item>
          <el-form-item label="简介">
            <el-input v-model="author.intro" type="textarea" :rows="3"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="edit_btn" icon="el-icon-edit" @click="isPsw=true">修改密码</el-button>
            <el-button type="primary" @click="onSubmit">确定</el-button>
            <el-button @click="$router.back()">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
			<div class="info_edit" :hidden="!isPsw">
				<el-form :model="ruleform" class="userinfo-form" status-icon :rules="rules" ref="ruleform" label-width="80px">
					<el-form-item label="原密码" prop="oldpsw">
						<el-input type="password" v-model="ruleform.oldpsw" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="newpsw">
            <el-input type="password" v-model="ruleform.newpsw" autocomplete="off"></el-input>
          </el-form-item>
					<el-form-item>
            <el-button type="primary" @click="onSubmit">确定</el-button>
            <el-button @click="back">返回</el-button>
          </el-form-item>
				</el-form>
			</div>
    </div>
  </div>
</template>

<script>
import Nav from "../components/nav";
import {getLocalStorage} from "../utils/auth";
export default {
  name: "editinfo",
  data() {
    var validatePass = (rule,value,callback) => {
      if(value==='') {
        callback(new Error('请输入原密码'))
      } else {
        this.$axios.post("/user/login",{ 
          account: getLocalStorage('account'),
          password: value
        }).then(res => {
          console.log(res)
         if(res.code < 0) {
            callback(new Error('密码错误'))
          } else callback()
        }).catch(err => {
          console.log(err);
        })
      }
    };
    var validatePass2 = (rule,value,callback) => {
      if(value==='') {
        callback(new Error('请输入新密码'))
      } else callback()
    };
    return {
      author: {},
			isPsw: false,
			ruleform: {
				oldpsw: '',
				newpsw: ''
      },
      rules: {
        oldpsw: [{ validator: validatePass, trigger: 'blur' }],
        newpsw: [{ validator: validatePass2, trigger: 'blur' }]
      }
    };
  },
  methods: {
    imgchange(file) {
      var formData = new FormData()
      formData.append("file", file.raw)
      var config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
      this.$axios.post("/common/avatarupload", formData, config).then((res)=> {
        var urlname=`http://localhost:3000/attchments/avatar/${res.result.url}`;
        this.author.user_url = urlname;
      })
    },
    onSubmit() {
      if(this.isPsw) {
        this.$refs['ruleform'].validate((valid)=> {
          if(valid) {
            this.$axios.post("/user/editpsw",{ 
              id: getLocalStorage('user_id'),
              password: this.ruleform.newpsw
            }).then(res => {
              this.isPsw = false;
              this.$message({
                message: '修改密码成功',
                type: 'success'
              });
            }).catch(err=>{
              console.log(err)
              this.$message.error('修改密码失败')
            })
          }
          else this.$message.error('修改密码失败')
        })
      } else {
        this.$axios.post("/user/editinfo",{ 
          id: getLocalStorage('user_id'),
          user_name: this.author.user_name,
          user_url: this.author.user_url,
          intro: this.author.intro,
        }).then(res => {
          if(res.code>0){
            this.$message({
              message: '修改成功',
              type: 'success'
            });
          } else {
            this.$message.error(res.msg)
          }
        })
      }
    },
    back() {
      this.ruleform = {
        oldpsw: '',
				newpsw: ''
      }
      this.isPsw = false;
    }
  },
  created() {
    this.$axios.post("/user/userinfo",{ 
      id: getLocalStorage('user_id')
    }).then(res => {
      this.author = res.result
      console.log(this.author)
    })
    .catch(err=> {
      console.log(err)
    });
  },
  components: {
    Nav
  }
};
</script>

<style lang="scss" scoped>
.editinfo /deep/ .nav {
  min-width: 95%;
}
.editinfo /deep/ .com {
  width: 95%;
}
.main {
  //width: 1200px;
  margin: 20px auto;
  .user_info {
		z-index:1;
    margin: 0px 20px;
    background: #fff;
    margin-top: 66px;
    position: relative;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.02), 0 4px 8px 0 rgba(0, 0, 0, 0.02);
    height: 130px;
    padding-left: 180px;
    .avatar-uploader {
      position: absolute;
      left: 15px;
      top: -40px;
      margin-bottom: 10px;
      /deep/ .el-upload {
        border: 2px solid #fff;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
      }
      .el-upload:hover {
        border-color: #8daffc;
      }
    }
    .avatar-uploader-icon {
      font-size: 30px;
      color: #8c939d;
      width: 150px;
      height: 150px;
      line-height: 150px;
      text-align: center;
      position: absolute;
      z-index: 999999;
      top: 0px;
      left: 0px;
      background-color: #1a1a1a;
      opacity: 0.4;
      span {
        position: absolute;
        font-size: 15px;
        top: 26px;
        left: 45px;
      }
    }
    .avatar {
      width: 150px;
      height: 150px;
      display: block;
    }
  }
  .info_edit {
    margin: 0px 20px;
    background: #fff;
    border-top: 1px solid #ededed;
    padding: 20px 0px;
    .el-form-item__content {
      width: 30%;
    }
		.unedited {
			color: #999;
		}
  }
  .info_edit /deep/ .el-form-item__content {
      width: 50%;
  }
}
</style>