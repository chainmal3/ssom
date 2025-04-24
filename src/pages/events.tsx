import React from 'react'
import Head from 'next/head'
import Layout from '../components/Layout'
import Calendar from '../components/Calendar'

const EventsPage: React.FC = () => {
  return (
    <Layout>
      <Head>
        <title>Events | Sound Systems of Melbourne</title>
        <meta
          name="description"
          content="Upcoming events from Sound Systems of Melbourne"
        />
      </Head>
      <div className="swiss-container">
        <h1 className="text-3xl uppercase tracking-tight mb-12 border-b border-white pb-4 max-w-2xl">
          Events Calendar
        </h1>
        <Calendar />
      </div>
    </Layout>
  )
}

export default EventsPage
