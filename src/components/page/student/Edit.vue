<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 问答管理</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/student' }"><i class="el-icon-menu"></i>学生管理</el-breadcrumb-item>
                <el-breadcrumb-item>编辑</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="form-box">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="学号">
                    <el-input v-model="form.studentno"></el-input>
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input type="textarea" v-model="form.studentname"></el-input>
                </el-form-item>
                <el-form-item prop="email" label="邮箱" :rules="[
                    { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
                    ]">
                    <el-input type="textarea" v-model="form.email"></el-input>
                </el-form-item>
                <el-form-item label="电话">
                    <el-input type="textarea" v-model="form.phone"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">保存</el-button>
                    <el-button @click="clear">取消</el-button>
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
                    geturl: '/student/get',
                    saveurl: '/student/update',
                    studentno: '',
                    studentname: '',
                    email: '',
                    phone: ''
                }
            }
        },
        props:['id'],
        created() {
            this.getData();
        },
        methods: {
            getData(){
                let self = this;
                self.$axios.post(self.form.geturl, self.$qs.stringify({id:self.id})).then((res) => {
                    let v = res.data;
                    self.form.studentno = v.studentno;
                    self.form.studentname = v.studentname;
                    self.form.email = v.email;
                    self.form.phone = v.phone;
                })
            },
            onSubmit() {
                this.$axios.post(this.form.saveurl, this.$qs.stringify({
                    id:this.id,
                    studentno:this.form.studentno, 
                    studentname:this.form.studentname,
                    email:this.form.email,
                    phone:this.form.phone
                    })).then((res) => {
                    this.$router.push('/student');
                    this.$message.success('保存成功！');
                })
            },
            clear() {
                this.getData();
            }
        }
    }
</script>