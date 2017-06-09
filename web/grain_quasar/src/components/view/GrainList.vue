<template>
  <!-- root node required -->
  <div>
    <!-- your content -->
    <div class="layout-padding">
      <!-- if you want automatic padding -->
      <ul class="breadcrumb desktop-only">
        <li><a><i>home</i></a></li>
        <li><a>粮仓监控</a></li>
      </ul>
      <p class="quote" v-if="isDesktop">
        {{$route.name==='GrainList'?'平湖粮库':`${$route.params.id}粮仓`}}温湿度状态
        <button class="primary small raised float-right" @click="edit(null)"><i class="on-left">add</i> 添加粮仓</button>
      </p>
      <p class="text-center" v-else>
        {{$route.name==='GrainList'?'平湖粮库':`${$route.query.Name || $route.params.id}粮仓`}}温湿度状态
      </p>
      <div class="row wrap gutter desktop-only">
        <div class="grain-stats md-width-1of2 gt-md-width-1of4 auto" v-for="(grain, index) in filterList">
          <div class="card">
            <div class="card-title bg-primary text-white relative-position">
              {{grain.Name}}
              <button class="primary small absolute-right" @click="edit(index)"><i class="on-left">edit</i> 编辑</button>
            </div>
            <div class="card-content">
              <div class="grain-top"><i class="top-icon" :class="[grain.Type===3||grain.Type===4?'top-icon-yuan':'top-icon-ping']"><span></span></i></div>
              <div class="grain-content" :class="[grain.Type===3||grain.Type===4?'bottom-icon-yuan':'']">
                <div class="grain-floor" v-for="floor in grain.Floors.slice().reverse()" :style="{height:100/grain.Floors.length+'%'}">
                  <template v-for="granary in floor.GranaryList">
                    <div class="grain-granary" v-link="{name:grain.Type===3||grain.Type===4?'YuanDuiWei':'AoJian',params:{id:granary.Number},query:granary}" :class="{disableClick: !$CheckRights(granary.Number)}">
                      {{granary.Number}}
                      <q-tooltip :ref="granary.Number">
                        <p>{{granary.Location}}</p>
                        <p>平均温度：{{granary.AverageTemperature||'-'}}°C</p>
                        <p>平均湿度：{{granary.AverageHumidity||'-'}}%RH</p>
                      </q-tooltip>
                    </div>
                  </template>
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
              <th>仓库</th>
              <th>最高温<br>(°C)</th>
              <th>最低温<br>(°C)</th>
              <th>平均温<br>(°C)</th>
              <!--<th>仓内/外温</th>-->
              <th>仓外温<br>(°C)</th>
              <th>仓内/外湿<br>(%RH/%RH)</th>
              <th>坏点数</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in filterGrainReport" v-link="getLink(item)">
              <td>{{item.Name || item.Number}}</td>
              <td :class="{'bg-worn':item.Maximumemperature>=30&&item.Maximumemperature<35,'bg-alarm':item.Maximumemperature>=35}">{{item.Maximumemperature || '-'}}</td>
              <td>{{item.MinimumTemperature || '-'}}</td>
              <td :class="{'bg-worn':item.AverageTemperature>=30&&item.AverageTemperature<35,'bg-alarm':item.AverageTemperature>=35}">{{item.AverageTemperature || '-'}}</td>
              <td :class="{'bg-worn':item.OutSideTemperature>=30&&item.OutSideTemperature<35,'bg-alarm':item.OutSideTemperature>=35}">{{item.OutSideTemperature || '-'}}</td>
              <!--<td :class="{'bg-worn':item.InSideTemperature>=30&&item.InSideTemperature<35||item.OutSideTemperature>=30&&item.OutSideTemperature<35,
              'bg-alarm':item.InSideTemperature>=35||item.OutSideTemperature>=35}">{{item.Type==1||item.Type==2?'-':item.InSideTemperature}}/{{item.OutSideTemperature}}°C</td>              -->
              <td :class="{'bg-worn':item.InSideHumidity>=80 || item.OutSideHumidity>=80}">{{item.InSideHumidity || '-'}}/{{item.OutSideHumidity || '-'}}</td>
              <td :class="{'bg-bad':item.BadPoints}">{{item.BadPoints}}</td>
            </tr>
          </tbody>
        </table>
        <router-view></router-view>
      </div>
      <q-modal ref="edit" :content-css="{minWidth: '80vw', minHeight: '80vh'}" @open="modalEvent('open')" @close="modalEvent('close')">
        <edit-grain :grain-data="filterList[EditIndex]" v-if="showModal" @hide="closeModal"></edit-grain>
      </q-modal>
    </div>
  </div>
</template>

<script>
import { Platform } from 'quasar';
import EditGrain from 'components/GrainList/EditGrain';
import store from 'src/config/store';

export default {
  components: {
    EditGrain,
  },
  computed: {
    filterList() {
      return this.list.filter(item => this.$CheckRights(item.Number)).sort((a, b) => (a.Sort - b.Sort));
    },
    filterGrainReport() {
      return this.GrainReport.filter(item => this.$CheckRights(item.Number)).sort((a, b) => (a.Sort - b.Sort));
    },
    cangNumber() {
      const cang = this.list[this.$route.params.id];
      if (cang) return cang.Number;
      return '';
    },
  },
  data() {
    return {
      isDesktop: Platform.is.desktop,
      list: [],
      GrainReport: [],
      showModal: false,
      EditIndex: null,
    };
  },
  methods: {
    addDuiwei() {

    },
    getLink(grain) {
      if (grain.Type === 1) {
        return { name: 'AoJianList', params: { id: grain.Number }, query: { Name: grain.Name } };
      // } else if (grain.Type === 2) {
      //   return { name: 'DuiWeiMo', params: { id: `${grain.Number}-1-1` }, query: { WH_Number: grain.Number, Number: `${grain.Number}-1` } };
      }
      return { name: 'DuiWei', params: { id: `${grain.Number}-1-1` }, query: { type: grain.Type, Name: grain.Name } };
      // return { name: 'YuanDuiWei', query: { WH_Number: grain.Number, Number: `${grain.Number}-1`, DW_Number: `${grain.Number}-1-1` } };
    },
    toAoJianList(item) {
      let list = [];
      item.Floors.forEach((floor) => {
        list = list.concat(floor.GranaryList);
      });
      store.setAoJianList(list);
      this.$router.push({name: 'AoJianList'});
    },
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
        "PageCount": 2000,
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
    // console.log(this)
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      // alert(1111)
      vm.fetchData();
    });
  },
  beforeRouteLeave(to, from, next) {
    // console.log(this.$refs[to.params.id]);
    this.$refs[to.params.id] && this.$refs[to.params.id][0] && this.$refs[to.params.id][0].close();
    next();
  },
};
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
