import Layout from '@/components/layout'
import PageHeader from '@/components/pageHeader/cover'
import styled from 'styled-components'

const ContactUs = () => {
  return (
    <Layout>
      <PageHeader title={`Contact us`} image={`/cover5.jpeg`} />
      <StyledContactUs>
        <div className="container">This is ContactUs view</div>
      </StyledContactUs>
    </Layout>
  )
}

const StyledContactUs = styled.div`
  height: 500px;
`

export default ContactUs
