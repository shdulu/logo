import { mount, VueWrapper } from '@vue/test-utils'
import { message } from 'ant-design-vue'
import store from '@/store/index'
import UserProfile from '@/components/UserProfile.vue'

let wrapper: VueWrapper<any>

// 使用jest 接管 ant-design-vue
jest.mock('ant-design-vue', () => ({
  //
  message: {
    success: jest.fn() // jest.fn 接管success函数
  }
}))
const mockedRoutes: string[] = []
jest.mock('vue-router', () => ({
  useRouter: () => ({
    push: (url: string) => mockedRoutes.push(url) // mock路由实现
  })
}))

const mockComponent = {
  template: '<div><slot></slot></div>'
}

const mockComponent2 = {
  template: '<div><slot></slot><slot name="overlay"></slot></div>'
}

const globalComponents = {
  'a-button': mockComponent,
  'a-dropdown-button': mockComponent2,
  'router-link': mockComponent,
  'a-menu': mockComponent,
  'a-menu-item': mockComponent
}

describe('UserProfile component', () => {
  beforeAll(() => {
    // 用例运行前
    jest.useFakeTimers() // 处理setTimeout
    wrapper = mount(UserProfile, {
      props: {
        user: { isLogin: false }
      },
      global: {
        components: globalComponents,
        provide: {
          // 注入store
          store
        }
      }
    })
  })
  it('should render login button when login is false', () => {
    console.log(wrapper.html())
    expect(wrapper.get('div').text()).toBe('登录')
  })
  it('should call message and update store when clicking login', async () => {
    await wrapper.get('div').trigger('click')
    expect(message.success).toHaveBeenCalled()
    expect(store.state.user.userName).toBe('shdulu')
  })
  it('should render username when login is true', async () => {
    await wrapper.setProps({
      user: { isLogin: true, userName: 'shdulu' }
    })
    console.log(wrapper.html())
    expect(wrapper.get('.user-profile-component').html()).toContain('shdulu')
    expect(wrapper.find('.user-profile-dropdown').exists()).toBeTruthy()
  })
  it('should call logout and show message,call router.push after timeout', async () => {
    await wrapper.get('.user-profile-dropdown div').trigger('click')
    expect(store.state.user).toBeTruthy()
    expect(message.success).toHaveBeenCalledTimes(1)
    jest.runAllTimers() // 假设所有的setTimeout 已经结束
    expect(mockedRoutes).toEqual(['/'])
    // tobe 全等，对象引用地址也会比较  toEqual 值等不会对比引用地址
  })
  afterEach(() => {
    // 这次用例执行完成后要执行一次 mockReset 防止用例之间mock状态相互影响
    ;(message as jest.Mocked<typeof message>).success.mockReset()
  })
})
