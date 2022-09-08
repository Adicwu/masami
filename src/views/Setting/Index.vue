<template>
  <div id="setting">
    <div class="setting-box setting-themecolor">
      <div class="setting-box__title">主题色配置</div>
      <ThemeColorEditor
        ref="themeColorEditorComp"
        :themes="dfThemes"
        @onColorChanged="onColorChanged"
      />
      <div class="setting-box__control">
        <el-button type="danger" round @click="resetThemeColor">重置</el-button>
        <el-button type="primary" round @click="saveThemeColor">保存</el-button>
      </div>
    </div>
    <div class="setting-box setting-config">
      <div class="setting-box__title">参数配置</div>
      <el-form
        ref="paramFormComp"
        :model="configVal"
        :rules="paramConfig.formRules"
      >
        <el-form-item label="服务器地址" prop="serverIp">
          <el-input
            v-model="configVal.serverIp"
            :style="hideStyle"
            placeholder="如：http://192.169.1.19:8002/"
          />
        </el-form-item>
      </el-form>

      <div class="setting-box__control">
        <el-button type="primary" round @click="paramConfig.save"
          >保存</el-button
        >
      </div>
    </div>
    <div class="setting-box setting-config">
      <div class="setting-box__title">资源配置</div>
      <el-form
        ref="staticResourceFormComp"
        :model="configVal.staticResource"
        :rules="staticResourceConfig.formRules"
      >
        <el-form-item label="播放器实时进度小图标" prop="videoProgressCurIcon">
          <el-input
            v-model="configVal.staticResource.videoProgressCurIcon"
            placeholder="如：https://api.adicw.cn/uploads/UserAvatar/default.jpg"
          />
        </el-form-item>
      </el-form>

      <div class="setting-box__control">
        <el-button type="primary" round @click="staticResourceConfig.save"
          >保存</el-button
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, CSSProperties, defineComponent, reactive, ref } from 'vue'

import { getThemeInstance } from '@/theme/theme.class'

import ThemeColorEditor, {
  ThemeColorVar
} from './components/ThemeColorEditor.vue'
import { ElForm, ElNotification, FormRules } from 'element-plus'
import { useSystemConfigStore } from '@/stores/systemConfig.store'
import { useIsDev } from '@/hooks/utils'
import { REGEX_IMG } from '@/utils/regex'
import { AwDailog } from '@/components/AwDailog'

interface ConfigForm {
  formRules: FormRules
  save: () => void
}

function themeColorModule() {
  const themeColorEditorComp = ref<InstanceType<typeof ThemeColorEditor>>()
  const dfThemes = getThemeInstance()!.current

  const onColorChanged = (param: ThemeColorVar[]) => {
    getThemeInstance()?.colorVarInit(param)
  }
  const saveThemeColor = () => {
    const theme = themeColorEditorComp.value!.getCurrnetTheme()
    getThemeInstance()?.saveLocalColor(theme)
    ElNotification({
      title: '主题配置',
      message: '主题保存成功',
      type: 'success'
    })
  }
  const resetThemeColor = async () => {
    try {
      await AwDailog({
        title: '确定重置主题吗？',
        content: '注意，确认以后会传递删除当前自定义配色，并且恢复默认主题！'
      })
      getThemeInstance()?.clearLocalColor()
      themeColorEditorComp.value!.reset()
    } catch {
      //
    }
  }

  return {
    themeColorEditorComp,
    onColorChanged,
    saveThemeColor,
    resetThemeColor,
    dfThemes
  }
}

function configModule() {
  const paramFormComp = ref<InstanceType<typeof ElForm>>()
  const staticResourceFormComp = ref<InstanceType<typeof ElForm>>()

  const systemConfigStore = useSystemConfigStore()
  const configVal = reactive({
    serverIp: systemConfigStore.serverIp,
    staticResource: systemConfigStore.staticResource
  })
  /** 参数配置 */
  const paramConfig: ConfigForm = {
    formRules: {
      serverIp: [
        {
          trigger: 'blur',
          validator(rule, value, callback) {
            if (value) {
              callback()
            } else {
              callback(new Error('请检查地址格式'))
            }
          }
        }
      ]
    },
    async save() {
      try {
        await paramFormComp.value!.validate()
        systemConfigStore.saveServerIp(configVal.serverIp)
        // ElNotification({
        //   title: '参数配置',
        //   message: '参数保存成功',
        //   type: 'success'
        // })
        location.reload()
      } catch (e) {
        // console.log(e)
      }
    }
  }
  /** 资源配置 */
  const staticResourceConfig: ConfigForm = {
    formRules: {
      videoProgressCurIcon: [
        {
          trigger: 'blur',
          validator(rule, value, callback) {
            if (REGEX_IMG.test(value) || value === '') {
              callback()
            } else {
              callback(new Error('请检查地址格式'))
            }
          }
        }
      ]
    },
    async save() {
      try {
        await staticResourceFormComp.value!.validate()
        systemConfigStore.saveStaticResource(configVal.staticResource)
        ElNotification({
          title: '资源配置',
          message: '保存成功',
          type: 'success'
        })
      } catch (e) {
        // console.log(e)
      }
    }
  }

  return {
    paramFormComp,
    staticResourceFormComp,
    configVal,
    staticResourceConfig,
    paramConfig
  }
}

export default defineComponent({
  name: 'Setting',
  components: {
    ThemeColorEditor
  },
  setup() {
    const isDev = useIsDev().get()
    const hideStyle = computed(
      () =>
        ({
          // opacity: isDev ? 0 : 1
        } as CSSProperties)
    )
    return {
      hideStyle,
      ...themeColorModule(),
      ...configModule()
    }
  }
})
</script>
<style lang="less" scoped>
#setting {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;

  .setting-box {
    width: 100%;
    background: var(--box-bg-color);
    padding: 30px;
    box-sizing: border-box;
    border-top-left-radius: var(--df-radius);
    border-bottom-left-radius: var(--df-radius);
    margin-bottom: 30px;

    &__title {
      font-weight: 600;
      font-size: 20px;
      padding-bottom: 20px;
    }

    &__control {
      margin-top: 20px;
    }
  }

  // .setting-themecolor {
  // height: 400px;
  // }
  .setting-config {
    ::v-deep(.el-form) {
      width: 400px;
    }
  }
}
</style>
