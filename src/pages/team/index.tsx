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
import { redirectTo } from '@tarojs/taro'
import Container from '@/components/container'
import './index.less'

export default Unite(
  {
    state: {
      active: 3,
      activeKey: 0,
    },
  },
  function ({ state, events }) {
    const { setState } = events
    const { active, activeKey } = state
    return (
      <Container
        navTitle="球队榜"
        className="pages-team-index"
        enablePagePullDownRefresh={true}
        loading={false}
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
                redirectTo({ url: '/pages/schedule/index' })
                break
              case 1:
                redirectTo({ url: '/pages/score/index' })
                break
              case 2:
                redirectTo({ url: '/pages/player/index' })
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
