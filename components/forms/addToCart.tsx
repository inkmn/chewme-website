import { Button, notification, Row } from 'antd'
import { Formik } from 'formik'
import { Form, FormItem, InputNumber } from 'formik-antd'
import styled from 'styled-components'
import privatefetcher from '@/lib/privateFetch'
import useUser from '@/hooks/useUser'

const AddToCartForm = ({
  productId,
  stock,
  onSuccess = () => {},
}: {
  productId: string | string[]
  stock: number
  onSuccess?: any
}) => {
  const { mutate } = useUser()
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
      mutate()
      actions.setSubmitting(false)
    } catch (error: any) {
      notification.error({
        message: error.data.message,
      })
      actions.setSubmitting(false)
    }
  }

  return (
    <StyledLogin>
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
            {stock ? (
              <p>{stock} in stock</p>
            ) : (
              <p style={{ color: 'red' }}>Out of stock</p>
            )}
            <FormItem name="quantity">
              <InputNumber disabled={!stock} min={1} name="quantity" />
            </FormItem>

            <Row justify="center">
              <Button
                disabled={!stock}
                htmlType="submit"
                type="primary"
                loading={isSubmitting}
              >
                {stock ? 'Add to cart' : 'Not available'}
              </Button>
            </Row>
          </Form>
        )}
      </Formik>
    </StyledLogin>
  )
}

const StyledLogin = styled.div``

export default AddToCartForm
