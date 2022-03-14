import Layout from '@/components/layout'
import PageHeader from '@/components/pageHeader/cover'
import styled from 'styled-components'
import useUser from '@/hooks/useUser'
import { Formik } from 'formik'
import { Form, FormItem, Input, InputNumber } from 'formik-antd'
import { Button, Col, Row, Space } from 'antd'

const Settings = () => {
  const { user, mutate } = useUser()

  const layout = {
    labelCol: { span: 12 },
    wrapperCol: { span: 12 },
  }

  const handleSubmit = async (
    values: any,
    actions: { setSubmitting: (arg0: boolean) => void }
  ): Promise<void> => {
    console.log('Data : ', values)
  }
  return (
    <Layout>
      <PageHeader title={`Settings`} image={`/cover5.jpeg`} />
      <StyledSettings>
        <div className="container">
          {/* This is Settings view
          <pre>{JSON.stringify(user, null, 2)}</pre> */}

          <Formik
            initialValues={{
              username: '',
            }}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form layout="vertical">
                <Row gutter={[16, 16]}>
                  <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
                    <div style={{ padding: '21px 0' }}>
                      <Form.Item name="username" label="Username" required>
                        <Input name="username" placeholder="Username" />
                      </Form.Item>
                      <Form.Item name="lastname" label="Last name" required>
                        <Input name="lastname" placeholder="Last name" />
                      </Form.Item>
                      <Form.Item
                        name="displayname"
                        label="Display name"
                        required
                      >
                        <Input
                          name="displayname"
                          placeholder="Display name"
                          style={{ width: '100%' }}
                        />
                      </Form.Item>
                      <Form.Item name="email" label="Email address" required>
                        <Input
                          name="email"
                          placeholder="Email address"
                          style={{ width: '100%' }}
                        />
                      </Form.Item>
                    </div>
                  </Col>
                  <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
                    <div className="border">
                      <Form.Item
                        name="current_password"
                        label="Current password (leave blank to leave unchanged)"
                        required
                      >
                        <Input
                          name="current_password"
                          placeholder="Current password (leave blank to leave unchanged)"
                          style={{ width: '100%' }}
                        />
                      </Form.Item>
                      <Form.Item
                        name="new_password"
                        label="New password (leave blank to leave unchanged)"
                        required
                      >
                        <Input
                          name="new_password"
                          placeholder="New password (leave blank to leave unchanged)"
                        />
                      </Form.Item>
                      <Form.Item
                        name="confirm_password"
                        label="Confirm new password"
                        required
                      >
                        <Input
                          name="confirm_password"
                          placeholder="Confirm new password"
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
                  Save changes
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </StyledSettings>
    </Layout>
  )
}

const StyledSettings = styled.div`
  min-height: 500px;
  margin-top: 10px;

  .border {
    padding: 20px;
    border: 1px solid #dadada;
    border-radius: 15px;
    width: 100%;
    margin-bottom: 20px;
  }
  .btn-save {
    background: var(--primary);
    border-color: var(--primary);
  }
`

export default Settings
