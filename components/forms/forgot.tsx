import { KeyOutlined, LockFilled, MailFilled } from '@ant-design/icons'
import { Button, notification } from 'antd'
import { Formik, FormikHelpers } from 'formik'
import { Form, FormItem, Input } from 'formik-antd'
import * as Yup from 'yup'
import { Cookies } from 'react-cookie'
import publicFetch from '@/lib/publicFetch'
import useUser from '@/hooks/useUser'
import { useState } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'

const cookies = new Cookies()

const ForgotPasswordForm = ({ onSuccess = () => {} }: { onSuccess?: any }) => {
  const router = useRouter()
  const { mutate } = useUser()
  const [otpCode, setOtpCode] = useState<string | undefined>()
  const [passwordForm, setPasswordForm] = useState(false)
  const [tempToken, setTempToken] = useState<string | undefined>()
  const formSchema = Yup.object().shape({
    username: Yup.string().required('Email is required'),
  })
  const passwordFormSchema = Yup.object().shape({
    password: Yup.string()
      .min(8, 'Password at least 8 characters')
      .matches(/^(?=.*[a-z])/, 'Must contain at least one lowercase character')
      .matches(/^(?=.*[A-Z])/, 'Must contain at least one uppercase character')
      .matches(/^(?=.*[0-9])/, 'Must contain at least one number')
      .required('Password is required'),
  })

  interface FormValuesInterface {
    username: string
  }

  interface FormValuesForgotInterface {
    password: string
    confirm_password: string
  }

  const handleSetPasswordSubmit = async (
    values: FormValuesForgotInterface,
    actions: FormikHelpers<FormValuesForgotInterface>
  ): Promise<void> => {
    try {
      await publicFetch<{ access_token: string }>(`/app/user/password`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${tempToken}`,
        },
        body: JSON.stringify(values),
      })

      notification.success({ message: 'Successfully password resetted' })

      router.push('/')
      actions.setSubmitting(false)
    } catch (error: any) {
      actions.setFieldError('username', error.data.message)
      actions.setSubmitting(false)
    }
  }

  const handleSubmit = async (
    values: FormValuesInterface,
    actions: FormikHelpers<FormValuesInterface>
  ): Promise<void> => {
    try {
      const res = await publicFetch<{ access_token: string }>(
        `/app/auth/forgot`,
        {
          method: 'POST',
          body: JSON.stringify(values),
        }
      )

      setTempToken(res.access_token)

      const otpRes = await publicFetch<{ dev_code: string }>(`/app/otp`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${res.access_token}`,
        },
      })

      setOtpCode(otpRes.dev_code)
      actions.setSubmitting(false)
    } catch (error: any) {
      actions.setFieldError('username', error.data.message)
      actions.setSubmitting(false)
    }
  }
  //   formikHelpers: FormikHelpers<{
  //     code: string;
  // }>) => void | Promise<any>

  const handleOtpSubmit = async (
    values: { code: string | undefined },
    actions: {
      setSubmitting: (arg0: boolean) => void
      setFieldError: (arg0: string, arg1: string) => void
    }
  ): Promise<void> => {
    try {
      const res = await publicFetch<{ access_token: string }>(
        `/app/otp/verify`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${tempToken}`,
          },
          body: JSON.stringify(values),
        }
      )
      setTempToken(res.access_token)
      setPasswordForm(true)
      notification.success({ message: 'Request successful' })
      actions.setSubmitting(false)
    } catch (error: any) {
      // notification.error({
      //   message: error.data.message,
      // })
      actions.setFieldError('code', error.data.message)
      actions.setSubmitting(false)
    }
  }

  const initialValues: FormValuesInterface = {
    username: '',
  }

  const initialPasswordValues: FormValuesForgotInterface = {
    password: '',
    confirm_password: '',
  }

  return (
    <StyledWrapper>
      <h2 className="login-modal-header">Forget password</h2>
      {passwordForm ? (
        <Formik
          initialValues={initialPasswordValues}
          validationSchema={passwordFormSchema}
          validate={(values) => {
            const errors: any = {}
            if (!values.confirm_password) {
              errors.confirm_password = 'password confirm is required'
            }
            if (
              values.confirm_password &&
              values.confirm_password !== values.password
            ) {
              errors.confirm_password = 'password confirm is not match!'
            }
            return errors
          }}
          onSubmit={handleSetPasswordSubmit}
        >
          {({ isSubmitting, errors }) => (
            <Form layout={'vertical'} className="dc-form">
              <FormItem name="password">
                <Input
                  bordered={false}
                  type="password"
                  prefix={<LockFilled />}
                  size="large"
                  placeholder="Password"
                  name="password"
                />
              </FormItem>
              <FormItem name="confirm_password">
                <Input
                  bordered={false}
                  type="password"
                  prefix={<LockFilled />}
                  size="large"
                  placeholder="Confirm password"
                  name="confirm_password"
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
                Set new password
              </Button>
            </Form>
          )}
        </Formik>
      ) : otpCode ? (
        <Formik
          enableReinitialize
          initialValues={{ code: otpCode }}
          validate={(values) => {
            const errors: any = {}

            if (!values.code) {
              errors.code = 'Code is required'
            }

            return errors
          }}
          onSubmit={handleOtpSubmit}
        >
          {({ isSubmitting }) => (
            <Form layout={'vertical'} className="dc-form">
              <FormItem name="code">
                <Input
                  bordered={false}
                  size="large"
                  name="code"
                  placeholder="Code"
                  prefix={<KeyOutlined />}
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
                Verify
              </Button>
            </Form>
          )}
        </Formik>
      ) : (
        <Formik
          initialValues={initialValues}
          validationSchema={formSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form layout={'vertical'} className="dc-form">
              <FormItem name="username">
                <Input
                  bordered={false}
                  prefix={<MailFilled />}
                  size="large"
                  name="username"
                  placeholder="Email"
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
                Reset password
              </Button>
            </Form>
          )}
        </Formik>
      )}
      <p className="login-text">
        After `Reset password` clicking, check your email to make sure you have
        received a text message.
      </p>
    </StyledWrapper>
  )
}

const StyledWrapper = styled.div`
  h2 {
    padding-bottom: 40px;
  }
  .dc-form {
    *:focus {
      outline: none;
    }
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
`

export default ForgotPasswordForm
