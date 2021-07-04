import * as Sentry from "sentry-miniapp2"
// import {Integrations} from "@sentry/tracing"
// import { CaptureConsole } from '@sentry/integrations'
import config from '@/config'
// import Storage from "@/libs/storage"

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
            // integrations: [
            //     // new Sentry.Integrations.System(),
            //     new Sentry.Integrations.Router({
            //         enable: true
            //     }),
            //     new Sentry.Integrations.GlobalHandlers({
            //         onerror: true,
            //         onunhandledrejection: true,
            //         onpagenotfound: true,
            //         onmemorywarning: true,
            //     }),
            //     new Sentry.Integrations.LinkedErrors(),
            //     new Sentry.Integrations.TryCatch(),
            // ],
            //   integrations: [
            //     new Integrations.BrowserTracing(),
            //     new CaptureConsole({
            //       levels: ['error']
            //     })
            //   ],
            // integrations: [
            //     new Sentry.Integrations.Breadcrumbs({
            //         console: true,
            //         realtimeLog: ['error'], // https://developers.weixin.qq.com/miniprogram/dev/framework/realtimelog/
            //         request: true,
            //         navigation: true,
            //         api: true,
            //         lifecycle: true,
            //         unhandleError: true
            //     }),
            //     new Sentry.Integrations.TryCatch(),
            //     new Sentry.Integrations.GlobalHandlers()
            // ],
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
                    // if (exception.type === 'Error') {
                    //     const frames = []
                    //     exception.value.split('\n').forEach(line => {
                    //         const parts = miniapp.exec(line)
                    //         if (parts) {
                    //             let element = {
                    //                 url: parts[2],
                    //                 func: parts[1] || '?',
                    //                 args: [],
                    //                 line: parts[3] ? +parts[3] : null,
                    //                 column: parts[4] ? +parts[4] : null,
                    //             }
                    //             frames.push(element)
                    //         }
                    //     })
                    //     console.log(exception.value.split('\n'));
                    // }
                    exception.stacktrace.frames.forEach(file => {
                        file.filename = file.filename.replace('https://usr/', '')
                    })
                })

                // console.log(event);
                return event
            }
        })
    }
}
