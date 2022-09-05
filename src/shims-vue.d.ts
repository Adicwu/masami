import moment from 'moment'

declare module '@vue/runtime-core' {
  // 给`this.$http`提供类型
  export interface ComponentCustomProperties {
    $moment: moment
  }
}
