<template>
  <div class="wrapper">
    <h3>创建商品信息</h3>
    <el-form ref="form" :rules="rules" :model="form" label-width="80px">
      <el-form-item label="商品名称" prop="name">
        <el-col :span="12">
          <el-input v-model="form.name" />
        </el-col>
      </el-form-item>
      <el-form-item label="商品类型" prop="kinds">
        <el-col :span="12">
          <el-select v-model="form.kinds" placeholder="请选择活动区域">
            <el-option label="技能" value="skill" />
            <el-option label="理财" value="investment" />
            <el-option label="生活" value="live" />
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item label="活动形式" prop="desc">
        <el-col :span="12">
          <el-input type="textarea" v-model="form.desc"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="首页logo" prop="indexImageUrl">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="form.indexImageUrl" :src="form.indexImageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item label="商品封面" prop="itemLogo">
        <el-upload
          class="avatar-uploader"
          action="http://127.0.0.1:5000/image/upload"
          :headers="headers"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="form.itemLogo" :src="form.itemLogo" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
 
      <el-form-item>
        <el-button type="primary" @click="onSubmit('form')">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getToken } from '../../utils/auth';
export default {
  name: "FillInfo",
  computed: {
    headers: function() {
      return {
        Authorization: `Bearer ${getToken()}`
      }
    } 
  },
  data() {
    return {
      form: {
        name: '',
        kinds: '',
        desc: '',
        indexImageUrl: '',
        itemLogo: '',
      },
      rules: {
        name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' },
        ],
        kinds: [
          { required: true, message: '请选择商品类型', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请填写商品描述', trigger: 'blur' }
        ],
        indexImageUrl: [
          { required: true, message: '请上传图片', trigger: 'blur' }
        ],
        itemLogo: [
          { required: true, message: '请上传图片', trigger: 'blur' }
        ]
      },
    }
  },
  methods: {
    onSubmit(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      console.log(file)
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isLt2M;
    }
  }
}
</script>

<style lang="scss">

.el-col-2 {
  text-align: center;
}
.wrapper {
  margin-left: 30px;

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }
}
</style>