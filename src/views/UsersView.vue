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
  export default {
    name: 'UsersView',
    components: {
      UsersTable,
    },
    data() {
      return {
        users: [],           // Lista de usuarios
        searchQuery: '',     // Filtro de búsqueda
        loading: false,      // Estado de carga
        error: false,        // Estado de error
        currentPage: 1,      // Página actual
        itemsPerPage: 9,     // Elementos por página
      }
    },
    computed: {
      filteredUsers() {
        return this.users.filter(user => {
          return user.name.toLowerCase().includes(this.searchQuery.toLowerCase());
        });
      },
      paginatedUsers() {
        const start = (this.currentPage - 1) * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        return this.filteredUsers.slice(start, end);
      },
      totalPages() {
        return Math.ceil(this.filteredUsers.length / this.itemsPerPage);
      }
    },
    mounted() {
      this.getUsers();
    },
    methods: {
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
