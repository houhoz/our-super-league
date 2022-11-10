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
      active: 2,
      activeKey: 0,
    },
  },
  function ({ state, events }) {
    const { setState } = events
    const { active, activeKey } = state
    return (
      <Container
        navTitle="球员榜"
        className="pages-player-index"
        enablePagePullDownRefresh={true}
        loading={false}
        useMenuBtns={false}
      >
        <View className="player-wrap">
          <Sidebar
            activeKey={activeKey}
            onChange={(e) => setState({ activeKey: e.detail })}
          >
            <SidebarItem title="射手榜" />
            <SidebarItem title="助攻榜" />
            <SidebarItem title="零封榜" />
          </Sidebar>
          {activeKey === 0 && (
            <View className="players">
              <Row className="players-title">
                <Col span="4">排名</Col>
                <Col span="6">球员</Col>
                <Col span="6">球队</Col>
                <Col span="4">进球</Col>
                <Col span="4">点球</Col>
              </Row>
              <Row className="players-item">
                <Col span="4">1</Col>
                <Col span="6">手术刀</Col>
                <Col span="6">方片♦️</Col>
                <Col span="4">2</Col>
                <Col span="4">1</Col>
              </Row>
            </View>
          )}
          {activeKey === 1 && (
            <View className="players">
              <Row className="players-title">
                <Col span="5">排名</Col>
                <Col span="14">球员/球队</Col>
                <Col span="5">总计</Col>
              </Row>
              <Row className="players-item">
                <Col span="5">1</Col>
                <Col span="14">手术刀/方片♦️</Col>
                <Col span="5">2</Col>
              </Row>
            </View>
          )}
          {activeKey === 2 && (
            <View className="players">
              <Row className="players-title">
                <Col span="5">排名</Col>
                <Col span="14">球员/球队</Col>
                <Col span="5">总计</Col>
              </Row>
              <Row className="players-item">
                <Col span="5">1</Col>
                <Col span="14">手术刀/方片♦️</Col>
                <Col span="5">1</Col>
              </Row>
            </View>
          )}
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
              case 3:
                redirectTo({ url: '/pages/team/index' })
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
