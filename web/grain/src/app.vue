<template>
  <!-- App -->
  <div id="app">

    <!-- Statusbar -->
    <f7-statusbar></f7-statusbar>

    <!-- Left Panel -->
    <f7-panel left reveal layout="dark">
      <f7-view id="left-panel-view" navbar-through :dynamic-navbar="true">
        <f7-navbar v-if="$theme.ios" title="Left Panel" sliding></f7-navbar>
        <f7-pages>
          <f7-page>
            <f7-navbar v-if="$theme.material" title="Left Panel" sliding></f7-navbar>
            <f7-block inner>
              <p>Left panel content goes here</p>
            </f7-block>
            <f7-block-title>Load page in panel</f7-block-title>
            <f7-list>
              <f7-list-item link="/about/" title="About"></f7-list-item>
              <f7-list-item link="/form/" title="Form"></f7-list-item>
            </f7-list>
            <f7-block-title>Load page in main view</f7-block-title>
            <f7-list>
              <f7-list-item link="/about/" title="About" link-view="#main-view" link-close-panel></f7-list-item>
              <f7-list-item link="/form/" title="Form" link-view="#main-view" link-close-panel></f7-list-item>
            </f7-list>
          </f7-page>
        </f7-pages>
      </f7-view>
    </f7-panel>

    <!-- Right Panel -->
    <f7-panel right cover layout="dark">
      <f7-view id="right-panel-view" navbar-through :dynamic-navbar="true">
        <f7-navbar v-if="$theme.ios" title="Right Panel" sliding></f7-navbar>
        <f7-pages>
          <f7-page>
            <f7-navbar v-if="$theme.material" title="Right Panel" sliding></f7-navbar>
            <f7-block>
              <p>Right panel content goes here</p>
            </f7-block>
            <f7-block-title>Load page in panel</f7-block-title>
            <f7-list>
              <f7-list-item link="/about/" title="About"></f7-list-item>
              <f7-list-item link="/form/" title="Form"></f7-list-item>
            </f7-list>
            <f7-block-title>Load page in main view</f7-block-title>
            <f7-list>
              <f7-list-item link="/about/" title="About" link-view="#main-view" link-close-panel></f7-list-item>
              <f7-list-item link="/form/" title="Form" link-view="#main-view" link-close-panel></f7-list-item>
            </f7-list>
          </f7-page>
        </f7-pages>
      </f7-view>
    </f7-panel>

    <!-- Main Views -->
    <f7-views>
      <f7-view id="main-view" :dynamic-navbar="true" main>
        <!-- iOS Theme Navbar -->
        <f7-navbar v-if="$theme.ios">
          <!-- <f7-nav-left>
            <f7-link icon="icon-bars" open-panel="left"></f7-link>
          </f7-nav-left> -->
          <f7-nav-center sliding>粮仓</f7-nav-center>
          <f7-nav-right>
            <f7-link icon="icon-bars" open-panel="left"></f7-link>
          </f7-nav-right>
        </f7-navbar>
        <!-- Pages -->
        <f7-pages navbar-through>
          <f7-page>
            <!-- Material Theme Navbar -->
            <f7-navbar v-if="$theme.material">
              <!-- <f7-nav-left>
                <f7-link icon="icon-bars" open-panel="left"></f7-link>
              </f7-nav-left> -->
              <f7-nav-center sliding>粮仓</f7-nav-center>
              <f7-nav-right>
                <f7-link icon="icon-bars" open-panel="left"></f7-link>
              </f7-nav-right>
            </f7-navbar>

            <!-- Page Content -->
            <grain-list></grain-list>
          </f7-page>
        </f7-pages>
      </f7-view>
    </f7-views>

    <!-- Popup -->
    <f7-popup id="popup">
      <f7-view navbar-fixed>
        <f7-pages>
          <f7-page>
            <f7-navbar title="Popup">
              <f7-nav-right>
                <f7-link close-popup>Close</f7-link>
              </f7-nav-right>
            </f7-navbar>
            <f7-block>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque, architecto. Cupiditate laudantium rem nesciunt numquam, ipsam. Voluptates omnis, a inventore atque ratione aliquam. Omnis iusto nemo quos ullam obcaecati, quod.</f7-block>
          </f7-page>
        </f7-pages>
      </f7-view>
    </f7-popup>

    <!-- Login Screen -->
    <f7-login-screen id="login-screen">
      <f7-view>
        <f7-pages>
          <f7-page login-screen>
            <f7-login-screen-title>Login</f7-login-screen-title>
            <f7-list form>
              <f7-list-item>
                <f7-label>Username</f7-label>
                <f7-input name="username" placeholder="Username" type="text"></f7-input>
              </f7-list-item>
              <f7-list-item>
                <f7-label>Password</f7-label>
                <f7-input name="password" type="password" placeholder="Password"></f7-input>
              </f7-list-item>
            </f7-list>
            <f7-list>
              <f7-list-button title="Sign In" close-login-screen></f7-list-button>
              <f7-list-label>
                <p>Click Sign In to close Login Screen</p>
              </f7-list-label>
            </f7-list>
          </f7-page>
        </f7-pages>
      </f7-view>
    </f7-login-screen>

  </div>
