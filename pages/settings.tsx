import Layout from '@/components/layout'
import PageHeader from '@/components/pageHeader/cover'
import styled from 'styled-components'
import useUser from '@/hooks/useUser'
import { Formik } from 'formik'
import { Form, FormItem, Input, InputNumber, Select } from 'formik-antd'
import { Button, Col, notification, Row, Space } from 'antd'
import * as Yup from 'yup'
import privatefetcher from '@/lib/privateFetch'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import qs from 'qs'
import User from '@/interfaces/user'

const Settings = () => {
  const { user, mutate } = useUser()
  const router = useRouter()

  const formSchema = Yup.object().shape({
    first_name: Yup.string().required('Firstname is required'),
    last_name: Yup.string().required('Lastname is required'),
    country: Yup.string().required('Country code is required'),
    state: Yup.string().required('State code is required'),
    city: Yup.string().required('City code is required'),
    apartment: Yup.string().required('Apartment is required'),
    phone: Yup.string().required('Phone is required'),
    postcode: Yup.string().required('Zipcode is required'),
    street_address: Yup.string().required('Address is required'),
  })

  const handleSubmit = async (
    values: any,
    actions: { setSubmitting: (arg0: boolean) => void }
  ): Promise<void> => {
    try {
      const res = await privatefetcher<{ access_token: string }>(`/app/user`, {
        method: 'PUT',
        body: JSON.stringify({
          ...values,
          phone: values.phone.toString(),
        }),
      })
      console.log(res)
      // router.push(`/order`)
      notification.success({ message: 'Request successful' })
      actions.setSubmitting(false)
    } catch (error: any) {
      notification.error({
        message: error.data.message,
      })
      actions.setSubmitting(false)
    }
  }

  const submitPassword = async (values: any): Promise<void> => {
    try {
      console.log(values)
    } catch (error: any) {
      notification.error({
        message: error.data.message,
      })
    }
  }

  return (
    <Layout>
      <PageHeader title={`Settings`} image={`/cover5.jpeg`} />
      <StyledSettings>
        <div className="container">
          <h1>Shipping Address</h1>
          <Row gutter={[24, 24]}>
            <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
              <Formik
                initialValues={{
                  first_name: 'Myagmardorj',
                  last_name: 'Baatar',
                  country: 'EN',
                  state: 'jsjsj',
                  city: 'jsjsj',
                  apartment: 'lorem',
                  phone: '86696268',
                  postcode: '8669',
                  street_address: 'apartment',
                }}
                validationSchema={formSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form layout="vertical">
                    <div className="border">
                      <Row gutter={[16, 16]}>
                        <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
                          <Form.Item
                            name="first_name"
                            label="Firstname"
                            required
                          >
                            <Input name="first_name" placeholder="Firstname" />
                          </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
                          <Form.Item name="last_name" label="Lastname" required>
                            <Input name="last_name" placeholder="Lastname" />
                          </Form.Item>
                        </Col>
                      </Row>
                      <FormItem name="country" label="Country ">
                        <Select name="country" placeholder="Select">
                          {[
                            { code: 'US', name: 'US - United States' },
                            { code: 'MN', name: 'MN - Mongolia' },
                          ].map((item: { name: string; code: string }) => (
                            <Select.Option key={item.code} value={item.code}>
                              {item.name}
                            </Select.Option>
                          ))}
                        </Select>
                      </FormItem>
                      <FormItem name="state" label="State code">
                        <Input name="state" />
                      </FormItem>
                      <FormItem name="city" label="City code">
                        <Input name="city" />
                      </FormItem>
                      <FormItem name="apartment" label="Apartment">
                        <Input name="apartment" />
                      </FormItem>
                      <FormItem name="phone" label="Phone">
                        <Input
                          type="number"
                          name="phone"
                          placeholder="Phone"
                          style={{ width: '100%' }}
                        />
                      </FormItem>
                      <FormItem name="postcode" label="Zipcode">
                        <Input name="postcode" placeholder="" />
                      </FormItem>
                      <FormItem name="street_address" label="Address">
                        <Input name="street_address" placeholder="" />
                      </FormItem>
                    </div>
                    <div className="flex-end">
                      <Button
                        htmlType="submit"
                        type="primary"
                        loading={isSubmitting}
                        size="large"
                        shape="round"
                        className="btn-save"
                      >
                        Save changes
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
            </Col>
            <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
              <Formik
                initialValues={{
                  password: '',
                  old_password: '',
                  code: '',
                }}
                onSubmit={submitPassword}
              >
                {({ isSubmitting }) => (
                  <Form layout="vertical">
                    <div className="border">
                      <Form.Item name="old_password" label="Old password">
                        <Input.Password
                          name="old_password"
                          placeholder="Old password"
                          style={{ width: '100%' }}
                        />
                      </Form.Item>
                      <Form.Item name="password" label="New password">
                        <Input.Password
                          name="password"
                          placeholder="New password"
                        />
                      </Form.Item>
                      <Form.Item
                        name="confirm_password"
                        label="Confirm new password"
                      >
                        <Input.Password
                          name="confirm_password"
                          placeholder="Confirm new password"
                        />
                      </Form.Item>
                    </div>
                    <div className="flex-end">
                      <Button
                        htmlType="submit"
                        type="primary"
                        loading={isSubmitting}
                        size="large"
                        shape="round"
                        className="btn-save"
                      >
                        Save password
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
            </Col>
          </Row>
          This is Settings view
          <pre>{JSON.stringify(user, null, 2)}</pre>
        </div>
      </StyledSettings>
    </Layout>
  )
}

const StyledSettings = styled.div`
  min-height: 500px;
  margin-top: 40px;

  h1 {
    font-weight: 700;
    color: var(--primary);
    font-size: 2rem;
  }
  .border {
    padding: 24px;
    border: 1px solid #dadada;
    border-radius: 15px;
    width: 100%;
    margin-bottom: 24px;
  }
  .btn-save {
    background: var(--primary);
    border-color: var(--primary);
  }
`

export default Settings
