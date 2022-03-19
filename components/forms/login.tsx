import {
  LockFilled,
  MailFilled,
  FacebookOutlined,
  GooglePlusOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Button, notification, Row, Space } from 'antd'
import { Formik } from 'formik'
import { Form, FormItem, Input } from 'formik-antd'
import * as Yup from 'yup'
import { Cookies } from 'react-cookie'
import { useRouter } from 'next/router'
import publicFetch from '@/lib/publicFetch'
import styled from 'styled-components'
import useUser from '@/hooks/useUser'

const cookies = new Cookies()

const LoginForm = ({ onSuccess = () => {} }: { onSuccess?: any }) => {
  const { mutate } = useUser()
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
      const res = await publicFetch<{ access_token: string }>(
        `/app/auth/login`,
        {
          method: 'POST',
          body: JSON.stringify(values),
        }
      )
      cookies.set('token', res.access_token)
      // router.push(`/`)
      mutate()
      notification.success({ message: 'Successfully logged in' })
      onSuccess()
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
      <h2 className="login-modal-header">Login </h2>
      <Formik
        initialValues={{
          username: 'bilegsaikhan.e@gmail.com',
          password: 'Qwer1234',
        }}
        validationSchema={formSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form layout={'vertical'} className="dc-form">
            <FormItem name="username">
              <Input
                bordered={false}
                prefix={<UserOutlined />}
                size="large"
                name="username"
                placeholder="USERNAME OR EMAIL"
              />
            </FormItem>
            <FormItem name="password">
              <Input.Password
                suffix={<LockFilled />}
                bordered={false}
                prefix={<LockFilled />}
                size="large"
                placeholder="Password"
                name="password"
              />
            </FormItem>
            <Row justify="center">
              <Button
                htmlType="submit"
                type="primary"
                size="large"
                loading={isSubmitting}
                block
                style={{ width: 240 }}
              >
                Log in
              </Button>
            </Row>
          </Form>
        )}
      </Formik>
    </StyledLogin>
  )
}

const StyledLogin = styled.div`
  h2 {
    padding-bottom: 40px;
  }
  .dc-form {
    *:focus {
      outline: none;
    }
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
    border-radius: 0;
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
  .ant-form-item-explain-error {
    color: #ff8f90;
  }
  .ant-form-item-has-error,
  .ant-input-number-prefix,
  .ant-form-item-has-error,
  .ant-form-item-has-error,
  .ant-input-number-prefix {
    .ant-input-prefix {
      color: #ff8f90 !important;
    }
  }
  .anticon {
    &.anticon-eye {
      &.ant-input-password-icon {
        color: #fff;
      }
    }
    &.anticon-eye-invisible {
      &.ant-input-password-icon {
        color: #fff;
      }
    }
  }
`

export default LoginForm
