<template>
  <div class="bu-men">
    <div class="layout-padding">
      <q-data-table
        :data="table"
        :config="config"
        :columns="columns"
        @refresh="refresh"
      >
        <template slot="col-source" scope="cell">
          <span v-if="cell.data === 'Audit'" class="label text-white bg-primary">
            Audit
            <q-tooltip>Some tooltip</q-tooltip>
          </span>
          <span v-else class="label text-white bg-negative">{{cell.data}}</span>
        </template>

        <template slot="selection" scope="props">
          <button class="primary clear" @click="changeMessage(props)">
            <i>edit</i>
          </button>
          <button class="primary clear" @click="deleteRow(props)">
            <i>delete</i>
          </button>
        </template>
      </q-data-table>
    </div>
  </div>
</template>

<script>
  import { Platform, Utils, Toast } from 'quasar';

  export default {
    data() {
      return {
        table: [],
        config: {
          title: '部门管理',
          refresh: true,
          columnPicker: true,
          leftStickyColumns: 1,
          rightStickyColumns: 2,
          bodyStyle: {
            maxHeight: Platform.is.mobile ? '50vh' : '500px'
          },
          rowHeight: '50px',
          responsive: true,
          pagination: {
            rowsPerPage: 15,
            options: [5, 10, 15, 30, 50, 500]
          },
          selection: 'multiple',
          messages: {
            noData: '<i>warning</i> 暂无数据！',
            noDataAfterFiltering: '<i>warning</i> 无匹配数据，请检查筛选项！'
          }
        },
        columns: [
          {
            label: 'Date',
            field: 'isodate',
            width: '120px',
            filter: true,
            sort: 'date',
            format (value) {
              return new Date(value).toLocaleString()
            }
          },
          {
            label: 'Service',
            field: 'serviceable',
            format (value) {
              if (value === 'Informational') {
                return '<i class="text-positive">info</i>'
              }
              return value
            },
            width: '80px'
          },
          {
            label: 'Message',
            field: 'message',
            sort: true,
            filter: true,
            // width: '500px'
          },
          {
            label: 'Source',
            field: 'source',
            sort: true,
            filter: true,
            width: '120px'
          },
          {
            label: 'Log Number',
            field: 'log_number',
            sort: true,
            width: '120px'
          }
        ],
      };
    },
    methods: {
      refresh (done) {
        this.timeout = setTimeout(() => {
          done()
        }, 5000)
      },
    },
  };
</script>

<style lang="less" scoped>
    
</style>
