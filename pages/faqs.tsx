import Layout from '@/components/layout'
import PageHeader from '@/components/pageHeader/cover'
import styled from 'styled-components'
import { Collapse } from 'antd'

const { Panel } = Collapse
const Origin = () => {
  function callback({ key }: { key: any }) {
    console.log(key)
  }

  return (
    <Layout>
      <PageHeader title={`Frequently Ask Questions`} image={`/cover4.jpeg`} />
      <StyledOrigin>
        <div className="container">
          <Collapse
            // defaultActiveKey={['0']}
            expandIcon={({ isActive }) =>
              isActive ? <div>+</div> : <div>-</div>
            }
            expandIconPosition="right"
          >
            {data.map((item, index) => {
              return (
                <Panel header={item.title} key={index}>
                  <p>{item.description}</p>
                </Panel>
              )
            })}
          </Collapse>
        </div>
      </StyledOrigin>
    </Layout>
  )
}

const StyledOrigin = styled.div`
  min-height: 500px;
  margin: 50px auto;
  max-width: 870px;

  p {
    font-size: 1.2em;
  }
  .ant-collapse-icon-position-right
    > .ant-collapse-item
    > .ant-collapse-header {
    font-size: 1.2em;
    font-weight: 600;
  }
  .ant-collapse-icon-position-right
    > .ant-collapse-item
    > .ant-collapse-header
    .ant-collapse-arrow {
    font-size: 1.3em;
    right: 22px;
    font-weight: 600;
  }
`

