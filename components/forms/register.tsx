import {
  LockFilled,
  FacebookOutlined,
  GooglePlusOutlined,
  UserOutlined,
  MailFilled,
  GlobalOutlined,
  CaretDownFilled,
  KeyOutlined,
} from '@ant-design/icons'
import { Button, notification, Row, Space } from 'antd'
import { Formik, FormikHelpers } from 'formik'
import { Form, FormItem, Input, Select } from 'formik-antd'
import * as Yup from 'yup'
import { Cookies } from 'react-cookie'
import publicFetch from '@/lib/publicFetch'
import styled from 'styled-components'
import useUser from '@/hooks/useUser'
import { useState } from 'react'

const cookies = new Cookies()

interface RergisterFormValues {
  email: string
  password: string
  country_code: string
}

const RegisterForm = ({ onSuccess = () => {} }: { onSuccess?: any }) => {
  const { mutate } = useUser()
  const [otpCode, setOtpCode] = useState<string | undefined>()
  const [tempToken, setTempToken] = useState<string | undefined>()
  const formSchema = Yup.object().shape({
    email: Yup.string()
      .email('Email is required')
      .required('Email is required'),
    password: Yup.string()
      .min(8, 'Password at least 8 characters')
      .matches(/^(?=.*[a-z])/, 'Must contain at least one lowercase character')
      .matches(/^(?=.*[A-Z])/, 'Must contain at least one uppercase character')
      .matches(/^(?=.*[0-9])/, 'Must contain at least one number')
      .required('Password is required'),
  })

  const registerValues: RergisterFormValues = {
    email: '',
    password: '',
    country_code: 'US',
  }

  const handleSubmit = async (
    values: RergisterFormValues,
    actions: FormikHelpers<RergisterFormValues>
  ): Promise<void> => {
    try {
      const res = await publicFetch<{ access_token: string }>(
        `/app/auth/register`,
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
      actions.setFieldError('email', error.data.message)
      actions.setSubmitting(false)
    }
  }
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
      cookies.set('token', tempToken)
      mutate()
      onSuccess()
      notification.success({ message: 'Request successful' })
      actions.setSubmitting(false)
    } catch (error: any) {
      actions.setFieldError('code', error.data.message)
      actions.setSubmitting(false)
    }
  }

  return (
    <StyledWrapper>
      <h2 className="login-modal-header">Signup</h2>
      {otpCode ? (
        <Formik
          enableReinitialize
          initialValues={{
            code: otpCode,
          }}
          validate={(values) => {
            const errors: any = {}

            if (!values.code) {
              errors.code = 'Code is required'
            }

            return errors
          }}
          onSubmit={handleOtpSubmit}
        >
          {({ isSubmitting, setFieldError }) => (
            <Form layout={'vertical'} className="dc-form">
              <FormItem name="code">
                <Input
                  bordered={false}
                  prefix={<KeyOutlined />}
                  size="large"
                  name="code"
                  placeholder="Code"
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
          initialValues={registerValues}
          validationSchema={formSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form layout={'vertical'} className="dc-form">
              <FormItem name="email">
                <Input
                  bordered={false}
                  prefix={<MailFilled />}
                  size="large"
                  name="email"
                  placeholder="Email"
                />
              </FormItem>
              <FormItem name="password">
                <Input.Password
                  bordered={false}
                  prefix={<LockFilled />}
                  size="large"
                  placeholder="Password"
                  name="password"
                />
              </FormItem>
              <FormItem name="country_code">
                <Select
                  bordered={false}
                  suffixIcon={<CaretDownFilled style={{ color: '#fff' }} />}
                  size="large"
                  name="country_code"
                  placeholder="Салбар сонгох"
                >
                  {[{ code: 'US', name: 'US - United States' }].map(
                    (item: { name: string; code: string }) => (
                      <Select.Option key={item.code} value={item.code}>
                        {item.name}
                      </Select.Option>
                    )
                  )}
                </Select>
              </FormItem>
              <Button
                htmlType="submit"
                type="primary"
                size="large"
                loading={isSubmitting}
                block
                style={{ marginBottom: '24px' }}
              >
                Register
              </Button>
            </Form>
          )}
        </Formik>
      )}
      <p className="login-text">
        Register for a Free Account and get Exclusive Discounts, Subscribe &
        Save, Manage your Personalized Wishlist & do much more.
      </p>
    </StyledWrapper>
  )
}

const StyledWrapper = styled.div`
  h1 {
    padding-bottom: 40px;
  }
  .dc-form {
    .ant-col {
      &.ant-form-item-label {
        label {
          color: #fff;
        }
      }
    }
    .ant-select-selector {
      background: transparent;
      color: #fff;
      border: none;
      border-bottom: 1px solid #fff;
      border-radius: 0;
      font-size: 24px;
    }
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

export default RegisterForm
