import Layout from '@/components/layout'
import PageHeader from '@/components/pageHeader/cover'
import styled from 'styled-components'
import { Formik } from 'formik'
import { Form, Input } from 'formik-antd'
import GoogleMapReact from 'google-map-react'
import { Button, Col, Row, Form as FormAnt } from 'antd'
import ButtonStyled from '@/components/buttonStyled'

const AnyReactComponent = ({
  text,
  lat,
  lng,
}: {
  text: string
  lat: number
  lng: number
}) => <div>{text}</div>

const ContactUs = () => {
  const defaultProps = {
    center: {
      lat: 47.916330830466684,
      lng: 106.9096143220295,
    },
    zoom: 7,
  }

  const handleSubmit = async (
    values: any,
    actions: { setSubmitting: (arg0: boolean) => void }
  ): Promise<void> => {
    console.log('Data : ', values)
  }

  return (
    <Layout>
      <PageHeader title={`Contact us`} image={`/cover5.jpeg`} />
      <StyledContactUs>
        <div className="container">
          <h1>Contact Us</h1>
          {/* <p>* Click the green Message Us button to connect via Messenger. </p> */}
          <div style={{ height: '400px', width: '100%' }}>
            <GoogleMapReact
              bootstrapURLKeys={{
                key: '',
              }}
              defaultCenter={defaultProps.center}
              defaultZoom={defaultProps.zoom}
            >
              <AnyReactComponent
                lat={59.955413}
                lng={30.337844}
                text="My Marker"
              />
            </GoogleMapReact>
          </div>
          <div className="contact-form">
            <Formik
              initialValues={{
                name: '',
                email: '',
                phone: '',
                message: '',
              }}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form layout="vertical">
                  <Row gutter={[24, 2]}>
                    <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
                      <div className="border">
                        <p>
                          Hello! Thanks for visiting Dog Chews Store. We hope
                          you were able to find everything you need for your fur
                          babies.
                        </p>
                        <p>
                          If you have any product, wholesale, collaboration or
                          general inquiries, please use the form below or
                          Telegram us at:
                          <a href="https://t.me/DCcoinmn">
                            {' '}
                            https://t.me/DCcoinmn
                          </a>
                        </p>
                        <p>
                          Please quote your order number if applicable. Our team
                          will respond within 24 hours.
                        </p>
                        <p>
                          Follow our Facebook page{' '}
                          <a href="https://www.facebook.com/dogechewcoin">
                            DogeChew Coin
                          </a>{' '}
                        </p>
                      </div>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
                      <div className="border">
                        <Form.Item name="email">
                          <Input
                            size="large"
                            name="phone"
                            placeholder="Your phone"
                            style={{ width: '100%' }}
                          />
                        </Form.Item>
                        <Form.Item name="current_password">
                          <Input.TextArea
                            size="large"
                            rows={6}
                            name="current_password"
                            placeholder="Your message "
                            style={{ width: '100%' }}
                          />
                        </Form.Item>
                        <div className="flex-end">
                          <ButtonStyled
                            htmlType="submit"
                            type="primary"
                            loading={isSubmitting}
                            size="large"
                            shape="round"
                          >
                            Message us
                          </ButtonStyled>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </StyledContactUs>
    </Layout>
  )
}

const StyledContactUs = styled.div`
  min-height: 500px;
  margin-top: 40px;

  .contact-form {
    margin-top: 20px;
  }
  .flex-end {
    width: 100%;
    justify-content: flex-end;
    display: flex;
  }
  textarea {
    min-height: 168px !important;
  }

  .ant-form-item-label {
    font-size: 1.2em;
  }
  p {
    font-size: 1.2em;
    max-width: 780px;
  }
  h1 {
    font-size: 2rem;
    font-weight: 700;
    color: var(--primary);
  }
`

export default ContactUs
