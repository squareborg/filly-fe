<template>
    <nav class="flex flex-row justify-between px-4 py-8">
        <div class="flex flex-row">
          <button class="block h-16 w-16 rounded-full overflow-hidden border-2">
            <img class="object-cover" src="https://source.unsplash.com/100x100/?avatar">
          </button>
          <div class="ml-3 py-2">
            <span class="block">filly</span>
            <span class="block font-bold">{{$store.state.auth.user.first_name}} {{$store.state.auth.user.last_name}}</span>
          </div>
        </div>
        <div></div>
    </nav>
</template>
<script>
export default {
  data(){
    return {
      admin: false
    }
  }
}
</script>
