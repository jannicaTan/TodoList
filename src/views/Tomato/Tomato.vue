<template>
  <div class="tomato-container">
    <router-link :to="{ path: '/' }">
      <el-button>回去做任务！</el-button>
    </router-link>
    <div class="tomato-title el-icon-alarm-clock">
      Mindful Clock
    </div>
    <div class="tomato-clock">
      <el-card class="tomato-clock-card" shadow="always">
        <!-- 倒计时展示  -->
        <div class="tomato-countdown">
          <span id="min">{{ minutes }}</span> :
          <span id="sec">{{ sec }}</span>
        </div>
        <!-- 控制按钮 -->
        <div class="tomato-control-button">
          <el-button :disabled="state === 'start'" @click="start">
            <i class="el-icon-video-play"></i>
          </el-button>
          <el-button
            class="pause"
            :disabled="state !== 'start'"
            @click="pause_clock"
          >
            <i class="el-icon-video-pause"></i>
          </el-button>
          <el-button class="reset" @click="stop_clock">
            <i class="el-icon-refresh-left"></i>
          </el-button>
        </div>
      </el-card>
    </div>
    <div class="set-up-time">
      <div id="focus">
        <el-form label-suffix=":" inline>
          <el-form-item label="专注时间">
            <el-input
              type="number"
              class="focusInput"
              v-model="session_value"
              max="60"
              min="5"
            >
              <template slot="append">min</template></el-input
            ></el-form-item
          >
          <el-form-item label="休息时间">
            <el-input
              type="number"
              class="focusInput"
              v-model="break_value"
              max="10"
              min="1"
            >
              <template slot="append">min</template></el-input
            ></el-form-item
          >
        </el-form>

        <a></a>
      </div>
      <div id="break"></div>
    </div>
  </div>
</template>
<script>
import { minute, second, states, clock_states } from "../Tomato/const";
export default {
  data() {
    return {
      minutes: minute,
      seconds: second,
      session_value: 25, //设置分钟值
      break_value: 5, //
      state: states.STOP,
      clock_state: clock_states.WORK,
    };
  },
  // watch: {
  //   session_value(newVal, oldVal) {
  //     this.minutes = newVal;
  //   },
  // },
  computed: {
    sec() {
      if (this.seconds < 10) {
        return "0" + this.seconds;
      }
      return this.seconds;
    },
  },
  methods: {
    tick() {
      if (this.seconds !== 0) {
        this.seconds--;
        return;
      }
      if (this.minutes !== 0) {
        --this.minutes;
        this.seconds = 59;
        return;
      }
      //judge work or rest
      this.clock_state =
        this.clock_state === clock_states.WORK
          ? clock_states.REST
          : clock_states.WORK;
      if (this.clock_state === clock_states.WORK) {
        this.minutes = minute;
        // this.min=minute
      } else {
        this.minutes = this.break_value;
      }
    },
    start() {
      this.state = states.START;
      this.tick();
      this.Interval = setInterval(this.tick, 1000);
    },
    stop_clock() {
      console.log("state1:", this.state);
      this.state = states.STOP;
      console.log("state2:", this.state);
      clearInterval(this.Interval);
      if (this.minutes != this.session_value) {
        this.minutes = this.session_value;
      } else {
        this.minutes = minute;
      }
      this.seconds = 0;
    },
    pause_clock() {
      this.state = states.PAUSE;
      clearInterval(this.Interval); //dom暂停
    },
  },
};
</script>
<style lang="scss" scoped>
.tomato-container {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: url("https://tse1-mm.cn.bing.net/th/id/OIP-C.57gwdnMOndD7H3DjUja6bQHaFh?w=216&h=180&c=7&o=5&dpr=2&pid=1.7")
    no-repeat;
  background-size: 100% 100%;
  .tomato-title {
    font-size: 50px;
    font-weight: normal;
    margin: 60px 40px 10px;
  }
  .tomato-clock {
    margin: 40px;
    .tomato-clock-card {
      width: 400px;
      display: flex;
      justify-content: center;
      align-items: center;
      background: rgba(242, 242, 242, 0.6);
      .tomato-countdown {
        display: flex;
        justify-content: space-around;
        font-size: 80px;
      }
      .tomato-control-button {
        button {
          margin-top: 5%;
          font-size: 20px;
          color: #777;
        }
        button:hover {
          transform: scale(1.1);
        }
      }
    }
  }
  .el-form.item {
    margin: 20px;
  }
  /deep/ .el-form-item__label {
    color: beige;
  }
}
</style>
