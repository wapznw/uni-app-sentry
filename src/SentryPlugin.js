import * as Sentry from "sentry-miniapp2"
import config from '@/config'

const envs = {
  L: 'local',
  D: 'development',
  T: 'test',
  P: 'production'
}

export default {
  install(Vue) {
    console.log('sentry init')
    Sentry.init({
      // Vue,
      dsn: "https://1741bd4a48734ebeb62662470679ca48@sentry.d.o7r.cn:8443/5",
      integrations: [
        new Sentry.Integrations.Breadcrumbs({
          console: ['error'],
          // console: false,
          realtimeLog: false,
          api: ['chooseImage', 'uploadFile', 'authorize', 'chooseLocation', 'setStorageSync', 'setStorage', 'getLocation', 'login', 'getImageInfo', 'makePhoneCall', 'createBLEConnection', 'openBluetoothAdapter'],
          // filterApis: ['canIUse', 'getSystemInfo', 'getMenuButtonBoundingClientRect', 'setStorageSync', 'getStorageSync', 'createSelectorQuery']
        }),
        new Sentry.Integrations.System(),
        new Sentry.Integrations.Router({
          enable: true
        }),
        new Sentry.Integrations.GlobalHandlers({
          onerror: true,
          onunhandledrejection: true,
          onpagenotfound: true,
          onmemorywarning: true,
        }),
        new Sentry.Integrations.LinkedErrors(),
        new Sentry.Integrations.TryCatch(),
        new Sentry.Integrations.IgnoreMpcrawlerErrors(),
      ],
      // ignoreErrors: [/ResizeObserver loop limit exceeded/i],
      release: config.version,
      logErrors: true,
      logLevel: 1,
      environment: envs[process.env.VUE_APP_MODE || 'D'],
      // Set tracesSampleRate to 1.0 to capture 100%
      // of transactions for performance monitoring.
      // We recommend adjusting this value in production
      // tracesSampleRate: 1.0,
      //   initialScope: userInfo && {
      //     user: {
      //       id: userInfo?.userId,
      //       username: userInfo?.userName,
      //       roleName: userInfo.roleName,
      //       deptId: userInfo.deptId,
      //     }
      //   },
      beforeBreadcrumb(breadcrumb, hint) {
        console.log('beforeBreadcrumb', breadcrumb)
        return breadcrumb
      },
      beforeSend(event, hint) {
        event.exception.values.forEach(exception => {
          exception.stacktrace.frames.forEach(file => {
            file.filename = file.filename.replace('https://usr/', '')
          })
        })

        return event
      }
    })
  }
}
