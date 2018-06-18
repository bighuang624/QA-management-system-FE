<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 问答管理</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/customfaq' }"><i class="el-icon-menu"></i> 自定义问答管理</el-breadcrumb-item>
                <el-breadcrumb-item>编辑</el-breadcrumb-item>
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
                    geturl: '/customfaq/get',
                    saveurl: '/customfaq/update',
                    question: '',
                    answer: ''
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
                    self.form.question = v.question;
                    self.form.answer = v.answer;
                })
            },
            onSubmit() {
                this.$axios.post(this.form.saveurl, this.$qs.stringify({id:this.id, question:this.form.question, answer:this.form.answer})).then((res) => {
                    this.$router.push('/customfaq');
                    this.$message.success('保存成功！');
                })
            },
            clear() {
                this.getData();
            }
        }
    }
</script>