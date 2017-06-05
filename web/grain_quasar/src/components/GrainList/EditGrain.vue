<template>
    <q-layout>
        <div slot="header" class="toolbar">
        <button @click="$emit('hide')">
            <i>keyboard_arrow_left</i>
        </button>
        <q-toolbar-title :padding="1">
            {{GrainData?'编辑':'添加'}}粮仓
        </q-toolbar-title>
        </div>
        <!-- <q-tabs :refs="$refs" default-tab="liangcang" slot="navigation">
        <q-tab name="liangcang">粮仓信息</q-tab>
        <q-tab :name="'louceng-'+index" v-for="(louCeng, index) in louCengData">楼层{{louCeng.Code}}</q-tab>
        <button><i class="to-left">add</i>添加楼层</button>
        </q-tabs> -->
        <div class="q-tabs row" slot="navigation">
          <div class="q-tabs-scroller row">
              <div class="q-tab items-center justify-center" :class="{active:activeTab === 'liangcang'}">
              <span class="q-tab-label" @click="activeTabs('liangcang')">粮仓信息</span>
              </div>
              <template v-if="submited.liangcang">
              <div class="q-tab items-center justify-center" :class="{active:activeTab === ('louceng-'+index)}" v-for="(louCeng, index) in louCengData">
                  <span class="q-tab-label" @click="activeTabs('louceng-'+index)">楼层{{louCeng.Code}}</span>
              </div>
              <div class="q-tab" v-if="liangCangData.Type === 1">
                  <button @click="addLouCeng"><i class="to-left">add</i>添加楼层</button>
              </div>
              </template>
          </div>
        </div>
        <div class="layout-view">
          <div v-show="activeTab === 'liangcang'">
              <div class="list no-border inner-delimiter highlight">
                <div class="item">
                    <div class="item-content">
                      粮仓类型：
                      <q-select
                          type="radio"
                          v-model="liangCangData.Type"
                          :options="TypeOptions"
                          :disable="!!GrainData"
                      ></q-select>
                    </div>
                </div>
                <div class="item">
                    <div class="item-content">
                      编号：<input v-model="liangCangData.Number" placeholder="粮仓编号" @blur="IsExistNumber('Grain', liangCangData.Number)" :disabled="!!GrainData"><span v-if="this.number.Grain===false" class="text-red">该编号已存在</span>
                    </div>
                </div>
                <div class="item">
                    <div class="item-content">
                      名称：<input v-model="liangCangData.Name" placeholder="粮仓名称">
                    </div>
                </div>
                <div class="item">
                    <div class="item-content">
                      所属组织：
                      <q-select
                          type="radio"
                          v-model="liangCangData.departmentId"
                          :options="departmentList"
                      ></q-select>
                      <!--<button class="primary small">
                        {{liangCangData.departmentName || '请选择组织'}}
                        <q-popover ref="departmentpopover">
                          <q-tree
                            :model="departmentList"
                            contract-html="<i>remove_circle</i>"
                            expand-html="<i>add_circle</i>"
                          ></q-tree>
                        </q-popover>
                      </button>-->
                    </div>
                </div>
                <div class="item">
                    <div class="item-content">
                      排序：<input v-model.number="liangCangData.Sort" placeholder="粮仓排序">
                    </div>
                </div>
                <div class="item">
                    <div class="item-content">
                      位置：<input v-model="liangCangData.Location" placeholder="粮仓位置">
                    </div>
                </div>
                <div class="item">
                    <div class="item-content">
                      <div class="row">
                          <div class="auto">宽：<input v-model="liangCangData.Width" placeholder="粮仓宽"></div>
                          <div class="auto">高：<input v-model="liangCangData.Height" placeholder="粮仓高"></div>
                          <div class="auto">长：<input v-model="liangCangData.depth" placeholder="粮仓长"></div>
                      </div>
                    </div>
                </div>
              </div>
          </div>
          <div v-show="activeTab === ('louceng-'+index)" v-for="(louCeng, index) in louCengData" v-if="submited.liangcang">
              <div class="list no-border inner-delimiter highlight">
                <div class="item multiple-lines">
                    <div class="item-content row items-center wrap">
                      <div style="margin-right: 10px;" class="item-label">编号：</div>
                      <input class="auto" v-model="louCeng.Code" placeholder="楼层编号" @blur="IsExistNumber('Granary', liangCangData.Number + '-' + louCeng.Code, 1, louCeng)">
                    </div>
                </div>
                <div class="item multiple-lines">
                    <div class="item-content row items-center wrap">
                      <div style="margin-right: 10px;" class="item-label">Number：</div>
                      {{liangCangData.Number + '-' + louCeng.Code}}
                    </div>
                </div>
                <div class="item multiple-lines">
                    <div class="item-content row items-center wrap">
                      <div style="margin-right: 10px;" class="item-label">地址：</div>
                      <input class="auto" v-model="louCeng.Location" placeholder="楼层地址">
                    </div>
                </div>
                <div class="item multiple-lines">
                    <div class="item-content row items-center wrap">
                      <div style="margin-right: 10px;" class="item-label">最大正常温度：</div>
                      <input class="auto" v-model.number="louCeng.MaxiTemperature" placeholder="最大正常温度">
                    </div>
                </div>
                <div class="item multiple-lines">
                    <div class="item-content row items-center wrap">
                      <div style="margin-right: 10px;" class="item-label">最小正常温度：</div>
                      <input class="auto" v-model.number="louCeng.MinTemperature" placeholder="最小正常温度">
                    </div>
                </div>
              </div>
              <div class="card">
              <div class="card-title">
                  厫间列表
                  <button @click="addAoJian(index)" class="primary small raised float-right"><i class="to-left">add</i>添加厫间</button>
              </div>
              <div class="list bordered inner-delimiter highlight" v-for="aoJian in aoJianData[index]">
                  <div class="item multiple-lines">
                    <div class="item-content row items-center wrap">
                        <div style="margin-right: 10px;" class="item-label">编号：</div>
                        <input class="auto" v-model="aoJian.Code" placeholder="厫间编号" @blur="IsExistNumber('Granary', liangCangData.Number + '-' + louCeng.Code + '-' + aoJian.Code, 2, aoJian)">
                    </div>
                  </div>
                  <div class="item multiple-lines">
                    <div class="item-content row items-center wrap">
                        <div style="margin-right: 10px;" class="item-label">Number：</div>
                        {{liangCangData.Number + '-' + louCeng.Code + '-' + aoJian.Code}}
                    </div>
                  </div>
                  <div class="item multiple-lines">
                    <div class="item-content row items-center wrap">
                        <div style="margin-right: 10px;" class="item-label">排序：</div>
                        <input class="auto" v-model="aoJian.Sort" placeholder="廒间排序">
                    </div>
                  </div>
                  <div class="item multiple-lines">
                    <div class="item-content row items-center wrap">
                        <div style="margin-right: 10px;" class="item-label">地址：</div>
                        <input class="auto" v-model="aoJian.Location" placeholder="厫间地址">
                    </div>
                  </div>
              </div>
              </div>
          </div>
        </div>
        <div slot="footer" class="toolbar">
          <button @click="submit" class="primary raised">
              保存
          </button>
        </div>
    </q-layout>