</template>

<script>
// import home from './pages/home.vue';
import GrainList from './pages/app/GrainList.vue';


const options = {
  chart: {
    type: 'heatmap',
    marginTop: 40,
    marginBottom: 80,
  },
  title: {
    text: null,
  },
  xAxis: {
    categories: ['Alexander'],
    labels: {
      enabled: false,
    },
  },
  yAxis: {
    categories: ['1', '2', '3', '4', '5'],
    title: null,
    labels: {
      enabled: false,
    },
  },
  colorAxis: {
    min: 0,
    minColor: '#CCCCCC',
    maxColor: '#BFEFFF',
  },
  legend: {
    enabled: false,
    align: 'right',
    layout: 'vertical',
    margin: 0,
    verticalAlign: 'top',
    y: 25,
    symbolHeight: 280,
  },
  tooltip: {
    enabled: false,
  },
};

export default {
  components: {
    GrainList,
  },
  created() {
    const vm = this;
    vm.$$.ajax({
      url: `${this.$serverApi}/Grain/GetList`,
      method: 'POST',
      data: {
        DicList: ['Type^0', 'UserId^0'],
        OrderType: 0,
        PageCount: 20,
        PageIndex: 1,
        UpdateTime: '',
        EndDate: '2017-12-11',
        StartDate: '2016-11-11',
      },
      dataType: 'json',
      success(data) {
        if (data.Code === 1000) {
          vm.$bus.setStatus('grainList', JSON.parse(data.JsonValue));
          vm.$nextTick(() => {

          });
        }
      },
    });
    // vm.$$.ajax({
    //   url: `${this.$serverApi}/Grain/Add`,
    //   method: 'POST',
    //   data: {
    //     Number: 'L5',
    //     Name: 'E楼房仓',
    //     Location: '深证市宝安区',
    //     Type: 1,
    //     UserId: '0',
    //     IsActive: 1,
    //   },
    //   dataType: 'json',
    //   success(data) {
    //     if (data.Code === 1000) {
    //       console.log('成功');
    //       console.log(JSON.parse(data.JsonValue));
    //     }
    //   },
    // });
  },
  mounted() {
    const series2 = {
      name: 'Sales per employee',
      borderWidth: 1,
      data: [
        { x: 0, y: 1, value: 50, color: '#BFEFFF' },
        { x: 1, y: 1, z: 0, color: '#BFEFFF' },
        { x: 0, y: 2, z: 0, color: '#CCCCCC' },
        { x: 1, y: 2, z: 0, color: '#CCCCCC' },
        { x: 0, y: 3, z: 0, color: '#CCCCCC' },
        { x: 1, y: 3, z: 0, color: '#CCCCCC' },
        { x: 0, y: 4, z: 0, color: '#CCCCCC' },
        { x: 1, y: 4, z: 0, color: '#CCCCCC' },
        { x: 0, y: 5, z: 0, color: '#CCCCCC' },
        { x: 1, y: 5, z: 0, color: '#CCCCCC' },
      ],
      dataLabels: {
        enabled: true,
        color: '#000000',
        formatter() {
          return `第${this.point.y}层`;  // 重新设置节点显示数据
        },
      },
      events: {
        click(event) {
          // query2_1(event.point.y);
          // alert(event.point.y);
        },
      },
    };
    // const chart2 = new this.Highcharts.Chart(options);
    // chart2.addSeries(series2);
    // options.chart.renderTo = 'divs';
  },
};
</script>

<style scoped lang="css">
.home-title{
  text-align: center;
  font-size: 20px;
}
</style>
