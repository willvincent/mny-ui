<template>
  <section class="content">
    <nav class="level">
      <div class="level-left">
        <div class="level-item">
          <p class="subtitle is-5">
            User List
          </p>
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
          <search
            label="Search Users"
            :callback="fetchUsers"
            :search.sync="search"
          />
        </div>
      </div>
    </nav>

    <b-table
      :data="users"
      :loading="isLoading"
      backend-sorting
      :default-sort-direction="direction"
      :default-sort="sort"
      @sort="changeSort"
    >
      <template slot-scope="props">
        <b-table-column
          field="id"
          label="ID"
          width="40"
          numeric
        >
          {{ props.row.id }}
        </b-table-column>

        <b-table-column
          field="first_name"
          label="First"
          sortable
        >
          {{ props.row.first_name }}
        </b-table-column>

        <b-table-column
          field="middle_name"
          label="Middle"
          sortable
        >
          {{ props.row.middle_name }}
        </b-table-column>

        <b-table-column
          field="last_name"
          label="Last"
          sortable
        >
          {{ props.row.last_name }}
        </b-table-column>

        <b-table-column
          field="email"
          label="Email"
          sortable
        >
          {{ props.row.email }}
        </b-table-column>

        <b-table-column
          field="type"
          label="Type"
          sortable
        >
          {{ props.row.type }}
        </b-table-column>

        <b-table-column
          field="account_status"
          label="Status"
          sortable
        >
          {{ props.row.account_status }}
        </b-table-column>

        <b-table-column
          field="created_at"
          label="Created"
          centered
          sortable
        >
          {{ new Date(props.row.created_at).toLocaleDateString() }}
        </b-table-column>

        <b-table-column
          field="updated_at"
          label="Updated"
          centered
          sortable
        >
          {{ new Date(props.row.updated_at).toLocaleDateString() }}
        </b-table-column>
        <b-table-column
          width="40"
        >
          <b-dropdown
            v-model="dropDownAction"
            position="is-bottom-left"
            @change="userAction"
          >
            <a
              slot="trigger"
              class="button is-small"
            >
              <span>
                <b-icon
                  custom-size="mdi-18px"
                  icon="dots-vertical"
                />
              </span>
              <span class="is-hidden-tablet">
                &nbsp;Manage User
              </span>
            </a>

            <b-dropdown-item
              custom
              class="is-hidden-desktop"
            >
              <h3 class="has-text-left">
                Manage {{ props.row.first_name }} {{ props.row.last_name }}
              </h3>
            </b-dropdown-item>
            <b-dropdown-item
              class="is-hidden-desktop"
              separator
            />

            <b-dropdown-item
              :value="{ action: 'edit', item: props.row }"
            >
              <b-icon icon="account-edit" /> Edit
            </b-dropdown-item>
            <b-dropdown-item
              :value="{ action: props.row.account_status !== 'disabled' ? 'disable' : 'enable', item: props.row }"
            >
              <span v-if="props.row.account_status !== 'disabled'">
                <b-icon icon="account-off" /> Disable
              </span>
              <span v-else>
                <b-icon icon="account-convert" /> Enable
              </span>
            </b-dropdown-item>
            <b-dropdown-item
              :value="{ action: 'remove', item: props.row }"
            >
              <b-icon icon="account-remove" /> Delete
            </b-dropdown-item>
          </b-dropdown>
        </b-table-column>
      </template>

      <template slot="empty">
        <section class="section">
          <div class="content has-text-grey has-text-centered">
            <p>
              <b-icon
                icon="account-search"
                size="is-large"
              />
            </p>
            <p>No users found.</p>
          </div>
        </section>
      </template>
    </b-table>
  </section>
</template>

<script>
import Search from '@/components/global/Search.vue';
import { userList, updateUser, removeUser } from '@/api/users';

export default {
  name: 'AdminUserList',
  components: {
    Search,
  },
  data() {
    return {
      users: [],
      page: 1,
      perPage: 15,
      total: 0,
      isLoading: false,
      search: null,
      sort: 'last_name',
      direction: 'asc',
      dropDownAction: null,
    }
  },

  mounted() {
    this.fetchUsers();
  },

  methods: {
    changeSort(sort, direction) {
      this.sort = sort;
      this.direction = direction;

      this.fetchUsers();
    },

    async fetchUsers(page = 1) {
      this.isLoading = true;
      const params = {
        page: page,
        perPage: this.perPage,
        sort: this.sort,
        direction: this.direction,
        search: this.search,
      }

      const result = await userList(params)
      this.page = result.page;
      this.perPage = result.perPage;
      this.total = Number(result.total);
      this.users = result.data;
      this.isLoading = false;
    },

    updatePage(value) {
      this.fetchUsers(value)
    },

    async userAction({ action, item }) {
      switch (action) {
        case 'edit':
          this.$router.push(`/admin/users/edit/${item.id}`);
          break;
        case 'enable':
        case 'disable':
          if (item.id === this.$store.state.auth.myUserId) {
            return this.$toast.open({
              message: `You cannot ${action} yourself.`,
              type: 'is-warning',
            })
          }
          this.$dialog.confirm({
            title: `${action === 'enable' ? 'Enabling' : 'Disabling'} ${item.first_name} ${item.last_name}`,
            message: `Are you sure you want to <b>${action}</b> this user?`,
            confirmText: 'Yes',
            type: 'is-warning',
            hasIcon: true,
            onConfirm: async () => {
              let account_status = item.account_status
              if (item.account_status === 'disabled') {
                account_status = 'active';
              } else {
                account_status = 'disabled';
              }
              try {
                await updateUser(item.id, { account_status })
                item.account_status = account_status;
                this.$toast.open({
                  message: `User ${action}d`,
                  type: 'is-primary',
                })
              } catch (error) {
                this.$toast.open({
                  message: 'Unable to process your request',
                  type: 'is-danger',
                })
              }
            }
          });
          break;
        case 'remove':
          if (item.id === this.$store.state.auth.myUserId) {
            return this.$toast.open({
              message: `You cannot delete yourself.`,
              type: 'is-warning',
            })
          }
          this.$dialog.confirm({
            title: `Deleting ${item.first_name} ${item.last_name}`,
            message: 'Are you sure you want to <b>delete</b> this user?',
            confirmText: 'Delete Account',
            type: 'is-danger',
            hasIcon: true,
            onConfirm: async () => {
              try {
                await removeUser(item.id)
                this.updatePage(this.page)
                this.$toast.open({
                  message: `User has been deleted`,
                  type: 'is-primary',
                })
              } catch (error) {
                this.$toast.open({
                  message: 'Unable to process your request',
                  type: 'is-danger',
                })
              }
            }
          });
          break;
        default:
          break;
      }

      this.dropDownAction = null;
    },
  }
}
</script>

<style lang="scss">
  .is-hidden-desktop h3.has-text-left {
    margin: 0 !important;
  }
</style>
