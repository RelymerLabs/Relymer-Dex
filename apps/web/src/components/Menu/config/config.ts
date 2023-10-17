import {
  MenuItemsType,
  SwapIcon,
  SwapFillIcon,
  EarnFillIcon,
  EarnIcon,
  DropdownMenuItems,
} from '@pancakeswap/uikit'
import { ContextApi } from '@pancakeswap/localization'

export type ConfigMenuDropDownItemsType = DropdownMenuItems & { hideSubNav?: boolean }
export type ConfigMenuItemsType = Omit<MenuItemsType, 'items'> & { hideSubNav?: boolean; image?: string } & {
  items?: ConfigMenuDropDownItemsType[]
}

const addMenuItemSupported = (item, chainId) => {
  if (!chainId || !item.supportChainIds) {
    return item
  }
  if (item.supportChainIds?.includes(chainId)) {
    return item
  }
  return {
    ...item,
    disabled: true,
  }
}

const config: (
  t: ContextApi['t'],
  isDark: boolean,
  languageCode?: string,
  chainId?: number,
) => ConfigMenuItemsType[] = (t, languageCode, chainId) =>
    [
      {
        label: t('Swap'),
        icon: SwapIcon,
        fillIcon: SwapFillIcon,
        href: '/swap',
        showItemsOnMobile: false,
        items: [].map((item) => addMenuItemSupported(item, chainId)),
      },
      {
        label: t('Liquidity'),
        href: '/liquidity',
        icon: EarnIcon,
        fillIcon: EarnFillIcon,
        image: '/images/decorations/pe2.png',
        showItemsOnMobile: false,

        items: [].map((item) => addMenuItemSupported(item, chainId)),
      },
      // {
      //   label: t('Farms'),
      //   href: '/farms',
      //   icon: EarnIcon,
      //   fillIcon: EarnFillIcon,
      //   image: '/images/decorations/pe2.png',
      //   showItemsOnMobile: false,

      //   items: [
      //     // {
      //     //   label: t('Farms'),
      //     //   href: '/farms',
      //     // },
      //     // {
      //     //   label: t('Pools'),
      //     //   href: '/pools',
      //     //   supportChainIds: SUPPORT_ONLY_BSC,
      //     // },
      //   ].map((item) => addMenuItemSupported(item, chainId)),
      // },
    ].map((item) => addMenuItemSupported(item, chainId))

export default config
