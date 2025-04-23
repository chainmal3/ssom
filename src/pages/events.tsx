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
      <div className="container px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Events Calendar</h1>
        <Calendar />
      </div>
    </Layout>
  )
}

export default EventsPage
