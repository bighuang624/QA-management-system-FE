<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i>效果演示</el-breadcrumb-item>
                <el-breadcrumb-item>百科知识库演示</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="handle-box">
            <el-input v-model="question" @keyup.enter.native="search" placeholder="问题" class="handle-input mr10"></el-input>
            <el-button type="primary" icon="search" @click="search">搜索</el-button>
            <el-tag v-show="showKeyword" size="medium">关键词： {{keyword}}</el-tag>
        </div>
        <el-table v-loading="loading" :data="data" border style="width: 100%">
            <el-table-column prop="source" label="来源" sortable width="150"></el-table-column>
            <el-table-column prop="answer" label="定义"></el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                url: '/qa/getBaikeKnowledgeEffect',
                getkeywordurl: '/qa/getKeyWord',
                tableData: [],
                cur_page: 1,
                select_cate: '',
                question: '',
                showKeyword: false,
                keyword: '',
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
                if(self.question == "") {
                    self.$message.error('请输入需要查询的定义类问题');
                    return;
                }
                self.showKeyword =true;
                if(process.env.NODE_ENV === 'development'){
                    self.url = '/qa/getBaikeKnowledgeEffect';
                };
                self.$axios.post(self.getkeywordurl, self.$qs.stringify({question:self.question})).then((res) => {
                    self.keyword = res.data;
                });
                self.loading = true;
                self.$axios.post(self.url, self.$qs.stringify({question:self.question})).then((res) => {
                    self.tableData = res.data;
                    self.loading = false;
                }).catch((err) => {
                    console.log(err);
                    self.loading = false;
                })
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