const data = [
  {
    title: '1. What are "DogeChew" Dog Chews?',
    description:
      '"DogeChew" Dog Chews are a hard cheese chew for dogs. This long-lasting chew is a great alternative to rawhide or “body parts”. Our chews are lactose, grain, gluten, soy, and corn-free. They are made using a single ingredient- CHEESE. "DogeChew" Dog Chews contain no artificial colors or flavoring.',
  },
  {
    title:
      '2. Does HDC expire? I read that "DogeChew" Cheese Chews can become moldy.',
    description:
      'Yes- HDC does expire but after a LONG shelf life. Most chews can last up to 5 years when stored appropriately. All chews should be kept in an airtight package avoiding extreme heat or cold weather. When chews are exposed to too much moisture they can mold. On the opposite end, when stored in too cold of temperatures, the chews can lose moisture and become brittle.',
  },
  {
    title: '3. Is "DogeChew" Cheese good for Dogs?',
    description:
      'Our "DogeChew" Cheese is great for dogs! It’s an alternate source of protein and helps provide mental stimulation along with healthy gums and teeth. Our company’s goal is to manufacture and provide the best natural and safe treats for dogs to enjoy without any preservatives and additives. "DogeChew" Dog Chews are quite tough, similar to bones. All dog chews and bones pose a threat due to the strength of the product. "DogeChew" Dog Chew is not exempt from these hazards. However, our chews are designed to be licked and then gnawed by the dog as the saliva softens the cheese. In an effort to assist in a warning and informing pet parents of the dangers of any hard chews, please compare them to as hard as bones.',
  },
  {
    title: '4. How long will "DogeChew" Chews last?',
    description:
      'These long-lasting chews will likely last your pup some time! However, the exact duration time of how long a chew can last is dependent on the dog. Our chews are known to last up to 7X longer than a bully stick.',
  },
  {
    title: '5. Why are some chews darker or lighter in color?',
    description:
      'This is what we call the hues of chews! Colors can vary depending on the location of the chew while in the smoker. The darker the chew indicates the chew was closer to smoke while the lighter indicates being further away. Occasionally you may even see little dark freckles along the chews. This is from moisture build-up within the containers – little bits of liquid smoke drip down onto the chews enhancing the flavor that much more for your pup!',
  },
  {
    title: '6. Why do some chews smell stronger than others?',
    description:
      'The smokiness can vary depending on the location of what type of “smokehouse” the chew has been smoked in. We have many farmers and herdsmen around the world with a variety of smokehouses; some are thatched huts, some are smoked over an open fire and some smokehouses are completely enclosed in an industrial fashion. The enclosure determines the strength of smoky aroma in our chews.',
  },
  {
    title:
      '7. Are your chews still made from yak’s milk? Many other companies have “100% yak milk”.',
    description:
      'There is no way to guarantee any yak chew is made from 100% yak milk. Our chews have always contained both yak and cow milk from farmers and herdsmen abroad. Our in-house, Washington state made, chews are 100% cows milk.',
  },
  {
    title: '8. I’m from outside the US; what countries do you sell to?',
    description:
      'We sell our chews all over the world! Canada, Korea, Hong Kong, Japan, Taiwan, EU, Mexico, and Australia!',
  },
  {
    title:
      '9. Cheese is in many of your products; will it upset my dog’s stomach?',
    description:
      'No. When given intermittently, cheese should not upset your dog’s stomach. Our cheese has the lactose removed making it easily digestible.',
  },
  {
    title: '10. Is "DogeChew" Dog Chew digestible?',
    description: '"DogeChew" Dog Chews are all-natural and easily digestible.',
  },
  {
    title: '11. What products are good for my older, younger, etc dog?',
    description:
      'Older and young dogs would do well with our "DogeChew" Bone Chew and any product from our yakySNACKS line. Because our "DogeChew" Bone Chews are hand pressed into molds, the texture is softer than our original chews. The addition of vegetable glycerin in our yakySNACKS makes a softer product, therefore easier for older or younger pups to chew.',
  },
  {
    title: '12. Can you add me to your store locator?',
    description:
      'We invite you to register through the retailer portal of our website. From there you can manage your store’s location(s) as well as see product, pricing, and place orders.',
  },
  {
    title: '13. How do I find out about specials and promotions?',
    description:
      'We are happy to add you to our monthly promotional email blast. From here you will see all current promotions being run. You are also welcome to reach out to our sales team to inquire about additional promotions. Sales@"DogeChew"dogchew.com',
  },
  {
    title:
      '14. Do you/can you support our event and store with samples/swag/marketing materials?',
    description:
      'Yes- typically we are happy to support your events with samples, swag, and marketing materials! You will also find all current and approved logos, sell sheets, and other retailer resources on our website.',
  },
  {
    title: '15. Which Distributors carry your product?',
    description:
      'Many distributors across the states and internationally carry our product. Please reach out to our sales team so we can better direct you to the exact distributor in your state.',
  },
  {
    title:
      '16. Can the "DogeChew" Dog Chews be given to dogs of all sizes and breeds?',
    description:
      'ssOur "DogeChew" Dog Chews are available for dogs of all ages, sizes, and breeds. We have different flavors ranging from cheese bacon and peanut butter to yogurt, salmon, and chicken. The chews are available in sizes of x-small, small, medium, large, and x-large. You can choose accordingly depending on the size of your dog and flavor preferences.zs',
  },
  {
    title: '17. What are the benefits of your antler bones as chews?',
    description:
      'The antler chews are easily digestible which makes them a healthier alternative to hard antlers. In addition, the antlers are sourced from naturally shed deer antlers and they support oral health by reducing plaque and tartar buildup. In addition, the deer antlers are rich in minerals like phosphorous, zinc, calcium, iron, and more that are beneficial for your dog’s bone health, growth, and metabolism.',
  },
  {
    title: '18. Are your dog chews free from preservatives?',
    description:
      'Yes, all our organic dog chews are free from any binding agents or preservatives. Besides, they are healthy as they don’t contain lactose, gluten, soy, or corn and they are loaded with nutrients.',
  },
  {
    title: '19. What is inside the "DogeChew" Bacon Bundle?',
    description:
      'The "DogeChew" Bacon Bundle is every chomping champion’s delight. Inside the "DogeChew" Dog Chew Bacon bundle, you can get 1 package of Churro Bacon, 1 package of Happy Teeth Bacon, 1 package of YUM Bacon, and 1 Piggy Bank variety bulk. In a nutshell, the bacon bundle has everything that can get your dog’s chewing session covered.',
  },
  {
    title:
      '20. Are your bacon bits cookies can be used as a training reward for my dog?',
    description:
      'Absolutely. The bacon bits cookies smell and taste great. The mouthwatering flavors of savory bacon in combination with wholesome goodness make bacon bits great as a reward or anytime treat.',
  },
]
export default Origin
