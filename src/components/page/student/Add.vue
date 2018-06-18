<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 问答管理</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/student' }"><i class="el-icon-menu"></i> 学生管理</el-breadcrumb-item>
                <el-breadcrumb-item>添加</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="form-box">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="学号" prop="studentno"  :rules="[
                    { required: true, message: '学号不能为空', trigger:'blur'},
                    ]">
                    <el-input v-model="form.studentno"></el-input>
                </el-form-item>
                <el-form-item prop="studentname" label="姓名">
                    <el-input type="text" v-model="form.studentname"></el-input>
                </el-form-item>
                <el-form-item prop="classes" label="班级">
                    <el-input type="text" v-model="form.classes"></el-input>
                </el-form-item>
                <el-form-item prop="email" label="邮箱">
                    <el-input type="text" v-model="form.email"></el-input>
                </el-form-item>
                <el-form-item prop="phone" label="电话">
                    <el-input type="text" v-model="form.phone"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">提交</el-button>
                    <el-button @click="clear('form')">取消</el-button>
                </el-form-item>
            </el-form>
        </div>

    </div>
</template>

<script>
    export default {
        data: function(){
            return {
                form: {
                    url: '/student/save',
                    studentno: '',
                    studentname: '',
                    email: '',
                    phone: '',
                    classes: ''
                }
            }
        },
        methods: {
            onSubmit() {
                this.$axios.post(this.form.url, this.$qs.stringify(
                    {
                        studentno: this.form.studentno,
                        studentname: this.form.studentname,
                        email: this.form.email,
                        phone: this.form.phone,
                        classes: this.form.classes
                    }
                )).then((res) => {
                    this.$message.success('提交成功！');
                    this.$router.push('/student');
                }).catch((err) => {
                    console.log(err);
                    this.$message.error('提交失败！');
                })
            },
            clear(val) {
                this.$refs[val].resetFields();
            }
        }
    }
</script>