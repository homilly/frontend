<i18n>
  {
    "en": {
      "source": "Source: ",
      "view": "Details"
    },
    "zh": {
      "source": "信息来源：",
      "view": "查看详情"
    }
  }
</i18n>

<template>
  <v-row
    align="center"
    justify="center"
  >
    <v-snackbar
      :value="snackbar"
      color="success"
      bottom
      :timeout="4000"
    >
      <v-icon
        left
        color="white"
      >
        mdi-check
      </v-icon>
      感谢支持，已提交纠错信息
      <v-spacer />
    </v-snackbar>
    <v-dialog
      v-model="dialog.enabled"
      max-width="450px"
    >
      <v-card>
        <v-card-title>
          联系方式
        </v-card-title>
        <v-card-text>
          <v-list two-line>
            <v-list-item :href="`https://ditu.amap.com/search?query=${encodeURIComponent(dialog.address)}`">
              <v-list-item-avatar>
                <v-icon>
                  mdi-map
                </v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>
                  地址
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{ dialog.address }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-list-item
              v-for="[i, contact] in contacts.entries()"
              :key="i"
              v-bind="contact.link"
            >
              <v-list-item-avatar>
                <v-icon>
                  mdi-contact-phone
                </v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>
                  {{ contact.name }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{ contact.content }}
                </v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-icon>
                  mdi-phone
                </v-icon>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            text
            @click="dialog.enabled = false"
          >
            关闭
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="report.enabled"
      persistent
      max-width="450px"
    >
      <v-card>
        <v-card-title>
          提交纠错
        </v-card-title>
        <v-card-text>
          <v-select
            v-model="report.cause"
            label="错误类型"
            placeholder="请选择错误类型"
            :items="report.causes"
            filled
            hide-details
            class="mb-2"
          />
          收到纠错请求后我们会再次审核此条信息以保证准确性。<br>
          <span class="red--text">注意：我们的人力资源有限，烦请不要滥用此功能，十分感谢！</span>
        </v-card-text>
        <v-card-actions>
          <v-btn
            text
            @click="report.enabled = false"
          >
            取消
          </v-btn>

          <v-spacer />

          <v-btn
            text
            color="primary"
            :loading="$store.getters.ajaxLoading"
            :disabled="report.cause === ''"
            @click="doReport"
          >
            确认
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-col
      cols="12"
      class="mx-3"
    >
      <h1 class="heading">
        医疗人员免费住宿信息
      </h1>
      <v-card>
        <v-card-text class="subtitle-2 green white--text my-2">
          医疗人员请注意：大多数住宿地点均要求各位携带相关证件（医护工作证 + 身份证）实名入住；请记得准备好上述证件后，致电相关住宿提供方确认空房情况哦～ 你们辛苦了！
        </v-card-text>
      </v-card>
      <p class="subtitle-1">
        图例：<v-icon
          small
        >
          mdi-bed-empty
        </v-icon> 表示床位剩余，<v-icon
          small
        >
          mdi-home-circle
        </v-icon> 表示房间剩余
      </p>
      <v-skeleton-loader
        :loading="$store.getters.ajaxLoading && !data.length"
        type="card@4"
      >
        <div>
          <DataTable
            :items="dataset"
          >
            <template v-slot:default="{ items }">
              <v-card
                v-for="[i, o] in items.entries()"
                :key="i"
                class="my-4 pb-2 card-border"
              >
                <v-card-title>
                  <span class="title font-weight-black">
                    {{ o.name }}
                  </span>
                </v-card-title>
                <v-card-text>
                  <span class="float-right ml-4">
                    <v-icon
                      class="mr-1"
                      small
                    >mdi-bed-empty</v-icon> {{ o.beds ? o.beds : "未知" }}
                    <br>
                    <v-icon
                      class="mr-1"
                      small
                    >mdi-home-circle</v-icon> {{ o.room ? o.room : "未知" }}
                  </span>
                  <span class="subtitle-1">
                    {{ o.province }} {{ o.city }} {{ o.suburb }}<br>地址：{{ o.address }}
                  </span>
                  <br>
                  <span
                    v-if="o.notes"
                    class="subtitle-2 red--text"
                  >
                    备注：{{ o.notes }}
                  </span>
                </v-card-text>
                <v-card-actions class="mx-2">
                  <v-btn
                    outlined
                    color="primary"
                    :href="`https://ditu.amap.com/search?query=${encodeURIComponent(o.name)}`"
                    target="_blank"
                  >
                    <v-icon left>
                      mdi-map-marker
                    </v-icon>
                    地图
                  </v-btn>
                  <v-btn
                    outlined
                    color="green"
                    @click="openDialog(o)"
                  >
                    <v-icon left>
                      mdi-contact-phone
                    </v-icon>
                    联系方式
                  </v-btn>
                  <v-spacer />
                  <v-btn
                    icon
                    color="error darken-1"
                    @click="openReport(o)"
                  >
                    <v-icon>
                      mdi-file-document-box-remove
                    </v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </template>
          </DataTable>
        </div>
      </v-skeleton-loader>
    </v-col>
  </v-row>
</template>

<script>
  import api from "../../apis/api";
  import strings from "../../utils/strings";
  import DataTable from "../../components/DataTable";

  export default {
    name: "Accommodations",
    components: {DataTable},
    data () {
      return {
        data: [],
        page: 1,
        search: "",
        selectedRegion: null,
        snackbar: false,
        dialog: {
          enabled: false,
          contact: {
            name: "",
            content: ""
          },
          address: ""
        },
        report: {
          enabled: false,
          cause: "",
          causes: ['地址不存在/未找到', '联系不上', '已被征用', '已住满', '其他原因无法接待', '缺少必需物资无法营业', '信息重复', '其他'],
          content: ""
        }
      }
    },
    computed: {
      dataset() {
        console.log(this.data)
        return this.data.filter(el => el.name.length);
      },
      xs () {
        return this.$vuetify.breakpoint.xsOnly
      },
      contacts () {
        return strings.contacts(
          this.dialog.contact.name,
          this.dialog.contact.content,
        )
      }
    },
    beforeMount() {
      if (!this.data.length) {
        this.update()
      }
    },
    methods: {
      update() {
        api.accommodations().then(({data}) => {
          this.data = data
        })
      },
      doReport() {
        api.reportIncorrect({
          type: "accommodations",
          cause: this.report.cause,
          content: this.report.content
        })
          .then(() => {
            this.snackbar = true;
            this.report.cause = ""
          })
        .finally(() => {
          this.report.enabled = false
        })
      },
      openDialog(o) {
        this.dialog.enabled = true;
        this.dialog.contact.name = o.contacts;
        this.dialog.contact.content = o.phone;
        this.dialog.address = o.address;
      },
      openReport(o) {
        this.report.enabled = true;
        this.report.content = JSON.stringify(o)
      }
    },
  }
</script>

<style scoped>
.card-border {
  border-top: 4px solid rgba(0, 0, 0, .5) !important
}
</style>
