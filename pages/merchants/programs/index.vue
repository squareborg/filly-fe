<template>
<div>
        <nuxt-link to="/merchants/programs/create" class="btn btn-primary my-3"><i class="fa fa-plus "></i> New Program</nuxt-link>

    <ProgramsList />
    </div>

</template>


  <script>
    import ProgramsList from '@/components/Merchant/ProgramsList';
    export default {
      components:{
        ProgramsList
      },
    }
  </script>

