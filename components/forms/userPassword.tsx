import { Button, Col, notification, Row } from 'antd'
import { Formik } from 'formik'
import { Form, FormItem, Input, Select } from 'formik-antd'
import styled from 'styled-components'
import privatefetcher from '@/lib/privateFetch'
import * as Yup from 'yup'

const formSchema = Yup.object().shape({
  old_password: Yup.string().required('Old password is required'),
  password: Yup.string().required('New password is required'),
  confirm_password: Yup.string()
    .oneOf([Yup.ref('password'), null], 'New passwords must match')
    .required('Confirm password is require'),
})

const UserPassword = () => {
  const handleSubmit = async (
    values: any,
    actions: { setSubmitting: (arg0: boolean) => void }
  ): Promise<void> => {
    try {
      let res = await privatefetcher<{ access_token: string }>(
        `/app/user/password`,
        {
          method: 'POST',
          body: JSON.stringify({
            ...values,
          }),
        }
      )
      console.log(res)
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
          password: '',
          old_password: '',
          confirm_password: '',
        }}
        validationSchema={formSchema}
        onSubmit={handleSubmit}
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
                <Input.Password name="password" placeholder="New password" />
              </Form.Item>
              <Form.Item name="confirm_password" label="Confirm new password">
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
              >
                Save password
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </StyledForm>
  )
}

const StyledForm = styled.div``

export default UserPassword
