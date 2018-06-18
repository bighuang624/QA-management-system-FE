<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i>效果演示</el-breadcrumb-item>
                <el-breadcrumb-item>相似度计算</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="handle-box">
            <el-input v-model="question" @keyup.enter.native="search" placeholder="请输入问题" class="handle-input mr10"></el-input>
            <el-button type="primary" icon="search" @click="search">搜索</el-button>
        </div>
        <el-table v-loading="loading" :data="data" border style="width: 100%" >
            <el-table-column prop="similarity" label="相似度" sortable width="150">
            </el-table-column>
            <el-table-column prop="simiQuestion" label="问题" width="120">
            </el-table-column>
            <el-table-column prop="category" label="所属类别">
            </el-table-column>
            <el-table-column prop="segmentResult" label="分词结果" :formatter="formatter">
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                url: '/qa/getSimilarityEffect',
                tableData: [],
                cur_page: 1,
                question: '',
                questionSegment: '',
                loading : false,
            }
        },
        computed : {
            data() {
                return this.tableData;
            }
        },
        methods: {
            formatter(row, column) {
                return (row.segmentResult.join("   "));
            },
            search(){
                let self = this;
                if(process.env.NODE_ENV === 'development'){
                    self.url = '/qa/getSimilarityEffect';
                };
                if(self.question == "") {
                    this.$message.error('请输入问题');
                    return;
                }
                self.loading = true;
                self.$axios.post(self.url, self.$qs.stringify({question:self.question})).then((res) => {
                    console.log(res.data);
                    self.loading = false;
                    self.tableData = res.data;
                }).catch((err) => {
                    self.loading = false;
                    console.log(err)
                })

            },
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