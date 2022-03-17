import { Formik } from 'formik'
import { Form, FormItem, Input, Select } from 'formik-antd'
import styled from 'styled-components'
import * as Yup from 'yup'
import Link from 'next/link'

const DepositView = () => {
  return (
    <StyledForm>
      <Formik
        initialValues={{
          email: '',
          type: 'EMAIL',
        }}
        onSubmit={() => {}}
      >
        {({ isSubmitting }) => (
          <Form
            layout="horizontal"
            labelCol={{ xs: 24, sm: 6, md: 6, lg: 8, xl: 6, xxl: 6 }}
            wrapperCol={{ xs: 24, sm: 16, md: 14, lg: 14, xl: 14, xxl: 16 }}
          >
            <Form.Item
              name="email"
              label={<div className="label-ant">Coin</div>}
            >
              <Input size="large" name="email" placeholder="USD Thether ect." />
            </Form.Item>
            <Form.Item
              name="email"
              label={<div className="label-ant">Deposit to</div>}
            >
              <Input size="large" name="email" placeholder="USD Thether ect." />
            </Form.Item>
            <Form.Item name="email" label={<div className="label-ant"></div>}>
              <span className="color-grey">Address</span>
              <Input
                size="large"
                name="email"
                placeholder="xxxxxxxxxxx-xxxxxxxxxx"
              />
              <ul className="footer-content">
                <li>Send only BUSD to this deposit address</li>
                <li>
                  Ensure the network is
                  <Link href="/BEP2">
                    <a className="green"> BNB Beacon Chain (BEP2).</a>
                  </Link>
                </li>
                <li>
                  Do not sent NFTs to this address.
                  <Link href="/NFT">
                    <a className="green">Learn how to Deposit NFT’s</a>
                  </Link>
                </li>
              </ul>
            </Form.Item>
          </Form>
        )}
      </Formik>
    </StyledForm>
  )
}

const StyledForm = styled.div`
  .green {
    color: var(--primary);
  }
  .footer-content {
    padding: 30px 20px;
  }
  .label-ant {
    font-size: 1.2rem;
    color: #666666;
    min-width: 220px;
    text-align: start;
  }

  .color-grey {
    color: #666666;
  }
  .ant-form-item-label > label::after {
    display: none;
  }

  @media only screen and (max-width: 600px) {
  }
`

export default DepositView
