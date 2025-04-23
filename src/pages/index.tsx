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
      <div className="container px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Sound Systems of Melbourne</h1>

        <section className="my-8">
          <h2 className="text-2xl font-semibold mb-4">Upcoming Gigs</h2>
          <Calendar />
        </section>
      </div>
    </Layout>
  )
}
