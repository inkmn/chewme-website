import Layout from '@/components/layout'
import PageHeader from '@/components/cover/pageHeader'
import styled from 'styled-components'
import useUser from '@/hooks/useUser'

const MyWallet = () => {
  const { user } = useUser()
  return (
    <Layout>
      <PageHeader title={`My wallet`} image={`/cover5.jpeg`} />
      <StyledMyWallet>
        <div className="container">
          This is MyWallet view
          <pre>{JSON.stringify(user, null, 2)}</pre>
        </div>
      </StyledMyWallet>
    </Layout>
  )
}

const StyledMyWallet = styled.div`
  height: 500px;
`

export default MyWallet
