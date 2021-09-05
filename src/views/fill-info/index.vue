<template>
  <div class="wrapper">
    <h3>创建卡片信息</h3>
    <el-form ref="form" :rules="rules" :model="form" label-width="80px">
      <el-form-item label="名称" prop="title">
        <el-col :span="12">
          <el-input v-model="form.title" />
        </el-col>
      </el-form-item>
      <el-form-item label="类型" prop="type">
        <el-col :span="12">
          <el-select v-model="form.type" placeholder="请选择活动区域">
            <el-option label="技能" value="skill" />
            <el-option label="理财" value="investment" />
            <el-option label="生活" value="live" />
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item label="活动形式" prop="rich_text">
        <el-col :span="12">
          <el-input type="textarea" v-model="form.rich_text"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="首页logo" prop="index_logo">
        <el-upload
          class="avatar-uploader"
          action="https://api.lixu365.com/image/upload"
          :headers="headers"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="form.index_logo" :src="form.index_logo" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item label="商品封面" prop="item_logo">
        <el-upload
          class="avatar-uploader"
          action="https://api.lixu365.com/image/upload"
          :headers="headers"
          :show-file-list="false"
          :on-success="handleItemLogoSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="form.item_logo" :src="form.item_logo" class="avatar">
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
import { createData, modifyData, queryPageDataDetail } from '../../api/user'
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
        title: '',
        type: '',
        rich_text: '',
        index_logo: '',
        item_logo: '',
      },
      rules: {
        title: [
          { required: true, message: '请输入商品名称', trigger: 'blur' },
        ],
        type: [
          { required: true, message: '请选择商品类型', trigger: 'change' }
        ],
        rich_text: [
          { required: true, message: '请填写商品描述', trigger: 'blur' }
        ],
        index_logo: [
          { required: true, message: '请上传图片', trigger: 'blur' }
        ],
        itemLogo: [
          { required: true, message: '请上传图片', trigger: 'blur' }
        ]
      },
    }
  },
  async mounted() {
    const { item_id } = this.$route.query;
    this.item_id = item_id;
    if (item_id) {
      try {
        const res = await queryPageDataDetail({ item_id });
        if (res.code === 1) {
          const { item_logo, rich_text, title, type, index_logo } = res.data || {}
          this.form = { item_logo, rich_text, title, type, index_logo };
        }
      } catch (error) {
        console.log(error);
      }
    }
  },
  methods: {
    onSubmit(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          (this.item_id ? modifyData({...this.form, item_id: this.item_id}) :
            createData(this.form)).then(res => {
            if (res.code === 1) {
              this.$message({
                message: this.item_id ? '修改成功': '创建成功',
                type: 'success'
              });
              this.$router.push('page-list');
            } else {
              this.$message.error(this.item_id ? '修改失败': '创建失败');
            }
          }).catch(err => {
            console.log(err);
          })
        }
      });
    },
    handleAvatarSuccess(res) {
      if (res.code === 1) {
        const { data } = res;
        this.form['index_logo'] = data.imageUrl;
        this.$message({
          message: '上传成功',
          type: 'success'
        });
      } else {
        this.$message.error('上传失败');
      }
    },
    handleItemLogoSuccess(res2) {
      if (res2.code === 1) {
        const { data: { imageUrl = '' } } = res2;
        this.form['item_logo'] = imageUrl;
        this.$message({
          message: '上传成功',
          type: 'success'
        });
      } else {
        this.$message.error('上传失败');
      }
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

<style scoped lang="scss">

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