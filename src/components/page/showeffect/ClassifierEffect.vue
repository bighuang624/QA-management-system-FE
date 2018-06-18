<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i>效果演示</el-breadcrumb-item>
                <el-breadcrumb-item>问题分类效果</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="handle-box">
            <el-input v-model="question" @keyup.enter.native="search" placeholder="请输入问题" class="handle-input mr10"></el-input>
            <el-button type="primary" icon="search" @click="search">搜索</el-button>
        </div>
        <el-table v-loading="loading" :data="data" border style="width: 100%" ref="multipleTable">
            <el-table-column prop="category" label="类别" width="150">
            </el-table-column>
            <el-table-column prop="categoryProbability" label="概率" sortable width="120">
            </el-table-column>
            <el-table-column prop="simiQuestion" label="最相似问题">
            </el-table-column>
            <el-table-column prop="similarity" label="相似度">
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                url: '/qa/getClassifierEffect',
                tableData: [],
                question: '',
                loading : false
            }
        },
        computed: {
            data(){
                return this.tableData;
            }
        },
        methods: {
            search(){
                let self = this;
                if(process.env.NODE_ENV === 'development'){
                    self.url = '/qa/getClassifierEffect';
                };
                if(self.question == "") {
                    this.$message.error('请输入要查询的问题');
                    return;
                }
                self.loading = true;
                self.$axios.post(self.url, self.$qs.stringify({question:self.question})).then((res) => {
                    console.log(res.data);
                    self.loading = false;
                    self.tableData = res.data;
                }).catch((err) => {
                    self.loading = false;
                    console.log(err);
                });
            }
            
        }
    }
</script>

<style scoped>
.handle-box{
    margin-bottom: 20px;
}
.handle-select{
    width: 120px;
}
.handle-input{
    width: 300px;
    display: inline-block;
}
</style>