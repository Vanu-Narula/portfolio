export interface BrowserInfo {
  name: string
  version: string
  isSupported: boolean
  features: {
    cssGrid: boolean
    flexbox: boolean
    webp: boolean
    intersectionObserver: boolean
    customProperties: boolean
    backdropFilter: boolean
  }
}

export function getBrowserInfo(): BrowserInfo {
  if (typeof window === 'undefined') {
    return {
      name: 'Server',
      version: '0',
      isSupported: true,
      features: {
        cssGrid: true,
        flexbox: true,
        webp: true,
        intersectionObserver: true,
        customProperties: true,
        backdropFilter: true
      }
    };
  }

  const userAgent = navigator.userAgent
  let name = 'Unknown'
  let version = 'Unknown'

  // Detect browser
  if (userAgent.includes('Chrome') && !userAgent.includes('Edg')) {
    name = 'Chrome'
    version = userAgent.match(/Chrome\/(\d+)/)?.[1] || 'Unknown'
  } else if (userAgent.includes('Firefox')) {
    name = 'Firefox'
    version = userAgent.match(/Firefox\/(\d+)/)?.[1] || 'Unknown'
  } else if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) {
    name = 'Safari'
    version = userAgent.match(/Version\/(\d+)/)?.[1] || 'Unknown'
  } else if (userAgent.includes('Edg')) {
    name = 'Edge'
    version = userAgent.match(/Edg\/(\d+)/)?.[1] || 'Unknown'
  }

  // Feature detection
  const features = {
    cssGrid: typeof CSS !== 'undefined' ? CSS.supports('display', 'grid') : true,
    flexbox: typeof CSS !== 'undefined' ? CSS.supports('display', 'flex') : true,
    webp: checkWebPSupport(),
    intersectionObserver: typeof window !== 'undefined' && 'IntersectionObserver' in window,
    customProperties: typeof CSS !== 'undefined' ? CSS.supports('--test', '1') : true,
    backdropFilter: typeof CSS !== 'undefined' ? CSS.supports('backdrop-filter', 'blur(1px)') : true
  }

  // Browser support criteria
  const minVersions: Record<string, number> = {
    Chrome: 70,
    Firefox: 65,
    Safari: 12,
    Edge: 79
  }

  const isSupported = name !== 'Unknown' && 
    parseInt(version) >= (minVersions[name] || 0) &&
    features.cssGrid && 
    features.flexbox && 
    features.intersectionObserver

  return {
    name,
    version,
    isSupported,
    features
  }
}

function checkWebPSupport(): boolean {
  if (typeof document === 'undefined') return true;
  
  const canvas = document.createElement('canvas')
  canvas.width = 1
  canvas.height = 1
  return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0
}

export function addBrowserClasses() {
  if (typeof document === 'undefined') return;
  
  const browserInfo = getBrowserInfo()
  const html = document.documentElement

  // Add browser classes
  html.classList.add(`browser-${browserInfo.name.toLowerCase()}`)
  html.classList.add(`browser-version-${browserInfo.version}`)

  // Add feature classes
  Object.entries(browserInfo.features).forEach(([feature, supported]) => {
    html.classList.add(supported ? `supports-${feature}` : `no-${feature}`)
  })

  // Add supported/unsupported class
  html.classList.add(browserInfo.isSupported ? 'browser-supported' : 'browser-unsupported')
}

// Polyfills for older browsers
export function loadPolyfills() {
  const browserInfo = getBrowserInfo()

  // Intersection Observer polyfill
  if (!browserInfo.features.intersectionObserver) {
    import('intersection-observer')
  }

  // Load polyfills only on client side
  if (typeof window !== 'undefined') {
    // CSS Custom Properties polyfill for IE
    if (!browserInfo.features.customProperties) {
      import('css-vars-ponyfill').then((module) => {
        const cssVars = module.default || module
        cssVars({
          watch: true,
          variables: {
            '--primary-500': '#3b82f6',
            '--growth-500': '#10b981',
            '--innovation-500': '#8b5cf6'
          }
        })
      })
    }
  }
}
