<template>
  <div class="hello">
    <el-row class="bg_img" type="flex" justify="center">
      <img src="../assets/bg.jpeg" />
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
      <el-col :span="1" :offset="1"
        ><el-button type="primary" @click="addTask()">Add</el-button></el-col
      >
    </el-row>
    <el-row class="taskList" type="flex" justify="center">
      <!-- 今日任务 -->
      <el-col :span="8">
        <h3 class="el-icon-paperclip">今日任务：</h3>
        <check-table :items="items"></check-table>
      </el-col>
      <el-divider direction="vertical"></el-divider>
      <!-- 今日已完成 -->
      <el-col :span="8"
        ><div class="finished">
          <h3 span class="el-icon-finished">今日已完成：</h3>
          <el-button size="mini" @click="delAll()">全部删除</el-button>
        </div>
        <check-table :items="finishList"> </check-table>
          <!-- 删掉这里就不能完成任务 -->
          <template v-for="item in items">
            <template v-if="!item.isFinished">
            </template>
          </template>
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
    let finish = JSON.parse(sessionStorage.getItem("finishList"));
    console.log(list);
    console.log("finish", finish);
    if (list.length > 0 || finish > 0) {
      this.items = list;
      this.finishList = finish;
      return this.items, this.finishList;
    }
  },
  methods: {
    addTask() {
      this.items.push({ label: this.taskName, isFinished: false });
    },
    delAll() {
      //利用for循环来筛选已完成的任务
      const items = this.items;
      if (items != null) {
        for (var i = 0; i < items.length; i++) {
          if (items[i].isFinished == true) {
            items.splice(i, 1);
            i--;
          }
        }
      }
    },
    // update() {
    //   let items=this.items;
    //   let finishList=this.finishList;
    //   items.forEach((element, index) => {
    //     if (element.isFinished == true) {
    //       finishList.push(element);
    //       items.splice(index, 1);
    //     }
    //   });
    // },
  },
  //有数据刷新进行更新存储
  beforeUpdate() {
    let items = this.items;
    let finishList = this.finishList;
    console.log(finishList)
    items.forEach((element, index) => {
      if (element.isFinished == true) {
        finishList.push(element);
        items.splice(index, 1);
      }
    });
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
