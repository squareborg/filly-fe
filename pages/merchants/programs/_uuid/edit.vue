<template>
<ProgramEdit :program-uuid="$route.params.uuid" />
</template>
<script>

import ProgramEdit from '@/components/Merchant/ProgramEdit';

export default {
  components:{
    ProgramEdit
  }
}
</script>
