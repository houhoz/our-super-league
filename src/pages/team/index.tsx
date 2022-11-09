import { useRecoilState } from 'recoil'
import {
  Tabbar,
  TabbarItem,
  Sidebar,
  SidebarItem,
  Row,
  Col,
} from '@antmjs/vantui'
import { Unite } from '@antmjs/unite'
import { View } from '@tarojs/components'
import { useReachBottom, navigateTo } from '@tarojs/taro'
import Container from '@/components/container'
import { getRoleListCommon } from '@/actions/simple/common'
import { menuButtonStore } from '@/store'
import './index.less'

export default Unite(
  {
    state: {
      info: null,
      active: 2,
      activeKey: 0,
    },
    async onLoad() {
      // const datap = await petClient.addPet({
      //   body: { name: 'xx', photoUrls: ['xxx'] },
      // })
      const data = await getRoleListCommon({})
      this.setState({
        info: data,
      })
    },
  },
  function ({ state, events }) {
    useReachBottom(() => {
      console.log(999)
    })
    const { setHooks, setState } = events
    const { info, active, activeKey } = state
    const [menuButton, setMenuButton]: any = useRecoilState(menuButtonStore)
    // 可以将hooks的数据传递到实例上面，可以通过this.hooks['xxx']获取到，不过hooks是异步的，所以在不同的阶段取值有可能取不到，这是由业务决定的
    setHooks({
      xxx: menuButton,
      yyy: setMenuButton,
    })
    return (
      <Container
        navTitle="首页"
        className="pages-team-index"
        enablePagePullDownRefresh={true}
        loading={!info}
        useNav={false}
        useMenuBtns={false}
      >
        <View className="team-wrap">
          <Sidebar
            activeKey={activeKey}
            onChange={(e) => setState({ activeKey: e.detail })}
          >
            <SidebarItem title="进球" />
            <SidebarItem title="失球" />
            <SidebarItem title="黄牌" />
            <SidebarItem title="红牌" />
          </Sidebar>
          <View className="teams">
            <Row className="teams-title">
              <Col span="5">排名</Col>
              <Col span="14">球队</Col>
              <Col span="5">总计</Col>
            </Row>
            {activeKey === 0 && (
              <Row className="teams-item">
                <Col span="5">1</Col>
                <Col span="14">方片♦️</Col>
                <Col span="5">6</Col>
              </Row>
            )}
            {activeKey === 1 && (
              <Row className="teams-item">
                <Col span="5">1</Col>
                <Col span="14">方片♦️</Col>
                <Col span="5">6</Col>
              </Row>
            )}
            {activeKey === 2 && (
              <Row className="teams-item">
                <Col span="5">1</Col>
                <Col span="14">方片♦️</Col>
                <Col span="5">6</Col>
              </Row>
            )}
            {activeKey === 3 && (
              <Row className="teams-item">
                <Col span="5">1</Col>
                <Col span="14">方片♦️</Col>
                <Col span="5">6</Col>
              </Row>
            )}
          </View>
        </View>
        <Tabbar
          active={active}
          onChange={(e) => {
            switch (e.detail) {
              case 0:
                navigateTo({ url: '/pages/schedule/index' })
                break
              case 1:
                navigateTo({ url: '/pages/score/index' })
                break
              case 3:
                navigateTo({ url: '/pages/team/index' })
                break
              default:
                break
            }
          }}
          safeAreaInsetBottom={true}
        >
          <TabbarItem icon="points">赛程</TabbarItem>
          <TabbarItem icon="bar-chart-o">积分榜</TabbarItem>
          <TabbarItem icon="manager-o">球员榜</TabbarItem>
          <TabbarItem icon="friends-o">球队榜</TabbarItem>
        </Tabbar>
      </Container>
    )
  },
  { page: true },
)

definePageConfig({
  // 这里不要设置标题，在Container组件上面设置
  navigationBarTitleText: '',
})
