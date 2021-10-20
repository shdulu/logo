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
    title: 'shdu 前端架构学习',
    author: 'shdulu',
    copiedCount: 1
  },
  {
    id: 3,
    coverImg:
      'https://static.imooc-lego.com/upload-files/screenshot-682056.png',
    title: 'shdu 前端架构学习',
    author: 'shdulu',
    copiedCount: 1
  },
  {
    id: 4,
    coverImg:
      'https://static.imooc-lego.com/upload-files/screenshot-677311.png',
    title: 'shdu 前端架构学习',
    author: 'shdulu',
    copiedCount: 1
  },
  {
    id: 5,
    coverImg:
      'https://static.imooc-lego.com/upload-files/screenshot-889755.png',
    title: 'shdu 前端架构学习',
    author: 'shdulu',
    copiedCount: 1
  },
  {
    id: 6,
    coverImg:
      'https://static.imooc-lego.com/upload-files/screenshot-677311.png',
    title: 'shdu 前端架构学习',
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
