<template>
  <section>
    <nav class="level">
      <div class="level-left">
        <div class="level-item">
          <p class="subtitle is-5">User List</p>
        </div>
      </div>
      
      <div class="level-right">
        <div class="level-item">
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
          <div class="field">
            <p class="control">
              <input class="input" type="text" placeholder="Search Users">
            </p>
          </div>
        </div>
      </div>
    </nav>

    <b-table
      :data="users"
      :loading="isLoading"
      @sort="changeSort"
      backend-sorting
      :default-sort-direction="direction"
      :default-sort="sort"
    >
      <template slot-scope="props">
        <b-table-column field="id" label="ID" width="40" numeric>
          {{ props.row.id }}
        </b-table-column>

        <b-table-column field="first_name" label="First" sortable>
          {{ props.row.first_name }}
        </b-table-column>

        <b-table-column field="middle_name" label="Middle" sortable>
          {{ props.row.middle_name }}
        </b-table-column>

        <b-table-column field="last_name" label="Last" sortable>
          {{ props.row.last_name }}
        </b-table-column>

        <b-table-column field="email" label="Email" sortable>
          {{ props.row.email }}
        </b-table-column>

        <b-table-column field="type" label="Type" sortable>
          {{ props.row.type }}
        </b-table-column>

        <b-table-column field="account_status" label="Status" sortable>
          {{ props.row.account_status }}
        </b-table-column>

        <b-table-column field="created_at" label="Created" centered sortable>
          {{ new Date(props.row.created_at).toLocaleDateString() }}
        </b-table-column>

        <b-table-column field="updated_at" label="Updated" centered sortable>
          {{ new Date(props.row.updated_at).toLocaleDateString() }}
        </b-table-column>
      </template>

      <template slot="empty">
        <section class="section">
          <div class="content has-text-grey has-text-centered">
            <p>
              <b-icon
                icon="account-search"
                size="is-large">
              </b-icon>
            </p>
            <p>No users found.</p>
          </div>
        </section>
      </template>
    </b-table>

  </section>
</template>

<script>

export default {
  name: 'Admin-User-List',
  data() {
    return {
      users: [],
      page: 1,
      perPage: 15,
      total: 0,
      isLoading: false,
      sort: 'last_name',
      direction: 'asc',
    }
  },

  methods: {
    changeSort(sort, direction) {
      this.sort = sort;
      this.direction = direction;

      this.fetchUsers();
    },

    async fetchUsers(page = 1) {
      this.isLoading = true;
      const result = await fetch(`http://localhost:3333/api/users?page=${page}&perPage=${this.perPage}&sort=${this.sort}&direction=${this.direction}`);
      const data = await result.json();
      this.page = data.page;
      this.perPage = data.perPage;
      this.total = Number(data.total);
      this.users = data.data;
      this.isLoading = false;
    },

    updatePage(value) {
      this.fetchUsers(value)
    },
  },

  mounted() {
    this.fetchUsers();
  }
}
</script>

<style lang="scss" scoped>
  @import '../../../assets/styles/main.scss';

  section {
    padding: 2rem;
    background: $neutral-lightest;
    border-radius: 4px;
  }
</style>