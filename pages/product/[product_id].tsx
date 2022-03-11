import Layout from '@/components/layout'
import PageHeader from '@/components/pageHeader/cover'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import PublicFetcher from '@/lib/publicFetch'
import useSWR from 'swr'
import ProductItem from '@/interfaces/product'

const ProductDetail = () => {
  const router = useRouter()
  const { product_id } = router.query
  const { data: productData } = useSWR<ProductItem>(
    product_id ? `/pub/product/${product_id}` : null,
    PublicFetcher
  )
  return (
    <Layout>
      <PageHeader image={`/paws-bg.png`} position="top" />
      <StyledProductDetail>
        <div className="container">
          <div>This is ProductDetail view</div>
          <pre>{JSON.stringify(productData, null, 2)}</pre>
        </div>
      </StyledProductDetail>
    </Layout>
  )
}

const StyledProductDetail = styled.div`
  height: 500px;
`

export default ProductDetail
