'use client'

// Accessibility utilities
export function addAccessibilityFeatures() {
  // Skip to main content link
  const skipLink = document.createElement('a')
  skipLink.href = '#main-content'
  skipLink.textContent = 'Skip to main content'
  // Make sure the link is truly hidden until focused
  skipLink.className = 'sr-only'
  
  // Add focus styles directly
  skipLink.style.cssText = `
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  `
  
  skipLink.addEventListener('focus', () => {
    skipLink.style.cssText = `
      position: absolute;
      top: 16px;
      left: 16px;
      z-index: 100;
      padding: 8px 16px;
      background-color: #3b82f6;
      color: white;
      border-radius: 8px;
      width: auto;
      height: auto;
      overflow: visible;
      clip: auto;
      white-space: normal;
    `
  })
  
  skipLink.addEventListener('blur', () => {
    skipLink.style.cssText = `
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border-width: 0;
    `
  })
  
  document.body.insertBefore(skipLink, document.body.firstChild)

  // Keyboard navigation improvements
  document.addEventListener('keydown', (e) => {
    // Escape key to close modals
    if (e.key === 'Escape') {
      const openModal = document.querySelector('[data-modal-open="true"]')
      if (openModal) {
        const closeButton = openModal.querySelector('[data-modal-close]') as HTMLElement
        closeButton?.click()
      }
    }

    // Tab trapping in modals
    if (e.key === 'Tab') {
      const openModal = document.querySelector('[data-modal-open="true"]')
      if (openModal) {
        const focusableElements = openModal.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
        const firstElement = focusableElements[0] as HTMLElement
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault()
          lastElement.focus()
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault()
          firstElement.focus()
        }
      }
    }
  })

  // Announce dynamic content changes
  const announcer = document.createElement('div')
  announcer.setAttribute('aria-live', 'polite')
  announcer.setAttribute('aria-atomic', 'true')
  announcer.className = 'sr-only'
  announcer.id = 'screen-reader-announcer'
  document.body.appendChild(announcer)
}

export function announceToScreenReader(message: string) {
  const announcer = document.getElementById('screen-reader-announcer')
  if (announcer) {
    announcer.textContent = message
    setTimeout(() => {
      announcer.textContent = ''
    }, 1000)
  }
}

export function addFocusManagement() {
  let focusedElementBeforeModal: HTMLElement | null = null

  // Focus management for modals
  document.addEventListener('modal:open', ((e: CustomEvent) => {
    focusedElementBeforeModal = document.activeElement as HTMLElement
    const modal = e.detail.modal as HTMLElement
    const firstFocusable = modal.querySelector('button, [href], input, select, textarea') as HTMLElement
    firstFocusable?.focus()
  }) as EventListener)

  document.addEventListener('modal:close', (() => {
    focusedElementBeforeModal?.focus()
    focusedElementBeforeModal = null
  }) as EventListener)
}

// Color contrast checker
export function checkColorContrast(foreground: string, background: string): number {
  const getRGB = (color: string) => {
    const hex = color.replace('#', '')
    return {
      r: parseInt(hex.substr(0, 2), 16),
      g: parseInt(hex.substr(2, 2), 16),
      b: parseInt(hex.substr(4, 2), 16)
    }
  }

  const getLuminance = (rgb: { r: number; g: number; b: number }) => {
    const { r, g, b } = rgb
    const [rs, gs, bs] = [r, g, b].map(c => {
      c = c / 255
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
    })
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs
  }

  const fgRGB = getRGB(foreground)
  const bgRGB = getRGB(background)
  const fgLuminance = getLuminance(fgRGB)
  const bgLuminance = getLuminance(bgRGB)

  const contrast = (Math.max(fgLuminance, bgLuminance) + 0.05) / 
                  (Math.min(fgLuminance, bgLuminance) + 0.05)

  return Math.round(contrast * 100) / 100
}
