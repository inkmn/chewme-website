import Layout from '@/components/layout'
import PageHeader from '@/components/pageHeader/cover'
import styled from 'styled-components'
import { Formik } from 'formik'
import { Form, Input } from 'formik-antd'
import { Button, Col, Row } from 'antd'

const ContactUs = () => {
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
          <p>
            Hello! Thanks for visiting Dog Chews Store. We hope you were able to
            find everything you need for your fur babies.
          </p>
          <p>
            If you have any product, wholesale, collaboration or general
            inquiries, please use the form below or Telegram us at:
            <a href="https://t.me/DCcoinmn"> https://t.me/DCcoinmn</a>
          </p>
          <p>
            Please quote your order number if applicable. Our team will respond
            within 24 hours.
          </p>
          <p>
            Follow our Facebook page{' '}
            <a href="https://www.facebook.com/dogechewcoin">DogeChew Coin</a>{' '}
          </p>
          <p>* Click the green Message Us button to connect via Messenger. </p>

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
                        <Form.Item name="name">
                          <Input
                            size="large"
                            name="name"
                            placeholder="Your name"
                          />
                        </Form.Item>
                        <Form.Item name="email" required>
                          <Input
                            size="large"
                            name="email"
                            placeholder="Your email"
                            style={{ width: '100%' }}
                          />
                        </Form.Item>
                        <Form.Item name="email">
                          <Input
                            size="large"
                            name="phone"
                            placeholder="Your phone"
                            style={{ width: '100%' }}
                          />
                        </Form.Item>
                      </div>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
                      <div className="border">
                        <Form.Item name="current_password">
                          <Input.TextArea
                            size="large"
                            rows={6}
                            name="current_password"
                            placeholder="Your message "
                            style={{ width: '100%' }}
                          />
                        </Form.Item>
                      </div>
                    </Col>
                  </Row>

                  <Button
                    htmlType="submit"
                    type="primary"
                    loading={isSubmitting}
                    size="large"
                    shape="round"
                    className="btn-save"
                  >
                    Message us
                  </Button>
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

  .btn-save {
    border-color: var(--primary);
    background: var(--primary);
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
