import Vue from 'vue'// svg component
const SvgIcon = () => import('@/components/SvgIcon')
// register globally
Vue.component('svg-icon', SvgIcon)

const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
