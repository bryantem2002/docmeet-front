<script setup lang="ts">
/**
 * Vista placeholder para integración con pasarela (Stripe, etc.).
 * Implementar flujo real con `payment-service` cuando el gateway exponga endpoints.
 */
</script>

<template>
  <div class="space-y-4 max-w-xl">
    <h1 class="text-2xl font-bold text-slate-900">Pagos</h1>
    <p class="text-slate-600 text-sm">
      Aquí irá la confirmación de pago y el retorno de la pasarela. Los servicios
      base están en <code class="text-xs bg-slate-100 px-1 rounded">src/services/payment-service.ts</code>.
    </p>
  </div>
</template>
