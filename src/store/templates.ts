import { Module } from 'vuex'
import { GlobalDataProps } from './index'

export interface TemplateProps {
  id: number
  title: string
  coverImg: string
  author: string
  copiedCount: number
}

export const testTemplates: TemplateProps[] = [
  {
    id: 1,
    coverImg:
      'https://static.imooc-lego.com/upload-files/screenshot-889755.png',
    title: 'test title 1',
    author: 'shdulu',
    copiedCount: 1
  },
  {
    id: 2,
    coverImg:
      'https://static.imooc-lego.com/upload-files/screenshot-677311.png',
    title: 'mock模板1',
    author: 'shdulu',
    copiedCount: 1
  },
  {
    id: 3,
    coverImg:
      'https://static.imooc-lego.com/upload-files/screenshot-682056.png',
    title: 'mock模板2',
    author: 'shdulu',
    copiedCount: 1
  },
  {
    id: 4,
    coverImg:
      'https://static.imooc-lego.com/upload-files/screenshot-677311.png',
    title: 'mock模板3',
    author: 'shdulu',
    copiedCount: 1
  },
  {
    id: 5,
    coverImg:
      'https://static.imooc-lego.com/upload-files/screenshot-889755.png',
    title: 'mock模板4',
    author: 'shdulu',
    copiedCount: 1
  },
  {
    id: 6,
    coverImg:
      'https://static.imooc-lego.com/upload-files/screenshot-677311.png',
    title: 'mock模板5',
    author: 'shdulu',
    copiedCount: 1
  }
]

export interface TemplatesProps {
  data: TemplateProps[]
}
const templates: Module<TemplatesProps, GlobalDataProps> = {
  state: {
    data: testTemplates
  },
  getters: {
    getTemplateById: (state) => (id: number) => {
      return state.data.find((t) => t.id === id)
    }
  }
}

export default templates
