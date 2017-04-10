<template>
  <!-- root node required -->
  <div>
    <!-- your content -->
    <div class="layout-padding">
      <!-- if you want automatic padding -->
      <ul class="breadcrumb desktop-only">
        <li><a><i>home</i></a></li>
        <li><a>楼房监控</a></li>
      </ul>
      <p class="quote">
        {{$route.name==='GrainList'?'XXX粮库':`${cangNumber}粮仓`}}温度状态
        <button class="primary small raised float-right desktop-only" @click="edit(null)"><i class="on-left">add</i> 添加</button>
      </p>
      <div class="row wrap gutter desktop-only">
        <div class="grain-stats md-width-1of2 gt-md-width-1of4 auto" v-for="(grain, index) in list">
          <div class="card">
            <div class="card-title bg-primary text-white relative-position">
              {{grain.Name}}
              <button class="primary small absolute-right" @click="edit(index)"><i class="on-left">edit</i> 编辑</button>
            </div>
            <div class="card-content">
              <div class="grain-top"><i class="top-icon" :class="[grain.Type===3?'top-icon-yuan':'top-icon-ping']"><span></span></i></div>
              <div class="grain-content" :class="[grain.Type===3?'bottom-icon-yuan':'']">
                <div class="grain-floor" v-for="floor in grain.Floors.slice().reverse()" :style="{height:100/grain.Floors.length+'%'}">
                  <div class="grain-granary" v-for="granary in floor.GranaryList" v-link="{name:'AoJian',params:{id:granary.Number},query:granary}">
                    {{granary.Number}}
                    <q-tooltip :ref="granary.Number">
                      <p>{{granary.Location}}</p>
                      <p>平均温度：{{granary.AverageTemperature}}°C</p>
                      <p>平均湿度：{{granary.AverageHumidity}}%</p>
                    </q-tooltip>
                  </div>
                </div>
                <span></span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mobile-only">
        <table class="q-table bordered highlight horizontal-delimiter striped-even text-center" v-show="$route.name === 'GrainList'">
          <thead>
            <tr>
              <th>仓号</th>
              <th>最高温度</th>
              <th>最低温度</th>
              <th>平均温度</th>
              <th>坏点数</th>
              <th>仓内温度</th>
              <th>仓外温度</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="(item, index) in GrainReport">
              <tr v-if="item.Number.indexOf('L') === 0" v-link="{name: 'DuiWei', params: {id: item.Number}}">
                <td>{{item.Number}}</td>
                <td :class="{'text-negative':item.Maximumemperature>=30}">{{item.Maximumemperature}}</td>
                <td>{{item.MinimumTemperature}}</td>
                <td>{{item.AverageTemperature}}</td>
                <td :class="{'text-negative':item.BadPoints}">{{item.BadPoints}}</td>
                <td :class="{'text-negative':item.InSideTemperature>=80}">{{item.InSideTemperature}}%RH</td>
                <td>{{item.OutSideTemperature}}%RH</td>
              </tr>
              <tr v-else>
                <td>{{item.Number}}</td>
                <td :class="{'text-negative':item.Maximumemperature>=30}">{{item.Maximumemperature}}</td>
                <td>{{item.MinimumTemperature}}</td>
                <td>{{item.AverageTemperature}}</td>
                <td :class="{'text-negative':item.BadPoints}">{{item.BadPoints}}</td>
                <td :class="{'text-negative':item.InSideTemperature>=80}">{{item.InSideTemperature}}%RH</td>
                <td>{{item.OutSideTemperature}}%RH</td>
              </tr>
            </template>
          </tbody>
        </table>
        <router-view></router-view>
      </div>
      <q-modal ref="edit" :content-css="{minWidth: '80vw', minHeight: '80vh'}" @open="modalEvent('open')" @close="modalEvent('close')">
        <edit-grain :grain-data="list[EditIndex]" v-if="showModal" @hide="closeModal"></edit-grain>
      </q-modal>
    </div>
  </div>
</template>

<script>
import EditGrain from 'components/GrainList/EditGrain';

