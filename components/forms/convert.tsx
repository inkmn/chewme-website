import { notification, Select as SelectAnt, Input as InputAnt } from 'antd'
import { Formik } from 'formik'
import { Form, Input, Select } from 'formik-antd'
import styled from 'styled-components'
import privatefetcher from '@/lib/privateFetch'
import * as Yup from 'yup'
import { CaretDownOutlined, SwapOutlined } from '@ant-design/icons'
import Image from 'next/image'
import DogeChew from '../../assets/dogechew-coin.png'
import Shiba from '../../assets/dogcoin.png'

const Option = SelectAnt.Option

const formSchema = Yup.object().shape({
  curency: Yup.string().email().required('curency is required'),
  value: Yup.string().required('value is required'),
})

const Convert = () => {
  const handleSubmit = async (
    values: any,
    actions: { setSubmitting: (arg0: boolean) => void }
  ): Promise<void> => {
    try {
      let res: any = await privatefetcher<{ access_token: string }>(
        `/app/user/convert`,
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
      })
      actions.setSubmitting(false)
    } catch (error: any) {
      notification.error({
        message: error.data.message,
      })
      actions.setSubmitting(false)
    }
  }

  return (
    <StyledForm>
      <Formik
        initialValues={{
          valute: '123',
          curency: 'USD',
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
              <InputAnt.Group compact>
                <Input
                  type={'number'}
                  max={100}
                  size="large"
                  name="valute"
                  style={{ width: 'calc(100% - 120px)' }}
                  defaultValue="SHIBA"
                  suffix={
                    <div
                      style={{ color: 'var(--primary)', paddingLeft: '5px' }}
                    >
                      MAX
                    </div>
                  }
                />
                <Select
                  style={{ width: '120px' }}
                  size="large"
                  name="curency"
                  suffixIcon={<CaretDownOutlined />}
                >
                  <Option value="DC">
                    <OptionItem>
                      <span className="icon">
                        <Image src={DogeChew} width={25} height={25} alt="" />
                      </span>
                      <span>DC</span>
                    </OptionItem>
                  </Option>
                  <Option value="SHIBA">
                    <OptionItem>
                      <span className="icon">
                        <Image src={Shiba} width={25} height={25} alt="" />
                      </span>
                      <span>SHIBA</span>
                    </OptionItem>
                  </Option>
                </Select>
              </InputAnt.Group>
            </Form.Item>
            <Icon>
              <SwapOutlined rotate={90} />
            </Icon>
            <Form.Item name="email">
              <InputAnt.Group compact>
                <Input
                  type={'number'}
                  max={100}
                  size="large"
                  name="valute"
                  style={{ width: 'calc(100% - 120px)' }}
                  defaultValue="SHIBA"
                  suffix={<div style={{ color: 'var(--primary)' }}></div>}
                  disabled
                />
                <Select
                  style={{ width: '120px' }}
                  size="large"
                  name="curency"
                  suffixIcon={<CaretDownOutlined />}
                  disabled
                >
                  <Option value="DC">
                    <OptionItem>
                      <span className="icon">
                        <Image src={DogeChew} width={25} height={25} alt="" />
                      </span>
                      <span>DC</span>
                    </OptionItem>
                  </Option>
                  <Option value="SHIBA">
                    <OptionItem>
                      <span className="icon">
                        <Image src={Shiba} width={25} height={25} alt="" />
                      </span>
                      <span>SHIBA</span>
                    </OptionItem>
                  </Option>
                </Select>
              </InputAnt.Group>
            </Form.Item>
            <Button
              shape="round"
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

const OptionItem = styled.div`
  /* font-size: 40px; */
  display: flex;
  align-items: center;
  justify-content: space-between;
  .icon {
    height: 25px;
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
