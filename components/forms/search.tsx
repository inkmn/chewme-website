import { Button, Row, Input as AntInput } from 'antd'
import { Formik } from 'formik'
import { Form, FormItem, Input } from 'formik-antd'
import { useRouter } from 'next/router'
import qs from 'qs'
import styled from 'styled-components'

const SearchForm = () => {
  const router = useRouter()
  const { query = '' } = router.query as any

  const handleSubmit = async (values: any): Promise<void> => {
    router.push(`${router.pathname}?query=${values.query}`)
  }

  return (
    <StyledSearch>
      <Formik
        enableReinitialize
        initialValues={{
          query,
        }}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="search-form">
            <FormItem name="query">
              <AntInput.Group>
                <Input size="large" name="query" />
                <Button
                  size="large"
                  htmlType="submit"
                  loading={isSubmitting}
                  type="primary"
                >
                  Search
                </Button>
              </AntInput.Group>
            </FormItem>
          </Form>
        )}
      </Formik>
    </StyledSearch>
  )
}

const StyledSearch = styled.div`
  width: 100%;
  max-width: 600px;
  .search-form {
    .ant-input-group {
      display: flex;
    }
    .ant-form-item {
      margin-bottom: 0;
      .ant-input {
        resize: none;
      }
    }
  }
`

export default SearchForm
