import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import I18n from "../i18n";
import Accommodations from "../views/lists/Accommodations";
// import PsychologicalPlatforms from "../views/PsychologicalPlatforms";
// import MedicalPlatforms from '../views/MedicalPlatforms';
import Supplies from "../views/supplies/Supplies";
// import SuppliesSubmission from "../views/supplies/SuppliesSubmission";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      icon: "mdi-home",
      i18n: "pages.home._name"
    }
  },
  // {
  //   path: '/stream',
  //   name: 'stream',
  //   component: Stream,
  //   meta: {
  //     icon: "mdi-timeline-clock",
  //     i18n: "pages.stream._name"
  //   }
  // },
  {
    path: '/accommodations',
    name: 'accommodations',
    component: Accommodations,
    meta: {
      icon: "mdi-hotel",
      i18n: "pages.accommodations._name",
      subtitle: "为医护人员提供免费住宿信息列表，便于查看"
    }
  },
  {
    path: '/hospital/supplies',
    name: 'supplies',
    component: Supplies,
    meta: {
      icon: "mdi-hospital",
      i18n: "pages.supplies._name",
      subtitle: "医院物资需求发布平台；支持紧急程度与需求核验公示、按照地区过滤等多种功能，以便社会各界能更好地帮助他们"
    }
  },
  // {
  //   path: '/hospital/supplies/submit',
  //   name: 'suppliesSubmission',
  //   component: SuppliesSubmission,
  //   meta: {
  //     icon: "mdi-file-document-box-plus",
  //     i18n: "pages.suppliesSubmission._name",
  //     subtitle: "提交新的医院物资需求"
  //   }
  // },
  // {
  //     path: '/platforms',
  //     name: 'platforms',
  //     component: MedicalPlatforms,
  //     meta: {
  //         icon: "mdi-hospital",
  //         i18n: "pages.platforms._name"
  //     }
  // },
  // {
  //     path: '/psychological',
  //     name: 'psychological',
  //     component: PsychologicalPlatforms,
  //     meta: {
  //         icon: "mdi-heart",
  //         i18n: "pages.psychological._name"
  //     }
  // },
  {
    path: '*',
    beforeEnter: (to, from, next) => {
      next({path: "/"})
    },
    meta: {
      hide: true
    }
  },
];

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  document.title = `${I18n.t(to.meta.i18n)} | ${I18n.t('app.name')}`;
  next();
});

export default router
