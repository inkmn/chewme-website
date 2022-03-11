import Layout from '@/components/layout'
import PageHeader from '@/components/cover/pageHeader'
import styled from 'styled-components'

const ProductDetail = () => {
  return (
    <Layout>
      <PageHeader title={`ProductDetail`} image={`/cover4.jpeg`} />
      <StyledProductDetail>
        <div className="container">
          <div>This is ProductDetail view</div>
        </div>
      </StyledProductDetail>
    </Layout>
  )
}

const StyledProductDetail = styled.div`
  height: 500px;
`

export default ProductDetail