</template>

<script>
  import { Loading, Toast } from 'quasar';

  export default {
    props: ['GrainData'],
    computed: {
      postLouCeng() {
        const index = this.activeTab.slice(this.activeTab.indexOf('-') + 1);
        return [this.louCengData.map((louCeng) => {
          louCeng.WH_Number = liangCangData.Number;
          return louCeng;
        })[index]].concat(this.aoJianData.map((louCeng) => {
          louCeng.WH_Number = liangCangData.Number;
          return louCeng;
        })[index]);
      },
      postLouCengAll() {
        return this.louCengData.map((louCeng) => {
          louCeng.WH_Number = liangCangData.Number;
          return louCeng;
        }).concat(...this.aoJianData.map(arr => arr.map((louCeng) => {
          louCeng.WH_Number = liangCangData.Number;
          return louCeng;
        })));
      },
    },
    data() {
      return {
        departmentList: [],
        liangCangData: {
          Sort: '',
          departmentId: '',
          // departmentName: '',
          ID: null,
          Type: 1,
          Number: '',
          Name: '',
          Location: '',
          Width: '',
          Height: '',
          depth: '',
          UserId: '',
          AverageTemperature: 0,
          Maximumemperature: 0,
          MinimumTemperature: 0,
          InSideTemperature: 0,
          OutSideTemperature: 0,
          StampTime: '',
          IsActive: 1,
          BadPoints: 0,
        },
        louCengData: [{ Code: '', Number: '', Location: '', MaxiTemperature: 0, MinTemperature: 0, Type: 1, PID: 0, WH_ID:0, BadPoints: 0, AverageTemperature:0, AverageHumidity: 0, UserId: 0, IsActive: 1, WH_Number: '' }],
        aoJianData: [[{ Code: '', Number: '', Location: '', Type: 2, PID: 0, WH_ID:0, BadPoints: 0, AverageTemperature:0, AverageHumidity: 0, UserId: 0, IsActive: 1, WH_Number: '', Sort: '' }]],
        TypeOptions: [
          {
            label: '楼房仓',
            value: 1
          },
          {
            label: '平方仓',
            value: 2
          },
          {
            label: '立筒仓',
            value: 3
          },
        ],
        // 已验证
        number: {
          Grain: null,
          Granary: false,
        },
        // 已提交
        submited: {
          liangcang: false,
          'louceng-0': false,
        },
        activeTab: 'liangcang',
      };
    },
    methods: {
      chooseItem(item) {
        this.liangCangData.departmentId = item.value;
        // this.liangCangData.departmentName = item.title;
        this.$refs.departmentpopover.close();
      },
      setDepartment() {
        const vm = this;
        this.$http.get(`${this.serverAddress}/Department/GetOrgSelectList/1`).then((response) => {
          // console.log(response.data.DataValue)
          if (response.data.Code === 1000) {
            this.departmentList = response.data.DataValue.rows.map(item => ({
              label: item.Name,
              value: item.Id,
            }));
            // const obj = {};
            // // let result = [];
            // const data = response.data.DataValue.rows;
            // // function addRows(arr,id) {
            // //   obj[id]._childid.forEach((cid) => {
            // //     // console.log(cid)
            // //     const objRow = obj[cid];
            // //     const row = data[objRow.index];
            // //     arr.push(row);
            // //     addRows(arr,cid);
            // //   });
            // // }
            // data.forEach((row, index) => {
            //   // if (!row._parentid || row._parentid === '00000000-0000-0000-0000-000000000000') result.push(row);
            //   if (row._id in obj) {
            //     obj[row._id].title = row._name;
            //     // obj[row._id]._parentid = row._parentid;
            //     // obj[row._id].index = index;
            //   } else {
            //     obj[row._id] = { children: [], title: row._name, value: row._id, expanded: false, handler (item) { vm.chooseItem(item); } };
            //   }
            //   if (row._parentid in obj) {
            //     obj[row._parentid].children.push(obj[row._id]);
            //   } else {
            //     obj[row._parentid] = { children: [obj[row._id]], value: row._parentid, expanded: false, handler (item) { vm.chooseItem(item); } };
            //   }
            // });
            // // console.log(obj)
            // // if (obj['00000000-0000-0000-0000-000000000000']) addRows(result, null);
            // // obj['00000000-0000-0000-0000-000000000000']._childid.forEach((id) => {
            // //   result = result.concat(obj[id]._childid.map((cid) => {
            // //     const bumen = data[obj[cid].index];
            // //     return { value: bumen._id, label: bumen._name };
            // //   }));
            // // });
            // this.departmentList = obj['00000000-0000-0000-0000-000000000000'].children;
            // // alert(JSON.stringify(this.departmentList))
          }
        });
      },
      addAoJian(index) {
        this.aoJianData[index].push({ Code: '', Number: '', Location: '', Type: 2, PID: 0, WH_ID:0, BadPoints: 0, AverageTemperature:0, AverageHumidity: 0, UserId: 0, IsActive: 1, WH_Number: '', Sort: '' });
      },
      addLouCeng() {
        this.$set(this.submited, `louceng-${this.louCengData.length}`, false);
        this.louCengData.push({ Code: '', Number: '', Location: '', MaxiTemperature: '', MinTemperature: '', Type: 1, PID: 0, WH_ID:0, BadPoints: 0, AverageTemperature:0, AverageHumidity: 0, UserId: 0, IsActive: 1, WH_Number: '' });
        this.aoJianData.push([{ Code: '', Number: '', Location: '', Type: 2, PID: 0, WH_ID:0, BadPoints: 0, AverageTemperature:0, AverageHumidity: 0, UserId: 0, IsActive: 1, WH_Number: '', Sort: '' }]);
      },
      activeTabs(name) {
        this.activeTab = name;
      },
      IsExistNumber(name, number, type, item) {
        if (number) {
          if (name === 'Grain') {
            this.$http.get(`${this.serverAddress}/${name}/IsExist/${number}`).then((response) => {
              // if (response.data.Code === 1011) {
                this.number[name] = response.data.Code === 1011;
              // }
            },() => {
              this.number[name] = false;
            });
          } else {
            this.$http.post(`${this.serverAddress}/${name}/IsExist2`, [
              `type^${type}`,
              `number^${number}`,
            ]).then((response) => {
              // if (response.data.Code === 1011) {
                this.number[name] = response.data.Code === 1011;
                if (item) item.Number = number;
              // }
            },() => {
              this.number[name] = false;
            });
          }
        } else {
          this.number[name] = false;
        }
      },
      submit() {
        Loading.show();
        if (this.GrainData) {
          this.$http.post(`${this.serverAddress}/Grain/Modify`, this.liangCangData).then((response) => {
            if (response.data.Code === 1000) {
              let count = this.louCengData.length;
              if (!count) {
                Loading.hide();
                Toast.create.positive('编辑成功');
                this.$emit('hide');
                return;
              }
              this.louCengData.forEach((item, index) => {
                item.WH_Number = this.liangCangData.Number;
                this.$http.post(`${this.serverAddress}/Granary/UpdateList`, [item].concat(this.aoJianData[index]).map((aoJian) => {
                  aoJian.WH_Number = this.liangCangData.Number;
                  return aoJian;
                })).then((response) => {
                  count--;
                  if (count <= 0) {
                    Loading.hide();
                    if (response.data.Code === 1000) {
                      Toast.create.positive('编辑成功');
                      this.$emit('hide');
                    } else {
                      Toast.create.warning('粮仓编辑成功，楼层编辑失败');
                    }
                  }
                }, () => {
                  count--;
                  if (count <= 0) {
                    Loading.hide();
                    Toast.create.warning('粮仓编辑成功，楼层编辑失败');
                  }
                });
              });
              // this.$http.post(`${this.serverAddress}/Granary/Modify`, this.postLouCengAll).then()
            }
          }, () => { Loading.hide(); });
        } else if (this.activeTab === 'liangcang' && this.number['Grain']) {
          this.$http.post(`${this.serverAddress}/Grain/Add`, this.liangCangData).then((response) => {
            Loading.hide();
            if (response.data.Code === 1000) {
              Toast.create.positive('添加粮仓成功');
              // 楼房仓留在界面
              if (this.liangCangData.Type === '1') {
                this.submited.liangcang = true;
              } else {
                this.$emit('hide');
              }
            } else {
              Toast.create.warning('添加粮仓失败');
            }
          }, () => { Loading.hide();Toast.create.warning('添加粮仓失败'); });
        } else if (this.activeTab.indexOf('louceng') !== -1 && this.number['Granary']) {
          this.$http.post(`${this.serverAddress}/Granary/AddList2`, this.postLouCeng).then((response) => {
            Loading.hide();
            if (response.data.Code === 1000) {
              Toast.create.positive('添加楼层成功');
              this.submited[this.activeTab] = true;
            } else {
              Toast.create.warning('添加楼层失败');
            }
          }, () => { Loading.hide();Toast.create.warning('添加楼层失败'); });
        }
      },
    },
    created() {
      this.setDepartment();
      if (this.GrainData) {
        this.submited.liangcang = true;
          console.log(this.GrainData)
        Object.keys(this.liangCangData).forEach((key) => {
          this.liangCangData[key] = this.GrainData[key];
        });
        this.aoJianData = [];
        this.louCengData = this.GrainData.Floors.map((item) => {
          this.aoJianData.push(item.GranaryList.map(granary => ({
            Code: granary.Code,
            Number: granary.Number,
            Location: granary.Location,
            MaxiTemperature: granary.MaxiTemperature,
            MinTemperature: granary.MinTemperature,
            Type: 2, PID: 0, WH_ID:0, BadPoints: 0, AverageTemperature:0, AverageHumidity: 0, UserId: 0, IsActive: 1, WH_Number: '', Sort: ''
          })));
          return { Code: item.Number.split('-')[1], Number: item.Number, Location: item.Location, Type: 1, PID: 0, WH_ID:0, BadPoints: 0, AverageTemperature:0, AverageHumidity: 0, UserId: 0, IsActive: 1, WH_Number: '' };
        });
      }
    }
  };
</script>