// ** Icon imports
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
import CreditCardOutline from 'mdi-material-ui/CreditCardOutline'
import Fruit from 'mdi-material-ui/FruitCherries'
import Blog from 'mdi-material-ui/NewBox'
import Garden from 'mdi-material-ui/Shovel'

import CubeOutline from 'mdi-material-ui/CubeOutline'
import FormatLetterCase from 'mdi-material-ui/FormatLetterCase'
import GoogleCirclesExtended from 'mdi-material-ui/GoogleCirclesExtended'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import Table from 'mdi-material-ui/Table'

// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'
import { LANG_BLOG, LANG_FRUIT, LANG_GARDEN } from 'src/constants/convertLang'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Dashboard',
      icon: HomeOutline,
      path: '/'
    },
    {
      title: 'Account Settings',
      icon: AccountCogOutline,
      path: '/account-settings'
    },
    {
      sectionTitle: 'Pages'
    },
    {
      title: LANG_GARDEN.GARDEN_MANAGEMENT,
      icon: Garden,
      path: '/garden',
      openInNewTab: false
    },
    {
      title: LANG_FRUIT.FRUIT_MANAGEMENT,
      icon: Fruit,
      path: '/fruit',
      openInNewTab: false
    },
    {
      title: LANG_BLOG.BLOG_MANAGEMENT,
      icon: Blog,
      path: '/blog',
      openInNewTab: false
    },
    {
      sectionTitle: 'User Interface'
    },
    {
      title: 'Typography',
      icon: FormatLetterCase,
      path: '/typography'
    },
    {
      title: 'Icons',
      path: '/icons',
      icon: GoogleCirclesExtended
    },
    {
      title: 'Cards',
      icon: CreditCardOutline,
      path: '/cards'
    },
    {
      title: 'Tables',
      icon: Table,
      path: '/tables'
    },
    {
      icon: CubeOutline,
      title: 'Form Layouts',
      path: '/form-layouts'
    }
  ]
}

export default navigation
