import Layout from '@/components/layout'
import PageHeader from '@/components/pageHeader/cover'
import styled from 'styled-components'

const Representatives = () => {
  return (
    <Layout>
      <PageHeader title={`representatives`} image={`/cover5.jpeg`} />
      <StyledContactUs>
        <div className="container">
          <h1 className="page-title">representatives</h1>
        </div>
      </StyledContactUs>
    </Layout>
  )
}

const StyledContactUs = styled.div``

export default Representatives
