import Layout from '@/components/layout'
import PageHeader from '@/components/pageHeader/cover'
import styled from 'styled-components'

const ContactUs = () => {
  return (
    <Layout>
      <PageHeader title={`About`} image={`/cover5.jpeg`} />
      <StyledContactUs>
        <div className="container">
          <h1 className="page-title">About</h1>
        </div>
      </StyledContactUs>
    </Layout>
  )
}

const StyledContactUs = styled.div`
  h1 {
  }
`

export default ContactUs
