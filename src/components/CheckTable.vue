<template>
  <div class="check-table">
    <el-button type="primary" @click="onMove">
      批量完成
    </el-button>
    <el-table
      ref="multipleTable"
      :data="items"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection"></el-table-column>
      <el-table-column label="任务名称" prop="label"></el-table-column>
      <!-- 利用prop可以展示想要的对应值 -->
      <el-table-column label="操作">
        <template slot-scope="scope">
          <span>
            <el-button
              size="small"
              icon="el-icon-check"
              @click="finish(scope.row)"
              v-if="scope.row.isFinished == false"
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
    del(index) {
      //scope中：row-本行元素，$index-本行索引
      this.items.splice(index, 1);
    },
    finish(row) {
      row.isFinished = true;
    },
    onMove() {
      let selectItem = this.multipleSelection.map((item) => ({
        ...item,
        isFinished: true,
      }));
      this.$emit("to-move", selectItem);
    },
  },
};
</script>
<style scoped></style>
