import { useRecoilState } from 'recoil'
import { Tabbar, TabbarItem, Row, Col, Sticky } from '@antmjs/vantui'
import { Unite } from '@antmjs/unite'
import { useReachBottom, navigateTo } from '@tarojs/taro'
import Container from '@/components/container'
import { getRoleListCommon } from '@/actions/simple/common'
import { menuButtonStore } from '@/store'
import './index.less'

export default Unite(
  {
    state: {
      info: null,
      active: 1,
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
    const { setHooks } = events
    const { info, active } = state
    const [menuButton, setMenuButton]: any = useRecoilState(menuButtonStore)
    // 可以将hooks的数据传递到实例上面，可以通过this.hooks['xxx']获取到，不过hooks是异步的，所以在不同的阶段取值有可能取不到，这是由业务决定的
    setHooks({
      xxx: menuButton,
      yyy: setMenuButton,
    })
    return (
      <Container
        navTitle="首页"
        className="pages-score-index"
        enablePagePullDownRefresh={true}
        loading={!info}
        useNav={false}
        useMenuBtns={false}
      >
        <Sticky>
          <Row className="score-title">
            <Col span="2">排名</Col>
            <Col span="6">球队</Col>
            <Col span="2">场次</Col>
            <Col span="5">胜/平/负</Col>
            <Col span="5">进/失球</Col>
            <Col span="4">积分</Col>
          </Row>
        </Sticky>
        <Row className="score-item">
          <Col span="2">1</Col>
          <Col span="6">方片♦️</Col>
          <Col span="2">2</Col>
          <Col span="5">1/1/0</Col>
          <Col span="5">5/2</Col>
          <Col span="4">4</Col>
        </Row>
        <Tabbar
          active={active}
          onChange={(e) => {
            switch (e.detail) {
              case 0:
                navigateTo({ url: '/pages/schedule/index' })
                break
              case 2:
                navigateTo({ url: '/pages/player/index' })
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
