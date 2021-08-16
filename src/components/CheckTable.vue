<template>
  <div class="check-table">
    <el-table
      ref="multipleTable"
      :data="items"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection"></el-table-column>
      <!-- <el-table-column label="任务名称" v-for="(item,i) in items" :key="i">{{ item.label }}</el-table-column> -->
      <el-table-column label="任务名称" prop="label"></el-table-column>
      <!-- 利用prop可以展示想要的对应值 -->
      <el-table-column label="操作" :key="item">
        <template slot-scope="scope">
          <span>
            <el-button
              size="small"
              icon="el-icon-check"
              icon-color="red"
              @click="finish(scope)"
            ></el-button>
            <el-button
              size="small"
              @click="del(scope.$index)"
              icon="el-icon-delete"
            ></el-button>
          </span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  props: { items: { type: Array, default: () => [] } },
  data() {
    return {
      multipleSelection: [],
    };
  },
  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    del(item) {
    //   console.log(item);
      //scope里面有三个参数
      console.log(item.$index)
      this.items.splice(item, 1);
    },
    finish(item) {
      item.isFinished = !item.isFinished;
    },
  },
};
</script>
<style scoped></style>
