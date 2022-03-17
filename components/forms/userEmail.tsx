import { Button, Col, notification, Row } from 'antd'
import { Formik } from 'formik'
import { Form, FormItem, Input, Select } from 'formik-antd'
import styled from 'styled-components'
import privatefetcher from '@/lib/privateFetch'
import * as Yup from 'yup'

const formSchema = Yup.object().shape({
  email: Yup.string().email().required('Email is required'),
  type: Yup.string().required('Type is required'),
})

const UserEmail = () => {
  const handleSubmit = async (
    values: any,
    actions: { setSubmitting: (arg0: boolean) => void }
  ): Promise<void> => {
    try {
      let res: any = await privatefetcher<{ access_token: string }>(
        `/app/user/change`,
        {
          method: 'POST',
          body: JSON.stringify({
            ...values,
          }),
        }
      )
      console.log(res)
      notification.success({
        message: 'Request successful',
        description: ` 'A 6-digit verification code has been sent to your new email address /${res.dev_code}/`,
      })
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
          email: '',
          type: 'EMAIL',
        }}
        validationSchema={formSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form layout="vertical">
            <div className="border">
              <Form.Item name="type" label="Type">
                <Select name="type" placeholder="Select">
                  <Select.Option value="EMAIL" key="email">
                    EMAIL
                  </Select.Option>
                </Select>
              </Form.Item>
              <Form.Item name="email" label="Email">
                <Input name="email" placeholder="Email" />
              </Form.Item>
            </div>
            <div className="flex-end">
              <Button
                htmlType="submit"
                type="primary"
                loading={isSubmitting}
                size="large"
                shape="round"
              >
                Save
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </StyledForm>
  )
}

const StyledForm = styled.div``

export default UserEmail
