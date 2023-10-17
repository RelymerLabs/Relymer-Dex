import { Trans } from '@pancakeswap/localization'
import { AtomBox } from '@pancakeswap/ui/components/AtomBox'
import { Button, Heading, Image, LinkExternal, Text } from '@pancakeswap/uikit'
import { useState } from 'react'

const IntroSteps = [
  {
    title: <Trans>Your first step in the DeFi world</Trans>,
    icon: 'images/logo.png',
    description: '',
  },
  {
    title: <Trans>Login using a wallet connection</Trans>,
    icon: 'images/logo.png',
    description: '',
  },
]

const StepDot = ({ active, place, onClick }: { active: boolean; place: 'left' | 'right'; onClick: () => void }) => (
  <AtomBox padding="4px" onClick={onClick} cursor="pointer">
    <AtomBox
      bgc={active ? 'secondary' : 'inputSecondary'}
      width="56px"
      height="8px"
      borderLeftRadius={place === 'left' ? 'card' : '0'}
      borderRightRadius={place === 'right' ? 'card' : '0'}
    />
  </AtomBox>
)

export const StepIntro = ({ docLink, docText }: { docLink: string; docText: string }) => {
  const [step, setStep] = useState(0)

  const introStep = IntroSteps[step]

  return (
    <AtomBox
      display="flex"
      width="full"
      flexDirection="column"
      style={{ gap: '24px' }}
      mx="auto"
      my="48px"
      textAlign="center"
      alignItems="center"
    >
      {introStep && (
        <>
          <Heading as="h2" color="#556970">
            {introStep.title}
          </Heading>
          <Image m="auto" src={introStep.icon} width={198} height={178} />
          <Text maxWidth="368px" m="auto" small color="textSubtle">
            {introStep.description}
          </Text>
        </>
      )}
      <AtomBox display="flex">
        <StepDot place="left" active={step === 0} onClick={() => setStep(0)} />
      </AtomBox>
    </AtomBox>
  )
}