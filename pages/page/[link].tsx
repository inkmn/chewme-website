import Layout from '@/components/layout'
import PageHeader from '@/components/pageHeader/cover'
import PublicFetcher from '@/lib/publicFetch'
import { useRouter } from 'next/router'
import useSWR from 'swr'

const Page = () => {
  const router = useRouter()
  const { link } = router.query

  const { data } = useSWR(`/page/${link}`, PublicFetcher)

  return (
    <Layout>
      <PageHeader title={`About`} image={`/cover5.jpeg`} />
      {/* <div>
        <div className="container">
          <h1 className="page-title">{data.title}</h1>
        </div>
      </div> */}
    </Layout>
  )
}

export default Page
