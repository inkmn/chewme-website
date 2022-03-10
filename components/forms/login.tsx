import { LockFilled, MailFilled } from '@ant-design/icons'
import { Button, notification } from 'antd'
import { Formik } from 'formik'
import { Form, FormItem, Input } from 'formik-antd'
import * as Yup from 'yup'
import { Cookies } from 'react-cookie'
import { useRouter } from 'next/router'
import http from '@/lib/request'
import styled from 'styled-components'

const cookies = new Cookies()

const LoginForm = () => {
  const router = useRouter()
  const formSchema = Yup.object().shape({
    username: Yup.string().required('Email is required'),
    password: Yup.string().required('Password is required'),
  })

  const handleSubmit = async (
    values: any,
    actions: { setSubmitting: (arg0: boolean) => void }
  ): Promise<void> => {
    try {
      const res = await http<{ access_token: string }>(`/app/auth/login`, {
        method: 'POST',
        body: JSON.stringify(values),
      })
      cookies.set('token', res.access_token)
      router.push(`/`)
      notification.success({ message: 'Successfully logged in' })
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
          username: 'bilegsaikhan.e@gmail.com',
          password: 'Qwer1234',
        }}
        validationSchema={formSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form layout={'vertical'}>
            <FormItem name="username">
              <Input
                prefix={<MailFilled />}
                size="large"
                name="username"
                placeholder="Email"
              />
            </FormItem>
            <FormItem name="password">
              <Input.Password
                prefix={<LockFilled />}
                size="large"
                placeholder="Password"
                name="password"
              />
            </FormItem>
            <Button
              htmlType="submit"
              type="primary"
              size="large"
              loading={isSubmitting}
              block
              style={{ marginBottom: '24px' }}
            >
              Login
            </Button>
            <Button
              className="face-book"
              htmlType="submit"
              type="primary"
              size="large"
              block
              style={{ marginBottom: '24px' }}
            >
              Facebook
            </Button>
          </Form>
        )}
      </Formik>
      <p className="login-text">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry.
      </p>
    </StyledLogin>
  )
}

const StyledLogin = styled.div`
  .login-text {
    text-align: center;
  }
  .ant-input-affix-wrapper-lg {
    border-radius: 15px;
    height: 48px;
    color: #707070;
  }
  .ant-input-prefix {
    margin-left: 10px;
    margin-right: 15px;
  }
  .ant-btn {
    height: 48px;
    border: none;
    border-radius: 15px;
    font-size: 18px;
    font-weight: 700;
    background: #e8213a;
    &.face-book {
      background: #3c5998;
    }
  }
`

export default LoginForm
