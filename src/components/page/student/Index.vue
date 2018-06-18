<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 问答管理</el-breadcrumb-item>
                <el-breadcrumb-item>学生管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="handle-box">
            <el-button type="primary" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button>
            <el-button type="primary" icon="add" @click="add">添加</el-button>
            <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>
            <el-button type="primary" icon="search" @click="search">搜索</el-button>
        </div>
        <el-table :data="data" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="studentno" label="学号" width="150"></el-table-column>
            <el-table-column prop="studentname" label="姓名" ></el-table-column>
            <el-table-column prop="classes" label="班级"></el-table-column>
            <el-table-column prop="email" label="Email"></el-table-column>
            <el-table-column prop="phone" label="电话"></el-table-column>
            <el-table-column label="操作" width="180">
                <template scope="scope">
                    <el-button size="small"
                            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="small" type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
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
                url: '/student/list',
                tableData: [],
                cur_page: 1,
                multipleSelection: [],
                select_word: '',
                del_list: [],
                is_search: false
            }
        },
        created(){
            this.getData();
        },
        computed: {
            data(){
                const self = this;
                return self.tableData.filter(function(d){
                    let is_del = false;
                    for (let i = 0; i < self.del_list.length; i++) {
                        if(d.studentno === self.del_list[i].studentno){
                            is_del = true;
                            break;
                        }
                    }
                    if(!is_del){
                        if( (d.studentname.indexOf(self.select_word) > -1 ||
                            d.studentno.indexOf(self.select_word) > -1)){
                            return d;
                        }
                    }
                })
            }
        },
        methods: {
            handleCurrentChange(val){
                this.cur_page = val;
                this.getData();
            },
            getData(){
                let self = this;
                if(process.env.NODE_ENV === 'development'){
                    self.url = '/student/list';
                };
                self.$axios.post(self.url, self.$qs.stringify({ 'page': self.cur_page})).then((res) => {
                    console.log(res.data);
                    self.tableData = res.data;
                }).catch((err) => {
                    console.log(err)
                })
            },
            search(){
                this.is_search = true;
            },
            formatter(row, column) {
                return row.answer;
            },
            filterTag(value, row) {
                return row.tag === value;
            },
            handleEdit(index, row) {
                this.$message('编辑第'+(index+1)+'行');
                this.$router.push('/student/edit/'+row.id);
            },
            handleDelete(index, row) {
                this.$axios.post('/student/delete', this.$qs.stringify({id:row.id})).then((res) => {
                    this.$message.error('删除第'+(index+1)+'行');
                    this.tableData = this.tableData.filter(t=>t.id != row.id);
                });
            },
            add() {
                this.$router.push('/student/add');
            },
            delAll(){
                const self = this,
                    length = self.multipleSelection.length;
                let str = '';
                self.del_list = self.del_list.concat(self.multipleSelection);
                for (let i = 0; i < length; i++) {
                    this.$axios.post('/student/delete', this.$qs.stringify({id:self.multipleSelection[i].id})).then((res) => {
                        str += self.multipleSelection[i].studentno + ' ';
                    });
                }
                self.$message.error('删除了'+str);
                self.multipleSelection = [];
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
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