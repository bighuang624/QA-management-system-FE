<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i>效果演示</el-breadcrumb-item>
                <el-breadcrumb-item>搜索引擎查找</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="handle-box">
            <el-input v-model="question" placeholder="请输入问题" class="handle-input mr10" @keyup.enter.native="search"></el-input>
            <el-button type="primary" icon="search" @click="search">搜索</el-button>
        </div>
        <el-table v-loading="loading" :data="data" border style="width: 100%" ref="multipleTable">
            <el-table-column prop="source" label="来源" width="150">
            </el-table-column>
            <el-table-column prop="score" label="得分" sortable width="120">
            </el-table-column>
            <el-table-column prop="title" label="标题">
            </el-table-column>
            <el-table-column prop="snippet" label="片段">
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination
                    @current-change ="handleCurrentChange"
                    layout="prev, pager, next"
                    :page-size="10"
                    :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                url: '/qa/getSearchEngineEffect',
                tableData: [],
                sumData:[],
                cur_page: 1,
                question: '',
                is_search: false,
                loading : false,
                total : 1
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
                    self.url = '/qa/getSearchEngineEffect';
                };
                if(self.question == '') {
                    self.$message.error('请输入问题');
                    return;
                }
                self.loading = true;
                self.$axios.post(self.url, self.$qs.stringify({question:self.question})).then((res) => {
                    self.sumData = res.data;
                    self.total = res.data.length;
                    self.tableData = self.sumData.slice(0, self.sumData.length > 10 ? 10 : self.sumData.length);
                    self.loading = false;
                }).catch((err) => {
                    self.loading = false;
                    console.log(err);
                });
            },
            handleCurrentChange(val) {
                this.cur_page = val;
                this.tableData = this.sumData.slice((val-1) * 10, (val) * 10);
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