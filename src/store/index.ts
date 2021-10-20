import { createStore } from 'vuex'

import templates, { TemplatesProps } from './templates'

export interface GlobalDataProps {
  templates: TemplatesProps
}

const store = createStore({
  modules: {
    templates
  }
})
export default store
