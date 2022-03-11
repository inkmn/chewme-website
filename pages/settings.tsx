import Layout from '@/components/layout'
import PageHeader from '@/components/cover/pageHeader'
import styled from 'styled-components'
import useUser from '@/hooks/useUser'

const Settings = () => {
  const { user } = useUser()
  return (
    <Layout>
      <PageHeader title={`Settings`} image={`/cover5.jpeg`} />
      <StyledSettings>
        <div className="container">
          This is Settings view
          <pre>{JSON.stringify(user, null, 2)}</pre>
        </div>
      </StyledSettings>
    </Layout>
  )
}

const StyledSettings = styled.div`
  height: 500px;
`

export default Settings
