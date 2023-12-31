import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { SCAN_ROUTES } from "@/config";

const modules: any = import.meta.glob("./modules/**/*.ts", { eager: true });

const routes: Array<RouteRecordRaw> = [];
for (const key in modules) {
  if (!SCAN_ROUTES && key.includes("scanRouter")) continue;
  routes.push(...modules[key].default);
}

const router = createRouter({
  history: createWebHashHistory(), // history 模式则使用 createWebHistory()
  routes,
});

router.beforeEach(async (_to, _from, next) => {
  NProgress.start();
  next();
});

router.afterEach((_to) => {
  NProgress.done();
});

export default router;
