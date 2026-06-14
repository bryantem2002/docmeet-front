<script setup lang="ts">
/**
 * Área admin: usuarios, médicos, reportes según tu backend.
 * Ruta protegida con meta.requiresAdmin (rol en IUser tras login).
 */
</script>

<template>
  <div class="space-y-4 p-4 sm:p-6 lg:p-8">
    <h1 class="text-2xl font-bold text-slate-900">Panel administración</h1>
    <p class="text-slate-600 text-sm">
      Conecta aquí las pantallas de gestión cuando los endpoints admin estén
      disponibles en el API Gateway.
    </p>
    <ul class="list-disc list-inside text-sm text-slate-600 space-y-1">
      <li>Gestión de usuarios</li>
      <li>Gestión de médicos</li>
      <li>Reportes</li>
    </ul>
  </div>
</template>
