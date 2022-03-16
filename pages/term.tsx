import Layout from '@/components/layout'
import PageHeader from '@/components/pageHeader/cover'
import styled from 'styled-components'

const Term = () => {
  return (
    <Layout>
      <PageHeader title={`Terms & Conditions`} image={`/cover4.jpeg`} />
      <StyledContactUs>
        <div className="container">
          <h1 className="page-title">Terms & Conditions</h1>
        </div>
      </StyledContactUs>
    </Layout>
  )
}

const StyledContactUs = styled.div``

export default Term
