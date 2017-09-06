<template>
<div class="full-page">
  <div class="container-full">
    <div class="row clear">
      <div class=
      "col-12 col-lg-6 push-lg-3 flex-center text-center pad-bottom-10">
      <h1>Hello World!</h1>
      </div>
    </div>
    <div class="row clear">
      <div class=
      "col-12 col-lg-6 push-lg-3 flex-center text-center">
        <router-link tag="button" to="/signup">Signup</router-link> <router-link tag="button" to="/login">Login</router-link>
      </div>
    </div>
  </div>
  <router-view></router-view>
</div>
</template>
