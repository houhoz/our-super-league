import { Tabbar, TabbarItem, Row, Col, Sticky } from '@antmjs/vantui'
import { Unite } from '@antmjs/unite'
import { View } from '@tarojs/components'
import { navigateTo } from '@tarojs/taro'
import Container from '@/components/container'
import './index.less'

const schedules = [
  [
    {
      date: '2022-11-05 16:00',
      homeTeam: '方片♦️',
      score: '2-2',
      visitingTeam: '红桃♥️',
    },
    {
      date: '2022-11-05 16:00',
      homeTeam: '方片♦️',
      score: '2-2',
      visitingTeam: '梅花♣️',
    },
    {
      date: '2022-11-05 16:00',
      homeTeam: '梅花♣️',
      score: '2-2',
      visitingTeam: '红桃♥️',
    },
  ],
  [
    {
      date: '2022-11-02 12:00',
      homeTeam: '方片♦️',
      score: '-',
      visitingTeam: '红桃♥️',
    },
    {
      date: '2022-11-02 12:00',
      homeTeam: '方片♦️',
      score: '-',
      visitingTeam: '梅花♣️',
    },
    {
      date: '2022-11-02 12:00',
      homeTeam: '梅花♣️',
      score: '-',
      visitingTeam: '红桃♥️',
    },
  ],
]

export default Unite(
  {
    state: {
      active: 0,
    },
  },
  function ({ state }) {
    const { active } = state
    return (
      <Container
        navTitle="赛程"
        className="pages-schedule-index"
        enablePagePullDownRefresh={true}
        loading={false}
        useNav={false}
        useMenuBtns={false}
      >
        <Sticky>
          <Row className="schedule-title">
            <Col span="8">时间</Col>
            <Col span="6" style={{ textAlign: 'right' }}>
              主队
            </Col>
            <Col span="4">比分</Col>
            <Col span="6" style={{ textAlign: 'left' }}>
              客队
            </Col>
          </Row>
        </Sticky>
        <View>
          {schedules.map((item, index) => {
            return (
              <View key={index}>
                <View className="round-title">第{index + 1}轮</View>
                {item.map((v, i) => {
                  return (
                    <Row className="schedule-item" key={i}>
                      <Col span="8">{v.date}</Col>
                      <Col span="6" style={{ textAlign: 'right' }}>
                        {v.homeTeam}
                      </Col>
                      <Col span="4">{v.score}</Col>
                      <Col span="6" style={{ textAlign: 'left' }}>
                        {v.visitingTeam}
                      </Col>
                    </Row>
                  )
                })}
              </View>
            )
          })}
        </View>
        <Tabbar
          active={active}
          onChange={(e) => {
            switch (e.detail) {
              case 1:
                navigateTo({ url: '/pages/score/index' })
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
