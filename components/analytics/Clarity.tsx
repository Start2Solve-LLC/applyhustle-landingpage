import Script from 'next/script';

/**
 * Microsoft Clarity — session analytics + heatmaps.
 *
 * Loaded via next/script with `afterInteractive` so it runs only after the page
 * is interactive (never blocks first paint), and only in production with a
 * project ID set — so local dev sessions don't pollute your Clarity data.
 *
 * The project ID is public (it ships in the client), so it lives in
 * NEXT_PUBLIC_CLARITY_ID with the current project as the default.
 */
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID || 'x53m5mymv5';

export function Clarity() {
  if (process.env.NODE_ENV !== 'production' || !CLARITY_ID) return null;

  return (
    <Script id="ms-clarity" strategy="afterInteractive">
      {`(function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
      })(window, document, "clarity", "script", "${CLARITY_ID}");`}
    </Script>
  );
}
