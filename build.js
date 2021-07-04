const shellExec = require('shell-exec')
const glob = require('glob')
const fs = require('fs')
const AdmZip = require("adm-zip");

const pkg = require('./src/version.json')
const YOUR_APPID = process.env.WX_APPID //
const YOUR_APPID_KEY = process.env.WX_APPID_KEY //
const YOUR_PROJECT = process.env.WX_PROJECT || './dist/build/mp-weixin'
const WX_ROBOT = process.env.WX_ROBOT || '1'
const SOURCE_MAP_PATH = './dist/build/mp-weixin-sourcemap.zip'
const SOURCE_MAP_DIR = './dist/build/sourcemap'


const buildApp = async (command) => {
  const result = await shellExec(command)
  // console.log(result)
  if (result.code === 0) {
    console.log(result.stdout);
    return true
  }
  throw new Error(result.stderr)
}

const uploadApp = async () => {
  console.log('upload app...')
  let res = await shellExec(`miniprogram-ci upload --pp ${YOUR_PROJECT} --appid ${YOUR_APPID} --pkp ${YOUR_APPID_KEY} --uv ${pkg.version} -r ${WX_ROBOT}`)
  if (res.code !== 0) {
    throw new Error(res.stderr)
  }
  console.log(res.stdout);
  console.log('get source-map')
  res = await shellExec(`miniprogram-ci get-dev-source-map --pp ${YOUR_PROJECT} --appid ${YOUR_APPID} --pkp ${YOUR_APPID_KEY} --uv ${pkg.version} -r ${WX_ROBOT} --source-map-save-path ${SOURCE_MAP_PATH}`)
  if (res.code !== 0) {
    throw new Error(res.stderr)
  }
  console.log(res.stdout);
}

const uploadSourceMap = async (sourcePath) => {
  console.log(`upload source-map ${sourcePath}`)
  let res = await shellExec(`./node_modules/.bin/sentry-cli releases files "${pkg.version}" upload-sourcemaps ${sourcePath}`)
  if (res.code !== 0) {
    throw new Error(res.stderr)
  }
}

const unzipSourceMap = async () => {
  if (!fs.existsSync(SOURCE_MAP_PATH)) {
    throw Error('source-map文件未找到')
  }
  if (SOURCE_MAP_DIR.length > 5) {
    await shellExec(`rm -rf ${SOURCE_MAP_DIR}`)
  }
  if (!fs.existsSync(SOURCE_MAP_DIR)) {
    fs.mkdirSync(SOURCE_MAP_DIR, {
      recursive: true
    })
  }

  new AdmZip(SOURCE_MAP_PATH, {}).extractAllTo(SOURCE_MAP_DIR, true)
  const files = glob.sync(`${SOURCE_MAP_DIR}/**/*.*`)
  files.forEach(file => {
    fs.writeFileSync(file.substring(0, file.length - 4), '//# sourceMappingURL=app-service.js.map\n')
  })
  if (fs.existsSync(`${SOURCE_MAP_DIR}/__APP__`)) {
    await uploadSourceMap(`${SOURCE_MAP_DIR}/__APP__`)
  }
  if (fs.existsSync(SOURCE_MAP_DIR + '/pages')) {
    await uploadSourceMap(`${SOURCE_MAP_DIR}/pages`)
  }
}

async function build(){
  const packageContent = fs.readFileSync('./src/version.json')
  try {
    pkg.version = process.env.RELEASE_VERSION || '1.0.0'
    fs.writeFileSync('./src/version.json', JSON.stringify(pkg))
    await buildApp('yarn build:mp-weixin')
    await uploadApp()
    await unzipSourceMap()
  } catch (e) {
    console.error(e)
  } finally {
    fs.writeFileSync('./src/version.json', packageContent)
  }
}

build().catch()
