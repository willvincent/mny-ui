<template>
  <div>
    <section class="content">
      <nav class="level">
        <div class="level-left">
          <div class="level-item">
            <p class="subtitle is-5">
              <span v-if="uid">
                Edit
              </span>
              <span v-else>
                Add
              </span>
              User
            </p>
          </div>
        </div>

        <div class="level-right">
          <div class="level-item">
            <b-select
              v-model="user.type"
              :disabled="uid"
              expanded
            >
              <option
                v-for="option in accountTypes"
                :key="option.id"
                :value="option.id"
              >
                {{ option.label }}
              </option>
            </b-select>
          </div>
          <div class="level-item">
            <div class="button is-light" @click.prevent="save">
              {{ uid ? 'Save' : 'Create' }} User
            </div>
          </div>
          <div class="level-item">
            <a
              class="is-link"
              @click="$router.go(-1)"
            >
              Cancel
            </a>
          </div>
        </div>
      </nav>
    </section>
    <section class="section no-top separate-tab-content">
      <b-tabs type="is-boxed" v-model="activeTab">
        <b-tab-item
          label="Account"
          icon="account"
        />
        <b-tab-item
          label="Profile"
          icon="account-card-details"
        />
        <b-tab-item
          label="Permissions"
          icon="lock-question"
        />
      </b-tabs>
      <user-account-form :user="user" v-if="activeTab === 0" />

      <user-profile-form-admin
        v-if="user.type === 'ADMIN' && activeTab === 1"
        :user="user"
      />
      <user-profile-form-client
        v-else-if="user.type === 'CLIENT' && activeTab === 1"
        :user="user"
      />
      <user-profile-form-cpa
        v-else-if="user.type === 'CPA' && activeTab === 1"
        :user="user"
      />
    </section>
  </div>
</template>

<script>
import { getUser, createUser, updateUser } from '@/api/users';
import UserAccountForm from '@/components/user/UserAccountForm.vue';
import UserProfileFormAdmin from '@/components/user/UserProfileFormAdmin.vue';
import UserProfileFormClient from '@/components/user/UserProfileFormClient.vue';
import UserProfileFormCpa from '@/components/user/UserProfileFormCpa.vue';


const emptyUser = () => {
  return {
    type: 'CPA',
    account_status: 'pending',
    profile: {
      phones: [],
      addresses: [],
      practice_areas: [],
      industries: [],
    }
  }
}

export default {
  components: {
    UserAccountForm,
    UserProfileFormAdmin,
    UserProfileFormClient,
    UserProfileFormCpa,
  },
  props: {
    uid: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      activeTab: 0,
      user: {},
      accountTypes: [
        { id: 'ADMIN', label: 'Administrator' },
        { id: 'CPA', label: 'CPA' },
        { id: 'CLIENT', label: 'Client' },
      ],
      welcomeEmail: false,
    }
  },
  watch: {
    uid: {
      async handler(uid) {
        if (uid > 0) {
          try {
            this.user = await getUser(uid)
            if (!this.user.profile) {
              this.user.profile = {
                phones: [],
                addresses: [],
                practice_areas: [],
                industries: [],
              }
            }
          }
          catch (error) {
            console.log(error)
          }
        } else {
          this.user = emptyUser()
        }
      },
      immediate: true,
    }
  },
  methods: {
    async save() {
      if (this.uid) {
        // update user
        try {
          const result = await updateUser(this.uid, this.user)

          this.$toast.open({
            type: 'is-primary',
            message: result.message,
          })
        } catch (error) {
          console.log(error)
        }
        this.$router.push('/admin/users/user-list')
      } else {
        // Do validation
        // Ask whether to send welcome email
        this.welcomeEmail = await new Promise(resolve => {
          this.$dialog.confirm({
            title: 'Send Welcome Email',
            message: `If you select "Yes" an email welcoming the user to the application, with a link to activate their account will be dispatched to ${this.user.email}. Otherwise the account will be created, but no email will be generated.`,
            confirmText: 'Yes',
            cancelText: 'No',
            type: 'is-primary',
            onConfirm: () => resolve(true),
            onCancel: () => resolve(false),
          })
        })

        // create user

        // display success message
        // redirect to user list
      }
    }
  }
}
</script>

<style lang="scss">
  section.content:first-child {
    margin: 0;
  }
</style>
