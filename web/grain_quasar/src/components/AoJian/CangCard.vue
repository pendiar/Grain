<template>
  <div class="grain-stats gt-md-width-1of2 auto">
    <div class="card" :class="{worn:cang.AverageTemperature>35,error:cang.AverageTemperature>45}">
      <div class="item">
        <div class="item-content has-secondary">
          {{cang.Number}}
        </div>
        <span class="item-secondary" @click="toggle" v-if="$route.name!=='YuanDuiWei'">
          <i>autorenew</i>
        </span>
        <span class="cangStatus"></span>
      </div>
      <div class="list bordered inner-delimiter highlight">
        <!-- <div class="item">
          <div class="item-content">
            <span class="item-label">
              粮堆编号：
            </span>
            <span class="item-value">
              {{cang.Number}}
            </span>
          </div>
        </div> -->
        <div class="row">
          <div class="item width-1of2 rheight">
            <div class="item-content">
              <span class="item-label">
                最高温度：
              </span>
              <span class="item-value">
                <!--{{cang.MaxiTemperature}}°C-->
                 {{$route.query.Maximumemperature}}°C
              </span>
            </div>
          </div>
          <div class="item width-1of2 rheight">
            <div class="item-content">
              <span class="item-label">
                最低温度：
              </span>
              <span class="item-value">
                <!--{{cang.MinTemperature}}°C-->
                 {{$route.query.MinimumTemperature}}°C
              </span>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="item width-1of2 rheight">
            <div class="item-content">
              <span class="item-label">
                平均温度：
              </span>
              <span class="item-value">
                <!--{{cang.AverageTemperature}}°C-->
                 {{$route.query.AverageTemperature}}°C
              </span>
            </div>
          </div>
          <div class="item width-1of2 rheight">
            <div class="item-content">
              <span class="item-label">
                坏点数：
              </span>
              <span class="item-value">
                <!--{{cang.BadPoints}}-->
                {{$route.query.BadPoints}}
              </span>
            </div>
          </div>
        </div>

         <div class="row">
          <div class="item width-1of2 rheight">
            <div class="item-content">
              <span class="item-label">
                仓内温度：
              </span>
              <span class="item-value">
                <!--{{cang.InSideTemperature}}°C-->
                {{$route.query.InSideTemperature}}°C
              </span>
            </div>
          </div>
          <div class="item width-1of2 rheight">
            <div class="item-content">
              <span class="item-label">
                仓外温度：
              </span>
              <span class="item-value">
                <!--{{cang.OutSideTemperature}}°C-->
                {{$route.query.OutSideTemperature}}°C
              </span>
            </div>
          </div>
        </div>
    
        
        <router-link tag="div" class="item item-link rmargin" :to="{name:'LiangCang',params:{id:cang.Number}}">
          <div class="item-content has-secondary">
            <span class="item-label">
              粮堆三温图 
            </span>
          </div>
          <i class="item-secondary">keyboard_arrow_right</i>
        </router-link>
        <chuanganline :sensorList="cang.SensorList" :LineCount="cang.LineCount" :update="update" :cnumber="cang.Number" v-if="$route.name==='YuanDuiWei'"></chuanganline>
        <chuanganpingmian :sensorList="cang.SensorList" v-else-if="PM"></chuanganpingmian>
        <chuangan3d :sensorList="cang.SensorList" :update="update" :cnumber="cang.Number" v-else></chuangan3d>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['cang', 'update'],
  data() {
    return {
      PM: false,
    };
  },
  methods: {
    toggle() {
      this.PM = !this.PM;
    },
  },
};
</script>

<style lang="less" scoped>
.rheight{

font-size: 14px;
padding: 1px;
height: 20Px;
line-height: 20px;

}

.rmargin{
  margin-top: 5px;
}

.cangStatus{
  width: 20px;
  height: 20px;
  margin: 16px;
  position: absolute;
  top: 0;
  right: 30px;
}
.card{
  border: 1px solid rgba(156,202,134,0.48);
  box-shadow: 0 1px 3px rgba(156,202,134,0.12), 0 1px 2px rgba(156,202,134,24);
  .cangStatus{
    background-color: rgba(156,202,134,1);
  }
}
.card.worn{
  border: 1px solid rgba(237,125,49,0.48);
  box-shadow: 0 1px 3px rgba(237,125,49,0.12), 0 1px 2px rgba(237,125,49,0.24);
  .cangStatus{
    background-color: rgba(237,125,49,1);
  }
}
.card.error{
  border: 1px solid rgba(156,3,3,0.48);
  box-shadow: 0 1px 3px rgba(156,3,3,0.12), 0 1px 2px rgba(156,3,3,0.24);
  .cangStatus{
    background-color: rgba(156,3,3,1);
  }
}
</style>