<template>
  <div class="dashboard-container">
    <component :is="currentRole" />
  </div>
</template>

<script>
import Vuex from 'vuex'
// import adminDashboard from './admin'
const adminDashboard = () => import ('./admin')
// import editorDashboard from './editor'
const editorDashboard = () => import ('./editor')

export default {
  name: 'Dashboard',
  components: { adminDashboard, editorDashboard },
  data() {
    return {
      currentRole: 'adminDashboard'
    }
  },
  computed: {
    ...Vuex.mapGetters([
      'roles'
    ])
  },
  created() {
    console.log('create')
    if (!this.roles.includes('admin')) {
      this.currentRole = 'editorDashboard'
    }
  }

}
</script>
