<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 问答管理</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/customfaq' }"><i class="el-icon-menu"></i> 自定义问答管理</el-breadcrumb-item>
                <el-breadcrumb-item>添加</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="form-box">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="问题">
                    <el-input v-model="form.question"></el-input>
                </el-form-item>
                <el-form-item label="答案">
                    <el-input type="textarea" v-model="form.answer"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">提交</el-button>
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
                    url: '/customfaq/save',
                    question: '',
                    answer: ''
                }
            }
        },
        methods: {
            onSubmit() {
                this.$axios.post(this.form.url, this.$qs.stringify({question:this.form.question, answer:this.form.answer})).then((res) => {
                    this.$message.success('提交成功！');
                    this.$router.push('/customfaq');
                }).catch((err) => {
                    console.log(error);
                    this.$message.error('提交失败！');
                })
            },
            clear() {
                this.form.question='';
                this.form.answer='';
            }
        }
    }
</script>