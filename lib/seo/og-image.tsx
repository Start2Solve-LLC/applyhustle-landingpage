import { ImageResponse } from 'next/og';
import { seoConfig } from './config';

/**
 * Shared brand social-card renderer, used by both app/opengraph-image.tsx and
 * app/twitter-image.tsx. Kept here (not a route file) so the route files only
 * re-export the literal `size`/`alt`/`contentType` Next requires.
 *
 * NOTE: this runs on Satori, which supports a CSS subset — every <div> with
 * more than one child MUST set display:flex, and multi-part text must be one
 * string node. Keep that in mind when editing.
 */
export const OG_ALT = `${seoConfig.name} — ${seoConfig.tagline}`;
export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = 'image/png';

export function renderBrandCard(): ImageResponse {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '80px',
        background: 'linear-gradient(135deg, #15131c 0%, #1c1430 55%, #2a1750 100%)',
        color: '#ffffff',
        fontFamily: 'sans-serif',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '72px',
            height: '72px',
            borderRadius: '18px',
            background: '#8b3dff',
            fontSize: '46px',
            fontWeight: 800,
          }}
        >
          ⚡
        </div>
        <div
          style={{ display: 'flex', fontSize: '40px', fontWeight: 800, letterSpacing: '-0.02em' }}
        >
          {seoConfig.name}
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          marginTop: '48px',
          fontSize: '68px',
          fontWeight: 800,
          lineHeight: 1.05,
          letterSpacing: '-0.03em',
          maxWidth: '900px',
        }}
      >
        {seoConfig.tagline}
      </div>

      <div
        style={{
          display: 'flex',
          marginTop: '32px',
          fontSize: '28px',
          color: '#c9c2dd',
          maxWidth: '880px',
          lineHeight: 1.4,
        }}
      >
        AI résumé tailoring · ATS scoring · Auto-Apply · mock interviews
      </div>

      <div style={{ display: 'flex', marginTop: 'auto', fontSize: '22px', color: '#9a92ad' }}>
        {`A ${seoConfig.parentBrand} product`}
      </div>
    </div>,
    { ...OG_SIZE },
  );
}
