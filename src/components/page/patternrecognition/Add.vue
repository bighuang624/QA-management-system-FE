<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 问答管理</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/patternrecognition'}"><i class="el-icon-menu"></i> 模式识别问答库管理</el-breadcrumb-item>
                <el-breadcrumb-item>添加</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="form-box">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="问题" prop="question">
                    <el-input v-model="form.question"></el-input>
                </el-form-item>
                <el-form-item label="答案" prop="answer">
                    <el-input type="textarea" v-model="form.answer"></el-input>
                </el-form-item>
                <el-form-item label="类别" prop="category">
                    <el-select v-model="form.category" placeholder="请选择">
                        <el-option key="1" label="模式识别" value="模式识别"></el-option>
                        <el-option key="2" label="聚类分析" value="聚类分析"></el-option>
                        <el-option key="3" label="基于统计决策的概率分类法" value="基于统计决策的概率分类法"></el-option>
                        <el-option key="4" label="特征选择与特征提取" value="特征选择与特征提取"></el-option>
                        <el-option key="5" label="句法模式识别" value="句法模式识别"></el-option>
                        <el-option key="6" label="模糊模式识别法" value="模糊模式识别法"></el-option>
                        <el-option key="7" label="神经网络模式识别法" value="神经网络模式识别法"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="匹配次数" prop="value" :rules="[
                    { required: true, message: '匹配次数不能为空'},
                    { type: 'number', message: '匹配次数必须为数字值'}
                    ]"
                >
                <el-input v-model.number="form.value" auto-complete="off"></el-input></el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">提交</el-button>
                    <el-button @click="cancle('form')">重置</el-button>
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
                    url: '/qapair/save',
                    question: '',
                    answer: '',
                    category:'',
                    value:0,
                }
            }
        },
        methods: {
            onSubmit() {
                this.$axios.post(this.form.url, this.$qs.stringify({
                    question:this.form.question, 
                    answer:this.form.answer,
                    category:this.form.category,
                    value:this.value
                    })).then((res) => {
                        this.$router.push('/recognition');
                        this.$message.success('提交成功！');
                }).catch((err) => {
                    console.log(error);
                    this.$message.error('提交失败！');
                })
            },
            cancle(val) {
                this.$refs[val].resetFields();
            }
        }
    }
</script>   