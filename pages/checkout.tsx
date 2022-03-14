import { Button, notification } from 'antd'
import { Formik } from 'formik'
import { Form, FormItem, Input, Select } from 'formik-antd'
import * as Yup from 'yup'
import Layout from '@/components/layout'
import PageHeader from '@/components/pageHeader/cover'
import { Col, Row } from 'antd'
import styled from 'styled-components'
import privatefetcher from '@/lib/privateFetch'
import useSWR from 'swr'
import { useRouter } from 'next/router'
import qs from 'qs'
import { ShoppingCartOutlined } from '@ant-design/icons'

const Checkout = () => {
  const apiUrl = '/app/order/carts'
  const router = useRouter()
  const {
    page = 1,
    limit = 12,
    query = '',
    category_id = '',
    start_date = '',
    end_date = '',
  } = router.query as any

  const queryToString = qs.stringify(
    {
      offset: {
        page,
        limit,
      },
      filter: {
        query,
        category_id,
        start_date,
        end_date,
      },
    },
    {
      encode: false,
      addQueryPrefix: true,
    }
  )
  const {
    data: cardData,
    error,
    isValidating,
  } = useSWR(`${apiUrl}${queryToString}`, privatefetcher)

  const handlePageChange = (query: any) => {
    router.push(
      `${router.pathname}${qs.stringify(query, {
        encode: false,
        addQueryPrefix: true,
      })}`
    )
  }

  const formSchema = Yup.object().shape({
    first_name: Yup.string().required('Firstname is required'),
    last_name: Yup.string().required('Lastname is required'),
    country_code: Yup.string().required('Country code is required'),
    state_code: Yup.string().required('State code is required'),
    city_code: Yup.string().required('City code is required'),
    apartment: Yup.string().required('Apartment is required'),
    phone: Yup.string().required('Phone is required'),
    zipcode: Yup.string().required('Zipcode is required'),
    address: Yup.string().required('Address is required'),
  })

  const handleSubmit = async (
    values: any,
    actions: { setSubmitting: (arg0: boolean) => void }
  ): Promise<void> => {
    try {
      const res = await privatefetcher<{ access_token: string }>(
        `/app/order/CART/create`,
        {
          method: 'POST',
          body: JSON.stringify({
            shipping_info: values,
            // cart_products: cartItems,
          }),
        }
      )
      router.push(`/settings/order`)
      notification.success({ message: 'Request successful' })
      actions.setSubmitting(false)
    } catch (error: any) {
      notification.error({
        message: error.data.message,
      })
      actions.setSubmitting(false)
    }
  }

  return (
    <Layout>
      <PageHeader title={`Checkout`} image={`/cover5.jpeg`} />
      <StyledCheckout>
        <div className="container">
          <Row gutter={[24, 24]}>
            <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
              cart summary
              <pre>{JSON.stringify(cardData?.cart_sum, null, 2)}</pre>
            </Col>
            <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
              address form
              <Formik
                initialValues={{
                  first_name: undefined,
                  last_name: undefined,
                  country_code: undefined,
                  state_code: undefined,
                  city_code: undefined,
                  apartment: undefined,
                  phone: undefined,
                  zipcode: undefined,
                  address: undefined,
                }}
                validationSchema={formSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form layout={'vertical'}>
                    <FormItem name="first_name" label="Firstname">
                      <Input name="first_name" />
                    </FormItem>
                    <FormItem name="last_name" label="Lastname">
                      <Input name="last_name" />
                    </FormItem>
                    <FormItem name="country_code" label="Country code">
                      <Select name="country_code" placeholder="Салбар сонгох">
                        {[{ code: 'US', name: 'US - United States' }].map(
                          (item: { name: string; code: string }) => (
                            <Select.Option key={item.code} value={item.code}>
                              {item.name}
                            </Select.Option>
                          )
                        )}
                      </Select>
                    </FormItem>
                    <FormItem name="state_code" label="State code">
                      <Input name="state_code" />
                    </FormItem>
                    <FormItem name="city_code" label="City code">
                      <Input name="city_code" />
                    </FormItem>
                    <FormItem name="apartment" label="Apartment">
                      <Input name="apartment" />
                    </FormItem>
                    <FormItem name="phone" label="Phone">
                      <Input name="phone" />
                    </FormItem>
                    <FormItem name="zipcode" label="Zipcode">
                      <Input name="zipcode" />
                    </FormItem>
                    <FormItem name="address" label="Address">
                      <Input name="address" />
                    </FormItem>

                    <Button
                      htmlType="submit"
                      type="primary"
                      size="large"
                      loading={isSubmitting}
                      block
                      style={{ marginBottom: '24px' }}
                    >
                      Place order
                    </Button>
                  </Form>
                )}
              </Formik>
            </Col>
          </Row>
        </div>
      </StyledCheckout>
    </Layout>
  )
}

const StyledCheckout = styled.div``

export default Checkout
