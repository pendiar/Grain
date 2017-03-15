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
      <f7-view id="main-view" navbar-through :dynamic-navbar="true" main>
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
        <f7-pages>
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
            <p class="home-title">仓库选择</p>
            <!--平方仓-->
            <div class="col-sm-6 col-md-3" id="click1">
                <div class="widget widget-stats bg-grey">
                    <div class="stats-icon stats-icon-lg"><i class="fa fa-book fa-fw"></i></div>
                    <div class="stats-title">平方仓</div>
                    <div class="stats-number" id="temp1" name="temp1"></div>
                </div>
            </div>
            <!--筒仓-->
            <div class="col-sm-6 col-md-3" id="click2">
                <div class="widget widget-stats bg-grey  yj">
                    <div class="stats-icon stats-icon-lg"><i class="fa fa-book fa-fw"></i></div>
                    <div class="stats-title">筒仓</div>
                    <div class="stats-number" id="temp2" name="temp2"></div>
                </div>
            </div>
            <!--平房仓-->
            <div class="col-sm-6 col-md-3" id="click3">
                <div class="widget widget-stats bg-grey">
                    <div class="stats-icon stats-icon-lg"><i class="fa fa-book fa-fw"></i></div>
                    <div class="stats-title">平房仓</div>
                    <div class="stats-number" id="temp3" name="temp3"></div>
                </div>
            </div>
            <!--气膜仓-->
            <div class="col-sm-6 col-md-3" id="click4">
                <div class="widget widget-stats bg-grey">
                    <div class="stats-icon stats-icon-lg"><i class="fa fa-book fa-fw"></i></div>
                    <div class="stats-title">气膜仓</div>
                    <div class="stats-number" id="temp4" name="temp4"></div>
                </div>
            </div>
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

export default {
  // components: {
  //   home,
  // },
  created() {
    this.$$.ajax({
      url: '/api/Grain/GetList',
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
          console.log(JSON.parse(data.JsonValue));
        }
      },
    });
  },
};
</script>

<style scoped lang="css">
.home-title{
  text-align: center;
  font-size: 20px;
}
</style>
