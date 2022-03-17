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
import ShippingAddress from '@/components/forms/shippingAddress'
import UserPassword from '@/components/forms/userPassword'
import UserEmail from '@/components/forms/userEmail'

const Settings = () => {
  const { user } = useUser()

  return (
    <Layout>
      <PageHeader title={`Settings`} image={`/cover5.jpeg`} />
      <StyledSettings>
        <div className="container">
          <Row gutter={[24, 24]}>
            <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
              <h1>Shipping Address</h1>
              <ShippingAddress />
            </Col>
            <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
              <h1>Password changes</h1>
              <UserPassword />
            </Col>
            <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
              <h1>Email changes</h1>
              <UserEmail />
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
`

export default Settings
