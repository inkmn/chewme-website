import { Formik } from 'formik'
import { Form, Input } from 'formik-antd'
import styled from 'styled-components'
import Link from 'next/link'
import { CopyFilled } from '@ant-design/icons'
import { message } from 'antd'

interface DataType {
  id: string | undefined
  is_active: boolean | undefined
  owner_type: string | undefined
  owner_id: string | undefined
  type: string | undefined
  number: string | undefined
  name: string | undefined
  code: string | undefined
  qr_code: string | undefined
  currency: string | undefined
  balance_amount: number | undefined
  hold_amount: number | undefined
  account_status: string | undefined
  account_status_date: Date | undefined | string
  note: string | undefined
  created_by: Date | undefined | string
  created_at: Date | undefined | string
  updated_by: Date | undefined | string
  updated_at: Date | undefined | string
  status: boolean | string
}

const DepositView = ({ data }: { data: DataType | any }) => {
  return (
    <StyledForm>
      <Formik
        initialValues={{
          balance_amount: data?.balance_amount || undefined,
        }}
        onSubmit={() => {}}
      >
        {({ isSubmitting }) => (
          <Form layout="vertical">
            <Form.Item
              name="email"
              label={<div className="label-ant">Coin</div>}
            >
              <Input
                size="large"
                name="balance_amount"
                placeholder="USD Thether ect."
              />
            </Form.Item>
            <Form.Item
              name="email"
              label={<div className="label-ant">Deposit to</div>}
            >
              <Input
                value={data.balance_amount}
                size="large"
                name=""
                placeholder="USD Thether ect."
              />
            </Form.Item>
            <Form.Item name="email" label={<div className="label-ant"></div>}>
              <span className="color-grey">Address</span>
              <Input
                value={data.number}
                size="large"
                name="email"
                placeholder="xxxxxxxxxxx-xxxxxxxxxx"
                suffix={
                  <span
                    onClick={() => {
                      navigator.clipboard.writeText(data?.number || '')
                      message.info('Copied wallet address!')
                    }}
                    className="copy-btn"
                  >
                    <CopyFilled />
                  </span>
                }
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
  .copy-btn {
    color: var(--primary);
    :hover {
      color: green;
    }
  }
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
