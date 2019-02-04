<template>
  <section class="content">
    <nav class="level">
      <div class="level-left">
        <div class="level-item">
          <p class="subtitle is-5">
            <span v-if="uid">Edit</span>
            <span v-else>Add</span>
            User
          </p>
        </div>
      </div>

      <div class="level-right">
        <!-- <div class="level-item">
          <b-pagination
            v-if="total > 0"
            :total.sync="total"
            :current="page"
            :simple="true"
            :per-page="perPage"
            @change="updatePage"
          />
        </div>

        <div class="level-item">
          <search
            label="Search Users"
            :callback="fetchUsers"
            :search.sync="search"
          />
        </div> -->
      </div>
    </nav>
    <pre>{{ user }}</pre>
  </section>
</template>

<script>
import { getUser } from '@/api/users'
export default {
  props: {
    uid: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      user: {},
    }
  },
  watch: {
    uid: {
      async handler(uid) {
        if (uid > 0) {
          try {
            this.user = await getUser(uid)
          }
          catch (error) {
            console.log(error)
          }
        } else {
          this.user = {}
        }
      },
      immediate: true,
    }
  }
}
</script>

<style lang="scss">

</style>
