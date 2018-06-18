<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i>效果演示</el-breadcrumb-item>
                <el-breadcrumb-item>聚类效果</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="handle-box">
            <el-row :gutter="24">
                <el-col :span="11">
                    <el-input v-model="question" @keyup.enter.native="search" placeholder="请输入问题" class="handle-input mr10"></el-input>
                    <el-button type="primary" icon="search" @click="search">搜索</el-button>
                </el-col>
                <el-col :span="3" class="clusterLabel" :push="1">
                    <span>聚类数:</span>
                </el-col>
                <el-col :span="10">
                    <el-slider v-model="clusterNum" label="聚类数" input-size="small" :min="5" :max="20" show-input></el-slider>
                </el-col>
            </el-row>
        </div>
        <el-row :gutter="24">
            <el-col :span="12"><div class="grid-content bg-purple">问题聚类</div></el-col>
            <el-col :span="12"><div class="grid-content bg-purple">答案聚类</div></el-col>
            <el-col :span="12">
                <el-table :data="questionTableData" v-loading="loadingQuesiton" border style="width: 100%">
                    <el-table-column type="expand">
                        <template slot-scope="props">
                            <el-form label-position="left" inline class="demo-table-expand">
                                <el-form-item label="问题">
                                    <li v-for="item in props.row.items">
                                       {{ item }}
                                    </li>
                                </el-form-item>
                            </el-form>
                        </template>
                    </el-table-column>
                    <el-table-column header-align="center" type="index" label="类别" width="100"></el-table-column>
                    <el-table-column label="总数" width="100" prop="itemNum">
                    </el-table-column>
                    <el-table-column label="问题" prop="items" :formatter="formatter">
                    </el-table-column>
                </el-table>
            </el-col>
            <el-col :span="12">
                <el-table :data="answerTableData" v-loading="loadingAnswer" border style="width: 100%">
                    <el-table-column type="expand">
                        <template slot-scope="props">
                            <el-form label-position="left" inline class="demo-table-expand">
                                <el-form-item label="答案">
                                    <li v-for="item in props.row.items">
                                       {{ item }}
                                    </li>
                                </el-form-item>
                            </el-form>
                        </template>
                    </el-table-column>
                    <el-table-column header-align="center" type="index" label="类别" width="100"></el-table-column>
                    <el-table-column label="总数" width="100" prop="itemNum">
                    </el-table-column>
                    <el-table-column label="答案" prop="items" :formatter="formatter">
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <div class="pagination">
            <el-pagination
                    @current-change ="handleCurrentChange"
                    layout="prev, pager, next"
                    :total="1000">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                // customQuestionClusterUrl: '/qa/clusterCustomQuestion',
                // customAnswerClusterUrl: '/qa/clusterCustomAnswer',
                // questionClusterUrl: '/qa/clusterQuestion',
                // answerClusterUrl: '/qa/clusterAnswer',
                questionClusterUrl: '/qa/clusterCustomQuestion',
                answerClusterUrl: '/qa/clusterCustomAnswer',
                // clusterAnswerClusterUrl: '/qa/getClusterAnswerEffect',
                questionTableData: [],
                answerTableData: [],
                cur_page: 1,
                question: '',
                clusterNum: 10,
                loadingQuesiton: false,
                loadingAnswer: false,
            }
        },
        computed: {
            questionClusterData(){
                return self.questionTableData;
            },
            answerClusterData() {
                return self.answerTableData;
            }
        },
        methods: {
            handleCurrentChange(val){
                this.cur_page = val;
            },
            formatter(row, index) {
                if(row.items[0].length > 50)
                    return row.items[0].substring(0, 50) + '...';
                return row.items[0];
            },
            search(){
                let self = this;
                if(self.question == "") {
                    self.$message.error("请输入要查询的问题");
                    return;
                }
                self.loadingQuesiton = true;
                self.loadingAnswer = true;
                self.$axios.post(self.questionClusterUrl, self.$qs.stringify({question:self.question, 
                clusterNum:self.clusterNum, classify:true})).then((res) => {
                    self.questionTableData = res.data;
                    self.loadingQuesiton = false;
                }).catch((err) => {
                    console.log(err);
                    self.loadingQuesiton = false;
                });
                self.$axios.post(self.answerClusterUrl, self.$qs.stringify({question:self.question, 
                clusterNum:self.clusterNum,classify:true})).then((res) => {
                    self.answerTableData = res.data;
                    self.loadingAnswer = false;
                }).catch((err) => {
                    console.log(err);
                    self.loadingAnswer = false;
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

.el-row {
    margin-bottom: 20px;
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
    text-align: center;
    height: 40px;
    line-height: 40px;;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .clusterLabel {
      margin-top: 5px;
  }
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    /* width: 90px; */
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
      padding-left: 5px;
    margin-right: 0;
    margin-bottom: 0;
    width: 100%;
  }

</style>