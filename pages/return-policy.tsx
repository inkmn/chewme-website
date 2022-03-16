import Layout from '@/components/layout'
import PageHeader from '@/components/pageHeader/cover'
import styled from 'styled-components'

const ReturnPolicy = () => {
  return (
    <Layout>
      <PageHeader title={`Return policy`} image={`/cover5.jpeg`} />
      <StyledContactUs>
        <div className="container">
          <h1 className="page-title">Return policy</h1>
        </div>
      </StyledContactUs>
    </Layout>
  )
}

const StyledContactUs = styled.div``

export default ReturnPolicy
