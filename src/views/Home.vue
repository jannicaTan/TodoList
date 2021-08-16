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
      <el-col :span="8"
        ><h3 class="el-icon-paperclip">今日任务：</h3>
        <ul v-for="(item, i) in items" :key="i">
          <template v-if="!item.isFinished">
            <li>
              {{ item.label }}
              <el-button
                size="small"
                icon="el-icon-check"
                icon-color="red"
                @click="finish(item)"
              ></el-button>
              <el-popconfirm
                confirm-button-text="好的"
                @confirm="del(item)"
                cancel-button-text="不用了"
                icon="el-icon-info"
                icon-color="red"
                title="这是一段内容确定删除吗？"
              >
                <el-button
                  size="small"
                  slot="reference"
                  icon="el-icon-delete"
                ></el-button>
              </el-popconfirm>
            </li>
          </template></ul
      ></el-col>
      <el-divider direction="vertical"></el-divider>
      <!-- 今日已完成 -->
      <el-col :span="8"
        ><div class="finished">
          <h3 span class="el-icon-finished">今日已完成：</h3>
          <el-button size="mini" @click="delAll()">全部删除</el-button>
        </div>
        <ul v-for="(item, i) in items" :key="i">
          <template v-if="item.isFinished"
            ><li>{{ item.label }}</li></template
          >
        </ul>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "Let's Make A List For Today!",
      taskName: "",
      items: [],
    };
  },
  created() {
    let list = JSON.parse(sessionStorage.getItem("taskList"));
    console.log(list);
    if (list.length > 0) {
      this.items = list;
      return this.items;
    }
  },
  methods: {
    addTask() {
      this.items.push({ label: this.taskName, isFinished: false });
    },
    // 删除任务
    del(item) {
      this.items.splice(item, 1);
    },
    delAll(){
        if(this.items!=null){
                this.items.splice(0,this.items.length)
        }
    },
    //任务状态修改
    finish(item) {
      item.isFinished = !item.isFinished;
    },
  },
  //有数据刷新进行更新存储
  beforeUpdate() {
    sessionStorage.setItem("taskList", JSON.stringify(this.items));
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
}
</style>

