import Footer from '../components/Footer'
import { usePageTitle } from '../lib/usePageTitle'

// All visible copy on this page is André's voice, verbatim from the existing
// portfolio AboutPage — do not rewrite.
export default function AboutPage() {
  usePageTitle('About')
  return (
    <article className="page about">
      <div className="site-max page__head">
        <h1 className="page__lede">
          I design software. Twenty years doing it.
        </h1>
      </div>

      <section className="site-max site-grid about__bio">
        <div className="about__bio-body">
          <p>
            Currently leading design operations for Farsight at BaxEnergy — a
            Yokogawa company — where I took every screen under my umbrella and
            am accountable for how the whole product feels.
          </p>
          <p>
            I work where the problems are hardest and the users care the most:
            enterprise SaaS, real-time control rooms, growth funnels that turn
            pixels into revenue. I also run Fit4Box, my own Crossfit apparel
            brand, because sometimes you need to ship your own thing.
          </p>
          <p>
            Based in São Paulo, available for one senior engagement in Q3 2026.
            Currently open to full-time leadership roles and select freelance
            projects.
          </p>
        </div>
        <div className="about__bio-meta">
          <dl>
            <div className="about__meta-row">
              <dt>Role</dt>
              <dd>Senior / Lead</dd>
            </div>
            <div className="about__meta-row">
              <dt>Base</dt>
              <dd>São Paulo, BR</dd>
            </div>
            <div className="about__meta-row">
              <dt>Status</dt>
              <dd>Open, Q3 2026</dd>
            </div>
          </dl>
        </div>
      </section>

      <Footer />
    </article>
  )
}
