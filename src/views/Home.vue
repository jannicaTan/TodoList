<template>
  <div class="hello">
    <el-row class="bg_img" type="flex" justify="center">
      <img src="../assets/bg.jpeg" @click="toTomato()">
    </el-row>
    <div><h1 v-text="title" class="el-icon-ice-tea"></h1></div>
    <!-- 输入任务 -->
    <el-row class="input-btn" type="flex" justify="center">
      <el-col :span="8">
        <el-input
          prefix-icon="el-icon-edit"
          placeholder="请输入今日任务"
          v-model="taskName"
          clearable
        ></el-input>
      </el-col>
      <el-col :span="1" :offset="1">
        <el-button type="primary" @click="addTask()">Add</el-button>
      </el-col>
    </el-row>
    <el-row class="taskList" type="flex" justify="center">
      <!-- 今日任务 -->
      <el-col :span="8">
        <h3 class="el-icon-paperclip">今日任务：</h3>
        <check-table :items="items" @finish-row="finish" @to-move="move">
          <template v-slot:add-btn="select">
            <el-button size="mini" @click="checkMove(select)">
              批量添加
            </el-button>
            <el-button size="mini" @click="del(items, select)">
              批量删除
            </el-button>
          </template>
        </check-table>
      </el-col>
      <el-divider direction="vertical"></el-divider>
      <!-- 今日已完成 -->
      <el-col :span="8">
        <div class="finished">
          <h3 span class="el-icon-finished">今日已完成：</h3>
        </div>
        <check-table :items="finishList">
          <template v-slot:add-btn="select">
            <el-button size="mini" @click="del(finishList, select)">
              批量删除
            </el-button>
          </template>
        </check-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import CheckTable from "@/components/CheckTable";
export default {
  components: {
    CheckTable,
  },
  data() {
    return {
      title: "Let's Make A List For Today!",
      taskName: "",
      items: [],
      finishList: [],
    };
  },
  created() {
    let list = JSON.parse(sessionStorage.getItem("taskList"));
    let finishList = JSON.parse(sessionStorage.getItem("finishList"));
    if (list.length > 0 || finishList.length > 0) {
      this.items = list;
      this.finishList = finishList;
    }
  },
  methods: {
    toTomato() {
      this.$router.push({
        path:'/tomato',
      });
    },
    //添加任务
    addTask() {
      var id = new Date().getSeconds();
      this.items.push({
        label: this.taskName,
        isFinished: false,
        id: this.taskName + id,
      });
      this.taskName = "";
    },
    checkMove(a) {
      // filter筛选出符合条件的返回新数组，find用于搜索条件
      let { select } = a;
      console.log("select:", select);
      if (select.length > 0) {
        let selectList = select.map((item) => item.id);
        this.items = this.items.filter((item) => {
          return !selectList.includes(item.id);
          // return select.find((item1) => {
          //   return item.label != item1.label;
          // });
        });
        this.finishList = this.finishList.concat(select);
        this.finishList.map((item) => (item.isFinished = true));
      }
    },
    //批量删除——没想到如何同一个方法给两个组件都用，利用data代表此时的list,太繁琐
    del(data, a) {
      let { select } = a;
      console.log("select:", select);
      if (data == this.items) {
        if (select.length > 0) {
          // 利用map把选中的组合成一个数组，然后filter遍历出不包含的元素返回
          let selectList = select.map((item) => item.id);
          let items = this.items.filter((item) => {
            return !selectList.includes(item.id);
            // return !select.find((item1) => {
            //   return item.label === item1.label;
            // });
          });
          this.items = items;
          console.log(items);
        }
      } else if (data == this.finishList) {
        if (select.length > 0) {
          this.finishList = this.finishList.filter((item) => {
            return !select.find((item1) => {
              return item.id === item1.id;
            });
          });
        }
      }
    },
    //点击对勾按钮，改变任务状态
    finish(row) {
      this.finishList.push(row);
      this.items.filter((item) => item.isFinished == false);
    },
    move(row) {
      console.log(row);
    },
  },
  //有数据刷新进行更新存储
  beforeUpdate() {
    sessionStorage.setItem("taskList", JSON.stringify(this.items));
    sessionStorage.setItem("finishList", JSON.stringify(this.finishList));
  },
};
</script>

<style scoped>
h1 {
  font-weight: normal;
  display: flex;
  justify-content: center;
}
.bg_img {
  margin: 20px;
  height:350px;
}
.taskList {
  margin-top: 50px;
}
.el-divider--vertical {
  display: inline-block;
  width: 1px;
  height: 80vh;
  margin-right: 20px;
  vertical-align: middle;
}
.el-icon-ice-tea::before {
  color: aqua;
}
.finished {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.el-button--mini,
.el-button--mini.is-round {
  height: 30px;
}
</style>
