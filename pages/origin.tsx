import Layout from '@/components/layout'
import PageHeader from '@/components/pageHeader/cover'
import styled from 'styled-components'
import BoneButton from '@/components/boneButton'
import BoneButtonFlat from '@/components/boneButtonFlat'
import { Button, Col, Divider, Row, Space } from 'antd'

const Origin = () => {
  return (
    <Layout>
      <PageHeader title={`Origin`} image={`/cover4.jpeg`} />
      <StyledOrigin>
        <div className="container">
          <Row gutter={[16, 32]}>
            <Col
              xs={{ order: 1, span: 24 }}
              sm={{ order: 1, span: 24 }}
              md={{ order: 1, span: 12 }}
              lg={{ order: 1, span: 12 }}
              xl={{ order: 1, span: 14 }}
              xxl={{ order: 1, span: 14 }}
            >
              <div className="content">
                <div>
                  <h1>Our Story</h1>
                  <p>
                    It started in 2003 with an idea born out of curiosity. Two
                    brothers, Suman and Sujan Shrestha, their friend, Nishes
                    Shrestha and Kaos the dog discovered that dogs love Churpi;
                    the traditional Nepalese chew made for people of the
                    Himalayas. They spent 4 years re-engineering the traditional
                    ancient recipe by removing the lactose and fat content;
                    creating a healthy, savory long-lasting chew for dogs now
                    known as The Dogechew Dog Chew. From the humble beginnings
                    at a small local pet fair in Bellingham, WA to the
                    award-winning company we are today, we’ve led the pet
                    industry in an innovative new direction with our original
                    hard cheese chews; creating a new category within pet
                    industry – a category our loyal customers love. We pass on
                    our gratitude for those loyal customers through our Loyalty
                    Program, where every purchase is rewarded.
                  </p>
                </div>
              </div>
            </Col>
            <Col
              xs={{ order: 1, span: 24 }}
              sm={{ order: 1, span: 24 }}
              md={{ order: 1, span: 12 }}
              lg={{ order: 1, span: 12 }}
              xl={{ order: 1, span: 10 }}
              xxl={{ order: 1, span: 10 }}
            >
              <div className="content">
                <div className="img">
                  <img src="/a.jpeg" />
                </div>
              </div>
            </Col>
            <Col
              xs={{ order: 1, span: 24 }}
              sm={{ order: 1, span: 24 }}
              md={{ order: 1, span: 12 }}
              lg={{ order: 1, span: 12 }}
              xl={{ order: 1, span: 10 }}
              xxl={{ order: 1, span: 10 }}
            >
              <div className="content">
                <div className="img">
                  <img src="/b.jpeg" />
                </div>
              </div>
            </Col>
            <Col
              xs={{ order: 1, span: 24 }}
              sm={{ order: 1, span: 24 }}
              md={{ order: 1, span: 12 }}
              lg={{ order: 1, span: 12 }}
              xl={{ order: 1, span: 14 }}
              xxl={{ order: 1, span: 14 }}
            >
              <div className="content">
                <div>
                  <h1>Our Communities</h1>
                  <p>
                    Dogechew Pet Supply has always believed in giving back to
                    the community, especially farmers, who the company trusts
                    are the heart of the global community. The company started
                    in Nepal with small family farms and today partners with
                    farmers around the globe as well as locally, with a
                    Washington State dairy farm, producing 124 million pounds of
                    milk per year. Now, Dogechew Pet Supply is certified for
                    quality by SQF, APHIS, AIB and WFTO.
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </StyledOrigin>
    </Layout>
  )
}

const StyledOrigin = styled.div`
  min-height: 500px;
  margin: 50px 0;

  h1 {
    font-size: 32px;
    font-weight: 700;
    color: var(--primary);
    padding: 0 30px;
  }
  p {
    padding: 0 30px;
    font-size: 1.2em;
  }
  .content {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
  .img {
    width: 100%;
    height: auto;
    padding: 30px;
    img {
      width: 100%;
      height: auto;
      object-fit: cover;
      border-radius: 10px;
    }
  }
`

export default Origin
