<template>
  <div class="container">
    <table class="table is-fullwidth is-striped is-hoverable">
      <thead>
        <tr>
          <th>ID</th>
          <th >Nombre</th>
          <th>Correo</th>
          <th>Dirección</th>
          <th>Compañia</th>
          <th>Telefono</th>
          <th>Website</th>
          <th class="has-text-right">Opciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td class="has-text-left">{{ user.id }}</td>
          <td class="has-text-left">{{ user.name }}</td>
          <td class="has-text-left">{{ user.email }}</td>
          <td class="has-text-left">{{ `${user.address.city}, ${user.address.street}, ${user.address.suite}` }}</td>
          <td class="has-text-left">{{ user.company.name }}</td>
          <td class="has-text-left">{{ user.phone }}</td>
          <td class="has-text-left">{{ user.website }}</td>
          <td class="has-text-right">
            <div class="dropdown is-hoverable">
              <div class="dropdown-trigger">
                <button class="button is-ghost no-border" aria-haspopup="true" :aria-controls="`dropdown-menu-${user.id}`">
                  <span class="icon is-small">
                    <font-awesome-icon :icon="['fas', 'ellipsis-v']" />
                  </span>
                </button>
              </div>
              <div class="dropdown-menu" :id="`dropdown-menu-${user.id}`" role="menu">
                <div class="dropdown-content">
                  <a href="#" class="dropdown-item" @click.prevent="$emit('edit', user)">Editar</a>
                  <a href="#" class="dropdown-item" @click.prevent="$emit('view', user)">Ver Detalles</a>
                  <a href="#" class="dropdown-item" @click.prevent="$emit('delete', user)">Eliminar</a>
                </div>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
  .dropdown-menu {
    min-width: min-content;
  }

  .dropdown-item {
    text-align: left;
  }


</style>

<script>
export default {
  props: {
    users: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      activeDropdown: null // Controla qué dropdown está abierto
    };
  },
  methods: {
    toggleDropdown(userId) {
      this.activeDropdown = this.activeDropdown === userId ? null : userId;
    },
    mostrarModalEditar(user) {
      console.log("Editar:", user);
      this.activeDropdown = null;
    },
    eliminarUsuario(user) {
      console.log("Eliminar:", user);
      this.activeDropdown = null;
    }
  }
};
</script>
