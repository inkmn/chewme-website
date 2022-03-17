import { Button, Col, notification, Row } from 'antd'
import { Formik } from 'formik'
import { Form, FormItem, Input, Select } from 'formik-antd'
import styled from 'styled-components'
import privatefetcher from '@/lib/privateFetch'
import * as Yup from 'yup'

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

const ShippingAddress = () => {
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

  return (
    <StyledForm>
      <Formik
        initialValues={{
          first_name: '',
          last_name: '',
          country: '',
          state: '',
          city: '',
          apartment: '',
          phone: '',
          postcode: '',
          street_address: '',
        }}
        validationSchema={formSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form layout="vertical">
            <div className="border">
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
                  <Form.Item name="first_name" label="Firstname" required>
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
              >
                Save changes
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </StyledForm>
  )
}

// first_name: 'Myagmardorj',
// last_name: 'Baatar',
// country: 'EN',
// state: 'jsjsj',
// city: 'jsjsj',
// apartment: 'lorem',
// phone: '86696268',
// postcode: '8669',
// street_address: 'apartment',

// {
//   "name": "Arkhangai Province",
//   "isoCode": "073",
//   "countryCode": "MN",
//   "latitude": "47.89711010",
//   "longitude": "100.72401650"
// },

const StyledForm = styled.div``

export default ShippingAddress
