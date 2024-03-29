import { notification, Row } from 'antd'
import { Formik } from 'formik'
import { Form, FormItem, InputNumber } from 'formik-antd'
import styled from 'styled-components'
import privatefetcher from '@/lib/privateFetch'
import useUser from '@/hooks/useUser'
import { useAppContext } from '@/context/state'
import useCart from '@/hooks/useCart'
import ButtonStyled from '../buttonStyled'

const AddToCartForm = ({
  productId,
  stock,
  onSuccess = () => {},
}: {
  productId: string | string[]
  stock: number
  onSuccess?: any
}) => {
  const { setLoginModal } = useAppContext()
  const { mutate } = useUser()
  const { mutate: mutateCart } = useCart()

  const handleSubmit = async (
    values: any,
    actions: { setSubmitting: (arg0: boolean) => void }
  ): Promise<void> => {
    try {
      await privatefetcher(`/app/order/add_cart`, {
        method: 'POST',
        body: JSON.stringify({
          note: 'adding to cart',
          products: [values],
        }),
      })
      onSuccess()
      mutateCart()
      mutate()
      actions.setSubmitting(false)
    } catch (error: any) {
      if (error.status === 401) {
        setLoginModal(true)
      } else {
        notification.error({
          message: 'Error',
          description: error.data.message,
        })
      }
      actions.setSubmitting(false)
    }
  }

  return (
    <StyledCart>
      <div style={{ textAlign: 'right' }}>
        {stock ? (
          <p>{stock} in stock</p>
        ) : (
          <p style={{ color: 'red' }}>Out of stock</p>
        )}
      </div>
      <Formik
        initialValues={{
          product_id: productId,
          coupon_code: '',
          quantity: 1,
        }}
        validate={(values: any) => {
          const errors: any = {}
          if (values.quantity > stock || values.quantity < 1) {
            errors.quantity = 'Quantity is not available'
          }
          return errors
        }}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form layout="inline">
            <FormItem name="quantity">
              <InputNumber disabled={!stock} min={1} name="quantity" />
            </FormItem>

            <Row justify="center">
              <ButtonStyled
                disabled={!stock}
                htmlType="submit"
                type="primary"
                loading={isSubmitting}
                shape="round"
              >
                {stock ? 'Add to cart' : 'Not available'}
              </ButtonStyled>
            </Row>
          </Form>
        )}
      </Formik>
    </StyledCart>
  )
}

const StyledCart = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`

export default AddToCartForm
