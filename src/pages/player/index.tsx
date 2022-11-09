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
        className="pages-player-index"
        enablePagePullDownRefresh={true}
        loading={!info}
        useNav={false}
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
                <Col span="12">球员/球队</Col>
                <Col span="4">进球</Col>
                <Col span="4">点球</Col>
              </Row>
              <Row className="players-item">
                <Col span="4">1</Col>
                <Col span="12">手术刀/方片♦️</Col>
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
