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
import CartType from '@/interfaces/cart'

const Checkout = () => {
  const apiUrl = '/app/order/carts'
  const router = useRouter()
  const {
    page = 1,
    limit = 1000,
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
    data: cartData,
    error,
    isValidating,
  } = useSWR<{
    rows: CartType[]
    count: number
    cart_sum: { total_amount: number; total_count: number }
  }>(`${apiUrl}${queryToString}`, privatefetcher)

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
            cart_products: cartData?.rows.map((item: CartType) => item.id),
          }),
        }
      )
      router.push(`/order`)
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
              <h2>Your order</h2>
              <div className="checkout-review-order">
                <table className="shop_table checkout-review-order-table">
                  <thead>
                    <tr>
                      <th className="product-name">Product</th>
                      <th className="product-total">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartData &&
                      cartData.rows.map((item, index: number) => (
                        <tr key={`${item.id}_${index}`} className="cart_item">
                          <td className="product-name">
                            {item.name}
                            <strong className="product-quantity">
                              {' '}
                              × {item.quantity}
                            </strong>{' '}
                          </td>
                          <td className="product-total">
                            <span className="price-amount amount">
                              <bdi>
                                <span className="price-currencySymbol">$</span>
                                {item.price * item.quantity}
                              </bdi>
                            </span>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                  <tfoot>
                    <tr className="cart-subtotal">
                      <th>Subtotal</th>
                      <td>
                        <span className="price-amount amount">
                          <bdi>
                            <span className="price-currencySymbol">$</span>
                            {cartData?.cart_sum.total_amount}
                          </bdi>
                        </span>
                      </td>
                    </tr>

                    <tr className="tax-total">
                      <th>Tax</th>
                      <td>
                        <span className="price-amount amount">
                          <bdi>
                            <span className="price-currencySymbol">$</span>
                            0.00
                          </bdi>
                        </span>
                      </td>
                    </tr>

                    <tr className="order-total">
                      <th>Total</th>
                      <td>
                        <strong>
                          <span className="price-amount amount">
                            <bdi>
                              <span className="price-currencySymbol">$</span>
                              {cartData?.cart_sum.total_amount}
                            </bdi>
                          </span>
                        </strong>{' '}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </Col>
            <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
              <h2>Billing Details</h2>
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

const StyledCheckout = styled.div`
  margin-top: 2rem;

  .checkout-review-order {
    & > table {
      width: 100%;
    }
    table.shop_table thead {
      background-color: #d1d1d1;
    }

    .shop_table.checkout-review-order-table th {
      font-family: 'Roboto Condensed', Sans-serif;
      font-weight: 600;
      border-style: solid;
      border-width: 1px 1px 1px 1px;
      border-color: #eaeaea;
    }
    .checkout-review-order-table th {
      background-color: #eaeaea;
    }

    table caption + thead tr:first-child td,
    table caption + thead tr:first-child th,
    table colgroup + thead tr:first-child td,
    table colgroup + thead tr:first-child th,
    table thead:first-child tr:first-child td,
    table thead:first-child tr:first-child th {
      border-top: 1px solid #ccc;
    }
    table.shop_table th {
      font-weight: 700;
      padding: 9px 12px;
      line-height: 1.5em;
    }
    .checkout-review-order-table td {
      border-style: solid;
      border-width: 1px 1px 1px 1px;
      border-color: #eaeaea;
    }

    table.shop_table td {
      border-top: 1px solid rgba(0, 0, 0, 0.1);
      padding: 9px 12px;
      vertical-align: middle;
      line-height: 1.5em;
    }
    table tbody > tr:nth-child(odd) > td,
    table tbody > tr:nth-child(odd) > th {
      background-color: #fff;
    }
    table td,
    table th {
      padding: 15px;
      line-height: 1.5;
      vertical-align: top;
      border: 1px solid #ccc;
    }

    .order-total {
      .amount {
        font-size: 1.5rem;
      }
    }
  }
`

export default Checkout