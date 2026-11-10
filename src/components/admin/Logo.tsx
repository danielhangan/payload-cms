import React from 'react'

// Login screen wordmark. The CMS serves several sites, so it carries Dan's name, not one site's logo.
export default function Logo() {
  return (
    <div className="dcms-logo">
      <span className="dcms-mark" aria-hidden="true">
        D
      </span>
      <span className="dcms-logo__text">
        <span className="dcms-logo__name">Dan&apos;s CMS</span>
        <span className="dcms-logo__sub">DansUGC · DansVPN · UGCHumans · ClippersDB</span>
      </span>
    </div>
  )
}
