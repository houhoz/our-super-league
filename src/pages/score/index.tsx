import { Tabbar, TabbarItem, Row, Col } from '@antmjs/vantui'
import { Unite } from '@antmjs/unite'
import { redirectTo } from '@tarojs/taro'
import Container from '@/components/container'
import './index.less'

export default Unite(
  {
    state: {
      active: 1,
    },
  },
  function ({ state }) {
    const { active } = state
    return (
      <Container
        navTitle="积分榜"
        className="pages-score-index"
        enablePagePullDownRefresh={true}
        loading={false}
        useMenuBtns={false}
      >
        <Row className="score-title">
          <Col span="2">排名</Col>
          <Col span="6">球队</Col>
          <Col span="2">场次</Col>
          <Col span="5">胜/平/负</Col>
          <Col span="5">进/失球</Col>
          <Col span="4">积分</Col>
        </Row>
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
                redirectTo({ url: '/pages/schedule/index' })
                break
              case 2:
                redirectTo({ url: '/pages/player/index' })
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
