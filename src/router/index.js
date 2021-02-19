import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/Home',
    name: 'Main',
    component: Main,
    children: [
      {
        path: '/Home',
        name: 'Home',
        component: () => import('../views/Home.vue')
      },
      {
        path: '/Promo',
        name: 'Promo',
        component: () => import('../views/Promo.vue')
      },
      {
        path: '/Sports',
        name: 'Sports',
        component: () => import('../views/Sports.vue')
      },
      {
        path: '/Live',
        name: 'Live',
        component: () => import('../views/Live.vue')
      },
      {
        path: '/Bingo',
        name: 'Bingo',
        component: () => import('../views/Bingo.vue')
      },
      {
        path: '/Slots',
        name: 'Slots',
        component: () => import('../views/Slots.vue')
      },
      {
        path: '/ChessGame',
        name: 'ChessGame',
        component: () => import('../views/ChessGame.vue')
      },
      {
        path: '/Fishing',
        name: 'Fishing',
        component: () => import('../views/Fishing.vue')
      },
      {
        path: '/HelpCenter',
        redirect: '/HelpCenter/About',
        name: 'HelpCenter',
        component: () => import('../views/HelpCenterPages/HelpCenter.vue'),
        children: [
          {
            path: '/HelpCenter/About',
            name: 'About',
            component: () =>
              import('../views/HelpCenterPages/components/About.vue')
          },
          {
            path: '/HelpCenter/Rules',
            name: 'Rules',
            component: () =>
              import('../views/HelpCenterPages/components/Rules.vue')
          },
          {
            path: '/HelpCenter/Question',
            name: 'Question',
            component: () =>
              import('../views/HelpCenterPages/components/Question.vue')
          },
          {
            path: '/HelpCenter/AgentHelp',
            name: 'AgentHelp',
            component: () =>
              import('../views/HelpCenterPages/components/AgentHelp.vue')
          },
          {
            path: '/HelpCenter/DepositHelp',
            name: 'DepositHelp',
            component: () =>
              import('../views/HelpCenterPages/components/DepositHelp.vue')
          },
          {
            path: '/HelpCenter/WithdrawalHelp',
            name: 'WithdrawalHelp',
            component: () =>
              import('../views/HelpCenterPages/components/WithdrawalHelp.vue')
          },
          {
            path: '/HelpCenter/ContactUs',
            name: 'ContactUs',
            component: () =>
              import('../views/HelpCenterPages/components/ContactUs.vue')
          }
        ]
      },
      {
        path: '/MemberCenter',
        redirect: '/MemberCenter/Profile',
        name: 'MemberCenter',
        component: () => import('../views/MemberCenterPages/MemberCenter.vue'),
        children: [
          {
            path: '/MemberCenter/Profile',
            name: 'Profile',
            component: () =>
              import('../views/MemberCenterPages/components/Profile.vue')
          },
          {
            path: '/MemberCenter/BankCard',
            name: 'BankCard',
            component: () =>
              import('../views/MemberCenterPages/components/BankCard.vue')
          },
          {
            path: '/MemberCenter/Wallet',
            name: 'Wallet',
            component: () =>
              import('../views/MemberCenterPages/components/Wallet.vue')
          },
          {
            path: '/MemberCenter/Deposit',
            name: 'Deposit',
            component: () =>
              import('../views/MemberCenterPages/components/Deposit.vue')
          },
          {
            path: '/MemberCenter/Withdrawal',
            name: 'Withdrawal',
            component: () =>
              import('../views/MemberCenterPages/components/Withdrawal.vue')
          },
          {
            path: '/MemberCenter/TradeRecord',
            name: 'TradeRecord',
            component: () =>
              import('../views/MemberCenterPages/components/TradeRecord.vue')
          },
          {
            path: '/MemberCenter/BetRecord',
            name: 'BetRecord',
            component: () =>
              import('../views/MemberCenterPages/components/BetRecord.vue')
          },
          {
            path: '/MemberCenter/Announce',
            name: 'Announce',
            component: () =>
              import('../views/MemberCenterPages/components/Announce.vue')
          },
          {
            path: '/MemberCenter/Message',
            name: 'Message',
            component: () =>
              import('../views/MemberCenterPages/components/Message.vue')
          },
          {
            path: '/MemberCenter/MyActivity',
            name: 'MyActivity',
            component: () =>
              import('../views/MemberCenterPages/components/MyActivity.vue')
          },
          {
            path: '/MemberCenter/ModifyPassword',
            name: 'ModifyPassword',
            component: () =>
              import('../views/MemberCenterPages/components/ModifyPassword.vue')
          }
        ]
      }
    ]
  },
  {
    path: '/Collaboration',
    name: 'Collaboration',
    component: () => import('../views/Collaboration.vue')
  },
  {
    path: '/Login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/Register',
    name: 'Register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/ipNotAllow',
    name: 'ipNotAllow',
    component: () =>
      import(/* webpackChunkName: "404" */ '../views/ipNotAllow.vue')
  },
  {
    path: '/404',
    name: '404',
    // route level code-splitting
    // this generates a separate chunk (404.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "404" */ '../views/404.vue')
  },
  { path: '*', redirect: '/404', hidden: true }
]

const router = new VueRouter({
  mode: 'hash',
  base: '/Home',
  // process.env.BASE_URL
  routes,
  scrollBehavior(to) {
    if (to.hash && !to.hash.includes('page')) {
      return window.scrollTo({
        top: document.querySelector(to.hash).offsetTop,
        behavior: 'smooth'
      })
    }
    return window.scrollTo({ top: 0, behavior: 'smooth' })
  }
})

export default router
