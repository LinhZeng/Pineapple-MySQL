<template>
  <div class="addpic">
    <Nav></Nav>
    <div class="main">
      <textarea class="title" v-model="title" placeholder="请输入标题（不超过15个字）" maxlength="15"></textarea>
      <div class="tag_checkbox">
        请选择至少一个分类：
        <el-checkbox-group v-model="checkedTags" size="small">
          <el-checkbox border v-if="item.id!=1" v-for="item in tags" :key="item.id" :label="item.id">{{ item.name }}</el-checkbox>
        </el-checkbox-group>
      </div>
      <el-input class="description" type="textarea" placeholder="描述该作品（不超过200字）" v-model="description" maxlength="200" show-word-limit rows="9"></el-input>
			<div class="pic_way">
        <el-input class="pic_url" placeholder="作品链接" v-model="imageUrl"></el-input>
        <div class="pic_word">输入作品链接或选择上传作品文件</div>
        <el-upload class="upload_img" drag action="string" :auto-upload="false" :show-file-list="false" :on-change="imgchange">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <div v-else>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          </div>
          <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </div>
			<div>
				<el-button type="primary" @click="onSubmit">确定</el-button>
        <el-button @click="isPsw = false">返回</el-button>
			</div>
		</div>
  </div>
</template>

<script>
import Nav from "../components/nav";
import {getLocalStorage} from "../utils/auth";
export default {
  name: "addpic",
  data() {
    return {
      title: "",
      tags: [],
      checkedTags: [],
			description: "",
			imageUrl: ''
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
      this.$axios.post("/common/workupload", formData, config).then((res)=> {
        var urlname=`http://localhost:3000/attchments/work/${res.result.url}`;
        this.imageUrl = urlname;
      })
    },
    onSubmit() {
      console.log(this.checkedTags)
      this.$axios.post("/work/addwork",{
        name: this.title,
        description: this.description,
        src: this.imageUrl,
        userId: getLocalStorage('user_id'),
        type: this.checkedTags,
      }).then(res => {
        console.log(res)
        this.$message({
            message: '发布成功',
            type: 'success'
        });
        this.$router.back();
      })
      .catch(err=> {
        console.log(err)
      });
    }
  },
  created(){
    this.$axios.post("/work/taglist",{
    }).then(res => {
      this.tags = res.data.result.list;
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
.main {
  width: 1200px;
  margin: 20px auto;
  background-color: #ffffff;
  width: 1200px;
  padding: 20px;
  padding-bottom: 30px;
  .title {
    height: 44px;
    display: block;
    width: 100%;
    border: 0;
    font-family: "Arial";
    font-size: 30px;
    font-weight: 600;
    line-height: 1.4;
    outline: none;
    -webkit-box-shadow: none;
    box-shadow: none;
    resize: none;
  }
  .tag_checkbox {
    margin: 20px 0px;
    font-size: 15px;
    .el-checkbox-group {
      margin-top: 10px;
    }
    .el-checkbox {
      margin-right: 10px;
    }
  }
	.description {
		display: inline-block;
		width: 40%; 
		vertical-align: top;
    margin-right: 50px;
    font-size: 19px;
  }
  .pic_way{
    display: inline-block;
  }
  .pic_url {
    display: inline-block;
		width: 360px; 
		vertical-align: top;
  }
  .pic_word{
    margin: 10px 0px;
  }
	.upload_img {
		display: inline-block;
	}
	.upload_img {
		display: inline-block;
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
    /deep/ .el-upload-dragger {
      width: 200px;
      min-height: 184px;
      height: auto;
    }
	}
	.avatar {
		width: 200px;
		//height: 150px;
		display: block;
	}
}
</style>