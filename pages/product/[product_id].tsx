import Layout from '@/components/layout'
import PageHeader from '@/components/pageHeader/cover'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import PublicFetcher from '@/lib/publicFetch'
import useSWR from 'swr'
import ProductItem from '@/interfaces/product'
import { Button, notification } from 'antd'
import Privatefetcher from '@/lib/privateFetch'
import useUser from '@/hooks/useUser'

const ProductDetail = () => {
  const { mutate } = useUser()
  const router = useRouter()
  const { product_id } = router.query
  const { data: productData } = useSWR<ProductItem>(
    product_id ? `/pub/product/${product_id}` : null,
    PublicFetcher
  )

  const addToCart = async () => {
    try {
      await Privatefetcher(`/app/order/add_cart`, {
        method: 'POST',
        body: JSON.stringify({
          note: '',
          products: [
            {
              product_id,
              coupon_code: '',
              quantity: 1,
            },
          ],
        }),
      })
      mutate()
    } catch (error: any) {
      notification.error({
        message: error.data.message,
      })
    }
  }

  return (
    <Layout>
      <PageHeader image={`/paws-bg.png`} position="top" />
      <StyledProductDetail>
        <div className="container">
          <div>This is ProductDetail view</div>
          <Button onClick={addToCart}>add to cart</Button>
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
