export const pagesPath = {
  "backup": {
    $url: (url?: { hash?: string | undefined } | undefined) => ({ pathname: '/backup' as const, hash: url?.hash })
  },
  "contact": {
    $url: (url?: { hash?: string | undefined } | undefined) => ({ pathname: '/contact' as const, hash: url?.hash })
  },
  "developer": {
    $url: (url?: { hash?: string | undefined } | undefined) => ({ pathname: '/developer' as const, hash: url?.hash })
  },
  "drafts": {
    $url: (url?: { hash?: string | undefined } | undefined) => ({ pathname: '/drafts' as const, hash: url?.hash })
  },
  "epubgen": {
    $url: (url?: { hash?: string | undefined } | undefined) => ({ pathname: '/epubgen' as const, hash: url?.hash })
  },
  "error": {
    $url: (url?: { hash?: string | undefined } | undefined) => ({ pathname: '/error' as const, hash: url?.hash })
  },
  "policy": {
    $url: (url?: { hash?: string | undefined } | undefined) => ({ pathname: '/policy' as const, hash: url?.hash })
  },
  "profile": {
    $url: (url?: { hash?: string | undefined } | undefined) => ({ pathname: '/profile' as const, hash: url?.hash })
  },
  "published": {
    $url: (url?: { hash?: string | undefined } | undefined) => ({ pathname: '/published' as const, hash: url?.hash })
  },
  "textlint": {
    $url: (url?: { hash?: string | undefined } | undefined) => ({ pathname: '/textlint' as const, hash: url?.hash })
  },
  "thanks": {
    $url: (url?: { hash?: string | undefined } | undefined) => ({ pathname: '/thanks' as const, hash: url?.hash })
  },
  $url: (url?: { hash?: string | undefined } | undefined) => ({ pathname: '/' as const, hash: url?.hash })
};

export type PagesPath = typeof pagesPath;

export const staticPath = {
  $22878546_jpg: '/22878546.jpg',
  Next_drawio_png: '/Next.drawio.png',
  Reterature_png: '/Reterature.png',
  android_chrome_128x128_png: '/android-chrome-128x128.png',
  android_chrome_144x144_png: '/android-chrome-144x144.png',
  android_chrome_152x152_png: '/android-chrome-152x152.png',
  android_chrome_16x16_png: '/android-chrome-16x16.png',
  android_chrome_180x180_png: '/android-chrome-180x180.png',
  android_chrome_192x192_png: '/android-chrome-192x192.png',
  android_chrome_256x256_png: '/android-chrome-256x256.png',
  android_chrome_36x36_png: '/android-chrome-36x36.png',
  android_chrome_384x384_png: '/android-chrome-384x384.png',
  android_chrome_48x48_png: '/android-chrome-48x48.png',
  android_chrome_512x512_png: '/android-chrome-512x512.png',
  android_chrome_72x72_png: '/android-chrome-72x72.png',
  android_chrome_96x96_png: '/android-chrome-96x96.png',
  appconfig_png: '/appconfig.png',
  arrowSave_png: '/arrowSave.png',
  bibi: {
    and: {
      jo_js: '/bibi/and/jo.js'
    },
    extensions: {
      analytics_js: '/bibi/extensions/analytics.js',
      epubcfi_js: '/bibi/extensions/epubcfi.js',
      extractor: {
        at_once_js: '/bibi/extensions/extractor/at-once.js',
        on_the_fly_bibi_zip_loader_worker_alt_js: '/bibi/extensions/extractor/on-the-fly.bibi-zip-loader.worker.alt.js',
        on_the_fly_bibi_zip_loader_worker_js: '/bibi/extensions/extractor/on-the-fly.bibi-zip-loader.worker.js',
        on_the_fly_js: '/bibi/extensions/extractor/on-the-fly.js'
      },
      sanitizer_js: '/bibi/extensions/sanitizer.js',
      unaccessibilizer_js: '/bibi/extensions/unaccessibilizer.js',
      zine_js: '/bibi/extensions/zine.js'
    },
    index_html: '/bibi/index.html',
    presets: {
      README_md: '/bibi/presets/README.md',
      costum_Preset_js: '/bibi/presets/costum-Preset.js',
      default_js: '/bibi/presets/default.js'
    },
    resources: {
      scripts: {
        bibi_js: '/bibi/resources/scripts/bibi.js',
        polyfills: {
          bundle_js: '/bibi/resources/scripts/polyfills/bundle.js',
          encoding_js: '/bibi/resources/scripts/polyfills/encoding.js',
          intersection_observer_js: '/bibi/resources/scripts/polyfills/intersection-observer.js'
        }
      },
      styles: {
        bibi_css: '/bibi/resources/styles/bibi.css',
        fonts: {
          MaterialIcons_Regular_eot: '/bibi/resources/styles/fonts/MaterialIcons-Regular.eot',
          MaterialIcons_Regular_ttf: '/bibi/resources/styles/fonts/MaterialIcons-Regular.ttf',
          MaterialIcons_Regular_woff: '/bibi/resources/styles/fonts/MaterialIcons-Regular.woff',
          MaterialIcons_Regular_woff2: '/bibi/resources/styles/fonts/MaterialIcons-Regular.woff2'
        }
      }
    },
    wardrobe: {
      everyday: {
        bibi_dress_css: '/bibi/wardrobe/everyday/bibi.dress.css'
      }
    }
  },
  bibi_bookshelf: {
    yashiro: {
      META_INF: {
        container_xml: '/bibi-bookshelf/yashiro/META-INF/container.xml'
      },
      OEBPS: {
        $0__xhtml: '/bibi-bookshelf/yashiro/OEBPS/0_.xhtml',
        content_opf: '/bibi-bookshelf/yashiro/OEBPS/content.opf',
        cover_jpeg: '/bibi-bookshelf/yashiro/OEBPS/cover.jpeg',
        fonts: {
          NotoSerifJP_SemiBold_otf: '/bibi-bookshelf/yashiro/OEBPS/fonts/NotoSerifJP-SemiBold.otf'
        },
        style_css: '/bibi-bookshelf/yashiro/OEBPS/style.css',
        toc_ncx: '/bibi-bookshelf/yashiro/OEBPS/toc.ncx',
        toc_xhtml: '/bibi-bookshelf/yashiro/OEBPS/toc.xhtml'
      },
      mimetype: '/bibi-bookshelf/yashiro/mimetype'
    },
    その社へと続く道は_epub: '/bibi-bookshelf/その社へと続く道は.epub'
  },
  favicon_ico: '/favicon.ico',
  fromNewWorld_mp3: '/fromNewWorld.mp3',
  index_html: '/index.html',
  installButton_png: '/installButton.png',
  installStart_png: '/installStart.png',
  manageData_png: '/manageData.png',
  manifest_json: '/manifest.json',
  menuButton_png: '/menuButton.png',
  meta_jpg: '/meta.jpg',
  saitedata_png: '/saitedata.png',
  sonoyasiro_jpg: '/sonoyasiro.jpg',
  uninstall_png: '/uninstall.png'
} as const;

export type StaticPath = typeof staticPath;
