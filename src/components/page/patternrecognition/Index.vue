<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 问答管理</el-breadcrumb-item>
                <el-breadcrumb-item>模式识别问答库管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="handle-box">
            <el-button type="primary" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button>
            <el-button type="primary" icon="add" @click="add">添加</el-button>
            <el-select v-model="select_cate" placeholder="筛选类别" class="handle-select mr10">
                <el-option key="1" label="模式识别" value="模式识别"></el-option>
                <el-option key="2" label="聚类分析" value="聚类分析"></el-option>
                <el-option key="3" label="基于统计决策的概率分类法" value="基于统计决策的概率分类法"></el-option>
                <el-option key="4" label="特征选择与特征提取" value="特征选择与特征提取"></el-option>
                <el-option key="5" label="句法模式识别" value="句法模式识别"></el-option>
                <el-option key="6" label="模糊模式识别法" value="模糊模式识别法"></el-option>
                <el-option key="7" label="神经网络模式识别法" value="神经网络模式识别法"></el-option>
            </el-select>
            <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>
            <el-button type="primary" icon="search" @click="search">搜索</el-button>
        </div>
        <el-table :data="data" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="question" label="问题" width="120"></el-table-column>
            <el-table-column prop="answer" label="答案" width=""></el-table-column>
            <el-table-column prop="category" label="类别" width="120"></el-table-column>
            <el-table-column prop="value" label="匹配次数" width="100"></el-table-column>
            <el-table-column prop="date" label="日期" sortable width="120"></el-table-column>
            <el-table-column label="操作" width="150">
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
      url: "/qapair/list",
      tableData: [],
      cur_page: 1,
      multipleSelection: [],
      select_cate: "",
      select_word: "",
      del_list: [],
      is_search: false
    };
  },
  created() {
    this.getData();
  },
  computed: {
    data() {
      const self = this;
      return self.tableData.filter(function(d) {
        let is_del = false;
        for (let i = 0; i < self.del_list.length; i++) {
          if (d.question === self.del_list[i].question) {
            is_del = true;
            break;
          }
        }
        if (!is_del) {
            if ( (d.answer.indexOf(self.select_word) > -1 || d.question.indexOf(self.select_word) > -1)) {
                if(self.select_cate) {
                    if(d.category == (self.select_cate)){
                        return d;
                    }
                    return;
                }
                return d;
            }
        }
      });
    }
  },
  methods: {
    handleCurrentChange(val) {
      this.cur_page = val;
      this.getData();
    },
    getData() {
      let self = this;
      if (process.env.NODE_ENV === "development") {
        self.url = "/qapair/list";
      }
      self.$axios.post(self.url, self.$qs.stringify({ page: self.cur_page })).then(res => {
        self.tableData = res.data;
      });
    },
    search() {
      this.is_search = true;
      // if(this.select_word != "") {
      //   this.$axios.post('/qapair/like', this.$qs.stringify({ page: this.cur_page })).then(res => {
      //       this.tableData = res.data;
      //   });
      // }
    },
    filterTag(value, row) {
      return row.tag === value;
    },
    handleEdit(index, row) {
      this.$message("编辑第" + (index + 1) + "行");
      this.$router.push('/patternrecognition/edit/'+row.id);
    },
    handleDelete(index, row) {
      this.$axios.post('/qapair/delete', this.$qs.stringify({id:row.id})).then((res) => {
          this.$message.error('删除第'+(index+1)+'行');
          this.tableData = this.tableData.filter(t=>t.id != row.id);
      });
    },
    add() {
        this.$router.push('/patternrecognition/add');
    },
    delAll() {
      const self = this,
        length = self.multipleSelection.length;
      let str = "";
      self.del_list = self.del_list.concat(self.multipleSelection);
      for (let i = 0; i < length; i++) {
        str += self.multipleSelection[i].question + " ";
      }
      self.$message.error("删除了" + str);
      self.multipleSelection = [];
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  }
};
</script>

<style scoped>
.handle-box {
  margin-bottom: 20px;
}
.handle-select {
  width: 120px;
}
.handle-input {
  width: 300px;
  display: inline-block;
}
</style>