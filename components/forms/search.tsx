import { Button, notification, Row } from 'antd'
import { Formik } from 'formik'
import { Form, FormItem, InputNumber } from 'formik-antd'
import styled from 'styled-components'
import privatefetcher from '@/lib/privateFetch'

const SearchForm = () => {
  const handleSubmit = async (
    values: any,
    actions: { setSubmitting: (arg0: boolean) => void }
  ): Promise<void> => {
    // try {
    //   await privatefetcher(`/app/order/add_cart`, {
    //     method: 'POST',
    //     body: JSON.stringify({
    //       note: 'adding to cart',
    //       products: [values],
    //     }),
    //   })
    //   onSuccess()
    //   mutateCart()
    //   mutate()
    //   actions.setSubmitting(false)
    // } catch (error: any) {
    //   if (error.status === 401) {
    //     setLoginModal(true)
    //   } else {
    //     notification.error({
    //       message: 'Error',
    //       description: error.data.message,
    //     })
    //   }
    //   actions.setSubmitting(false)
    // }
  }

  return (
    <StyledCart>
      <Formik
        initialValues={{
          coupon_code: '',
          quantity: 1,
        }}
        validate={(values: any) => {
          const errors: any = {}

          return errors
        }}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form layout="inline">
            <FormItem name="quantity">
              <InputNumber min={1} name="quantity" />
            </FormItem>

            <Row justify="center">
              <Button
                htmlType="submit"
                type="primary"
                loading={isSubmitting}
                shape="round"
              ></Button>
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

export default SearchForm
