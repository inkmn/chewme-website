import {
  LockFilled,
  MailFilled,
  FacebookOutlined,
  GooglePlusOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Button, notification, Space } from 'antd'
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
          <Form layout={'vertical'} className="my-form">
            <FormItem name="username">
              <Input
                style={{ maxWidth: 350 }}
                prefix={<UserOutlined />}
                size="large"
                name="username"
                placeholder="USERNAME OR EMAIL"
              />
            </FormItem>
            <FormItem name="password">
              <Input
                style={{ maxWidth: 350 }}
                type="password"
                prefix={<LockFilled />}
                size="large"
                placeholder="Password"
                name="password"
              />
            </FormItem>
            <div className="center">
              <Button
                htmlType="submit"
                type="primary"
                size="large"
                loading={isSubmitting}
                block
                style={{ marginBottom: '24px', width: 240 }}
              >
                Log in
              </Button>
            </div>
            <div className="fg">
              <div>
                <FacebookOutlined />
              </div>
              <div className="line"></div>
              <div>
                <GooglePlusOutlined />
              </div>
            </div>
          </Form>
        )}
      </Formik>
      <p className="login-text">Forget Password ?</p>
    </StyledLogin>
  )
}

const StyledLogin = styled.div`
  .my-form {
    padding-top: 40px;
  }
  .center {
    width: 100%;
    display: flex;
    margin-top: 40px;
    margin-bottom: 20px;
    justify-content: center;
  }
  .fg {
    width: 100%;
    font-size: 40px;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    .line {
      border-right: 1px solid #fff;
      height: 50px;
      margin: 0 1rem;
    }
  }
  .login-text {
    text-align: center;
    text-transform: uppercase;
    font-weight: 600;
    margin-top: 40px;
    margin-bottom: 0;
    font-size: 16px;
  }
  .ant-input-affix-wrapper {
    &.ant-input-affix-wrapper-lg {
      background: transparent;
      input {
        font-size: 24px;
        background: transparent;
        color: #fff;
      }
    }
  }
  .ant-input-affix-wrapper {
    &.ant-input-affix-wrapper-lg {
      background: transparent;
      .ant-input-prefix {
        ::before {
          background: red;
        }
      }
    }
  }

  .ant-form-item-has-error
    :not(.ant-input-affix-wrapper-disabled):not(.ant-input-affix-wrapper-borderless),
  .ant-input-affix-wrapper {
    background: transparent !important;
  }

  .ant-form-item-control-input-content {
    input {
      background: transparent !important;
    }
  }
  .ant-input-affix-wrapper-lg {
    background: transparent;
    border: none;
    border-bottom: 1px solid #fff;
    height: 48px;
    color: #fff;
    font-size: 24px;
  }
  .ant-input-prefix {
    margin-left: 10px;
    margin-right: 10px;
    font-size: 24px;
  }
  .ant-btn {
    border: none;
    font-size: 22px;
    border-radius: 10px;
    font-weight: 500;
    background: #fff;
    height: 40px;
    text-transform: uppercase;
    color: var(--primary);
    align-items: center;
    display: flex;
    justify-content: center;
    font-weight: 600;
  }
`

export default LoginForm
