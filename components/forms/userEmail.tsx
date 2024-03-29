import { Button, Col, notification, Row } from 'antd'
import { Formik } from 'formik'
import { Form, FormItem, Input, Select } from 'formik-antd'
import styled from 'styled-components'
import privatefetcher from '@/lib/privateFetch'
import * as Yup from 'yup'
import ButtonStyled from '../buttonStyled'
import useUser from '@/hooks/useUser'
import { useState } from 'react'
import SettingsEmailType from '@/interfaces/settingsEmailType'

const formSchema = Yup.object().shape({
  email: Yup.string().email().required('Email is required'),
  type: Yup.string().required('Type is required'),
})

const UserEmail = () => {
  const { user, error } = useUser()

  const [data, setData] = useState<SettingsEmailType>({
    email: user.email,
    type: 'EMAIL',
  })

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

  console.log(user.email)
  return (
    <StyledForm>
      <Formik
        initialValues={data}
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
              <ButtonStyled
                htmlType="submit"
                type="primary"
                loading={isSubmitting}
                size="large"
                shape="round"
              >
                Email changes
              </ButtonStyled>
            </div>
          </Form>
        )}
      </Formik>
    </StyledForm>
  )
}

const StyledForm = styled.div``

export default UserEmail
