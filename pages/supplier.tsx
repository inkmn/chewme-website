import Layout from '@/components/layout'
import PageHeader from '@/components/pageHeader/cover'
import styled from 'styled-components'

const Supplier = () => {
  return (
    <Layout>
      <PageHeader title={`supplier`} image={`/cover2.jpeg`} />
      <StyledContactUs>
        <div className="container">
          <h1 className="page-title">supplier</h1>
        </div>
      </StyledContactUs>
    </Layout>
  )
}

const StyledContactUs = styled.div``

export default Supplier
