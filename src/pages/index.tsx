// src/pages/index.tsx
import Head from 'next/head'
import Layout from '../components/Layout'
import Calendar from '../components/Calendar'

export default function HomePage() {
  return (
    <Layout>
      <Head>
        <title>Sound Systems of Melbourne</title>
        <meta
          name="description"
          content="Sound Systems of Melbourne - Gig Guide"
        />
      </Head>
      <div className="swiss-container">
        <h1 className="text-3xl uppercase tracking-tight mb-12 border-b border-white pb-4 max-w-2xl">
          Sound Systems of Melbourne
        </h1>

        <section className="my-12">
          <h2 className="text-2xl uppercase tracking-wide mb-8 pb-2 inline-block border-b border-white">
            Upcoming Gigs
          </h2>
          <Calendar />
        </section>
      </div>
    </Layout>
  )
}