export default {
  components: {
    EditGrain,
  },
  computed: {
    cangNumber() {
      const cang = this.list[this.$route.params.id];
      if (cang) return cang.Number;
      return '';
    },
  },
  data() {
    return {
      list: [],
      GrainReport: [],
      showModal: false,
      EditIndex: null,
    };
  },
  methods: {
    closeModal() {
      setTimeout(() => {
        this.$refs.edit.close();
      }, 0);
    },
    edit(index) {
      this.EditIndex = index;
      this.$refs.edit.open();
    },
    modalEvent(e) {
      this.showModal = e === 'open';
      this.fetchData();
    },
    fetchData() {
      // PC端接口
      this.$http.post(`${this.serverAddress}/Grain/GetList`, {
        "DicList": [
            "Type^0",
            "UserId^0"
        ],
        "OrderType": 0,
        "PageCount": 20,
        "PageIndex": 1,
        "UpdateTime": "",
        "EndDate": "2017-12-11",
        "StartDate": "2016-11-11"
      }).then((response) => {
        if (response.data.Code === 1000) {
          try{
            this.list = JSON.parse(response.data.JsonValue);
          } catch (e) {
            this.list = [];
          }
        } else {
          this.list = [];
        }
      }, () => {
        this.list = [];
      });
      // 移动端接口
      this.$http.get(`${this.serverAddress}/Grain/GetList_GrainReport_ByUserId`).then((response) => {
        if (response.data.Code === 1000) {
          try{
            this.GrainReport = JSON.parse(response.data.JsonValue);
          } catch (e) {
            this.GrainReport = [];
          }
        } else {
          this.GrainReport = [];
        }
      }, () => {
        this.GrainReport = [];
      });
    }
  },
  mounted() {
    console.log(this)
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.fetchData();
    });
  },
  beforeRouteLeave(to, from, next) {
    // console.log(this.$refs[to.params.id]);
    this.$refs[to.params.id] && this.$refs[to.params.id][0] && this.$refs[to.params.id][0].close();
    next();
  }
}
</script>

<style scoped lang="less">
@floorColor: #00b6ff;

.grain-list{
  width: 100%;
  height: 100%;
}
.grain-stats{
  // margin-bottom: 15px;
}
.grain-top{
  height: 50px;
  padding: 0;
  position: relative;
  /*background-color: #dedede;*/
  .top-icon{
    display: block;
    margin: 0 auto;
    position: relative;
    &.top-icon-ping{
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 0 72px 50px;
      border-color: transparent transparent #000;
      &:after{
        content: "";
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 0 68px 48px;
        border-color: transparent transparent #fff;
        position: absolute;
        top: 1px;
        left: -68px;
      }
    }
    &.top-icon-yuan{
      &:before{
        content: "";
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 0 72px 50px;
        border-color: transparent transparent #000;
        position: absolute;
        top: 0;
        left: 50%;
        margin-left: -72px;
      }
      &:after{
        content: "";
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 0 70px 48px;
        border-color: transparent transparent #fff;
        position: absolute;
        top: 2px;
        left: 50%;
        margin-left: -70px;
      }
      span{
        position: absolute;
        bottom: -68px;
        width: 100%;
        height: 18px;
        overflow: hidden;
        &:after{
          content: "";
          display:block;
          width: 144px;
          height: 50px;
          border: 1px solid #000;
          border-radius: 50% ~"/" 37px 37px 18px 18px;
          background-color: #fff;
          position: absolute;
          top: -40px;
          left: 50%;
          margin-left: -72px;
        }
      }
    }
  }
}
.grain-title{
  position: absolute;
  width: 100%;
  height: 50px;
  left: 0;
  top: 0;
  line-height: 50px;
  text-align: center;
}
.grain-content{
  width: 140px;
  height: 160px;
  overflow: hidden;
  /*min-height: 160px;*/
  border: 1px solid #000;
  margin: 0 auto;
  &.bottom-icon-yuan{
    height: 140px;
    margin-bottom: 20px;
    >span{
      position: absolute;
      left: 0;
      bottom: 20px;
      width: 100%;
      height: 15px;
      overflow: hidden;
      &:after{
        content: "";
        display:block;
        width: 142px;
        height: 50px;
        border: 1px solid #000;
        border-radius: 50% ~"/" 37px 37px 18px 18px;
        background-color: #fff;
        position: absolute;
        top: -36px;
        left: 50%;
        margin-left: -71px;
      }
    }
    .grain-floor+span:after{
      background-color: @floorColor;
    }
  }
}
.grain-floor{
  border-bottom: 1px solid;
  background-color: @floorColor;
  display: flex;
  &:last-child{
    border-bottom: none;
  }
}
.grain-granary{
  width: 50%;
  border-right: 1px solid;
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  &:last-child{
    border-right: none;
  }
  &:hover{
    background-color: #6495ed;
  }
}
.q-table{
  font-size: 0.7rem;
  width: 100%;
  th,td{
    padding:0.5rem 0.3rem;
  }
}
</style>
