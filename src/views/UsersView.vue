<template>
  <div class="container">
    <div class="header">
      <h1 class="title">Usuarios PEP</h1>
      <div class="actions">
        <input
          type="text"
          class="input search-input"
          placeholder="Buscar usuario..."
          v-model="searchQuery"
        />
        <button class="button is-primary">
          Agregar usuario
        </button>
      </div>
    </div>

    <!-- Spinner de carga -->
    <progress v-if="loading" class="progress is-primary" max="100">Cargando...</progress>

    <!-- Mensaje de error -->
    <div v-if="error" class="notification is-danger">
      <button class="delete" @click="error = false"></button>
      Error al obtener los usuarios. Inténtelo de nuevo.
    </div>

    <!-- Tabla de usuarios -->
    <UsersTable v-if="!loading && !error" v-bind:users="paginatedUsers"/>
    <nav class="pagination" role="navigation" aria-label="pagination">
      <button
        class="pagination-previous"
        :disabled="currentPage === 1"
        @click="currentPage--"
      >
        Anterior
      </button>

      <button
        class="pagination-next"
        :disabled="currentPage === totalPages"
        @click="currentPage++"
      >
        Siguiente
      </button>

      <ul class="pagination-list">
        <li v-for="page in totalPages" :key="page">
          <button
            class="pagination-link"
            :class="{ 'is-current': currentPage === page }"
            @click="currentPage = page"
          >
            {{ page }}
          </button>
        </li>
      </ul>
    </nav>

    <!-- Modal -->
  </div>
</template>

<style scoped>
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 5rem;
  }
  .title {
    color: #42b983;
  }
  .pagination {
    margin-top: 2rem;
    display: flex;
    justify-content: center;
  }
  .actions {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
</style>

<script>
import axios from 'axios';
import UsersTable from '@/components/UsersTable.vue';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

/**
 * Componente UsersView.
 *
 * @component
 * @description Este componente se encarga de obtener y mostrar una lista de usuarios. Permite buscar usuarios mediante
 * un campo de texto y navegar entre las páginas de resultados. Utiliza el componente UsersTable para mostrar los usuarios en forma de tabla.
 */
export default {
  name: 'UsersView',
  components: {
    UsersTable,
  },
  data() {
    return {
      /**
       * Lista de usuarios obtenidos de la API.
       * @type {Array}
       */
      users: [],
      /**
       * Consulta de búsqueda para filtrar los usuarios.
       * @type {string}
       */
      searchQuery: '',
      /**
       * Indica si se está cargando la información.
       * @type {boolean}
       */
      loading: false,
      /**
       * Indica si ha ocurrido un error al obtener los usuarios.
       * @type {boolean}
       */
      error: false,
      /**
       * Página actual en la paginación.
       * @type {number}
       */
      currentPage: 1,
      /**
       * Número de elementos a mostrar por página.
       * @type {number}
       */
      itemsPerPage: 9,
    }
  },
  computed: {
    /**
     * Filtra la lista de usuarios en función de la consulta de búsqueda.
     *
     * @returns {Array} Lista de usuarios filtrados.
     */
    filteredUsers() {
      return this.users.filter(user => {
        return user.name.toLowerCase().includes(this.searchQuery.toLowerCase());
      });
    },
    /**
     * Obtiene la lista de usuarios correspondiente a la página actual.
     *
     * @returns {Array} Lista de usuarios paginados.
     */
    paginatedUsers() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredUsers.slice(start, end);
    },
    /**
     * Calcula el número total de páginas basado en los usuarios filtrados.
     *
     * @returns {number} Total de páginas.
     */
    totalPages() {
      return Math.ceil(this.filteredUsers.length / this.itemsPerPage);
    }
  },
  /**
   * Hook del ciclo de vida que se ejecuta al montar el componente.
   * Llama al método getUsers para obtener la lista de usuarios.
   */
  mounted() {
    this.getUsers();
  },
  methods: {
    /**
     * Obtiene la lista de usuarios de la API.
     * <p>
     * Este método asíncrono actualiza el estado de carga, realiza la petición HTTP a la API, simula un retraso
     * de 3 segundos y asigna los datos recibidos a la propiedad 'users'. En caso de error, actualiza la propiedad 'error'.
     * </p>
     *
     * @async
     * @function getUsers
     */
    async getUsers() {
      this.loading = true;
      this.error = false;
      try {
        const response = await axios.get(API_URL);

        // Simular un retraso de 3 segundos antes de actualizar los datos
        await new Promise(resolve => setTimeout(resolve, 3000));

        this.users = response.data;
      } catch (error) {
        console.error("Error en la petición", error);
        this.error = true;
      } finally {
        this.loading = false; // Se ejecuta después del delay
      }
    },
  }
}
</script>
