import { Button, Col, notification, Select as SelectAnt } from 'antd'
import { Formik } from 'formik'
import { Form, FormItem, Input, Select } from 'formik-antd'
import styled from 'styled-components'
import privatefetcher from '@/lib/privateFetch'
import * as Yup from 'yup'
import { CaretDownOutlined, SwapOutlined } from '@ant-design/icons'
import Image from 'next/image'
import DogeChew from '../../assets/dogechew-coin.png'

const Option = SelectAnt.Option

const formSchema = Yup.object().shape({
  // email: Yup.string().email().required('Email is required'),
  // type: Yup.string().required('Type is required'),
})

const Convert = () => {
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

  const selectAfter = (): any => {
    return (
      <SelectAnt
        defaultValue="USD"
        style={{ width: '100px' }}
        suffixIcon={<CaretDownOutlined />}
      >
        <OptionAnt value="USD">
          <span className="icon">
            <Image src={DogeChew} width={30} height={30} alt="" />
          </span>
          USD
        </OptionAnt>
        <OptionAnt value="EUR">EUR</OptionAnt>
        <OptionAnt value="GBP">GBP</OptionAnt>
        <OptionAnt value="CNY">CNY</OptionAnt>
      </SelectAnt>
    )
  }

  return (
    <StyledForm>
      <Formik
        initialValues={{
          email: '',
          type: 'EMAIL',
        }}
        validationSchema={formSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form layout="vertical">
            <Label>
              <span className="convert-label">From</span>
              <span>
                Available coin: <span className="black">1000</span> USD
              </span>
            </Label>
            <Form.Item name="email">
              <Input
                name="email"
                size="large"
                placeholder="Email"
                // addonAfter={selectAfter()}
              />
            </Form.Item>
            <Icon>
              <SwapOutlined rotate={90} />
            </Icon>
            <Form.Item name="email">
              <Input name="email" size="large" placeholder="Email" disabled />
            </Form.Item>
            <Button
              style={{
                width: '100%',
                marginTop: '20px',
              }}
              htmlType="submit"
              type="primary"
              loading={isSubmitting}
              size="large"
            >
              Swap
            </Button>
          </Form>
        )}
      </Formik>
    </StyledForm>
  )
}

const OptionAnt = styled(Option)`
  font-size: 40px;
  display: flex;
  align-items: center;
  flex-direction: row;
  background-color: rebeccapurple;

  .ant-select-item-option-content {
    background-color: rebeccapurple;
  }
`

const Icon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  color: var(--primary);
  padding-bottom: 20px;
`

const Label = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-size: 1rem;
  margin-bottom: 5px;
  color: #666666;

  .black {
    color: #333;
  }
`

const StyledForm = styled.div`
  max-width: 500px;
  margin: 30px auto;
`

export default Convert
