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
        <section className="my-12">
          <Calendar />
        </section>
      </div>
    </Layout>
  )
}
