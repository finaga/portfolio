import Footer from '../components/Footer'
import { usePageTitle } from '../lib/usePageTitle'

export default function ContactPage() {
  usePageTitle('Contact')
  return (
    <article className="page contact">
      <div className="site-max page__head">
        <h1 className="page__lede">
          One senior engagement open for Q3 2026.
        </h1>
      </div>

      <section className="site-max site-grid contact__body">
        <div className="contact__cta">
          <a href="mailto:hello@finageiv.com" className="contact__mail uline">
            hello@finageiv.com
          </a>
        </div>
        <div className="contact__note">
          <p>
            Based in São Paulo, available for one senior engagement in Q3 2026.
            Currently open to full-time leadership roles and select freelance
            projects.
          </p>
        </div>
      </section>

      <Footer />
    </article>
  )
}
