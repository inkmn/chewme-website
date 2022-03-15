import Layout from '@/components/layout'
import PageHeader from '@/components/pageHeader/cover'
import styled from 'styled-components'

const PrivacyPolicy = () => {
  return (
    <Layout>
      <PageHeader title={`privacy policy`} image={`/cover5.jpeg`} />
      <StyledContactUs>
        <div className="container">
          <h1 className="page-title">privacy policy</h1>
        </div>
      </StyledContactUs>
    </Layout>
  )
}

const StyledContactUs = styled.div``

export default PrivacyPolicy
