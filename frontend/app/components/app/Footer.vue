<script setup lang="ts"></script>

<template>
  <footer class="text-foreground py-6">
    <div class="container mx-auto px-4">
      <div class="flex flex-col md:flex-row justify-between items-center">
        <div class="mb-4 md:mb-0">
          <p class="text-sm">
            &copy; 2023 Vue Dating. {{ $t('footer.rights') }}
          </p>
        </div>
        <div class="flex space-x-4">
          <a
            href="#"
            class="text-sm hover:underline"
          >
            {{ $t('footer.privacy') }}
          </a>
          <a
            href="#"
            class="text-sm hover:underline"
          >
            {{ $t('footer.terms') }}
          </a>
          <a
            href="#"
            class="text-sm hover:underline"
          >
            {{ $t('footer.contact') }}
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>
