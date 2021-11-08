<template>
  <div class="editor-container">
    <a-layout>
      <a-layout-header>Header</a-layout-header>
      <a-layout>
        <a-layout-sider width="300" style="background: #fff">
          <div class="sidebar-container">
            <div class="sidebar-title">组件列表</div>
            <components-list
              :list="defaultTextTemplates"
              @onItemClick="addItem"
            />
          </div>
        </a-layout-sider>
        <a-layout style="padding: 0 24px 24px">
          <a-layout-content class="preview-container">
            <p>画布区域</p>
            <div class="preview-list" id="canvas-area">
              <edit-wrapper
                @setActive="setActive"
                v-for="component in components"
                :key="component.id"
                :id="component.id"
                :active="component.id === (currentElement && currentElement.id)"
              >
                <component
                  :is="component.name"
                  v-bind="component.props"
                ></component>
              </edit-wrapper>
            </div>
          </a-layout-content>
        </a-layout>
        <a-layout-sider
          width="300"
          style="background: #fff"
          class="settings-panel"
        >
          组件属性
          <props-table
            v-if="currentElement && currentElement.props"
            :props="currentElement.props"
            @change="handleChange"
          ></props-table>
          <pre>{{ currentElement && currentElement.props }}</pre>
        </a-layout-sider>
      </a-layout>
    </a-layout>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import { GlobalDataProps } from '@/store'
import { ComponentData } from '@/store/editor'
import { defaultTextTemplates } from '../defaultTemplates'

import ComponentsList from '@/components/ComponentsList.vue'
import PropsTable from '@/components/PropsTable.vue'
import EditWrapper from '@/components/EditWrapper.vue'
import { LImage, LText } from 'logo-components'

export default defineComponent({
  components: {
    LText,
    LImage,
    ComponentsList,
    PropsTable,
    EditWrapper
  },
  setup() {
    const store = useStore<GlobalDataProps>()
    const components = computed(() => store.state.editor.components)
    const currentElement = computed<ComponentData | null>(
      () => store.getters.getCurrentElement
    )
    const addItem = (component: any) => {
      store.commit('addComponent', component)
    }
    const setActive = (id: string) => {
      store.commit('setActive', id)
    }
    const handleChange = (e: any) => {
      store.commit('updateComponent', e)
    }
    return {
      components,
      defaultTextTemplates,
      addItem,
      setActive,
      currentElement,
      handleChange
    }
  }
})
</script>

<style scoped>
.editor-container .preview-container {
  padding: 24px;
  margin: 0;
  min-height: 85vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}
.editor-container .preview-list {
  padding: 15px;
  margin: 0;
  min-width: 360px;
  min-height: 200px;
  border: 1px solid #efefef;
  background: #fff;
  overflow-x: hidden;
  overflow-y: auto;
  position: fixed;
  margin-top: 50px;
  max-height: 80vh;
}
</style>
